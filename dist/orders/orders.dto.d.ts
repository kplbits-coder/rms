export declare class CreateOrderDto {
    restaurantId: number;
    tableId: number;
    items: any[];
    customerName?: string;
    status?: string;
}
export declare class UpdateOrderDto {
    items?: any[];
    customerName?: string;
    status?: string;
}
