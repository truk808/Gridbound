import {SoldierSprite} from "./Solider/SoldierSprite.tsx";
import type {ICharacterDTO} from "../../../../types/character/ICharacter.ts";
import {OrcSprite} from "./Orc/Orc.tsx";

interface Character {
    character: ICharacterDTO | null;
    state: 'idle' | 'walk' | 'attack'
    flip: boolean;
}

export interface SpriteProps {
    isFlipped?: boolean;
    character: ICharacterDTO;
    state: 'idle' | 'walk' | 'attack';
}

export const Character = ({character, state, flip = false}: Character) => {
    if (!character) return

    switch (character.name) {
        case 'soldier':
            return <SoldierSprite
                character={character}
                isFlipped={flip}
                state={state}
            />
        case "orc":
            return <OrcSprite
                character={character}
                isFlipped={flip}
                state={state}
            />
    }
};
;