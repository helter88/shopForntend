export interface Order{
   firstname: string;
   lastname: string;
   street: string;
   zipcode: string;
   city: string;
   email: string;
   phone: string;
   cartId: number;
}

export interface OrderSummary{
    id: number;
    placeDate: Date;
    status: string;
    grossValue: number;
}