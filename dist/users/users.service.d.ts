import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(user: Partial<User>): Promise<Partial<User> & User>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
}
