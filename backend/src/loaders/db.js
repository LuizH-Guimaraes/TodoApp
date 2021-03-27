const knex = require("knex");
const { Container } = require("typedi");
const dbConfig = require("../config/db.js");

module.exports = () => {
  console.log("Connecting in database");
  const dbInstance = knex(dbConfig); // Production
  Container.set("knex", dbInstance);
};
