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
export declare class TablesService {
    private tables;
    private nextId;
    create(createTableDto: CreateTableDto): Table;
    findAll(): Table[];
    findOne(id: number): Table;
    update(id: number, updateTableDto: UpdateTableDto): Table;
    remove(id: number): void;
    setTableStatus(tableId: number, status: string, currentOrderId?: number | null): void;
    releaseTable(tableId: number, currentOrderId: number): void;
}
