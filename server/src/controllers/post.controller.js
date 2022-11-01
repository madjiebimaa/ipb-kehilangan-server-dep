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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.deletePostHandler = exports.updatePostHandler = exports.getPostsHandler = exports.getPostHandler = exports.createPostHandler = void 0;
var logger_1 = require("./../utils/logger");
var http_status_codes_1 = require("http-status-codes");
var item_service_1 = require("../services/item.service");
var post_service_1 = require("../services/post.service");
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, item, post, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userId = res.locals.user.id;
                    return [4 /*yield*/, (0, item_service_1.createItem)(req.body.item)];
                case 1:
                    item = _a.sent();
                    req.body.item = item;
                    return [4 /*yield*/, (0, post_service_1.createPost)(__assign(__assign({}, req.body), { user: { id: userId } }))];
                case 2:
                    post = _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.CREATED).send(post)];
                case 3:
                    err_1 = _a.sent();
                    logger_1.logger.error("Error location is createPostHandler:", err_1);
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ message: err_1.message })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createPostHandler = createPostHandler;
function getPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = req.params.postId;
                    return [4 /*yield*/, (0, post_service_1.findPost)({ where: { id: postId } })];
                case 1:
                    post = _a.sent();
                    if (!post)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "There's no post with that id" })];
                    return [4 /*yield*/, (0, post_service_1.updatePost)({ id: post.id }, { viewCount: post.viewCount + 1 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(post)];
            }
        });
    });
}
exports.getPostHandler = getPostHandler;
function getPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, post_service_1.findPosts)({ where: __assign({}, req.query) })];
                case 1:
                    posts = _a.sent();
                    if (posts.length === 0)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "There's no post at all" })];
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send(posts)];
            }
        });
    });
}
exports.getPostsHandler = getPostsHandler;
function updatePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, postId, post, _a, _, updatePostInput;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.user.id;
                    postId = req.params.postId;
                    return [4 /*yield*/, (0, post_service_1.findPost)({ where: { id: postId } })];
                case 1:
                    post = _b.sent();
                    if (!post)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "There's no post with that id" })];
                    if (post.user.id !== userId)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.FORBIDDEN)
                                .send({ message: "You're not have access to this resources" })];
                    if (!req.body.hasOwnProperty("item")) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, item_service_1.updateItem)({ id: post.item.id }, req.body.item)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _a = req.body, _ = _a["item"], updatePostInput = __rest(_a, ["item"]);
                    return [4 /*yield*/, (0, post_service_1.updatePost)({ id: postId }, updatePostInput)];
                case 4:
                    _b.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({ message: "Success updating post" })];
            }
        });
    });
}
exports.updatePostHandler = updatePostHandler;
function deletePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = req.params.postId;
                    return [4 /*yield*/, (0, post_service_1.findPost)({ where: { id: postId } })];
                case 1:
                    post = _a.sent();
                    if (!post)
                        return [2 /*return*/, res
                                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                                .send({ message: "There's no post with that id" })];
                    return [4 /*yield*/, (0, post_service_1.deletePost)({ id: post.id })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).send({ message: "Success deleting post" })];
            }
        });
    });
}
exports.deletePostHandler = deletePostHandler;
