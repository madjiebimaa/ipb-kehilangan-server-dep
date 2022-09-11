import { CreateUserSessionInput } from "./../schemas/session.schema";
import config from "config";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validateUserPassword } from "../services/user.service";
import {
  createUserSession,
  findUserSessions,
  updateUserSession,
} from "../services/session.service";
import { signJwt } from "../utils/jwt";

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateUserSessionInput["body"]>,
  res: Response
) {
  const user = await validateUserPassword(req.body);

  if (!user)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "invalid email or password" });

  const session = await createUserSession(user.id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, sessionId: session.id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, sessionId: session.id },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );

  return res.status(StatusCodes.CREATED).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(_: Request, res: Response) {
  const userId = res.locals.user.id;

  const sessions = await findUserSessions({
    where: { user: { id: userId }, valid: true },
  });
  if (!sessions)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "user has not logged in yet" });

  return res.status(StatusCodes.OK).send(sessions);
}

export async function deleteUserSessionHandler(_: Request, res: Response) {
  const sessionId = res.locals.user.sessionId;

  await updateUserSession({ id: sessionId }, { valid: false });

  return res
    .status(StatusCodes.OK)
    .send({ accessToken: null, refreshToken: null });
}
