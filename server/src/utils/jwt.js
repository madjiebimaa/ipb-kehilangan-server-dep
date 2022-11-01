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
exports.__esModule = true;
exports.verifyJwt = exports.signJwt = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("config");
var logger_1 = require("./logger");
var publicKey = config_1["default"].get("publicKey");
var privateKey = config_1["default"].get("privateKey");
function signJwt(object, options) {
    return jsonwebtoken_1["default"].sign(object, privateKey, __assign(__assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    }
    catch (err) {
        logger_1.logger.error("Error during verifying JWT:", err);
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decoded: null
        };
    }
}
exports.verifyJwt = verifyJwt;
