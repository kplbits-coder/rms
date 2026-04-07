import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
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

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  constructor(
    private restaurantsService: RestaurantsService,
    private tablesService: TablesService
  ) {}

  create(createOrderDto: CreateOrderDto): Order {
    const { restaurantId, tableId, items, customerName, status } = createOrderDto;

    if (!restaurantId || !tableId || !Array.isArray(items) || items.length === 0) {
      throw new BadRequestException('restaurantId, tableId and at least one item are required.');
    }

    this.restaurantsService.findOne(restaurantId);
    const table = this.tablesService.findOne(tableId);

    if (table.status === 'occupied') {
      throw new ConflictException('Table is already occupied.');
    }

    const order: Order = {
      id: this.nextId++,
      restaurantId,
      tableId,
      items,
      customerName: customerName || 'Guest',
      status: status || 'pending',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    this.tablesService.setTableStatus(tableId, 'occupied', order.id);
    return order;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: number): Order {
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const order = this.findOne(id);

    if (updateOrderDto.items) order.items = updateOrderDto.items;
    if (updateOrderDto.customerName) order.customerName = updateOrderDto.customerName;
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
      if (updateOrderDto.status === 'completed' || updateOrderDto.status === 'cancelled') {
        this.tablesService.releaseTable(order.tableId, order.id);
      }
    }
    order.updatedAt = new Date().toISOString();

    return order;
  }

  complete(id: number): Order {
    const order = this.findOne(id);

    if (order.status === 'completed') {
      throw new BadRequestException('Order is already completed.');
    }
    if (order.status === 'cancelled') {
      throw new BadRequestException('Cancelled orders cannot be completed.');
    }

    order.status = 'completed';
    order.updatedAt = new Date().toISOString();
    this.tablesService.releaseTable(order.tableId, order.id);

    return order;
  }

  remove(id: number): void {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new NotFoundException('Order not found.');
    }

    const order = this.orders[index];
    this.tablesService.releaseTable(order.tableId, order.id);
    this.orders.splice(index, 1);
  }
}
