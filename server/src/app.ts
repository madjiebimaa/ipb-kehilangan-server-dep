import "reflect-metadata";
import express from "express";
import config from "config";
import { routes } from "./routes";
import { deserializeUser } from "./middlewares/deserializeUser";
import { initializeDataSource } from "./utils/dataSource";
import { logger } from "./utils/logger";
import { logResources } from "./middlewares/logResources";

const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);
app.use(logResources);

app.listen(port, async () => {
  logger.info(`Application listening on http://localhost:${port}`);
  await initializeDataSource();
  routes(app);
});
