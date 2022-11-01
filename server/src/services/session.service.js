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
exports.reIssueAccessToken = exports.updateUserSession = exports.findUserSessions = exports.createUserSession = void 0;
var config_1 = require("config");
var lodash_1 = require("lodash");
var jwt_1 = require("../utils/jwt");
var session_entity_1 = require("../entities/session.entity");
var user_entity_1 = require("../entities/user.entity");
var user_service_1 = require("./user.service");
var logger_1 = require("../utils/logger");
function createUserSession(userId, userAgent) {
    return __awaiter(this, void 0, void 0, function () {
        var user, session, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, user_entity_1.User.findOneBy({ id: userId })];
                case 1:
                    user = _a.sent();
                    session = session_entity_1.Session.create({ user: user, userAgent: userAgent });
                    return [4 /*yield*/, session.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, session];
                case 3:
                    err_1 = _a.sent();
                    logger_1.logger.error("Error during inserting session into DB:", err_1);
                    throw new Error(err_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createUserSession = createUserSession;
function findUserSessions(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, session_entity_1.Session.find(query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findUserSessions = findUserSessions;
function updateUserSession(query, update) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, session_entity_1.Session.update(query, update)];
        });
    });
}
exports.updateUserSession = updateUserSession;
function reIssueAccessToken(_a) {
    var refreshToken = _a.refreshToken;
    return __awaiter(this, void 0, void 0, function () {
        var decoded, session, user, accessToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    decoded = (0, jwt_1.verifyJwt)(refreshToken);
                    if (!decoded || !(0, lodash_1.get)(decoded, "session"))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, session_entity_1.Session.findOneBy({ id: (0, lodash_1.get)(decoded, "session") })];
                case 1:
                    session = _b.sent();
                    if (!session || !session.valid)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, (0, user_service_1.findUser)({ where: { id: session.user.id } })];
                case 2:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, false];
                    accessToken = (0, jwt_1.signJwt)(__assign(__assign({}, user), { session: session.id }), { expiresIn: config_1["default"].get("accessTokenTtl") });
                    return [2 /*return*/, accessToken];
            }
        });
    });
}
exports.reIssueAccessToken = reIssueAccessToken;
