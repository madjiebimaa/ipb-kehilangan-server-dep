import { omit } from "lodash";
import { DeepPartial, FindOneOptions } from "typeorm";
import { User } from "../entities/user.entity";

export async function createUser(input: DeepPartial<User>) {
  try {
    const user = User.create({ ...input });
    await user.save();
    return omit(user, "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findUser(query: FindOneOptions<User>) {
  return User.findOne(query);
}

export async function validatePassword({
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

  return omit(user, "password");
}
