import type {EffectType, IEffect} from "../types/IEffect.ts";
import {makeAutoObservable} from "mobx";

export class Effect implements IEffect {
    readonly id: string;
    readonly type: EffectType;
    private _duration: number;
    private _level: number;

    constructor(id: string, type: EffectType, duration: number, level: number) {
        this.id = id;
        this.type = type;
        this._duration = duration;
        this._level = level;

        makeAutoObservable(this)
    }

    get duration() {return this._duration; }
    get level() {return this._level; }

    setDuration(duration: number) {
        this._duration = duration;
    }

    setLevel(level: number) {
        this._level = level;
    }


}