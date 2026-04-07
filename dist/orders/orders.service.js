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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const tables_service_1 = require("../tables/tables.service");
let OrdersService = class OrdersService {
    constructor(restaurantsService, tablesService) {
        this.restaurantsService = restaurantsService;
        this.tablesService = tablesService;
        this.orders = [];
        this.nextId = 1;
    }
    create(createOrderDto) {
        const { restaurantId, tableId, items, customerName, status } = createOrderDto;
        if (!restaurantId || !tableId || !Array.isArray(items) || items.length === 0) {
            throw new common_1.BadRequestException('restaurantId, tableId and at least one item are required.');
        }
        this.restaurantsService.findOne(restaurantId);
        const table = this.tablesService.findOne(tableId);
        if (table.status === 'occupied') {
            throw new common_1.ConflictException('Table is already occupied.');
        }
        const order = {
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
    findAll() {
        return this.orders;
    }
    findOne(id) {
        const order = this.orders.find(o => o.id === id);
        if (!order) {
            throw new common_1.NotFoundException('Order not found.');
        }
        return order;
    }
    update(id, updateOrderDto) {
        const order = this.findOne(id);
        if (updateOrderDto.items)
            order.items = updateOrderDto.items;
        if (updateOrderDto.customerName)
            order.customerName = updateOrderDto.customerName;
        if (updateOrderDto.status) {
            order.status = updateOrderDto.status;
            if (updateOrderDto.status === 'completed' || updateOrderDto.status === 'cancelled') {
                this.tablesService.releaseTable(order.tableId, order.id);
            }
        }
        order.updatedAt = new Date().toISOString();
        return order;
    }
    complete(id) {
        const order = this.findOne(id);
        if (order.status === 'completed') {
            throw new common_1.BadRequestException('Order is already completed.');
        }
        if (order.status === 'cancelled') {
            throw new common_1.BadRequestException('Cancelled orders cannot be completed.');
        }
        order.status = 'completed';
        order.updatedAt = new Date().toISOString();
        this.tablesService.releaseTable(order.tableId, order.id);
        return order;
    }
    remove(id) {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException('Order not found.');
        }
        const order = this.orders[index];
        this.tablesService.releaseTable(order.tableId, order.id);
        this.orders.splice(index, 1);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService,
        tables_service_1.TablesService])
], OrdersService);
