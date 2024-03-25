export interface OrderListDto{
    id: number;
    placeDate: Date,
    orderStatus: string;
    grossValue: number;
}

export interface UserData{
    firstname: string;
    lastname: string;
    street: string;
    zipcode: string;
    city: string;
    email: string;
    phone: string;
}