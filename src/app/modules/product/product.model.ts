import { Review } from "../product-details/product-details.model";

export interface Product {
    id: number;
    name: string; 
    category: string; 
    description: string; 
    price: number; 
    discountPrice: number;
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
    discountPrice: number;
    currency: string;
    image: string;
    slug: string;
    reviews: Review[];
}