import { FindManyOptions } from "typeorm";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";

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

export async function findUserSession(query: FindManyOptions<Session>) {
  return Session.find(query);
}
