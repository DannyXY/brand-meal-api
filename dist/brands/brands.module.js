"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const brands_service_1 = require("./brands.service");
const brands_controller_1 = require("./brands.controller");
const brand_addon_service_1 = require("./brand-addon.service");
const addons_module_1 = require("../addons/addons.module");
let BrandsModule = class BrandsModule {
};
BrandsModule = __decorate([
    common_1.Module({
        imports: [addons_module_1.AddonsModule],
        controllers: [brands_controller_1.BrandsController],
        providers: [brand_addon_service_1.BrandAddonService, brands_service_1.BrandsService],
        exports: [brand_addon_service_1.BrandAddonService, brands_service_1.BrandsService],
    })
], BrandsModule);
exports.BrandsModule = BrandsModule;
//# sourceMappingURL=brands.module.js.map