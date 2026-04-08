import { Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';
import { MenuEntity } from '../entities/menu.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';
export declare class MenusService {
    private readonly menuRepository;
    private readonly restaurantRepository;
    constructor(menuRepository: Repository<MenuEntity>, restaurantRepository: Repository<RestaurantEntity>);
    create(restaurantId: number, createMenuDto: CreateMenuDto): Promise<MenuEntity>;
    findByRestaurant(restaurantId: number): Promise<MenuEntity[]>;
    update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): Promise<MenuEntity>;
    remove(restaurantId: number, menuId: number): Promise<void>;
}
