import jwt from "jsonwebtoken";
import config from "config";
import { logger } from "./logger";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    logger.error("Error during verifying JWT:", err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
