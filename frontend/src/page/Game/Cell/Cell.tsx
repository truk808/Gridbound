import styles from './Cell.module.css';
import {observer} from "mobx-react-lite";
import type {ICell, ICellDTO} from "../../../../../types/ICell.ts";
import {SoldierSprite} from "../../../components/characters/Solider/SoldierSprite.tsx";
import type {ICharacter, ICharacterDTO} from "../../../../../types/character/ICharacter.ts";
import {useEffect} from "react";

interface CellProps {
    character: ICharacterDTO | null;
    cell: ICellDTO;
    onClick: () => void;
    selectColorHighlight: "red" | "yellow" | null
}

const Cell = observer(({character, onClick, selectColorHighlight}: CellProps) => {


    return (
        <div onClick={onClick}
             className={`${styles.cell} ${character && styles.hasCharacter} ${selectColorHighlight && styles[selectColorHighlight]}`}>
            {character && (
                <SoldierSprite
                    character={character}
                />
            )}
        </div>
    );
});

export default Cell;