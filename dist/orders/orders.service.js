"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const table_entity_1 = require("../entities/table.entity");
let OrdersService = class OrdersService {
    constructor(orderRepository, restaurantRepository, tableRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.tableRepository = tableRepository;
    }
    async create(createOrderDto) {
        const { restaurantId, tableId, items, customerName, status } = createOrderDto;
        if (!restaurantId || !tableId || !Array.isArray(items) || items.length === 0) {
            throw new common_1.BadRequestException('restaurantId, tableId and at least one item are required.');
        }
        const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found.');
        }
        const table = await this.tableRepository.findOneBy({ id: tableId });
        if (!table) {
            throw new common_1.NotFoundException('Table not found.');
        }
        if (table.status === 'occupied') {
            throw new common_1.ConflictException('Table is already occupied.');
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
    findAll() {
        return this.orderRepository.find();
    }
    async findOne(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException('Order not found.');
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        if (updateOrderDto.items)
            order.items = updateOrderDto.items;
        if (updateOrderDto.customerName)
            order.customerName = updateOrderDto.customerName;
        if (updateOrderDto.status) {
            order.status = updateOrderDto.status;
            if (updateOrderDto.status === 'completed' || updateOrderDto.status === 'cancelled') {
                await this.releaseTable(order.tableId, order.id);
            }
        }
        order.updatedAt = new Date();
        return this.orderRepository.save(order);
    }
    async complete(id) {
        const order = await this.findOne(id);
        if (order.status === 'completed') {
            throw new common_1.BadRequestException('Order is already completed.');
        }
        if (order.status === 'cancelled') {
            throw new common_1.BadRequestException('Cancelled orders cannot be completed.');
        }
        order.status = 'completed';
        order.updatedAt = new Date();
        const savedOrder = await this.orderRepository.save(order);
        await this.releaseTable(order.tableId, order.id);
        return savedOrder;
    }
    async remove(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException('Order not found.');
        }
        if (order.tableId) {
            await this.releaseTable(order.tableId, order.id);
        }
        await this.orderRepository.delete(id);
    }
    async releaseTable(tableId, currentOrderId) {
        const table = await this.tableRepository.findOneBy({ id: tableId });
        if (table && table.currentOrderId === currentOrderId) {
            table.status = 'available';
            table.currentOrderId = null;
            await this.tableRepository.save(table);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_entity_1.RestaurantEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(table_entity_1.TableEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
