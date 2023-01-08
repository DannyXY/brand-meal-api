import { BaseModel } from "./base.model";

export class BrandAddonModel extends BaseModel {
  static tableName = "brand_addon";

  brandId: number;
  addonId: number;
}
