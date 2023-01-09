import { BrandsService } from "./brands.service";
import { UserModel } from "../database/models/user.model";
import { BrandDto, UpdateCat } from "./brand.dto";
import { AddonDto } from "../addons/addon.dto";
export declare class BrandsController {
    private brandsService;
    constructor(brandsService: BrandsService);
    findAll(): Promise<import("../database/models/brand.model").BrandModel[]>;
    findOne(id: number): Promise<import("../database/models/brand.model").BrandModel>;
    create(props: BrandDto, user: UserModel): Promise<import("../database/models/brand.model").BrandModel>;
    delete(id: number, user: UserModel): Promise<import("../database/models/brand.model").BrandModel>;
    addCategory(id: number, props: UpdateCat, user: UserModel): Promise<import("../database/models/brand.model").BrandModel>;
    getBrandAddons(id: number): Promise<import("../database/models/addon.model").AddonModel[]>;
    createAddon(id: number, props: AddonDto, user: UserModel): Promise<import("../database/models/brand.model").BrandModel>;
    getSingleAddon(brandId: number, addonId: number): Promise<import("../database/models/addon.model").AddonModel>;
    deleteSingleAddon(brandId: number, addonId: number, user: UserModel): Promise<import("../database/models/addon.model").AddonModel>;
}
