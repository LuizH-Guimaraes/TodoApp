import type { Response, Request, Router } from "express";
import { getData, getParam, sendDbResult } from "./request_response";
import JwtVerify from "../../middleware/jwt";
import CrudService from "../../services/crud";

export default (
  crudService: CrudService,
  route: Router,
  tableName: string,
  methods = ["GET", "POST", "PATCH", "DELETE"],
  authenticate = true
): void => {
  const middlewareFunction = authenticate
    ? JwtVerify
    : (req: Request, res: Response, next: () => void) => {
        next();
      };

  if (methods.includes("GET")) {
    route.get("/", middlewareFunction, async (req: Request, res: Response) => {
      return sendDbResult(res, crudService.list(), tableName);
    });

    route.get("/count", middlewareFunction, async (req: Request, res: Response) => {
      return sendDbResult(res, crudService.count(), tableName);
    });

    route.get("/:id", middlewareFunction, (req: Request, res: Response) => {
      const id = parseInt(getParam(req, res, "id", tableName), 10);
      return sendDbResult(res, crudService.get(id), tableName);
    });
  }

  if (methods.includes("POST")) {
    route.post("/", middlewareFunction, (req: Request, res: Response) => {
      const data = getData(req, res, tableName);
      return sendDbResult(res, crudService.create(data), tableName);
    });
  }

  if (methods.includes("PATCH")) {
    route.patch("/:id", middlewareFunction, (req: Request, res: Response) => {
      const id = getParam(req, res, "id", tableName);
      const data = getData(req, res, tableName);
      return sendDbResult(res, crudService.edit(data, id), tableName);
    });
  }

  if (methods.includes("DELETE")) {
    route.delete("/:id", middlewareFunction, (req: Request, res: Response) => {
      const id = parseInt(getParam(req, res, "id", tableName), 10);
      return sendDbResult(res, crudService.remove(id), tableName);
    });
  }
};
