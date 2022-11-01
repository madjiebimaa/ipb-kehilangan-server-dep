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
exports.deletePostSchema = exports.updatePostSchema = exports.getPostsSchema = exports.getPostSchema = exports.createPostSchema = exports.query = exports.params = exports.body = exports.itemCharacteristicSchema = exports.itemImageSchema = void 0;
var item_entity_1 = require("./../entities/item.entity");
var post_entity_1 = require("./../entities/post.entity");
var zod_1 = require("zod");
exports.itemImageSchema = zod_1["default"]["instanceof"](item_entity_1.ItemImage);
exports.itemCharacteristicSchema = zod_1["default"]["instanceof"](item_entity_1.ItemCharacteristic);
// !FIX: redundance nested from different schema path
exports.body = {
    body: zod_1["default"].object({
        lostStatus: zod_1["default"].nativeEnum(post_entity_1.PostLostStatus).optional(),
        lostDate: zod_1["default"].string().optional(),
        lostLocation: zod_1["default"]
            .string()
            .max(200, { message: "Must be 200 or fewer characters long" })
            .optional(),
        item: zod_1["default"]
            .object({
            name: zod_1["default"]
                .string({ required_error: "Name is required" })
                .max(100, { message: "Must be 100 or fewer characters long" }),
            imageUrls: exports.itemImageSchema.array().optional(),
            characteristics: exports.itemCharacteristicSchema.array().optional()
        })
            .deepPartial()
    })
};
exports.params = {
    params: zod_1["default"].object({
        postId: zod_1["default"].string({ required_error: "PostId is required" })
    })
};
exports.query = {
    query: zod_1["default"].object({
        lostStatus: zod_1["default"].string().optional(),
        itemName: zod_1["default"].string().optional()
    })
};
exports.createPostSchema = zod_1["default"].object(__assign({}, exports.body));
exports.getPostSchema = zod_1["default"].object(__assign({}, exports.params));
exports.getPostsSchema = zod_1["default"].object(__assign({}, exports.query));
exports.updatePostSchema = zod_1["default"].object(__assign(__assign({}, exports.params), exports.body));
exports.deletePostSchema = zod_1["default"].object(__assign({}, exports.params));
