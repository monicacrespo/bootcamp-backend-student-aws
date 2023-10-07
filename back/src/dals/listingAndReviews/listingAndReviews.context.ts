import { db } from 'core/servers';
import { ListingAndReviews } from './listingAndReviews.model';

export const getListingAndReviewsContext = () => db.collection<ListingAndReviews>('listingsAndReviews');