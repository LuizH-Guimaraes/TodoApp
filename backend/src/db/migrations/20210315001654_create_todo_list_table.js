
exports.up = function(knex) {
    return knex.schema.createTable('tb_todo_list', (table) => {
        table.increments('id').primary()
        table.string('name', 50).notNullable()
        table.integer('user_id').references('tb_users.id')
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_todo_list')
};
