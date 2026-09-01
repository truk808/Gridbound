"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
class Cell {
    constructor(x) {
        this._isOwn = false;
        this.x = x;
    }
    get isOwn() { return this._isOwn; }
    setIsOwn(value) {
        this._isOwn = value;
    }
    toDTO() {
        return {
            x: this.x,
            isOwn: this.isOwn,
        };
    }
}
exports.Cell = Cell;
