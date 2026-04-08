import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './tables.dto';
export declare class TablesController {
    private readonly tablesService;
    constructor(tablesService: TablesService);
    findAll(): Promise<import("../entities/table.entity").TableEntity[]>;
    create(createTableDto: CreateTableDto): Promise<import("../entities/table.entity").TableEntity>;
    findOne(id: number): Promise<import("../entities/table.entity").TableEntity>;
    update(id: number, updateTableDto: UpdateTableDto): Promise<import("../entities/table.entity").TableEntity>;
    remove(id: number): Promise<{}>;
}
