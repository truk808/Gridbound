import styles from './Cell.module.css';
import {observer} from "mobx-react-lite";
import type {ICellDTO} from "../../../../../types/ICell.ts";
import type {ICharacterDTO} from "../../../../../types/character/ICharacter.ts";
import {Character} from "../../../components/Сharacter/Character.tsx";

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
                    key={character.char?.id}
                    state={'idle'}
                    character={character.char}
                    flip={character.flip}
                />
            )}
        </div>
    );
});

export default Cell;