export class CreateOrderDto {
  restaurantId: number;
  tableId: number;
  items: any[];
  customerName?: string;
  status?: string;
}

export class UpdateOrderDto {
  items?: any[];
  customerName?: string;
  status?: string;
}
