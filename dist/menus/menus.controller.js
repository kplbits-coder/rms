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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const menus_service_1 = require("./menus.service");
const menus_dto_1 = require("./menus.dto");
let MenusController = class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }
    findByRestaurant(restaurantId) {
        return this.menusService.findByRestaurant(restaurantId);
    }
    create(restaurantId, createMenuDto) {
        return this.menusService.create(restaurantId, createMenuDto);
    }
    update(restaurantId, menuId, updateMenuDto) {
        return this.menusService.update(restaurantId, menuId, updateMenuDto);
    }
    remove(restaurantId, menuId) {
        this.menusService.remove(restaurantId, menuId);
        return {};
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findByRestaurant", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, menus_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':menuId'),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('menuId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, menus_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':menuId'),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('menuId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "remove", null);
exports.MenusController = MenusController = __decorate([
    (0, common_1.Controller)('restaurants/:restaurantId/menus'),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
