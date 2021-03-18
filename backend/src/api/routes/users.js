const { Router } = require("express");
const genericCrud = require("./generic/crud");

module.exports = (app) => {
  const route = Router();
  app.use("/users", route);
  genericCrud(route, "tb_users");
};
