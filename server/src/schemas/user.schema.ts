import z from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      username: z.string({ required_error: "Username is required" }),
      email: z.string({ required_error: "Email is required" }).email({
        message: "Not a valid email",
      }),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password to short - should be 6 chars minimum"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Password do not match",
      path: ["PasswordConfirmation"],
    }),
});

export const updateUserSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    cardIdentity: z.string().optional(),
    profilePicture: z.string().optional(),
    address: z.string().optional(),
  }),
});

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
