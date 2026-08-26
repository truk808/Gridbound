import styles from './Cell.module.css';
import {observer} from "mobx-react-lite";
import type {ICell, ICellDTO} from "../../../../../types/ICell.ts";
import {SoldierSprite} from "../../../components/characters/Solider/SoldierSprite.tsx";
import type {ICharacter, ICharacterDTO} from "../../../../../types/character/ICharacter.ts";
import {useEffect} from "react";
import {Character} from "../../../components/characters/Character.tsx";

interface CellProps {
    character: {
        char: ICharacterDTO | null
        flip: boolean
    };
    cell: ICellDTO;
    onClick: () => void;
    selectColorHighlight: "red" | "yellow" | null
}

const Cell = observer(({character, onClick, selectColorHighlight}: CellProps) => {


    return (
        <div onClick={onClick}
             className={`${styles.cell} ${character && styles.hasCharacter} ${selectColorHighlight && styles[selectColorHighlight]}`}>
            {character && (
                <Character
                    state={'idle'}
                    character={character.char}
                    flip={character.flip}
                />
            )}
        </div>
    );
});

export default Cell;