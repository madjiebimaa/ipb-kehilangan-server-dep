"use strict";
exports.__esModule = true;
exports.requireUser = void 0;
var http_status_codes_1 = require("http-status-codes");
var requireUser = function (_, res, next) {
    var user = res.locals.user;
    if (!user) {
        return res
            .status(http_status_codes_1.StatusCodes.FORBIDDEN)
            .send({ message: "User does not have access" });
    }
    return next();
};
exports.requireUser = requireUser;
