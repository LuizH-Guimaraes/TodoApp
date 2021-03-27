const { Router } = require("express");
const { Container } = require("typedi");
const genericCrud = require("../../services/crud");

module.exports = (app) => {
  const route = Router();
  app.use("/users", route);
  const knex = Container.get("knex");
  genericCrud(knex, route, "tb_users", "ALL");
};
