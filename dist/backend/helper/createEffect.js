"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEffect = createEffect;
const Effect_1 = require("../models/Effect");
const effects_config_1 = require("../../config/effects.config");
function createEffect(type, duration = 1, level = 1) {
    const effect = effects_config_1.EFFECTS_CONFIG[type];
    return new Effect_1.Effect(type, level, duration);
}
