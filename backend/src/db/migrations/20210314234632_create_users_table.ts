import type { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable("tb_users", (table) => {
    table.increments("id").primary();
    table.string("username", 30).notNullable().unique();
    table.string("email", 150).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("name", 255).notNullable();
    table.boolean("is_admin").notNullable().defaultTo(false);
    table.boolean("is_verified").notNullable().defaultTo(false);
    table.timestamp("last_login").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("tb_users");
};
