export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}