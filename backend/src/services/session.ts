import jwt from "jsonwebtoken";
import { Container } from "typedi";
import PasswordUtilities from "./password";
import type { Knex } from "knex";
import config from "../config";

const { session } = config;

type LoginInfo = {
  email: string;
  password: string;
};

class sessionService {
  knex: Knex;

  constructor() {
    this.knex = Container.get("knex");
  }

  async login(data: LoginInfo): Promise<string | boolean> {
    const user = await this.knex("tb_users").select().where({ email: data.email }).first();
    if (user && data && PasswordUtilities.verify(data.password, user.password)) {
      const token = jwt.sign({ id: user.id }, session.secret);
      return token;
    } else {
      return false;
    }
  }
}

export default sessionService;
