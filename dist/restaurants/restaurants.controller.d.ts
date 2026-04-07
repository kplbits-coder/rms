import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    findAll(): import("./restaurants.service").Restaurant[];
    create(createRestaurantDto: CreateRestaurantDto): import("./restaurants.service").Restaurant;
    findOne(id: number): import("./restaurants.service").Restaurant;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): import("./restaurants.service").Restaurant;
    remove(id: number): {};
}
