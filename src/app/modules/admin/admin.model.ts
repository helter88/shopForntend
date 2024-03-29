export interface AdminProduct{
    id: number;
    name: string;
    image: string;
    price: string;
    discountPrice: string;
    currency: string;
}

export interface AdminCategory{
    id: number;
    name: string;
    description: string;
    slug: string;
}