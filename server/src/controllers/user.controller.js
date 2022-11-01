"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUsersHandler = exports.verifyEmailHandler = exports.validateEmailHandler = exports.changePasswordHandler = exports.forgotPasswordHandler = exports.updateUserHandler = exports.meUserHandler = exports.createUserHandler = void 0;
var http_status_codes_1 = require("http-status-codes");
var user_service_1 = require("../services/user.service");
var logger_1 = require("../utils/logger");
var nanoid_1 = require("nanoid");
var db_1 = require("../utils/db");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, user_service_1.createUser)(req.body)];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).send(user)];
                case 2:
                    err_1 = _a.sent();
                    logger_1.logger.error("Error location is createUserHandler handler:", err_1);
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CONFLICT).send({ message: err_1.message })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createUserHandler = createUserHandler;
function meUserHandler(_, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user.id;
                    return [4 /*yield*/, (0, user_service_1.findUser)({ where: { id: userId } })];
                case 1:
                    user = _a.sent();
                    if ((0, db_1.isEmptyObject)(user))
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "User is not found" })];
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(user)];
            }
        });
    });
}
exports.meUserHandler = meUserHandler;
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user.id;
                    return [4 /*yield*/, (0, user_service_1.findUser)({ where: { id: userId } })];
                case 1:
                    user = _a.sent();
                    if ((0, db_1.isEmptyObject)(user))
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "User is not found" })];
                    return [4 /*yield*/, (0, user_service_1.updateUser)({ id: userId }, req.body)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({ message: "success updating user" })];
            }
        });
    });
}
exports.updateUserHandler = updateUserHandler;
function forgotPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var redis, email, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    redis = res.locals.redis;
                    email = req.body.email;
                    return [4 /*yield*/, (0, user_service_1.findUser)({ where: { email: email } })];
                case 1:
                    user = _a.sent();
                    if ((0, db_1.isEmptyObject)(user))
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "User is not found" })];
                    token = (0, nanoid_1.nanoid)();
                    return [4 /*yield*/, redis.set("change_password_".concat(token), user.id)];
                case 2:
                    _a.sent();
                    // await sendMail({ user, subject: "Change Password", token });
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({
                            message: "Success to send email for changing your password",
                            token: token
                        })];
            }
        });
    });
}
exports.forgotPasswordHandler = forgotPasswordHandler;
function changePasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var redis, newPassword, token, key, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    redis = res.locals.redis;
                    newPassword = req.body.newPassword;
                    token = req.query.token;
                    key = "change_password_".concat(token);
                    return [4 /*yield*/, redis.get(key)];
                case 1:
                    userId = _a.sent();
                    if (!userId)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "Token already expired" })];
                    // !FIX: change the way of user ID defined
                    return [4 /*yield*/, (0, user_service_1.changeUserPassword)(userId, newPassword)];
                case 2:
                    // !FIX: change the way of user ID defined
                    _a.sent();
                    return [4 /*yield*/, redis.del(key)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({
                            message: "Success to set a new password"
                        })];
            }
        });
    });
}
exports.changePasswordHandler = changePasswordHandler;
function validateEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var redis, email, user, token, code, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    redis = res.locals.redis;
                    email = req.body.email;
                    return [4 /*yield*/, (0, user_service_1.findUser)({ where: { email: email } })];
                case 1:
                    user = _a.sent();
                    if ((0, db_1.isEmptyObject)(user))
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "User is not found" })];
                    token = (0, nanoid_1.nanoid)();
                    code = (0, nanoid_1.customAlphabet)("0123456789", 6)();
                    value = JSON.stringify({ userId: user.id, code: code });
                    return [4 /*yield*/, redis.set("verify_email_".concat(token), value)];
                case 2:
                    _a.sent();
                    // await sendMail({ user, subject: "Verify Email ", token });
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({
                            message: "Success to send email for verify your email",
                            token: token,
                            code: code
                        })];
            }
        });
    });
}
exports.validateEmailHandler = validateEmailHandler;
function verifyEmailHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var redis, code, token, key, value, _a, userId, storedCode;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    redis = res.locals.redis;
                    code = req.body.code;
                    token = req.query.token;
                    key = "verify_email_".concat(token);
                    return [4 /*yield*/, redis.get(key)];
                case 1:
                    value = _b.sent();
                    if (!value)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "Token already expired" })];
                    _a = JSON.parse(value), userId = _a.userId, storedCode = _a.code;
                    if (code !== storedCode)
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send({ message: "Invalid code" })];
                    (0, user_service_1.updateUser)({ id: userId }, { isValidEmail: true });
                    return [4 /*yield*/, redis.del(key)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({
                            message: "Success to verify a email"
                        })];
            }
        });
    });
}
exports.verifyEmailHandler = verifyEmailHandler;
function getUsersHandler(_, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_service_1.findUsers)()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(users)];
            }
        });
    });
}
exports.getUsersHandler = getUsersHandler;
