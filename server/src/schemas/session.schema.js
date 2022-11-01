"use strict";
exports.__esModule = true;
exports.createUserSessionSchema = void 0;
var zod_1 = require("zod");
exports.createUserSessionSchema = zod_1["default"].object({
    body: zod_1["default"].object({
        email: zod_1["default"]
            .string({ required_error: "Email is required" })
            .email({ message: "Not a valid email" }),
        password: zod_1["default"].string({ required_error: "Password is required" })
    })
});
