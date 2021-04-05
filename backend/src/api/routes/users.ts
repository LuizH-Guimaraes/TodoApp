import { Router, Express } from "express";
import { getData, sendDbResult } from "../utils/request_response";
import CrudService from "../../services/crud";
import CRUDTemplate from "../utils/template";
import PasswordUtilities from "../../services/password";

export default (app: Express): void => {
  const route = Router();

  app.use("/users", route);

  // Init
  const tableName = "tb_users";
  const crudService = new CrudService(tableName);

  // Template
  CRUDTemplate(crudService, route, tableName, ["GET", "DELETE", "PATCH"]);

  // Specific post request
  route.post("/", async (req, res) => {
    const data: Record<string, unknown> = getData(req, res, tableName);
    // Crypt password
    if (typeof data.password === "string") {
      const hashedPassword = PasswordUtilities.hash(data.password)
        .then((response) => response)
        .catch((err) => {
          res.json({
            error: true,
            message: `[PASSWORD - ${tableName}] Error`,
            result: err,
          });
        });
      return sendDbResult(res, crudService.create({ ...data, password: hashedPassword }), tableName);
    }
    // TODO: fix message
    return res.json({ error: true, message: "" });
  });
};
