"use strict";
exports.__esModule = true;
exports.logger = void 0;
var pino_1 = require("pino");
var pino_pretty_1 = require("pino-pretty");
var dayjs_1 = require("dayjs");
var stream = (0, pino_pretty_1["default"])({
    colorize: true,
    customPrettifiers: { time: function () { return "\uD83D\uDD70 ".concat((0, dayjs_1["default"])().format()); } }
});
exports.logger = (0, pino_1["default"])(stream);
