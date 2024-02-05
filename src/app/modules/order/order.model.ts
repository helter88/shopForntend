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
}

export interface OrderSummary{
    id: number;
    placeDate: Date;
    status: string;
    grossValue: number;
}

export interface InitData{
    shipments: Shipment[];
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