import { User } from "./entities/user.entity";
import { __prod__ } from "./utils/constant";
import "reflect-metadata";
import { config as configDotEnv } from "dotenv";
import express from "express";
import config from "config";
import { routes } from "./routes";
import { deserializeUser } from "./middlewares/deserializeUser";
import { initializeDataSource } from "./utils/dataSource";
import { logger } from "./utils/logger";
import { logResources } from "./middlewares/logResources";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

configDotEnv();

const app = express();
const redis = new Redis({});
const redisStore = connectRedis(session);
const port = config.get<number>("port");

app.use(express.json());
app.use(deserializeUser);
app.use(logResources);
app.use(
  session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET as string,
    store: new redisStore({ client: redis, disableTouch: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      secure: __prod__, // cookie only works in https
      domain: "localhost",
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.listen(port, async () => {
  logger.info(`Application listening on http://localhost:${port}`);
  await initializeDataSource();
  routes(app);
});
