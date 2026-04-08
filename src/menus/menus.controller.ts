import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';

@Controller('restaurants/:restaurantId/menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async findByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.menusService.findByRestaurant(restaurantId);
  }

  @Post()
  async create(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(restaurantId, createMenuDto);
  }

  @Put(':menuId')
  async update(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() updateMenuDto: UpdateMenuDto
  ) {
    return this.menusService.update(restaurantId, menuId, updateMenuDto);
  }

  @Delete(':menuId')
  async remove(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Param('menuId', ParseIntPipe) menuId: number
  ) {
    await this.menusService.remove(restaurantId, menuId);
    return {};
  }
}
