export interface ListingAndReviews {
  id: string;
  listing_url: string;
  description: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  country: string;
  street: string,
  city: string,
  reviews: Review[];
}

export interface Review {
  date: Date;
  reviewer_name: string;
  comments: string;
  listing_id: string;
}