import { BaseModel } from "./base.model";
import { AddonModel } from "./addon.model";
export declare class BrandModel extends BaseModel {
    static tableName: string;
    name: string;
    addons: AddonModel[];
    categories: string[];
    static relationMappings: {
        addons: {
            modelClass: string;
            relation: import("objection").Relation;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
    };
}
