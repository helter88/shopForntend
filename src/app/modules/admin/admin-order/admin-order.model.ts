export interface AdminOrder{
    id: number,
    placeDate: Date,
    orderStatus: string,
    orderRows: Array<AdminOrderRow>
    grossValue: number,
    firstname: string,
    lastname: string,
    street: string,
    zipcode: string,
    city: string,
    email: string,
    phone: string,
    payment: AdminPayment
}

export interface AdminOrderRow{
    id: number,
    orderId: number,
    product: AdminProductDto,
    quantity: number,
    price: number,
    shipment: AdminShipmentDto
}

export interface AdminPayment{
    id: number,
    name: string,
    type: string,
    defaultPayment: boolean,
    note: string
}

export interface AdminProductDto{
    name: string
}

export interface AdminShipmentDto{
    name: string
}