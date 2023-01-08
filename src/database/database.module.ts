import { Global, Module } from "@nestjs/common";
import * as Knex from "knex";
import { knexSnakeCaseMappers, Model } from "objection";
import { AddonModel } from "./models/addon.model";
import { BrandAddonModel } from "./models/brand-addon.model";
import { BrandModel } from "./models/brand.model";
import { UserModel } from "./models/user.model";

const models = [AddonModel, BrandAddonModel, BrandModel, UserModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: "KnexConnection",
    useFactory: async () => {
      const knex = Knex({
        client: "pg",
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === "true",
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
