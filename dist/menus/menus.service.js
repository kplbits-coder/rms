"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const restaurants_service_1 = require("../restaurants/restaurants.service");
let MenusService = class MenusService {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
        this.menus = [];
        this.nextId = 1;
    }
    create(restaurantId, createMenuDto) {
        this.restaurantsService.findOne(restaurantId);
        if (!createMenuDto.title || createMenuDto.price == null) {
            throw new common_1.BadRequestException('Title and price are required.');
        }
        const menu = {
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
    findByRestaurant(restaurantId) {
        this.restaurantsService.findOne(restaurantId);
        return this.menus.filter(m => m.restaurantId === restaurantId);
    }
    update(restaurantId, menuId, updateMenuDto) {
        this.restaurantsService.findOne(restaurantId);
        const menu = this.menus.find(m => m.id === menuId && m.restaurantId === restaurantId);
        if (!menu) {
            throw new common_1.NotFoundException('Menu item not found.');
        }
        if (updateMenuDto.title)
            menu.title = updateMenuDto.title;
        if (updateMenuDto.description !== undefined)
            menu.description = updateMenuDto.description;
        if (updateMenuDto.price != null)
            menu.price = Number(updateMenuDto.price);
        if (updateMenuDto.category)
            menu.category = updateMenuDto.category;
        menu.updatedAt = new Date().toISOString();
        return menu;
    }
    remove(restaurantId, menuId) {
        this.restaurantsService.findOne(restaurantId);
        const index = this.menus.findIndex(m => m.id === menuId && m.restaurantId === restaurantId);
        if (index === -1) {
            throw new common_1.NotFoundException('Menu item not found.');
        }
        this.menus.splice(index, 1);
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], MenusService);
