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
exports.deletePost = exports.updatePost = exports.findPosts = exports.findPost = exports.createPost = void 0;
var logger_1 = require("./../utils/logger");
var post_entity_1 = require("../entities/post.entity");
function createPost(input) {
    return __awaiter(this, void 0, void 0, function () {
        var post, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    post = post_entity_1.Post.create(input);
                    return [4 /*yield*/, post.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, post];
                case 2:
                    err_1 = _a.sent();
                    logger_1.logger.error("Error during inserting post to DB:", err_1);
                    throw new Error(err_1);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createPost = createPost;
function findPost(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_entity_1.Post.findOne(__assign(__assign({}, query), { relations: { item: { characteristics: true, imageUrls: true }, user: true } }))];
                case 1: 
                //console.log(Post.findOne({...query, relations: { item: { characteristics: true, imageUrls: true }, user: true },}));
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findPost = findPost;
function findPosts(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_entity_1.Post.find(__assign(__assign({}, query), { relations: { item: true, user: true } }))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.findPosts = findPosts;
function updatePost(query, update) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_entity_1.Post.update(query, update)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.updatePost = updatePost;
function deletePost(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, post_entity_1.Post["delete"](query)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deletePost = deletePost;
