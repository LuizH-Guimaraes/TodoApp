const { Router } = require("express");
const { Container } = require("typedi");
const sessionService = require("../../services/session");

module.exports = (app) => {
  const route = Router();

  app.use("/session", route);

  route.post("/login", async (req, res) => {
    const data = req.body;

    // Threat no data
    if (!data)
      res
        .json({
          error: true,
          message: "Data for login is mandatory",
          result: "Error: Data for login is mandatory",
        })
        .status(400);

    const knex = Container.get("knex");
    const sessionServiceInstance = new sessionService(knex);
    const token = await sessionServiceInstance.login(data);

    if (!token) {
      res
        .json({
          error: true,
          message: "Login or password incorrect",
          result: "Error: Login or password incorrect",
        })
        .status(401);
    } else {
      res
        .json({
          error: false,
          message: "ok",
          result: token,
        })
        .status(200);
    }
  });
};
