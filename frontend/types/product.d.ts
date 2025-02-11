export interface Product {
  id: number;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  materials:string,
  care:string,
  price: number;
  size: string[];
  color: string[];
  inStock: boolean;
  images: string[];
  rating: number;
}