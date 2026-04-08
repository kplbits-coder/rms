import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto, UpdateTableDto } from './tables.dto';
import { TableEntity } from '../entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<TableEntity> {
    if (createTableDto.number == null || createTableDto.seats == null) {
      throw new BadRequestException('Table number and seats are required.');
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

  findAll(): Promise<TableEntity[]> {
    return this.tableRepository.find();
  }

  async findOne(id: number): Promise<TableEntity> {
    const table = await this.tableRepository.findOneBy({ id });
    if (!table) {
      throw new NotFoundException('Table not found.');
    }
    return table;
  }

  async update(id: number, updateTableDto: UpdateTableDto): Promise<TableEntity> {
    const table = await this.findOne(id);

    if (updateTableDto.number != null) table.number = Number(updateTableDto.number);
    if (updateTableDto.seats != null) table.seats = Number(updateTableDto.seats);
    if (updateTableDto.location) table.location = updateTableDto.location;
    if (updateTableDto.status) table.status = updateTableDto.status;
    table.updatedAt = new Date();

    return this.tableRepository.save(table);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tableRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Table not found.');
    }
  }

  async setTableStatus(tableId: number, status: string, currentOrderId: number | null = null): Promise<void> {
    const table = await this.findOne(tableId);
    table.status = status;
    table.currentOrderId = currentOrderId;
    await this.tableRepository.save(table);
  }

  async releaseTable(tableId: number, currentOrderId: number): Promise<void> {
    const table = await this.findOne(tableId);
    if (table.currentOrderId === currentOrderId) {
      table.status = 'available';
      table.currentOrderId = null;
      await this.tableRepository.save(table);
    }
  }
}
