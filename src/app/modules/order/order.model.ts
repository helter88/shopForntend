export interface Order{
   firstname: string;
   lastname: string;
   street: string;
   zipcode: string;
   city: string;
   email: string;
   phone: string;
   cartId: number;
   shipmentId: number;
   paymentId: number;
}

export interface OrderSummary{
    id: number;
    placeDate: Date;
    status: string;
    grossValue: number;
    payment: Payment
}

export interface InitData{
    shipments: Shipment[];
    payments: Payment[];
}

export interface Shipment{
    id: number;
    name: string;
    price: number;
    type: ShipmentType;
    defaultShipment: boolean;
}

export enum ShipmentType{
    DELIVERMAN, SELFPICKUP 
}

export interface Payment{
    id: number;
    name: string;
    type: PaymentType;
    defaultPayment: boolean;
    note: string;
}

export enum PaymentType{
    BANK_TRANSFER
}