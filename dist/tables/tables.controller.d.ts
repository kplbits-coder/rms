import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './tables.dto';
export declare class TablesController {
    private readonly tablesService;
    constructor(tablesService: TablesService);
    findAll(): import("./tables.service").Table[];
    create(createTableDto: CreateTableDto): import("./tables.service").Table;
    findOne(id: number): import("./tables.service").Table;
    update(id: number, updateTableDto: UpdateTableDto): import("./tables.service").Table;
    remove(id: number): {};
}
