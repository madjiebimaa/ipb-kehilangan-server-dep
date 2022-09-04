import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, query, params } = req;
      schema.parse({ body, query, params });
      next();
    } catch (err: any) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: err.errors });
    }
  };
