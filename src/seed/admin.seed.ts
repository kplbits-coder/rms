import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, UserRole } from "../entities/user.entity";

@Injectable()
export class AdminSeed implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createAdmin();
  }

  async createAdmin() {
    const adminExists = await this.userRepo.findOne({
      where: { email: "admin@restaurant.com" },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await this.userRepo.save({
        username: "Admin",
        email: "admin@restaurant.com",
        password: hashedPassword,
        role: UserRole.ADMIN,
      });

      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  }
}
