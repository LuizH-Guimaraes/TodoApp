const { Router } = require("express");
const statusRoute = require("./routes/status");
const usersRoute = require("./routes/users");

module.exports = () => {
  const app = Router();
  statusRoute(app);
  usersRoute(app);
  return app;
};
