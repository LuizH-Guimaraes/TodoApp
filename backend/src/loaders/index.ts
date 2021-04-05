import expressLoader from "./express";
import dbLoader from "./db";
import type { Express } from "express";

export default (app: Express): void => {
  dbLoader();
  expressLoader(app);
};
