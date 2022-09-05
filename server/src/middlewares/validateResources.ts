import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { logger } from "../utils/logger";

export const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req;
      schema.parse({ body, query, params });
      return next();
    } catch (err: any) {
      logger.error("Error location is validateResource middleware:", err);
      return res.status(StatusCodes.BAD_REQUEST).send({ message: err.errors });
    }
  };
