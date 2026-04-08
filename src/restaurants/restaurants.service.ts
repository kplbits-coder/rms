import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity> {
    if (!createRestaurantDto.name || !createRestaurantDto.address) {
      throw new BadRequestException('Name and address are required.');
    }

    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
    });

    return this.restaurantRepository.save(restaurant);
  }

  findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepository.findOneBy({ id });
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }
    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<RestaurantEntity> {
    const restaurant = await this.findOne(id);

    Object.assign(restaurant, updateRestaurantDto, { updatedAt: new Date() });
    return this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Restaurant not found.');
    }
  }
}
