import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MenuEntity } from '../entities/menu.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, RestaurantEntity])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
