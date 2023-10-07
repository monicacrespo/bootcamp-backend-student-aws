import { Router } from 'express';
import { listingAndReviewsRepository, Review } from 'dals';
import {
  mapListingAndReviewsListFromModelToApiAsync,
  mapListingAndReviewsFromModelToApiAsync,
  mapReviewFromApiToModel,
  mapReviewFromModelToApi,
  mapListingAndReviewsFromApiToModel,
} from './listingAndReviews.mappers';

export const listingsAndReviewsApi = Router();

listingsAndReviewsApi
  // Display all listings and its reviews. If country is given, returns the listings that matches that criteria. Sames happens with page & pageSize
  .get('/', async (req, res, next) => {
    try {
      const country = String(req.query.country);
      const pageSize = Number(req.query.pageSize);
      const page = Number(req.query.page);
      const listingList = await listingAndReviewsRepository.getListingAndReviewsList(country, page, pageSize);
      if (listingList.length >= 1)
      {
        const apiListingAndReviewsList = await mapListingAndReviewsListFromModelToApiAsync(listingList);
        res.send(apiListingAndReviewsList);
      }
      else res.send('We could not find what you are looking for right now');
    } catch (error) {
      next(error);
    }
  })
   // Display all details of a listing
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const listing = await listingAndReviewsRepository.getListingAndReviews(id);
      if (listing)
      {
        const apiListingAndReviews = await mapListingAndReviewsFromModelToApiAsync(listing);
        res.send(apiListingAndReviews);
      }
      else res.send('The property requested is not found');
    } catch (error) {
      next(error);
    }
  }) 
  // Add a new review
  // id used to filter the listing
  .put('/:id/reviews', async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = mapReviewFromApiToModel(req.body);
      let newReview = await listingAndReviewsRepository.insertReview(
        id,
        review
      );
      res.send(mapReviewFromModelToApi(newReview));
    } catch (error) {
      next(error);
    }
  })
  // Update a listing
  .put('/:id', async (req, res, next) => {   
    try {
      const { id } = req.params;
      const updatedListingAndReviews = mapListingAndReviewsFromApiToModel(req.body);
      await listingAndReviewsRepository.updateListingAndReviews(id, updatedListingAndReviews);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  })
  // Add a listing
  .post('/', async (req, res, next) => {
    try {
      const listingAndReviews = mapListingAndReviewsFromApiToModel(req.body);
      const newlistingAndReviews = await listingAndReviewsRepository.insertListingAndReviews(listingAndReviews);
      const apiListingAndReviews = await mapListingAndReviewsFromModelToApiAsync(newlistingAndReviews);
      res.status(201).send(apiListingAndReviews);
    } catch (error) {
      next(error);
    }
  });