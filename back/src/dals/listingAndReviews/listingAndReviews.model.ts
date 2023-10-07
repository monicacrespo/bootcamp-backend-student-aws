export interface ListingAndReviews {
  _id: string;
  listing_url: string;
  description: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  address: Address;
  reviews: Review[]; // Array of embedded documents
}

export interface Address {
  street: string;
  market: string;
  country: string;
}

export interface Review {
  date: Date;
  reviewer_name: string;
  comments: string;
  listing_id: string;
}