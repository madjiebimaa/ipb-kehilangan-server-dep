import { StatusCodes } from "http-status-codes";
import { UserRoles } from "./../entities/user.entity";
import { NextFunction, Request, Response } from "express";

export function requireAdminRole(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;
  if (user.role !== UserRoles.Admin) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "User role is not Admin" });
  }

  return next();
}
