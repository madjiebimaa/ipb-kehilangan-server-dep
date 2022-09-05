import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const logResources = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  return next();
};
