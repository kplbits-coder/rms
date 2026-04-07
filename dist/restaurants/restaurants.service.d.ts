import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
export interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone?: string;
    cuisine?: string;
    createdAt: string;
    updatedAt?: string;
}
export declare class RestaurantsService {
    private restaurants;
    private nextId;
    create(createRestaurantDto: CreateRestaurantDto): Restaurant;
    findAll(): Restaurant[];
    findOne(id: number): Restaurant;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Restaurant;
    remove(id: number): void;
}
