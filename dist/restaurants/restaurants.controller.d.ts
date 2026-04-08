import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(): Promise<import("../entities/restaurant.entity").RestaurantEntity[]>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<import("../entities/restaurant.entity").RestaurantEntity>;
    findOne(id: number): Promise<import("../entities/restaurant.entity").RestaurantEntity>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<import("../entities/restaurant.entity").RestaurantEntity>;
    remove(id: number): Promise<{}>;
}
