"use strict";
exports.__esModule = true;
exports.isEmptyArray = exports.isEmptyObject = void 0;
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
exports.isEmptyObject = isEmptyObject;
function isEmptyArray(arr) {
    return arr.length === 0;
}
exports.isEmptyArray = isEmptyArray;
