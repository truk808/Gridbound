import {ICell, ICellDTO} from "../../types/ICell";

export class Cell implements ICell {
    readonly x: number;
    private _isOwn: boolean = false;

    constructor(x: number) {
        this.x = x;
    }

    get isOwn() { return this._isOwn; }

    setIsOwn(value: boolean) {
        this._isOwn = value;
    }

    toDTO(): ICellDTO {
        return {
            x: this.x,
            isOwn: this.isOwn,
        }
    }
}