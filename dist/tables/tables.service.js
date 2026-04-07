"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesService = void 0;
const common_1 = require("@nestjs/common");
let TablesService = class TablesService {
    constructor() {
        this.tables = [];
        this.nextId = 1;
    }
    create(createTableDto) {
        if (createTableDto.number == null || createTableDto.seats == null) {
            throw new common_1.BadRequestException('Table number and seats are required.');
        }
        const table = {
            id: this.nextId++,
            number: Number(createTableDto.number),
            seats: Number(createTableDto.seats),
            location: createTableDto.location || 'General',
            status: 'available',
            currentOrderId: null,
            createdAt: new Date().toISOString(),
        };
        this.tables.push(table);
        return table;
    }
    findAll() {
        return this.tables;
    }
    findOne(id) {
        const table = this.tables.find(t => t.id === id);
        if (!table) {
            throw new common_1.NotFoundException('Table not found.');
        }
        return table;
    }
    update(id, updateTableDto) {
        const table = this.findOne(id);
        if (updateTableDto.number != null)
            table.number = Number(updateTableDto.number);
        if (updateTableDto.seats != null)
            table.seats = Number(updateTableDto.seats);
        if (updateTableDto.location)
            table.location = updateTableDto.location;
        if (updateTableDto.status)
            table.status = updateTableDto.status;
        table.updatedAt = new Date().toISOString();
        return table;
    }
    remove(id) {
        const index = this.tables.findIndex(t => t.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException('Table not found.');
        }
        this.tables.splice(index, 1);
    }
    setTableStatus(tableId, status, currentOrderId = null) {
        const table = this.tables.find(t => t.id === tableId);
        if (table) {
            table.status = status;
            table.currentOrderId = currentOrderId;
        }
    }
    releaseTable(tableId, currentOrderId) {
        const table = this.tables.find(t => t.id === tableId);
        if (table && table.currentOrderId === currentOrderId) {
            table.status = 'available';
            table.currentOrderId = null;
        }
    }
};
exports.TablesService = TablesService;
exports.TablesService = TablesService = __decorate([
    (0, common_1.Injectable)()
], TablesService);
