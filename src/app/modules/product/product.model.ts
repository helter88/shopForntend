import { Review } from "../product-details/product-details.model";

export interface Product {
    id: number;
    name: string; 
    category: string; 
    description: string; 
    price: number; 
    discountPrice: number;
    currency: string;
    image: ProductImages;
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
    slug: string;
    reviews: Review[];
    productImages: ProductImages[];
}

export interface ProductImages {
    id: number;
    image: ImageDto;
}
export interface ImageDto {
    id: number;
    filename: string;
    filetype: string;
    image: string;
}