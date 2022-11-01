"use strict";
exports.__esModule = true;
exports.verifyEmailSchema = exports.validateEmailSchema = exports.changePasswordSchema = exports.forgotPasswordSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var user_entity_1 = require("./../entities/user.entity");
var zod_1 = require("zod");
exports.createUserSchema = zod_1["default"].object({
    body: zod_1["default"]
        .object({
        name: zod_1["default"].string({ required_error: "Name is required" }),
        username: zod_1["default"].string({ required_error: "Username is required" }),
        email: zod_1["default"].string({ required_error: "Email is required" }).email({
            message: "Not a valid email"
        }),
        role: zod_1["default"].nativeEnum(user_entity_1.UserRoles).optional(),
        password: zod_1["default"]
            .string({ required_error: "Password is required" })
            .min(6, "Password to short - should be 6 chars minimum"),
        passwordConfirmation: zod_1["default"].string({
            required_error: "Password confirmation is required"
        })
    })
        .refine(function (data) { return data.password === data.passwordConfirmation; }, {
        message: "Password do not match",
        path: ["PasswordConfirmation"]
    })
});
exports.updateUserSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        phoneNumber: zod_1["default"].string().optional(),
        cardIdentity: zod_1["default"].string().optional(),
        profilePicture: zod_1["default"].string().optional(),
        address: zod_1["default"].string().optional()
    })
});
exports.forgotPasswordSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        email: zod_1["default"]
            .string({ required_error: "Email is required" })
            .email({ message: "Not a valid email" })
    })
});
exports.changePasswordSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        newPassword: zod_1["default"]
            .string({ required_error: "New password is required" })
            .min(6, "Password to short - should be 6 chars minimum")
    }),
    query: zod_1["default"].object({
        token: zod_1["default"].string({ required_error: "Token is required" })
    })
});
exports.validateEmailSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        email: zod_1["default"]
            .string({ required_error: "Email is required" })
            .email({ message: "Not a valid email" })
    })
});
exports.verifyEmailSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        code: zod_1["default"]
            .string({ required_error: "Code is required" })
            .min(6, "Number to short - should be 6 characters")
    }),
    query: zod_1["default"].object({
        token: zod_1["default"].string({ required_error: "Token is required" })
    })
});
