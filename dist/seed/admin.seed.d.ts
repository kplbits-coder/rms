import { OnModuleInit } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class AdminSeed implements OnModuleInit {
    private userRepo;
    constructor(userRepo: Repository<User>);
    onModuleInit(): Promise<void>;
    createAdmin(): Promise<void>;
}
