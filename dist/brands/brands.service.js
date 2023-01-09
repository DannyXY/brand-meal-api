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
const objection_1 = require("objection");
const addons_service_1 = require("../addons/addons.service");
const brand_addon_service_1 = require("./brand-addon.service");
let BrandsService = class BrandsService {
    constructor(modelClass, brandAddonService, addonService) {
        this.modelClass = modelClass;
        this.brandAddonService = brandAddonService;
        this.addonService = addonService;
    }
    findAll() {
        return this.modelClass.query();
    }
    findOne(id) {
        return this.modelClass.query().findById(id);
    }
    create(props, user) {
        if (user.role == "admin")
            throw new common_1.UnauthorizedException("Only admins are permitted to create brands");
        return this.modelClass.query().insert(props).returning("*");
    }
    update(id, props, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "admin")
                throw new common_1.UnauthorizedException("Only admins are permitted to update brands");
            const brand = yield this.modelClass
                .query()
                .patch(props)
                .where({ id })
                .returning("*")
                .first();
            if (!brand)
                throw new objection_1.NotFoundError("this brand does not exist");
            return this.modelClass
                .query()
                .patch(props)
                .where({ id })
                .returning("*")
                .first();
        });
    }
    delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "admin")
                throw new common_1.UnauthorizedException("Only admins are permitted to delete brands");
            const brand = yield this.modelClass
                .query()
                .where({ id })
                .returning("*")
                .first();
            if (!brand)
                throw new objection_1.NotFoundError("this brand does not exist");
            return objection_1.transaction(this.modelClass, (_, trx) => __awaiter(this, void 0, void 0, function* () {
                yield this.brandAddonService.deleteByBrandId(id).transacting(trx);
                return this.modelClass
                    .query()
                    .delete()
                    .where({ id })
                    .returning("*")
                    .first()
                    .transacting(trx);
            }));
        });
    }
    addAddon(id, props, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "admin")
                throw new common_1.UnauthorizedException("Only admins are permitted to create addons");
            const brand = yield this.modelClass
                .query()
                .where({ id })
                .returning("*")
                .first();
            if (!brand)
                throw new objection_1.NotFoundError("this brand does not exist");
            const addon = yield this.addonService.create(Object.assign({ brandId: id }, props));
            yield this.brandAddonService.create({ addonId: addon.id, brandId: id });
            return this.findOne(id);
        });
    }
    getAddons(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const brand = yield this.modelClass
                .query()
                .where({ id })
                .returning("*")
                .first()
                .eager("addons");
            return brand.addons;
        });
    }
    getSingleBrandAddon(brandId, addonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const addon = yield this.addonService.findOne(brandId, addonId);
            return addon;
        });
    }
    removeAddon(addonId, brandId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "admin")
                throw new common_1.UnauthorizedException("Only admins are permitted to remove addons");
            yield this.brandAddonService.deleteByAddonId(addonId);
            return this.addonService.delete(brandId, addonId);
        });
    }
    addCategory(brandId, category, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role == "admin")
                throw new common_1.UnauthorizedException("Only admins are permitted to remove addons");
            const brand = yield this.modelClass
                .query()
                .where({ id: brandId })
                .returning("*")
                .first();
            const newCategories = [...brand.categories, category];
            return this.modelClass
                .query()
                .patch({ categories: newCategories })
                .where({ id: brandId })
                .returning("*")
                .first();
        });
    }
};
BrandsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject("BrandModel")),
    __metadata("design:paramtypes", [Object, brand_addon_service_1.BrandAddonService,
        addons_service_1.AddonsService])
], BrandsService);
exports.BrandsService = BrandsService;
//# sourceMappingURL=brands.service.js.map