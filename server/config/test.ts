import { config } from "dotenv";

config();

const {
  SERVER_PORT,
  SALT_WORK_FACTOR,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  PRIVATE_KEY,
  PUBLIC_KEY,
} = process.env;

export default {
  port: parseInt(SERVER_PORT as string),
  saltWorkFactor: parseInt(SALT_WORK_FACTOR as string),
  accessTokenTtl: ACCESS_TOKEN_TTL,
  refreshTokenTtl: REFRESH_TOKEN_TTL,
  privateKey: PRIVATE_KEY,
  publicKey: PUBLIC_KEY,
};
