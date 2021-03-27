const { Router } = require("express");

module.exports = (app) => {
  const route = Router();
  app.use("/status", route);
  route.get("/", (req, res) => {
    res.json().status(200);
  });
};
