"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteUserSessionHandler = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
var config_1 = require("config");
var http_status_codes_1 = require("http-status-codes");
var user_service_1 = require("../services/user.service");
var session_service_1 = require("../services/session.service");
var jwt_1 = require("../utils/jwt");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, session, accessToken, refreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_service_1.validateUserPassword)(req.body)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                                .send({ message: "invalid email or password" })];
                    return [4 /*yield*/, (0, session_service_1.createUserSession)(user.id, req.get("user-agent") || "")];
                case 2:
                    session = _a.sent();
                    accessToken = (0, jwt_1.signJwt)(__assign(__assign({}, user), { sessionId: session.id }), { expiresIn: config_1["default"].get("accessTokenTtl") });
                    refreshToken = (0, jwt_1.signJwt)(__assign(__assign({}, user), { sessionId: session.id }), { expiresIn: config_1["default"].get("refreshTokenTtl") });
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).send({ accessToken: accessToken, refreshToken: refreshToken })];
            }
        });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function getUserSessionHandler(_, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, sessions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.user.id;
                    return [4 /*yield*/, (0, session_service_1.findUserSessions)({
                            where: { user: { id: userId }, valid: true }
                        })];
                case 1:
                    sessions = _a.sent();
                    if (!sessions)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                                .send({ message: "user has not logged in yet" })];
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(sessions)];
            }
        });
    });
}
exports.getUserSessionHandler = getUserSessionHandler;
function deleteUserSessionHandler(_, res) {
    return __awaiter(this, void 0, void 0, function () {
        var sessionId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionId = res.locals.user.sessionId;
                    return [4 /*yield*/, (0, session_service_1.updateUserSession)({ id: sessionId }, { valid: false })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res
                            .status(http_status_codes_1.StatusCodes.OK)
                            .send({ accessToken: null, refreshToken: null })];
            }
        });
    });
}
exports.deleteUserSessionHandler = deleteUserSessionHandler;
