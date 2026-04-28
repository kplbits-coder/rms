import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { MenusModule } from "./menus/menus.module";
import { TablesModule } from "./tables/tables.module";
import { OrdersModule } from "./orders/orders.module";
import { RestaurantEntity } from "./entities/restaurant.entity";
import { MenuEntity } from "./entities/menu.entity";
import { TableEntity } from "./entities/table.entity";
import { OrderEntity } from "./entities/order.entity";
import { SeedModule } from "./seed/seed.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: false,
    }),
    RestaurantsModule,
    MenusModule,
    TablesModule,
    OrdersModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
