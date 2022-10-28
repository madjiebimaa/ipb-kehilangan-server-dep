import { StatusCodes } from "http-status-codes";
import { UserRoles } from "../entities/user.entity";
import { NextFunction, Request, Response } from "express";

export const requireUserRole =
  (role: UserRoles) =>
  async (_: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals;
    if (user.role !== role)
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ message: `User role is not ${role}` });

    return next();
  };
