export interface Product {
  _id: string;
  title: string;
  description: string;
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  colors?: string[];
  image?: string;
  images: string;
  category?: {
    name?: string;
  };
  subcategories?: {
    name?: string;
  };
  brand?: {
    name: string;
  };
  ratingsAverage?: number;
  ratingsQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
