const { Router } = require("express");
const RequestResponse = require("../utils/request_response");
const CrudService = require("../../services/crud");
const CRUDTemplate = require("../utils/template");
const PasswordUtilities = require("../../services/password");

module.exports = (app) => {
  const route = Router();

  app.use("/users", route);

  // Init
  const tableName = "tb_users";
  const requestResponse = new RequestResponse(tableName);
  const crudService = new CrudService(tableName);

  // Template
  CRUDTemplate(crudService, route, tableName, ["GET", "DELETE", "PATCH"]);

  // Specific post request
  route.post("/", async (req, res) => {
    const data = requestResponse.getData(req, res);
    // Crypt password
    const hashedPassword = PasswordUtilities.hash(data.password)
      .then((response) => response)
      .catch((err) => {
        res.json({
          error: true,
          message: `[PASSWORD - ${tableName}] Error`,
          result: err,
        });
      });
    return requestResponse.sendDbResult(
      res,
      crudService.create({ ...data, password: hashedPassword })
    );
  });
};
