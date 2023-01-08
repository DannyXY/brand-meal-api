import { BaseModel } from "./base.model";

export class AddonModel extends BaseModel {
  static tableName = "addons";

  name: string;
  description?: string;

  price: number;
  category?: string;
  brandId: number;
}
