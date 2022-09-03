import z from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "name is required" }),
      username: z.string({ required_error: "username is required" }),
      email: z.string({ required_error: "email is required" }).email({
        message: "not a valid email",
      }),
      password: z
        .string({ required_error: "password is required" })
        .min(6, "Password to short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "password do not match",
      path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
