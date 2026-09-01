"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
class Effect {
    constructor(type, level, duration, id) {
        this.type = type;
        this.id = id ?? crypto.randomUUID();
        this._level = level ?? 1;
        this._duration = duration ?? 1;
    }
    get duration() { return this._duration; }
    get level() { return this._level; }
    setDuration(duration) {
        this._duration = duration;
    }
    setLevel(level) {
        this._level = level;
    }
    toDTO() {
        return {
            id: this.id,
            level: this.level,
            type: this.type,
            duration: this.duration,
        };
    }
}
exports.Effect = Effect;
