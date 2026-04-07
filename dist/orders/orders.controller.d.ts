import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): import("./orders.service").Order[];
    create(createOrderDto: CreateOrderDto): import("./orders.service").Order;
    findOne(id: number): import("./orders.service").Order;
    update(id: number, updateOrderDto: UpdateOrderDto): import("./orders.service").Order;
    complete(id: number): import("./orders.service").Order;
    remove(id: number): {};
}
