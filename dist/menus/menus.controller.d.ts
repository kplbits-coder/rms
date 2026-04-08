import { MenusService } from './menus.service';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    findByRestaurant(restaurantId: number): Promise<import("../entities/menu.entity").MenuEntity[]>;
    create(restaurantId: number, createMenuDto: CreateMenuDto): Promise<import("../entities/menu.entity").MenuEntity>;
    update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): Promise<import("../entities/menu.entity").MenuEntity>;
    remove(restaurantId: number, menuId: number): Promise<{}>;
}
