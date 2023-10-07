import supertest from 'supertest';
import { createRestApiServer } from 'core/servers';
import * as apiModel from './listingAndReviews.api-model';
import { listingsAndReviewsApi } from './listingAndReviews.rest-api';
import { mapListingAndReviewsListFromModelToApiAsync } from './listingAndReviews.mappers';

const app = createRestApiServer();
app.use(listingsAndReviewsApi);

describe('pods/listingAndReviews/listingAndReviews.rest-api specs', () => {
    describe('getListingAndReviewsList', () => {
        it('should return the whole ListingAndReviewsList when it requests "/" endpoint',
            async () => {
                // Arrange
                const route = '/'

                // Act
                const response = await supertest(app).get(route);
                let body = Object.keys(response.body).length;

                // Assert
                expect(response.statusCode).toEqual(200);
                expect(body).toEqual(4);
            })
            it('it should return Spain listings when it requests "/?country=Spain" endpoint',
                async () => {
                    // Arrange
                    const route = '/?country=Spain'

                    // Act
                    const response = await supertest(app).get(route);
                    // Use the Object. keys() method to get an array of the object's keys.
                    // Access the length property on the array of keys
                    let bodyLength = Object.keys(response.body).length;
                    // The result of Object.keys(response.body) is [ '0', '1', '2' ]

                    // Assert
                    expect(response.statusCode).toEqual(200);
                    expect(bodyLength).toEqual(3);
                })
            it('it should return NO listings when it requests a non existing country "/?country=SesamoStreet" end point',
                async () => {
                    // Arrange
                    const route = '/?country=SesameStreet'

                    // Act
                    const response = await supertest(app).get(route);
                    let body = Object.keys(response.body).length;

                    // Assert
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual({});
                })
        })
    describe('getListingAndReviews', () => {
        it('should return one ListingAndReviews when it requests "/01" endpoint with a right id in params',
            async () => {
                // Arrange
                const route = '/02'
                // Act
                const response = await supertest(app).get(route);
                // response.body
                // {
                //     id: '02',
                //     listing_url: '/02-detalle-casa.png',
                //     description: 'description',
                //     country: 'Spain',
                //     bedrooms: 2,
                //     beds: 3,
                //     bathrooms: 2,
                //     street: 'Av. Duque de Nájera, 9',
                //     city: 'Cadiz',
                //     reviews: [
                //       {
                //         date: '2022-10-07T00:00:00.000Z',
                //         reviewer_name: 'Monica',
                //         comments: 'Nice',
                //         listing_id: '02'
                //       }
                //     ]
                //   }
                let bodyLength = Object.keys(response.body).length;
                // Object.keys() method count the Number of Properties in a JavaScript Object               
                // [
                //     'id',          'listing_url',
                //     'description', 'country',
                //     'bedrooms',    'beds',
                //     'bathrooms',   'street',
                //     'city',        'reviews'
                // ]
                // Assert
                expect(response.statusCode).toEqual(200);        
                expect(bodyLength).toEqual(10);
            }
        )
        })
})