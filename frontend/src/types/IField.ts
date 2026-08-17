import type {ICell} from "./ICell.ts";

export interface IField {
    readonly cells: ICell[];
    selectedCell: ICell | null;

    getCellByIndex(x: number): ICell | null
    setSelectedCell(cell: ICell | null): void
}