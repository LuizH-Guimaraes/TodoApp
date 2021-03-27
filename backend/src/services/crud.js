const { Container } = require("typedi");

class CrudService {
  constructor(tableName) {
    this.knex = Container.get("knex");
    this.tableName = tableName;
  }

  async get(id) {
    return await this.knex(this.tableName).where({ id }).select();
  }
  async list() {
    return await this.knex(this.tableName).select("*");
  }
  async create(data) {
    return await this.knex(this.tableName).insert(data);
  }
  async remove(id) {
    return await this.knex(this.tableName).where({ id }).select().delete();
  }
  async count() {
    return await this.knex(this.tableName).count();
  }
  async edit(data, id) {
    return await this.knex(this.tableName).where({ id }).select().update(data);
  }
}

module.exports = CrudService;
