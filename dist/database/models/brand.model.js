"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class BrandModel extends base_model_1.BaseModel {
}
BrandModel.tableName = "brand";
BrandModel.relationMappings = {
    addons: {
        modelClass: `${__dirname}/addon.model`,
        relation: objection_1.Model.ManyToManyRelation,
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
exports.BrandModel = BrandModel;
//# sourceMappingURL=brand.model.js.map