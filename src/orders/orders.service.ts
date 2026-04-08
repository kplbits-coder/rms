import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { OrderEntity } from '../entities/order.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { TableEntity } from '../entities/table.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const { restaurantId, tableId, items, customerName, status } = createOrderDto;

    if (!restaurantId || !tableId || !Array.isArray(items) || items.length === 0) {
      throw new BadRequestException('restaurantId, tableId and at least one item are required.');
    }

    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (!table) {
      throw new NotFoundException('Table not found.');
    }

    if (table.status === 'occupied') {
      throw new ConflictException('Table is already occupied.');
    }

    const order = this.orderRepository.create({
      restaurant,
      restaurantId,
      table,
      tableId,
      items,
      customerName: customerName || 'Guest',
      status: status || 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);
    await this.tableRepository.save({ ...table, status: 'occupied', currentOrderId: savedOrder.id });
    return savedOrder;
  }

  findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    const order = await this.findOne(id);

    if (updateOrderDto.items) order.items = updateOrderDto.items;
    if (updateOrderDto.customerName) order.customerName = updateOrderDto.customerName;
    if (updateOrderDto.status) {
      order.status = updateOrderDto.status;
      if (updateOrderDto.status === 'completed' || updateOrderDto.status === 'cancelled') {
        await this.releaseTable(order.tableId, order.id);
      }
    }

    order.updatedAt = new Date();
    return this.orderRepository.save(order);
  }

  async complete(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    if (order.status === 'completed') {
      throw new BadRequestException('Order is already completed.');
    }
    if (order.status === 'cancelled') {
      throw new BadRequestException('Cancelled orders cannot be completed.');
    }

    order.status = 'completed';
    order.updatedAt = new Date();
    const savedOrder = await this.orderRepository.save(order);
    await this.releaseTable(order.tableId, order.id);

    return savedOrder;
  }

  async remove(id: number): Promise<void> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    if (order.tableId) {
      await this.releaseTable(order.tableId, order.id);
    }

    await this.orderRepository.delete(id);
  }

  private async releaseTable(tableId: number, currentOrderId: number): Promise<void> {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (table && table.currentOrderId === currentOrderId) {
      table.status = 'available';
      table.currentOrderId = null;
      await this.tableRepository.save(table);
    }
  }
}
