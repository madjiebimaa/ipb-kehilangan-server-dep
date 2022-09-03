import { CreateUserInput } from "./../schemas/user.schema";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "../services/user.service";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(StatusCodes.CREATED).send(user);
  } catch (err: any) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: err.message });
  }
}
