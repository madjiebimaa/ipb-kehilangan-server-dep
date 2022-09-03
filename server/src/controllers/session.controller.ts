import { CreateUserSessionInput } from "./../schemas/session.schema";
import config from "config";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createUserSession } from "../services/session.service";
import { signJwt } from "../utils/jwt";

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateUserSessionInput["body"]>,
  res: Response
) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "invalid email or password" });
  }

  const session = await createUserSession(user.id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );

  return res.status(StatusCodes.CREATED).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {}
