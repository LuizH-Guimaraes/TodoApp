const jwt = require("jsonwebtoken");
const { Container } = require("typedi");
const PasswordUtilities = require("../services/password");
const { session } = require("../config");

class sessionService {
  constructor() {
    this.knex = Container.get("knex");
  }

  async login(data) {
    const user = await this.knex("tb_users")
      .select()
      .where({ email: data.email })
      .first();
    if (
      user &&
      data &&
      PasswordUtilities.verify(data.password, user.password)
    ) {
      const token = jwt.sign({ id: user.id }, session.secret);
      return token;
    } else {
      return false;
    }
  }
}

module.exports = sessionService;
