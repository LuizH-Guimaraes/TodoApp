import type { Knex } from "knex";

exports.up = (knex: Knex): Promise<void> => {
  return knex.schema.createTable("tb_todo_task", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("description");
    table.boolean("is_completed").notNullable();
    table.date("deadline").notNullable();
    table.integer("todo_list_id").references("tb_todo_list.id");
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("tb_todo_task");
};
