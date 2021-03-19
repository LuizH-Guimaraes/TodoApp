const { Router } = require("express");
const statusRoute = require("./routes/status");
const usersRoute = require("./routes/users");
const sessionRoute = require("./routes/session");

module.exports = () => {
  const app = Router();
  statusRoute(app);
  usersRoute(app);
  sessionRoute(app);
  return app;
};
