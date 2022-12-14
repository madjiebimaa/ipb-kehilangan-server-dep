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
exports.User = exports.UserRoles = void 0;
var session_entity_1 = require("./session.entity");
var config_1 = require("config");
var nanoid_1 = require("nanoid");
var post_entity_1 = require("./post.entity");
var typeorm_1 = require("typeorm");
var bcrypt_1 = require("bcrypt");
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Civitas"] = "civitas";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype._loadTempPassword = function () {
        this.tempPassword = this.password;
    };
    User.prototype._setId = function () {
        var user = this;
        user.id = "user_".concat((0, nanoid_1.nanoid)());
    };
    User.prototype._encryptPassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, salt, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this;
                        if (!(this.tempPassword !== this.password)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1["default"].genSalt(config_1["default"].get("saltWorkFactor"))];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1["default"].hashSync(user.password, salt)];
                    case 2:
                        hash = _a.sent();
                        user.password = hash;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.comparePassword = function (candidatePassword) {
        var user = this;
        return bcrypt_1["default"].compare(candidatePassword, user.password)["catch"](function () { return false; });
    };
    User.prototype.changePassword = function (newPassword) {
        var user = this;
        user.password = newPassword;
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ length: 40 })
    ], User.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ length: 20, unique: true })
    ], User.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)({ length: 40, unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)({ name: "is_valid_email", "default": false })
    ], User.prototype, "isValidEmail");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ name: "phone_number", length: 14, unique: true, nullable: true })
    ], User.prototype, "phoneNumber");
    __decorate([
        (0, typeorm_1.Column)({ name: "card_identity", nullable: true })
    ], User.prototype, "cardIdentity");
    __decorate([
        (0, typeorm_1.Column)({ name: "profile_picture", nullable: true })
    ], User.prototype, "profilePicture");
    __decorate([
        (0, typeorm_1.Column)({ length: 200, nullable: true })
    ], User.prototype, "address");
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", "enum": UserRoles, "default": UserRoles.Civitas })
    ], User.prototype, "role");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ name: "created_at" })
    ], User.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" })
    ], User.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return post_entity_1.Post; }, function (post) { return post.user; })
    ], User.prototype, "posts");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return session_entity_1.Session; }, function (session) { return session.user; })
    ], User.prototype, "sessions");
    __decorate([
        (0, typeorm_1.AfterLoad)()
    ], User.prototype, "_loadTempPassword");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], User.prototype, "_setId");
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        (0, typeorm_1.BeforeUpdate)()
    ], User.prototype, "_encryptPassword");
    User = __decorate([
        (0, typeorm_1.Entity)("users")
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
