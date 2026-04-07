import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RestaurantsModule, MenusModule, TablesModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
