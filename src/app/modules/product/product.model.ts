import { Review } from "../product-details/product-details.model";

export interface Product {
    name: string; 
    category: string; 
    description: string; 
    price: number; 
    currency: string;
    image: string;
    slug: string;
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    image: string;
    slug: string;
    reviews: Review[];
}