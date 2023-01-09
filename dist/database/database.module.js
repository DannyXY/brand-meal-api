"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Knex = require("knex");
const objection_1 = require("objection");
const addon_model_1 = require("./models/addon.model");
const brand_addon_model_1 = require("./models/brand-addon.model");
const brand_model_1 = require("./models/brand.model");
const user_model_1 = require("./models/user.model");
const models = [addon_model_1.AddonModel, brand_addon_model_1.BrandAddonModel, brand_model_1.BrandModel, user_model_1.UserModel];
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
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            const knex = Knex(Object.assign({ client: "pg", connection: process.env.DATABASE_URL, debug: process.env.KNEX_DEBUG === "true" }, objection_1.knexSnakeCaseMappers()));
            objection_1.Model.knex(knex);
            return knex;
        }),
    },
];
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [...providers],
        exports: [...providers],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map