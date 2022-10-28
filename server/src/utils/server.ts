import "reflect-metadata";
import express from "express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { insertRedisClient } from "../middlewares/insertRedisClient";
import { __prod__ } from "../utils/constant";
import { config } from "dotenv";
import { routes } from "../routes";
import { deserializeUser } from "../middlewares/deserializeUser";
import { logResources } from "../middlewares/logResources";
import { initializeRedis } from "./redis";

config();

export function createServer() {
  const app = express();
  const redis = initializeRedis();

  const redisStore = connectRedis(session);

  app.use(express.json());
  app.use(deserializeUser);
  app.use(logResources);
  app.use(insertRedisClient(redis));
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

  routes(app);

  return app;
}
