export interface AdminProductUpdate {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    currency: string;
    image: string;
    slug: string;
}

export interface UploadResponse {
    fileName: string;
}