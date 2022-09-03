import "reflect-metadata";
import express from "express";
import config from "config";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const port = config.get<number>("port");

app.use(express.json());

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`);
  routes(app);
});
