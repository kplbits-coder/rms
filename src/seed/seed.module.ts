import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { AdminSeed } from "./admin.seed";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AdminSeed],
})
export class SeedModule {}
