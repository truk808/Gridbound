import styles from './Cell.module.css';
import {observer} from "mobx-react-lite";
import type {ICell} from "../../../types/ICell.ts";
import {SoldierSprite} from "../../../components/characters/Solider/SoldierSprite.tsx";
import type {ICharacter} from "../../../types/character/ICharacter.ts";

interface CellProps {
    character: ICharacter | null;
    cell: ICell;
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