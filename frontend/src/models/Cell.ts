import type {ICell} from "../../../types/ICell.ts";
import {makeAutoObservable} from "mobx";

export class Cell implements ICell {
    readonly x: number;
    private _isOwn: boolean = false;

    constructor(x: number) {
        this.x = x;

        makeAutoObservable(this);
    }

    get isOwn() { return this._isOwn; }

    setIsOwn(value: boolean) {
        this._isOwn = value;
    }
}