import type {StatusType} from "../types/IEffect.ts";
import {EFFECTS_CONFIG} from "../config/effects.config.ts";
import {Effect} from "../models/Effect.ts";

export function createEffect(type: StatusType, duration: number = 1, level: number = 1) {
    const effect = EFFECTS_CONFIG[type];

    return new Effect(effect.name, type, duration, level);
}