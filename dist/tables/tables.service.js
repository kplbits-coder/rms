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
exports.TablesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const table_entity_1 = require("../entities/table.entity");
let TablesService = class TablesService {
    constructor(tableRepository) {
        this.tableRepository = tableRepository;
    }
    async create(createTableDto) {
        if (createTableDto.number == null || createTableDto.seats == null) {
            throw new common_1.BadRequestException('Table number and seats are required.');
        }
        const table = this.tableRepository.create({
            number: Number(createTableDto.number),
            seats: Number(createTableDto.seats),
            location: createTableDto.location || 'General',
            status: 'available',
            currentOrderId: null,
        });
        return this.tableRepository.save(table);
    }
    findAll() {
        return this.tableRepository.find();
    }
    async findOne(id) {
        const table = await this.tableRepository.findOneBy({ id });
        if (!table) {
            throw new common_1.NotFoundException('Table not found.');
        }
        return table;
    }
    async update(id, updateTableDto) {
        const table = await this.findOne(id);
        if (updateTableDto.number != null)
            table.number = Number(updateTableDto.number);
        if (updateTableDto.seats != null)
            table.seats = Number(updateTableDto.seats);
        if (updateTableDto.location)
            table.location = updateTableDto.location;
        if (updateTableDto.status)
            table.status = updateTableDto.status;
        table.updatedAt = new Date();
        return this.tableRepository.save(table);
    }
    async remove(id) {
        const result = await this.tableRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('Table not found.');
        }
    }
    async setTableStatus(tableId, status, currentOrderId = null) {
        const table = await this.findOne(tableId);
        table.status = status;
        table.currentOrderId = currentOrderId;
        await this.tableRepository.save(table);
    }
    async releaseTable(tableId, currentOrderId) {
        const table = await this.findOne(tableId);
        if (table.currentOrderId === currentOrderId) {
            table.status = 'available';
            table.currentOrderId = null;
            await this.tableRepository.save(table);
        }
    }
};
exports.TablesService = TablesService;
exports.TablesService = TablesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(table_entity_1.TableEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TablesService);
