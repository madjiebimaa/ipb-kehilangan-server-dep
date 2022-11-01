"use strict";
exports.__esModule = true;
exports.insertRedisClient = void 0;
var insertRedisClient = function (redisClient) { return function (_, res, next) {
    res.locals.redis = redisClient;
    next();
}; };
exports.insertRedisClient = insertRedisClient;
