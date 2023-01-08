import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { BrandsModule } from "./brands/brands.module";
import { AddonsModule } from "./addons/addons.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [DatabaseModule, BrandsModule, AddonsModule, AuthModule],
})
export class ApplicationModule {}
