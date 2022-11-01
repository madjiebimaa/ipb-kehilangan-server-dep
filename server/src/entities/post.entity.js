"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Post = exports.PostCategory = exports.PostLostStatus = void 0;
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("typeorm");
var item_entity_1 = require("./item.entity");
var nanoid_1 = require("nanoid");
var PostLostStatus;
(function (PostLostStatus) {
    PostLostStatus["LOST"] = "lost";
    PostLostStatus["FOUND"] = "found";
    PostLostStatus["RETURNED"] = "returned";
})(PostLostStatus = exports.PostLostStatus || (exports.PostLostStatus = {}));
var PostCategory;
(function (PostCategory) {
})(PostCategory = exports.PostCategory || (exports.PostCategory = {}));
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Post.prototype.setId = function () {
        var post = this;
        post.id = "post_".concat((0, nanoid_1.nanoid)());
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], Post.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            name: "lost_status",
            type: "enum",
            "enum": PostLostStatus,
            "default": PostLostStatus.LOST
        })
    ], Post.prototype, "lostStatus");
    __decorate([
        (0, typeorm_1.Column)({ name: "lost_date", nullable: true })
    ], Post.prototype, "lostDate");
    __decorate([
        (0, typeorm_1.Column)({ name: "lost_location", length: 200, nullable: true })
    ], Post.prototype, "lostLocation");
    __decorate([
        (0, typeorm_1.Column)({ name: "view_count", "default": 0 })
    ], Post.prototype, "viewCount");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: "created_at" })
    ], Post.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" })
    ], Post.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return item_entity_1.Item; }),
        (0, typeorm_1.JoinColumn)({ name: "item_id" })
    ], Post.prototype, "item");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.posts; }),
        (0, typeorm_1.JoinColumn)({ name: "user_id" })
    ], Post.prototype, "user");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], Post.prototype, "setId");
    Post = __decorate([
        (0, typeorm_1.Entity)("posts")
    ], Post);
    return Post;
}(typeorm_1.BaseEntity));
exports.Post = Post;
