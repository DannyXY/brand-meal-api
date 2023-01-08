import { ModelClass } from "objection";
import { AddonModel } from "src/database/models/addon.model";
export declare class AddonsService {
    private modelClass;
    constructor(modelClass: ModelClass<AddonModel>);
    create(props: Partial<AddonModel>): import("objection").QueryBuilder<AddonModel, AddonModel, AddonModel>;
    findAll(): import("objection").QueryBuilder<AddonModel, AddonModel[], AddonModel[]>;
    updateAddon(addonId: number, brandId: number, props: Partial<AddonModel>): Promise<AddonModel>;
    findOne(brandId: number, addonId: number): Promise<AddonModel>;
    delete(brandId: number, addonId: number): Promise<AddonModel>;
}
