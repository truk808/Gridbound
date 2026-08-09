import styles from './Cell.module.css';
import { observer } from "mobx-react-lite";
import type { ICell } from "../../../types/ICell.ts";
import { useStore } from "../../../store/RootStore.ts";
import {SoldierSprite} from "../../../components/characters/Solider/SoldierSprite.tsx";

interface CellProps {
    cell: ICell;
    onClick: () => void;
    isSelect: boolean;
}

const Cell = observer(({ cell, onClick, isSelect }: CellProps) => {
    const { characterStore } = useStore();

    const characterOnCell = characterStore.getCharacterByCellIndex(cell.x);

    return (
        <div onClick={onClick} className={`${styles.cell} ${characterOnCell && styles.hasCharacter} ${isSelect && styles.selected}`}>
            {characterOnCell && (
                // <p>{characterOnCell.name}</p>
                <SoldierSprite />
            )}
        </div>
    );
});

export default Cell;