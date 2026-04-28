import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
    }): Promise<Partial<import("../entities/user.entity").User> & import("../entities/user.entity").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            role: import("../entities/user.entity").UserRole;
        };
    }>;
}
