import express from "express";
import type { Express } from "express";
import loaders from "./loaders";
import config from "./config";

const startServer = (port: number) => {
  const app: Express = express();

  loaders(app);

  app.listen(port, () => {
    console.log(`Node listening on port ${port}`);
  });
};

startServer(config.port || 8000);
