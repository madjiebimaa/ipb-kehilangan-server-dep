"use strict";
exports.__esModule = true;
exports.initializeRedis = void 0;
var ioredis_1 = require("ioredis");
function initializeRedis() {
    var redis = new ioredis_1["default"]({
        host: "0.0.0.0",
        port: 6379
    });
    return redis;
}
exports.initializeRedis = initializeRedis;
