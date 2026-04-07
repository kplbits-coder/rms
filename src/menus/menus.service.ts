import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';

export interface Menu {
  id: number;
  restaurantId: number;
  title: string;
  description?: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class MenusService {
  private menus: Menu[] = [];
  private nextId = 1;

  constructor(private restaurantsService: RestaurantsService) {}

  create(restaurantId: number, createMenuDto: CreateMenuDto): Menu {
    this.restaurantsService.findOne(restaurantId);

    if (!createMenuDto.title || createMenuDto.price == null) {
      throw new BadRequestException('Title and price are required.');
    }

    const menu: Menu = {
      id: this.nextId++,
      restaurantId,
      title: createMenuDto.title,
      description: createMenuDto.description || null,
      price: Number(createMenuDto.price),
      category: createMenuDto.category || 'Main',
      createdAt: new Date().toISOString(),
    };

    this.menus.push(menu);
    return menu;
  }

  findByRestaurant(restaurantId: number): Menu[] {
    this.restaurantsService.findOne(restaurantId);
    return this.menus.filter(m => m.restaurantId === restaurantId);
  }

  update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): Menu {
    this.restaurantsService.findOne(restaurantId);
    const menu = this.menus.find(m => m.id === menuId && m.restaurantId === restaurantId);

    if (!menu) {
      throw new NotFoundException('Menu item not found.');
    }

    if (updateMenuDto.title) menu.title = updateMenuDto.title;
    if (updateMenuDto.description !== undefined) menu.description = updateMenuDto.description;
    if (updateMenuDto.price != null) menu.price = Number(updateMenuDto.price);
    if (updateMenuDto.category) menu.category = updateMenuDto.category;
    menu.updatedAt = new Date().toISOString();

    return menu;
  }

  remove(restaurantId: number, menuId: number): void {
    this.restaurantsService.findOne(restaurantId);
    const index = this.menus.findIndex(m => m.id === menuId && m.restaurantId === restaurantId);

    if (index === -1) {
      throw new NotFoundException('Menu item not found.');
    }

    this.menus.splice(index, 1);
  }
}
