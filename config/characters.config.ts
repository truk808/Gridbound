import type {CharacterName} from "../types/character/ICharacter";

export const CHARACTER_CONFIG = {
    soldier: {
        id: '1',
        name: 'soldier',
        maxHp: 1,
    },
    orc: {
        id: '2',
        name: 'orc',
        maxHp: 110,
    },
} as Record<CharacterName, { id: string, name: string, maxHp: number, }>;