import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { OrderEntity } from '../entities/order.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { TableEntity } from '../entities/table.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly restaurantRepository;
    private readonly tableRepository;
    constructor(orderRepository: Repository<OrderEntity>, restaurantRepository: Repository<RestaurantEntity>, tableRepository: Repository<TableEntity>);
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findOne(id: number): Promise<OrderEntity>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    complete(id: number): Promise<OrderEntity>;
    remove(id: number): Promise<void>;
    private releaseTable;
}
