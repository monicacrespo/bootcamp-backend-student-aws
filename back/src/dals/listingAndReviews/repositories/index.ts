import { mockRepository } from './listingAndReviews.mock-repository';
import { dbRepository } from './listingAndReviews.db-repository';
import { envConstants } from 'core/constants';

export const listingAndReviewsRepository = envConstants.isApiMock
  ? mockRepository
  : dbRepository;