const expressLoader = require("./express");
const dbLoader = require("./db");

module.exports = (app) => {
  dbLoader();
  expressLoader(app);
};
