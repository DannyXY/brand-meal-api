import { ModelClass } from "objection";
import { AddonsService } from "../addons/addons.service";
import { AddonModel } from "src/database/models/addon.model";
import { BrandModel } from "src/database/models/brand.model";
import { BrandAddonService } from "./brand-addon.service";
import { UserModel } from "src/database/models/user.model";
export declare class BrandsService {
    private modelClass;
    private brandAddonService;
    private addonService;
    constructor(modelClass: ModelClass<BrandModel>, brandAddonService: BrandAddonService, addonService: AddonsService);
    findAll(): import("objection").QueryBuilder<BrandModel, BrandModel[], BrandModel[]>;
    findOne(id: number): import("objection").QueryBuilderYieldingOneOrNone<BrandModel>;
    create(props: Partial<BrandModel>, user: UserModel): import("objection").QueryBuilder<BrandModel, BrandModel, BrandModel>;
    update(id: number, props: Partial<BrandModel>, user: UserModel): Promise<BrandModel>;
    delete(id: number, user: UserModel): Promise<BrandModel>;
    addAddon(id: number, props: Partial<AddonModel>, user: UserModel): Promise<BrandModel>;
    getAddons(id: number): Promise<AddonModel[]>;
    getSingleBrandAddon(brandId: number, addonId: number): Promise<AddonModel>;
    removeAddon(addonId: number, brandId: number, user: UserModel): Promise<AddonModel>;
    addCategory(brandId: number, category: string, user: UserModel): Promise<BrandModel>;
}
