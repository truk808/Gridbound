"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacter = createCharacter;
const Character_1 = require("../models/Character");
const characters_config_1 = require("../../config/characters.config");
function createCharacter(name) {
    const character = characters_config_1.CHARACTER_CONFIG[name];
    return new Character_1.Character(character.name, character.maxHp);
}
