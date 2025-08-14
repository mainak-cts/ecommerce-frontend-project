export interface ProductType {
  id: number;
  brand: string;
  category: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  rating: number;
  reviews: ReviewType[]
  availabilityStatus: string;
}

export interface ReviewType {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}
