import { Page } from "src/app/shared/model/page";
import { Product } from "../product/product.model";

export interface Category {
    name: string;
    description: string;
    slug: string;
    products: Product[]
}

export interface CategoryProducts{
    category: Category, 
    products: Page<Product> }