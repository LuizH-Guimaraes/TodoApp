import { Router, Express, Response, Request } from "express";

export default (app: Express): void => {
  const route = Router();
  app.use("/status", route);
  route.get("/", (req: Request, res: Response) => {
    res.json().status(200);
  });
};
