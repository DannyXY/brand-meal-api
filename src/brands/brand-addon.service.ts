import { Inject, Injectable } from "@nestjs/common";
import { ModelClass } from "objection";
import { BrandAddonModel } from "src/database/models/brand-addon.model";

@Injectable()
export class BrandAddonService {
  constructor(
    @Inject("BrandAddonModel") private modelClass: ModelClass<BrandAddonModel>
  ) {}

  create(props: Partial<BrandAddonModel>) {
    return this.modelClass.query().insert(props).returning("*");
  }

  async delete(props: Partial<BrandAddonModel>) {
    return this.modelClass.query().delete().where(props).returning("*").first();
  }

  findAll() {
    return this.modelClass.query();
  }

  deleteByBrandId(brandId: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ id: brandId })
      .returning("*")
      .first();
  }

  deleteByAddonId(addonId: number) {
    return this.modelClass
      .query()
      .delete()
      .where({ addonId: addonId })
      .returning("*")
      .first();
  }
}
