import { Container } from "typedi";
import type { Knex } from "knex";

export default class CrudService {
  knex: Knex;
  tableName: string;

  constructor(tableName: string) {
    this.knex = Container.get("knex");
    this.tableName = tableName;
  }

  async get(id: number): Promise<Record<string, unknown>[]> {
    return await this.knex(this.tableName).where({ id }).select();
  }
  async list(): Promise<Record<string, unknown>[]> {
    return await this.knex(this.tableName).select("*");
  }
  async create(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return await this.knex(this.tableName).insert(data);
  }
  async remove(id: number): Promise<Record<string, unknown>> {
    return await this.knex(this.tableName).where({ id }).select().delete();
  }
  async count(): Promise<Record<string, unknown>> {
    return await this.knex(this.tableName).count();
  }
  async edit(data: Record<string, unknown>, id: number): Promise<Record<string, unknown>> {
    return await this.knex(this.tableName).where({ id }).select().update(data);
  }
}
