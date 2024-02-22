export interface AdminProductUpdate {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    price: number;
    discountPrice: number;
    currency: string;
    image: string;
    slug: string;
}

export interface UploadResponse {
    fileName: string;
}