"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const Cell_1 = require("./Cell");
class Field {
    constructor(x) {
        this.cells = [];
        for (let i = 0; i < x; i++) {
            this.cells.push(new Cell_1.Cell(i));
        }
    }
    getCellByX(x) {
        return this.cells.find((cell) => cell.x === x) ?? null;
    }
    toDTO() {
        return {
            cells: this.cells.map((cell) => cell.toDTO()),
        };
    }
}
exports.Field = Field;
