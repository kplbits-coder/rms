import { MenusService } from './menus.service';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    findByRestaurant(restaurantId: number): import("./menus.service").Menu[];
    create(restaurantId: number, createMenuDto: CreateMenuDto): import("./menus.service").Menu;
    update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): import("./menus.service").Menu;
    remove(restaurantId: number, menuId: number): {};
}
