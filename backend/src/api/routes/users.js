const { Router } = require("express");
const CrudService = require("../../services/crud");

module.exports = (app) => {
  const route = Router();
  app.use("/users", route);
  const CrudServiceInstance = new CrudService("tb_users");
  route.get("/", async (req, res) => {
    return res.json(await CrudServiceInstance.list()).status(200);
  });
};
