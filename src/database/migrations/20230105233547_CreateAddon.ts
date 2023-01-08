import * as Knex from "knex";

const tableName = "addons";

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.text("name");
    t.text("description");
    t.integer("price");
    t.text("category");
    t.integer("brand_id").references("id").inTable("brand");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
