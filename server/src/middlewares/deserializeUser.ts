import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) return next();

  const refreshToken = get(req, "headers.x-refresh");
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) res.setHeader("x-access-token", newAccessToken);

    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};
