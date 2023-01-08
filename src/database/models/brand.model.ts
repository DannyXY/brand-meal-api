import { BaseModel } from "./base.model";
import { AddonModel } from "./addon.model";
import { Model } from "objection";

export class BrandModel extends BaseModel {
  static tableName = "brand";

  name: string;
  addons: AddonModel[];
  categories: string[];

  static relationMappings = {
    addons: {
      modelClass: `${__dirname}/addon.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: "brand.id",
        through: {
          from: "brand_addon.brandId",
          to: "brand_addon.addonId",
        },
        to: "addons.id",
      },
    },
  };
}
