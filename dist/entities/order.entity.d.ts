import { RestaurantEntity } from './restaurant.entity';
import { TableEntity } from './table.entity';
export declare class OrderEntity {
    id: number;
    items: any[];
    customerName: string;
    status: string;
    restaurant: RestaurantEntity;
    restaurantId: number;
    table: TableEntity;
    tableId: number;
    createdAt: Date;
    updatedAt: Date;
}
