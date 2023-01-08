import * as Knex from "knex";

const tableName = "users";

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.text("email");
    t.text("password");
    t.text("role");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
