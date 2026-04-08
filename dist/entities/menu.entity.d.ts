import { RestaurantEntity } from './restaurant.entity';
export declare class MenuEntity {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    restaurant: RestaurantEntity;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}
