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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_1 = require("../auth/decorator/index");
const index_2 = require("../auth/guard/index");
const brands_service_1 = require("./brands.service");
const user_model_1 = require("../database/models/user.model");
const brand_dto_1 = require("./brand.dto");
const addon_dto_1 = require("../addons/addon.dto");
const swagger_1 = require("@nestjs/swagger");
let BrandsController = class BrandsController {
    constructor(brandsService) {
        this.brandsService = brandsService;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.findAll().eager("[addons]");
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield this.brandsService.findOne(id);
                yield note.$loadRelated("[addons]");
                return note;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(props, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.create(props, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.delete(id, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    addCategory(id, props, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.addCategory(id, props.category, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBrandAddons(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.getAddons(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createAddon(id, props, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.addAddon(id, props, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSingleAddon(brandId, addonId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.getSingleBrandAddon(brandId, addonId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteSingleAddon(brandId, addonId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.brandsService.removeAddon(addonId, brandId, user);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiTags("Brand"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    swagger_1.ApiTags("Brand"),
    __param(0, common_1.Param("id", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiTags("Brand"),
    __param(0, common_1.Body()), __param(1, index_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_dto_1.BrandDto, user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "create", null);
__decorate([
    common_1.Delete(":id"),
    swagger_1.ApiTags("Brand"),
    __param(0, common_1.Param("id", new common_1.ParseIntPipe())),
    __param(1, index_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "delete", null);
__decorate([
    common_1.Patch(":id/addon-categories"),
    swagger_1.ApiTags("Brand"),
    __param(0, common_1.Param("id", new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __param(2, index_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, brand_dto_1.UpdateCat,
        user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "addCategory", null);
__decorate([
    common_1.Get(":id/addons"),
    swagger_1.ApiTags("Addon"),
    __param(0, common_1.Param("id", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "getBrandAddons", null);
__decorate([
    common_1.Post(":id/addons"),
    swagger_1.ApiTags("Addon"),
    __param(0, common_1.Param("id", new common_1.ParseIntPipe())),
    __param(1, common_1.Body()),
    __param(2, index_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, addon_dto_1.AddonDto,
        user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "createAddon", null);
__decorate([
    common_1.Get(":brandId/addons/:addonId"),
    swagger_1.ApiTags("Addon"),
    __param(0, common_1.Param("brandId", new common_1.ParseIntPipe())),
    __param(1, common_1.Param("addonId", new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "getSingleAddon", null);
__decorate([
    common_1.Delete(":brandId/addons/:addonId"),
    swagger_1.ApiTags("Addon"),
    __param(0, common_1.Param("brandId", new common_1.ParseIntPipe())),
    __param(1, common_1.Param("addonId", new common_1.ParseIntPipe())),
    __param(2, index_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "deleteSingleAddon", null);
BrandsController = __decorate([
    common_1.UseGuards(index_2.JwtGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Controller("brands"),
    __metadata("design:paramtypes", [brands_service_1.BrandsService])
], BrandsController);
exports.BrandsController = BrandsController;
//# sourceMappingURL=brands.controller.js.map