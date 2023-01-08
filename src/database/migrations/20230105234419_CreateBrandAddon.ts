import * as Knex from "knex";

const tableName = "brand_addon";

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.integer("addon_id").references("id").inTable("addons");

    t.integer("brand_id").references("id").inTable("brand");

    t.unique(["addon_id", "brand_id"]);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
