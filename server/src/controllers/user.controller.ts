import { Redis } from "ioredis";
import {
  ChangePasswordInput,
  CreateUserInput,
  ForgotPasswordInput,
  UpdateUserInput,
} from "./../schemas/user.schema";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  changeUserPassword,
  createUser,
  findUser,
  updateUser,
} from "../services/user.service";
import { logger } from "../utils/logger";
import { nanoid } from "nanoid";
import { sendMail } from "../utils/mail";

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

  await updateUser({ id: userId }, req.body);

  return res.status(StatusCodes.OK).send({ message: "success updating user" });
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput["body"]>,
  res: Response
) {
  const redis = res.locals.redis as Redis;
  const { email } = req.body;

  const user = await findUser({ where: { email } });
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "User is not found" });

  const token = nanoid();
  await redis.set(`change_password_${token}`, user.id),
    (err: any) => logger.error(err);
  // await sendMail({ user, subject: "Change Password", token });

  return res.status(StatusCodes.OK).send({
    message: `Success to send email for changing your password`,
    token,
  });
}

export async function changePasswordHandler(
  req: Request<
    {},
    {},
    ChangePasswordInput["body"],
    ChangePasswordInput["query"]
  >,
  res: Response
) {
  const redis = res.locals.redis as Redis;
  const { newPassword } = req.body;
  const { token } = req.query;

  const key = `change_password_${token}`;
  const userId = await redis.get(key);
  if (!userId)
    res
      .status(StatusCodes.NOT_FOUND)
      .send({ message: "Token already expired" });

  // !FIX: change the way of user ID defined
  await changeUserPassword(userId!, newPassword);
  await redis.del(key);

  return res.status(StatusCodes.OK).send({
    message: "Success to set a new password",
  });
}
