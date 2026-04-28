import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "../entities/user.entity";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, password: string): Promise<Partial<import("../entities/user.entity").User> & import("../entities/user.entity").User>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: UserRole;
        };
    }>;
}
