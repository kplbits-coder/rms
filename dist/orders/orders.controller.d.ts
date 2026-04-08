import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<import("../entities/order.entity").OrderEntity[]>;
    create(createOrderDto: CreateOrderDto): Promise<import("../entities/order.entity").OrderEntity>;
    findOne(id: number): Promise<import("../entities/order.entity").OrderEntity>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<import("../entities/order.entity").OrderEntity>;
    complete(id: number): Promise<import("../entities/order.entity").OrderEntity>;
    remove(id: number): Promise<{}>;
}
