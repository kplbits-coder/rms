import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone?: string;
  cuisine?: string;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [];
  private nextId = 1;

  create(createRestaurantDto: CreateRestaurantDto): Restaurant {
    if (!createRestaurantDto.name || !createRestaurantDto.address) {
      throw new BadRequestException('Name and address are required.');
    }

    const restaurant: Restaurant = {
      id: this.nextId++,
      name: createRestaurantDto.name,
      address: createRestaurantDto.address,
      phone: createRestaurantDto.phone || null,
      cuisine: createRestaurantDto.cuisine || null,
      createdAt: new Date().toISOString(),
    };

    this.restaurants.push(restaurant);
    return restaurant;
  }

  findAll(): Restaurant[] {
    return this.restaurants;
  }

  findOne(id: number): Restaurant {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }
    return restaurant;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto): Restaurant {
    const restaurant = this.findOne(id);

    if (updateRestaurantDto.name) restaurant.name = updateRestaurantDto.name;
    if (updateRestaurantDto.address) restaurant.address = updateRestaurantDto.address;
    if (updateRestaurantDto.phone !== undefined) restaurant.phone = updateRestaurantDto.phone;
    if (updateRestaurantDto.cuisine !== undefined) restaurant.cuisine = updateRestaurantDto.cuisine;
    restaurant.updatedAt = new Date().toISOString();

    return restaurant;
  }

  remove(id: number): void {
    const index = this.restaurants.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException('Restaurant not found.');
    }
    this.restaurants.splice(index, 1);
  }
}
