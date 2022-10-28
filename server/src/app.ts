import "reflect-metadata";
import config from "config";
import { __prod__ } from "./utils/constant";
import { initializeDataSource } from "./utils/dataSource";
import { logger } from "./utils/logger";
import { createServer } from "./utils/server";

const app = createServer();

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Application listening on http://localhost:${port}`);
  await initializeDataSource();
});
