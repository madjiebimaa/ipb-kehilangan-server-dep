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
exports.ItemImage = exports.ItemCharacteristic = exports.Item = void 0;
var nanoid_1 = require("nanoid");
var typeorm_1 = require("typeorm");
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.prototype.setId = function () {
        var item = this;
        item.id = "item_".concat((0, nanoid_1.nanoid)());
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], Item.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ length: 100 })
    ], Item.prototype, "name");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ItemImage; }, function (imageUrl) { return imageUrl.item; }, { cascade: true })
    ], Item.prototype, "imageUrls");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ItemCharacteristic; }, function (characteristic) { return characteristic.item; }, { cascade: true })
    ], Item.prototype, "characteristics");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], Item.prototype, "setId");
    Item = __decorate([
        (0, typeorm_1.Entity)("items")
    ], Item);
    return Item;
}(typeorm_1.BaseEntity));
exports.Item = Item;
var ItemCharacteristic = /** @class */ (function (_super) {
    __extends(ItemCharacteristic, _super);
    function ItemCharacteristic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemCharacteristic.prototype.setId = function () {
        var ItemCharacteristic = this;
        ItemCharacteristic.id = "item_characteristic_".concat((0, nanoid_1.nanoid)());
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], ItemCharacteristic.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ItemCharacteristic.prototype, "characteristic");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Item; }, function (item) { return item.characteristics; }),
        (0, typeorm_1.JoinColumn)({ name: "item_id" })
    ], ItemCharacteristic.prototype, "item");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], ItemCharacteristic.prototype, "setId");
    ItemCharacteristic = __decorate([
        (0, typeorm_1.Entity)("item_characteristics")
    ], ItemCharacteristic);
    return ItemCharacteristic;
}(typeorm_1.BaseEntity));
exports.ItemCharacteristic = ItemCharacteristic;
var ItemImage = /** @class */ (function (_super) {
    __extends(ItemImage, _super);
    function ItemImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemImage.prototype.setId = function () {
        var itemImage = this;
        itemImage.id = "item_image_".concat((0, nanoid_1.nanoid)());
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)()
    ], ItemImage.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ItemImage.prototype, "imageUrl");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Item; }, function (item) { return item.imageUrls; }),
        (0, typeorm_1.JoinColumn)({ name: "item_id" })
    ], ItemImage.prototype, "item");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], ItemImage.prototype, "setId");
    ItemImage = __decorate([
        (0, typeorm_1.Entity)("item_images")
    ], ItemImage);
    return ItemImage;
}(typeorm_1.BaseEntity));
exports.ItemImage = ItemImage;
