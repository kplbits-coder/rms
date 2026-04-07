import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { TablesModule } from '../tables/tables.module';

@Module({
  imports: [RestaurantsModule, TablesModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
