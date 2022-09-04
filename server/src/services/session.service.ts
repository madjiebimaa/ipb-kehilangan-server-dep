import config from "config";
import { get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt";
import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";
import { findUser } from "./user.service";

export async function createUserSession(userId: string, userAgent: string) {
  try {
    const user = await User.findOneBy({ id: userId });
    const session = Session.create({ user: user!, userAgent }); // temporary implementation for ! sign, assumption: user always found by the ID
    await session.save();
    return session;
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findUserSessions(query: FindManyOptions<Session>) {
  return await Session.find(query);
}

export async function updateUserSession(
  query: FindOptionsWhere<Session>,
  update: QueryDeepPartialEntity<Session>
) {
  return Session.update(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const decoded = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return false;

  const session = await Session.findOneBy({ id: get(decoded, "session") });
  if (!session || !session.valid) return false;

  const user = await findUser({ where: { id: session.user.id } });
  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );

  return accessToken;
}
