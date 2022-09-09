import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
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
      console.log(err);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: err.errors[0].message });
    }
  };
