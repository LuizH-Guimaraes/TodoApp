const config = require("./index.js");

module.exports = {
  client: "pg",
  connection:
    config.environment === "production" ? config.db.url : config.db.url_homolog,
  migrations: {
    directory: "../db/migrations",
    tableName: "tb_migrations",
  },
};
