import z from "zod";

export const createUserSessionSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "not a valid email" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

export type CreateUserSessionInput = z.TypeOf<typeof createUserSessionSchema>;
