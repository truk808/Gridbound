import type {CharacterName} from "../../types/character/ICharacter";
import {ICard} from "../../types/ICard";
import {SOLDIER_DECK_CONFIG} from "./soldierDeck.config";
import {ORC_DECK_CONFIG} from "./orcDeck.confug";

export const CHARACTER_DECK: Record<CharacterName, ICard[]> = {
    'soldier' : SOLDIER_DECK_CONFIG,
    'orc': ORC_DECK_CONFIG,
}