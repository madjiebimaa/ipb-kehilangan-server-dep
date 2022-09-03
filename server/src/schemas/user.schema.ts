import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "name is required" }),
    username: string({ required_error: "username is required" }),
    email: string({ required_error: "email is required" }).email({
      message: "not a valid email",
    }),
    password: string({ required_error: "password is required" }).min(
      6,
      "Password to short - should be 6 chars minimum"
    ),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "password do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
