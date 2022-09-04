import "reflect-metadata";
import express from "express";
import config from "config";
import { routes } from "./routes";
import { deserializeUser } from "./middlewares/deserializeUser";
import { initializeDataSource } from "./utils/data-source";
import { logger } from "./utils/logger";

const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Application listening on http://localhost:${port}`);
  await initializeDataSource();
  routes(app);
});
