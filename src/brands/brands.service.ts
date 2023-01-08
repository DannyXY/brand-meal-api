import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ModelClass, NotFoundError, transaction } from "objection";
import { AddonsService } from "../addons/addons.service";
import { AddonModel } from "src/database/models/addon.model";
import { BrandModel } from "src/database/models/brand.model";
import { BrandAddonService } from "./brand-addon.service";
import { UserModel } from "src/database/models/user.model";

@Injectable()
export class BrandsService {
  constructor(
    @Inject("BrandModel") private modelClass: ModelClass<BrandModel>,
    private brandAddonService: BrandAddonService,
    private addonService: AddonsService
  ) {}

  findAll() {
    return this.modelClass.query();
  }

  findOne(id: number) {
    return this.modelClass.query().findById(id);
  }

  create(props: Partial<BrandModel>, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to create brands"
      );
    return this.modelClass.query().insert(props).returning("*");
  }

  async update(id: number, props: Partial<BrandModel>, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to update brands"
      );
    const brand = await this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning("*")
      .first();
    if (!brand) throw new NotFoundError("this brand does not exist");
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning("*")
      .first();
  }

  async delete(id: number, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to delete brands"
      );
    const brand = await this.modelClass
      .query()
      .where({ id })
      .returning("*")
      .first();
    if (!brand) throw new NotFoundError("this brand does not exist");
    return transaction(this.modelClass, async (_, trx) => {
      await this.brandAddonService.deleteByBrandId(id).transacting(trx);

      return this.modelClass
        .query()
        .delete()
        .where({ id })
        .returning("*")
        .first()
        .transacting(trx);
    });
  }

  async addAddon(id: number, props: Partial<AddonModel>, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to create addons"
      );
    const brand = await this.modelClass
      .query()
      .where({ id })
      .returning("*")
      .first();
    if (!brand) throw new NotFoundError("this brand does not exist");
    const addon = await this.addonService.create({ brandId: id, ...props });
    await this.brandAddonService.create({ addonId: addon.id, brandId: id });
    return this.findOne(id);
  }

  async getAddons(id: number) {
    const brand = await this.modelClass
      .query()
      .where({ id })
      .returning("*")
      .first()
      .eager("addons");
    return brand.addons;
  }

  async getSingleBrandAddon(brandId: number, addonId: number) {
    const addon = await this.addonService.findOne(brandId, addonId);
    return addon;
  }

  async removeAddon(addonId: number, brandId: number, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to remove addons"
      );
    await this.brandAddonService.deleteByAddonId(addonId);
    return this.addonService.delete(brandId, addonId);
  }

  async addCategory(brandId: number, category: string, user: UserModel) {
    if (user.role == "admin")
      throw new UnauthorizedException(
        "Only admins are permitted to remove addons"
      );
    const brand = await this.modelClass
      .query()
      .where({ id: brandId })
      .returning("*")
      .first();
    const newCategories = [...brand.categories, category];

    return this.modelClass
      .query()
      .patch({ categories: newCategories })
      .where({ id: brandId })
      .returning("*")
      .first();
  }
}
