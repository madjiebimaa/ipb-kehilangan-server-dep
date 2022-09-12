import { StatusCodes } from "http-status-codes";
import { UserRoles } from "./../entities/user.entity";
import { NextFunction, Request, Response } from "express";

export function requireCivitasRole(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;
  if (user.role !== UserRoles.Civitas) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ message: "User role is not Civitas" });
  }

  return next();
}
