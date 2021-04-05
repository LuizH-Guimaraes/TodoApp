import knex from "knex";
import { Container } from "typedi";
import dbConfig from "../config/db";

export default (): void => {
  console.log("Connecting in database");
  const dbInstance = knex(dbConfig); // Production
  Container.set("knex", dbInstance);
};
