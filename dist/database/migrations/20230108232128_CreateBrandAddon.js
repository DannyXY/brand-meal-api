"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tableName = "brand_addon";
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable(tableName, (t) => {
            t.increments();
            t.integer("addon_id").references("id").inTable("addons");
            t.integer("brand_id").references("id").inTable("brand");
            t.unique(["addon_id", "brand_id"]);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(tableName);
    });
}
exports.down = down;
//# sourceMappingURL=20230108232128_CreateBrandAddon.js.map