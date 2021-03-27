const { Router } = require("express");
const CrudService = require("../../services/crud");
const Utils = require("./utils");

module.exports = (app) => {
  const route = Router();
  app.use("/users", route);

  const tableName = "tb_users";
  const crudService = new CrudService(tableName);
  const utils = new Utils(tableName);

  // route.get("/", async (req, res) => {
  //   return res.json(await crudService.list()).status(200);
  //   sendDbResult(res, );
  // });

  route.get("/", async (req, res) => {
    return utils.sendDbResult(res, crudService.list());
  });

  route.get("/count", async (req, res) => {
    return utils.sendDbResult(res, crudService.count());
  });

  route.get("/:id", (req, res) => {
    const id = utils.getParam(req, res, "id");
    return utils.sendDbResult(res, crudService.get(id));
  });

  route.post("/", (req, res) => {
    const data = utils.getData(req, res);
    return utils.sendDbResult(res, crudService.create(data));
  });

  route.post("/:id", (req, res) => {
    const id = utils.getParam("id");
    const data = utils.getData(req, res);
    return utils.sendDbResult(res, crudService.edit(data, id));
  });

  route.delete("/:id", (req, res) => {
    const id = utils.getParam(req, res, "id");
    return utils.sendDbResult(res, crudService.delete(id));
  });
};
