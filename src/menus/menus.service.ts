import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './menus.dto';
import { MenuEntity } from '../entities/menu.entity';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async create(restaurantId: number, createMenuDto: CreateMenuDto): Promise<MenuEntity> {
    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    if (!createMenuDto.title || createMenuDto.price == null) {
      throw new BadRequestException('Title and price are required.');
    }

    const menu = this.menuRepository.create({
      ...createMenuDto,
      category: createMenuDto.category || 'Main',
      restaurant,
      restaurantId,
    });

    return this.menuRepository.save(menu);
  }

  async findByRestaurant(restaurantId: number): Promise<MenuEntity[]> {
    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    return this.menuRepository.find({ where: { restaurantId } });
  }

  async update(restaurantId: number, menuId: number, updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    const menu = await this.menuRepository.findOne({
      where: { id: menuId, restaurantId },
    });

    if (!menu) {
      throw new NotFoundException('Menu item not found.');
    }

    Object.assign(menu, updateMenuDto, { updatedAt: new Date() });
    return this.menuRepository.save(menu);
  }

  async remove(restaurantId: number, menuId: number): Promise<void> {
    const restaurant = await this.restaurantRepository.findOneBy({ id: restaurantId });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    const result = await this.menuRepository.delete({ id: menuId, restaurantId });
    if (result.affected === 0) {
      throw new NotFoundException('Menu item not found.');
    }
  }
}
