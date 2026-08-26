import type {IField} from "../../../types/IField.ts";
import type {ICell} from "../../../types/ICell.ts";
import {makeAutoObservable} from "mobx";
import {COUNT_CELL} from "../../../config/gameConfig.ts";
import {Cell} from "./Cell.ts";

export class Field implements IField {
    readonly cells: ICell[] = [];
    selectedCell: ICell | null = null;

    constructor() {
        this.initFields()

        makeAutoObservable(this);
    }

    initFields(): void {
        for (let i = 0; i < COUNT_CELL; i++) {
            this.cells.push(new Cell(i))
        }
    }

    getCellByIndex(x: number): ICell | null {
        return this.cells[x] ?? null;
    }

    setSelectedCell(cell: ICell | null): void {
        this.selectedCell = cell;
    }
}
