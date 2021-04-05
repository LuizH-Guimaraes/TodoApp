import type { Express } from "express";
import cors from "cors";
import { json } from "express";
import routes from "../api";
import config from "../config";

export default (app: Express): void => {
  app.use(cors());
  app.use(json());
  app.use(config.api.prefix, routes());
};
