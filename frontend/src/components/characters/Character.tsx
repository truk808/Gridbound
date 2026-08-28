import type {ICharacterDTO} from "../../../../types/character/ICharacter.ts";
import styles from "./Character.module.css";

interface Character {
    character: ICharacterDTO | null;
    state: 'idle' | 'walk' | 'attack'
    flip: boolean;
}

export const Character = ({character, state, flip = false}: Character) => {
    if (!character) return

    return (
        <>
            <div className={`${styles.sprite} ${flip ? styles.flipped : ''} ${styles[character.name]}`}/>
        </>
    )
};
