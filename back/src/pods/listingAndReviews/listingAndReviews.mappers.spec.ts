import * as model from 'dals';
import * as apiModel from './listingAndReviews.api-model';
import { mapListingAndReviewsListFromModelToApi } from './listingAndReviews.mappers';

describe('pods/listingAndReviews/listingAndReviews.mappers spec', () => {
  describe('maplistingAndReviewsListFromApiToModel', () => {
    it.each<model.ListingAndReviews[]>([undefined, null, []])(
      'should return empty array when it feeds listingAndReviewsList equals %p',
      (listingAndReviewsList: any) => {
      // Arrange

      // Act
      const result = mapListingAndReviewsListFromModelToApi(listingAndReviewsList);

      // Assert
      expect(result).toEqual([]);
    });
    it('should return one mapped item in array when it feeds listingAndReviewsList with one item', () => {
        // Arrange
        const listingAndReviewsList: model.ListingAndReviews[] = [
          {
            _id: '10082422',
            listing_url: '',
            description: 'description',
            bedrooms: 2,
            beds: 3,
            bathrooms: 2,
            address: {
                street: 'C. Colegios, 8',
                market: 'Alcalá de Henares',
                country: 'Spain'
            },
            reviews: [
                {
                  date: new Date('2022-10-08'),
                  reviewer_name: 'Monica',
                  comments: 'Very Nice',
                  listing_id: '10082422',
                },
            ]
          },
        ];
  
        // Act
        const result = mapListingAndReviewsListFromModelToApi(listingAndReviewsList);
  
        // Assert
        const expectedResult: apiModel.ListingAndReviews[] = [
          {
            id: '10082422',
            listing_url: '',
            description: 'description',
            bedrooms: 2,
            beds: 3,
            bathrooms: 2,
            country: 'Spain',
            street: 'C. Colegios, 8',
            city: 'Alcalá de Henares',
            reviews: [
                {
                    date: new Date('2022-10-08'),
                    reviewer_name: 'Monica',
                    comments: 'Very Nice',
                    listing_id: '10082422',
                },
            ]
          }
        ];
        expect(result).toEqual(expectedResult);
      });
  });
});