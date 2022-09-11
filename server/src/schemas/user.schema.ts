import { UserRoles } from "./../entities/user.entity";
import z from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      username: z.string({ required_error: "Username is required" }),
      email: z.string({ required_error: "Email is required" }).email({
        message: "Not a valid email",
      }),
      role: z.nativeEnum(UserRoles).optional(),
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

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Not a valid email" }),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, "Password to short - should be 6 chars minimum"),
  }),
  query: z.object({
    token: z.string({ required_error: "Token is required" }),
  }),
});

export const validateEmailSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Not a valid email" }),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    code: z
      .string({ required_error: "Code is required" })
      .min(6, "Number to short - should be 6 characters"),
  }),
  query: z.object({
    token: z.string({ required_error: "Token is required" }),
  }),
});

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
export type ForgotPasswordInput = z.TypeOf<typeof forgotPasswordSchema>;
export type ChangePasswordInput = z.TypeOf<typeof changePasswordSchema>;
export type ValidateEmailInput = z.TypeOf<typeof validateEmailSchema>;
export type VerifyEmailInput = z.TypeOf<typeof verifyEmailSchema>;
