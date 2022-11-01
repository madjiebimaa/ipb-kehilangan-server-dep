"use strict";
exports.__esModule = true;
exports.createServer = void 0;
require("reflect-metadata");
var express_1 = require("express");
var express_session_1 = require("express-session");
var connect_redis_1 = require("connect-redis");
var insertRedisClient_1 = require("../middlewares/insertRedisClient");
var constant_1 = require("../utils/constant");
var dotenv_1 = require("dotenv");
var routes_1 = require("../routes");
var deserializeUser_1 = require("../middlewares/deserializeUser");
var logResources_1 = require("../middlewares/logResources");
var redis_1 = require("./redis");
(0, dotenv_1.config)();
function createServer() {
    var app = (0, express_1["default"])();
    var redis = (0, redis_1.initializeRedis)();
    var redisStore = (0, connect_redis_1["default"])(express_session_1["default"]);
    app.use(express_1["default"].json());
    app.use(deserializeUser_1.deserializeUser);
    app.use(logResources_1.logResources);
    app.use((0, insertRedisClient_1.insertRedisClient)(redis));
    app.use((0, express_session_1["default"])({
        name: process.env.COOKIE_NAME,
        secret: process.env.SESSION_SECRET,
        store: new redisStore({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constant_1.__prod__,
            domain: "localhost"
        },
        saveUninitialized: false,
        resave: false
    }));
    (0, routes_1.routes)(app);
    return app;
}
exports.createServer = createServer;
