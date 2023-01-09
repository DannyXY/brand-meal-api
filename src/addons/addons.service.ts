import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ModelClass } from "objection";
import { AddonModel } from "src/database/models/addon.model";

@Injectable()
export class AddonsService {
  constructor(
    @Inject("AddonModel") private modelClass: ModelClass<AddonModel>
  ) {}
  create(props: Partial<AddonModel>) {
    return this.modelClass.query().insert(props).returning("*");
  }

  findAll() {
    return this.modelClass.query();
  }

  async updateAddon(
    addonId: number,
    brandId: number,
    props: Partial<AddonModel>
  ) {
    await this.findOne(brandId, addonId);
    return this.modelClass
      .query()
      .patch(props)
      .where({ id: addonId })
      .where({ brandId: brandId })
      .returning("*")
      .first();
  }

  async findOne(brandId: number, addonId: number) {
    const addon = await this.modelClass
      .query()
      .where({ id: addonId })
      .where({ brandId: brandId })
      .first()
      .returning("*");
    if (!addon) throw new NotFoundException("this addon does not exist");
    return addon;
  }

  async delete(brandId: number, addonId: number) {
    await this.findOne(brandId, addonId);

    return this.modelClass
      .query()
      .delete()
      .where({ id: addonId })
      .where({ brandId: brandId })
      .returning("*")
      .first();
  }
}
