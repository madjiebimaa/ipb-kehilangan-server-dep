import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { omit } from "lodash";
import { logger } from "../utils/logger";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { User } from "../entities/user.entity";

export async function createUser(input: DeepPartial<User>) {
  try {
    const user = User.create(input);
    await user.save();
    return omit(user, "password", "tempPassword");
  } catch (err: any) {
    logger.error("Error during inserting user to DB:", err);
    throw new Error(err);
  }
}

export async function findUser(query: FindOneOptions<User>) {
  return omit(await User.findOne(query), "password", "tempPassword");
}

export async function updateUser(
  query: FindOptionsWhere<User>,
  update: QueryDeepPartialEntity<User>
) {
  return await User.update(query, update);
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOneBy({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user, "password", "tempPassword");
}

export async function changeUserPassword(userId: string, newPassword: string) {
  const user = await User.findOneBy({ id: userId });
  if (!user) return false;

  user.password = newPassword;
  return await user.save();
}
