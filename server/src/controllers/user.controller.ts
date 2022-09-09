import {
  CreateUserInput,
  ForgotPasswordInput,
  UpdateUserInput,
} from "./../schemas/user.schema";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, findUser, updateUser } from "../services/user.service";
import { logger } from "../utils/logger";
// import from ''

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(StatusCodes.CREATED).send(user);
  } catch (err: any) {
    logger.error("Error location is createUserHandler handler:", err);
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
}

export async function meUserHandler(_: Request, res: Response) {
  const userId = res.locals.user.id;
  const user = await findUser({ where: { id: userId } });
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "User is not found" });

  return res.status(StatusCodes.OK).send(user);
}

export async function updateUserHandler(
  req: Request<{}, {}, UpdateUserInput["body"]>,
  res: Response
) {
  const userId = res.locals.user.id;

  const user = await findUser({ where: { id: userId } });
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "User is not found" });

  const updatedUser = await updateUser({ id: userId }, req.body);
  console.log("updatedUser:", updatedUser);

  return res.status(StatusCodes.OK).send({ message: "success updating user" });
}

export async function changePasswordHandler(req: Request, res: Response) {}

export async function forgotPassword(
  req: Request<{}, {}, ForgotPasswordInput["body"]>,
  res: Response
) {}
