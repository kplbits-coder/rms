import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';
export interface Menu {
    id: number;
    restaurantId: number;
    title: string;
    description?: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt?: string;
}
export declare class MenusService {
    private restaurantsService;
    private menus;
    private nextId;
    constructor(restaurantsService: RestaurantsService);
    create(restaurantId: number, createMenuDto: CreateMenuDto): Menu;
    findByRestaurant(restaurantId: number): Menu[];
    update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): Menu;
    remove(restaurantId: number, menuId: number): void;
}
