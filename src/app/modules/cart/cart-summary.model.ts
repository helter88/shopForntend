import { ProductImages } from "../product/product.model";

export interface CartSummary {
    id: number;
    items: CartSummaryItem[]; 
    summary: Summary;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: ProductImages;
    slug: string;
}

export interface CartSummaryItem {
    id: number;
    quantity: number;
    product: Product;
    lineValue: number;
}

export interface Summary {
    grossValue: number;
}