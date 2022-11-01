"use strict";
exports.__esModule = true;
exports.logResources = void 0;
var logger_1 = require("../utils/logger");
var logResources = function (req, _, next) {
    logger_1.logger.info("".concat(req.method, " ").concat(req.url));
    return next();
};
exports.logResources = logResources;
