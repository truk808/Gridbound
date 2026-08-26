import {IField, IFieldDTO} from "../../types/IField";
import {ICell} from "../../types/ICell";
import {Cell} from "./Cell";

export class Field implements IField {
    readonly cells: ICell[] = []

    constructor(x: number) {
        for (let i = 0; i < x; i++) {
            this.cells.push(new Cell(i));
        }
    }

    getCellByX(x: number | null): ICell | null {
        return this.cells.find((cell) => cell.x === x) ?? null;
    }

    toDTO(): IFieldDTO {
        return {
            cells: this.cells.map((cell) => cell.toDTO()),
        }
    }
}