import * as model from 'dals';
import * as apiModel from './listingAndReviews.api-model';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from 'core/clients';
import { envConstants } from 'core/constants';

const mapPicture = async (picture: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: envConstants.AWS_S3_BUCKET,
    Key: picture,
  });
  const expiresIn = 60 * 60 * 24; // 1 day expiration time.
  return await getSignedUrl(s3Client, command, { expiresIn });
};

export const mapListingAndReviewsFromModelToApi = (listingAndReviews: model.ListingAndReviews): apiModel.ListingAndReviews => ({
   id: listingAndReviews._id,
   listing_url: listingAndReviews.listing_url,
   description: listingAndReviews.description,
   country: listingAndReviews.address.country,
   bedrooms: listingAndReviews.bedrooms,
   beds: listingAndReviews.beds,
   bathrooms: listingAndReviews.bathrooms,
   street: listingAndReviews.address.street,
   city: listingAndReviews.address.market,
   // Sorting the reviews by latest date
   // TypeScript only allows us to do arithmetic operations with values of type any, number, bigint or enum.
   // The getTime method returns a number
   reviews: listingAndReviews.reviews.sort(function(a, b){ return b.date.getTime() - a.date.getTime() }).slice(0,5)  
});

export const mapListingAndReviewsFromModelToApiAsync = async (
  listingAndReviews: model.ListingAndReviews
  ): Promise<apiModel.ListingAndReviews> => {
    let listing_url;
    if (envConstants.isS3SignedUrl) {
      listing_url = await mapPicture(listingAndReviews.listing_url);
    } else {
      listing_url=listingAndReviews.listing_url;
    }
    return {
      id: listingAndReviews._id,
      listing_url,
      description: listingAndReviews.description,
      country: listingAndReviews.address.country,
      bedrooms: listingAndReviews.bedrooms,
      beds: listingAndReviews.beds,
      bathrooms: listingAndReviews.bathrooms,
      street: listingAndReviews.address.street,
      city: listingAndReviews.address.market,
      // Sorting the reviews by latest date
      // TypeScript only allows us to do arithmetic operations with values of type any, number, bigint or enum.
      // The getTime method returns a number
      reviews: listingAndReviews.reviews.sort(function(a, b){ return b.date.getTime() - a.date.getTime() }).slice(0,5)  
    }
};

export const mapListingAndReviewsListFromModelToApi = (
  listingAndReviewsList: model.ListingAndReviews[]
): apiModel.ListingAndReviews[] => Array.isArray(listingAndReviewsList) ? listingAndReviewsList.map(mapListingAndReviewsFromModelToApi) : [];

export const mapListingAndReviewsListFromModelToApiAsync = async (
  listingAndReviewsList: model.ListingAndReviews[]
  ): Promise<apiModel.ListingAndReviews[]> => { 
    const list = await Promise.all(listingAndReviewsList.map(async(l) => {
      return mapListingAndReviewsFromModelToApiAsync(l)
    }))
    return list;
}

export const mapListingAndReviewsFromApiToModel = (listingAndReviews: apiModel.ListingAndReviews): model.ListingAndReviews => ({
  _id: listingAndReviews.id,
  listing_url: listingAndReviews.listing_url,
  description: listingAndReviews.description,
  bedrooms: listingAndReviews.bedrooms,
  beds: listingAndReviews.beds,
  bathrooms: listingAndReviews.bathrooms,
  address : {
    street: listingAndReviews.street,
    market:  listingAndReviews.city,
    country: listingAndReviews.country,
  }, 
  reviews: listingAndReviews.reviews.map(mapReviewFromApiToModel),
});

// Review mapping from Api to db
export const mapReviewFromApiToModel = (listingAndReviews: apiModel.Review): model.Review => ({ 
  listing_id: listingAndReviews.listing_id,
  date: new Date(),
  reviewer_name: listingAndReviews.reviewer_name,
  comments: listingAndReviews.comments,
});

export const mapReviewFromModelToApi = (listingAndReviews: model.Review): apiModel.Review => ({  
  listing_id: listingAndReviews.listing_id,
  date: listingAndReviews.date, 
  reviewer_name: listingAndReviews.reviewer_name,
  comments: listingAndReviews.comments,
});