import { SafeUrl } from "@angular/platform-browser";

export interface AdminCategory {
    id: number;
    name: string;
}

export interface FileHandler {
    file: File;
    url: SafeUrl;
}

export interface ImageDto {
    id: number;
    filename: string;
    filetype: string;
    base64: string;
}

export interface AdminProduct {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    discountPrice: number;
    currency: string;
    slug: string;
    images: ImageDto[];
}