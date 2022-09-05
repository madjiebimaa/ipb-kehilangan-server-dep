import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

export const requireUser = (_: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (!user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "user does not have access" });
  }

  return next();
};
