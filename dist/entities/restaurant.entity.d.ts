import { MenuEntity } from './menu.entity';
import { OrderEntity } from './order.entity';
export declare class RestaurantEntity {
    id: number;
    name: string;
    address: string;
    phone: string;
    cuisine: string;
    createdAt: Date;
    updatedAt: Date;
    menus: MenuEntity[];
    orders: OrderEntity[];
}
