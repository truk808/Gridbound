import type {EffectType, IEffect, IEffectDTO} from "../../types/IEffect";

export class Effect implements IEffect {
    readonly id: string;
    readonly type: EffectType;
    private _duration: number;
    private _level: number;

    constructor(type: EffectType, level?: number, duration?: number, id?: string) {
        this.type = type;
        this.id = id ?? crypto.randomUUID();
        this._level = level ?? 1;
        this._duration = duration ?? 1;
    }

    get duration(): number { return this._duration; }
    get level(): number { return this._level; }

    setDuration(duration: number): void {
        this._duration = duration;
    }

    setLevel(level: number): void {
        this._level = level;
    }

    toDTO(): IEffectDTO {
        return {
            id: this.id,
            level: this.level,
            type: this.type,
            duration: this.duration,
        }
    }
}