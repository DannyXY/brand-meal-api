import { ModelClass } from "objection";
import { BrandAddonModel } from "src/database/models/brand-addon.model";
export declare class BrandAddonService {
    private modelClass;
    constructor(modelClass: ModelClass<BrandAddonModel>);
    create(props: Partial<BrandAddonModel>): import("objection").QueryBuilder<BrandAddonModel, BrandAddonModel, BrandAddonModel>;
    delete(props: Partial<BrandAddonModel>): Promise<BrandAddonModel>;
    findAll(): import("objection").QueryBuilder<BrandAddonModel, BrandAddonModel[], BrandAddonModel[]>;
    deleteByBrandId(brandId: number): import("objection").QueryBuilderYieldingOneOrNone<BrandAddonModel>;
    deleteByAddonId(addonId: number): import("objection").QueryBuilderYieldingOneOrNone<BrandAddonModel>;
}
