import { Repository } from 'typeorm';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';
export declare class RestaurantsService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: Repository<RestaurantEntity>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity>;
    findAll(): Promise<RestaurantEntity[]>;
    findOne(id: number): Promise<RestaurantEntity>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantEntity>;
    remove(id: number): Promise<void>;
}
