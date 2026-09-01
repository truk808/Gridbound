import {Character} from "../models/Character";
import {CharacterName} from "../../types/character/ICharacter";
import {CHARACTER_CONFIG} from "../../config/characters.config";

export function createCharacter(name: CharacterName): Character {
    const character = CHARACTER_CONFIG[name];

    return new Character(
        character.name as CharacterName,
        character.maxHp
    )
}