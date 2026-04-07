"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
let RestaurantsService = class RestaurantsService {
    constructor() {
        this.restaurants = [];
        this.nextId = 1;
    }
    create(createRestaurantDto) {
        if (!createRestaurantDto.name || !createRestaurantDto.address) {
            throw new common_1.BadRequestException('Name and address are required.');
        }
        const restaurant = {
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
    findAll() {
        return this.restaurants;
    }
    findOne(id) {
        const restaurant = this.restaurants.find(r => r.id === id);
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found.');
        }
        return restaurant;
    }
    update(id, updateRestaurantDto) {
        const restaurant = this.findOne(id);
        if (updateRestaurantDto.name)
            restaurant.name = updateRestaurantDto.name;
        if (updateRestaurantDto.address)
            restaurant.address = updateRestaurantDto.address;
        if (updateRestaurantDto.phone !== undefined)
            restaurant.phone = updateRestaurantDto.phone;
        if (updateRestaurantDto.cuisine !== undefined)
            restaurant.cuisine = updateRestaurantDto.cuisine;
        restaurant.updatedAt = new Date().toISOString();
        return restaurant;
    }
    remove(id) {
        const index = this.restaurants.findIndex(r => r.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException('Restaurant not found.');
        }
        this.restaurants.splice(index, 1);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)()
], RestaurantsService);
