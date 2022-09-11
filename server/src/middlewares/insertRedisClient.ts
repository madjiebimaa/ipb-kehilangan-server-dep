import { NextFunction, Request, Response } from "express";
import { Redis } from "ioredis";

export const insertRedisClient =
  (redisClient: Redis) => (_: Request, res: Response, next: NextFunction) => {
    res.locals.redis = redisClient;
    next();
  };
