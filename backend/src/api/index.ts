import { Router } from "express";
import statusRoute from "./routes/status";
import usersRoute from "./routes/users";
import sessionRoute from "./routes/session";

export default (): Router => {
  const app = Router();
  statusRoute(app);
  usersRoute(app);
  sessionRoute(app);
  return app;
};
