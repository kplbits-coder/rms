import { RestaurantsService } from '../restaurants/restaurants.service';
import { TablesService } from '../tables/tables.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
export interface Order {
    id: number;
    restaurantId: number;
    tableId: number;
    items: any[];
    customerName: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
}
export declare class OrdersService {
    private restaurantsService;
    private tablesService;
    private orders;
    private nextId;
    constructor(restaurantsService: RestaurantsService, tablesService: TablesService);
    create(createOrderDto: CreateOrderDto): Order;
    findAll(): Order[];
    findOne(id: number): Order;
    update(id: number, updateOrderDto: UpdateOrderDto): Order;
    complete(id: number): Order;
    remove(id: number): void;
}
