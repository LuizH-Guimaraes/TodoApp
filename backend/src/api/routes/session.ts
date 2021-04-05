import type { Express } from "express";
import { Router } from "express";
import sessionService from "../../services/session";

export default (app: Express): void => {
  const route = Router();

  app.use("/session", route);

  route.post("/login", async (req, res) => {
    const data = req.body;

    // Threat no data
    if (!data)
      res
        .json({ error: true, message: "Data for login is mandatory", result: "Error: Data for login is mandatory" })
        .status(400);

    const sessionServiceInstance = new sessionService();
    const token = await sessionServiceInstance.login(data);

    if (!token) {
      res
        .json({ error: true, message: "Login or password incorrect", result: "Error: Login or password incorrect" })
        .status(401);
    } else {
      res.json({ error: false, message: "ok", result: token }).status(200);
    }
  });
};
