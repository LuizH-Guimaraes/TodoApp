const { Router } = require("express");
const genericCrud = require("../../services/crud");

module.exports = (app) => {
  const route = Router();
  app.use("/users", route);
  genericCrud(route, "tb_users", "ALL");
};
