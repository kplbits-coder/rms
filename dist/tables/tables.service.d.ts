import { Repository } from 'typeorm';
import { CreateTableDto, UpdateTableDto } from './tables.dto';
import { TableEntity } from '../entities/table.entity';
export declare class TablesService {
    private readonly tableRepository;
    constructor(tableRepository: Repository<TableEntity>);
    create(createTableDto: CreateTableDto): Promise<TableEntity>;
    findAll(): Promise<TableEntity[]>;
    findOne(id: number): Promise<TableEntity>;
    update(id: number, updateTableDto: UpdateTableDto): Promise<TableEntity>;
    remove(id: number): Promise<void>;
    setTableStatus(tableId: number, status: string, currentOrderId?: number | null): Promise<void>;
    releaseTable(tableId: number, currentOrderId: number): Promise<void>;
}
