import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../entities/order.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { TableEntity } from '../entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, RestaurantEntity, TableEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
