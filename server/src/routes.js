"use strict";
exports.__esModule = true;
exports.routes = void 0;
var requireRoleRole_1 = require("./middlewares/requireRoleRole");
var session_schema_1 = require("./schemas/session.schema");
var validateResources_1 = require("./middlewares/validateResources");
var http_status_codes_1 = require("http-status-codes");
var session_controller_1 = require("./controllers/session.controller");
var user_controller_1 = require("./controllers/user.controller");
var user_schema_1 = require("./schemas/user.schema");
var requireUser_1 = require("./middlewares/requireUser");
var post_controller_1 = require("./controllers/post.controller");
var post_schema_1 = require("./schemas/post.schema");
var user_entity_1 = require("./entities/user.entity");
function routes(app) {
    app.get("/api/healthcheck", function (_, res) {
        return res.sendStatus(http_status_codes_1.StatusCodes.OK);
    });
    app.post("/api/users", (0, validateResources_1.validateResources)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.get("/api/users/me", requireUser_1.requireUser, user_controller_1.meUserHandler);
    app.put("/api/users", [requireUser_1.requireUser, (0, validateResources_1.validateResources)(user_schema_1.updateUserSchema)], user_controller_1.updateUserHandler);
    app.get("/api/users/forgot-password", (0, validateResources_1.validateResources)(user_schema_1.forgotPasswordSchema), user_controller_1.forgotPasswordHandler);
    app.patch("/api/users/change-password", (0, validateResources_1.validateResources)(user_schema_1.changePasswordSchema), user_controller_1.changePasswordHandler);
    app.get("/api/users/validate-email", (0, validateResources_1.validateResources)(user_schema_1.validateEmailSchema), user_controller_1.validateEmailHandler);
    app.patch("/api/users/verify-email", (0, validateResources_1.validateResources)(user_schema_1.verifyEmailSchema), user_controller_1.verifyEmailHandler);
    app.get("/api/users", [requireUser_1.requireUser, (0, requireRoleRole_1.requireUserRole)(user_entity_1.UserRoles.Admin)], user_controller_1.getUsersHandler);
    app.post("/api/sessions", (0, validateResources_1.validateResources)(session_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.requireUser, session_controller_1.getUserSessionHandler);
    app["delete"]("/api/sessions", requireUser_1.requireUser, session_controller_1.deleteUserSessionHandler);
    app.post("/api/posts", [
        requireUser_1.requireUser,
        (0, requireRoleRole_1.requireUserRole)(user_entity_1.UserRoles.Civitas),
        (0, validateResources_1.validateResources)(post_schema_1.createPostSchema),
    ], post_controller_1.createPostHandler);
    app.get("/api/posts/:postId", (0, validateResources_1.validateResources)(post_schema_1.getPostSchema), post_controller_1.getPostHandler);
    app.get("/api/posts", (0, validateResources_1.validateResources)(post_schema_1.getPostsSchema), post_controller_1.getPostsHandler);
    app.put("/api/posts/:postId", [requireUser_1.requireUser, (0, validateResources_1.validateResources)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    app["delete"]("/api/posts/:postId", [
        requireUser_1.requireUser,
        (0, requireRoleRole_1.requireUserRole)(user_entity_1.UserRoles.Admin),
        (0, validateResources_1.validateResources)(post_schema_1.deletePostSchema),
    ], post_controller_1.deletePostHandler);
}
exports.routes = routes;
