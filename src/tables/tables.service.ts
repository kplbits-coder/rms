import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTableDto, UpdateTableDto } from './tables.dto';

export interface Table {
  id: number;
  number: number;
  seats: number;
  location: string;
  status: string;
  currentOrderId: number | null;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class TablesService {
  private tables: Table[] = [];
  private nextId = 1;

  create(createTableDto: CreateTableDto): Table {
    if (createTableDto.number == null || createTableDto.seats == null) {
      throw new BadRequestException('Table number and seats are required.');
    }

    const table: Table = {
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

  findAll(): Table[] {
    return this.tables;
  }

  findOne(id: number): Table {
    const table = this.tables.find(t => t.id === id);
    if (!table) {
      throw new NotFoundException('Table not found.');
    }
    return table;
  }

  update(id: number, updateTableDto: UpdateTableDto): Table {
    const table = this.findOne(id);

    if (updateTableDto.number != null) table.number = Number(updateTableDto.number);
    if (updateTableDto.seats != null) table.seats = Number(updateTableDto.seats);
    if (updateTableDto.location) table.location = updateTableDto.location;
    if (updateTableDto.status) table.status = updateTableDto.status;
    table.updatedAt = new Date().toISOString();

    return table;
  }

  remove(id: number): void {
    const index = this.tables.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException('Table not found.');
    }
    this.tables.splice(index, 1);
  }

  setTableStatus(tableId: number, status: string, currentOrderId: number | null = null): void {
    const table = this.tables.find(t => t.id === tableId);
    if (table) {
      table.status = status;
      table.currentOrderId = currentOrderId;
    }
  }

  releaseTable(tableId: number, currentOrderId: number): void {
    const table = this.tables.find(t => t.id === tableId);
    if (table && table.currentOrderId === currentOrderId) {
      table.status = 'available';
      table.currentOrderId = null;
    }
  }
}
