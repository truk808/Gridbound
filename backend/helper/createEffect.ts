import type {IEffect, StatusType} from "../../types/IEffect.ts";
import {Effect} from '../models/Effect'
import {EFFECTS_CONFIG} from "../../config/effects.config";

export function createEffect(type: StatusType, duration: number = 1, level: number = 1): IEffect {
    const effect = EFFECTS_CONFIG[type];

    return new Effect(type, level, duration);
}