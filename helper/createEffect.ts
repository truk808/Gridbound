import type {IEffect, StatusType} from "../types/IEffect.ts";
import {EFFECTS_CONFIG} from "../config/effects.config.ts";
import {Effect} from '../backend/models/Effect'

export function createEffect(type: StatusType, duration: number = 1, level: number = 1): IEffect {
    const effect = EFFECTS_CONFIG[type];

    return new Effect(type, level, duration);
}