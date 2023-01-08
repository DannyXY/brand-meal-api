import { Module } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";
import { BrandAddonService } from "./brand-addon.service";
import { AddonsModule } from "../addons/addons.module";

@Module({
  imports: [AddonsModule],
  controllers: [BrandsController],
  providers: [BrandAddonService, BrandsService],
  exports: [BrandAddonService, BrandsService],
})
export class BrandsModule {}
