import { BaseModel } from "./base.model";
export declare class AddonModel extends BaseModel {
    static tableName: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    brandId: number;
}
