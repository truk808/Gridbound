import styles from './Game.module.css';
import { observer } from "mobx-react-lite";
import Cell from "./Cell/Cell.tsx";
import { GameOverModal } from "./GameOverModal/GameOverModal.tsx";
import { GameUi } from "./GameUI/GameUI.tsx";
import { useGame } from "./useGame.ts";
import {ICellColor} from "../../../../types/ICell.ts";

export const Game = observer(() => {
    const { onClickHandle, gameStore } = useGame();

    return (
        <div className={styles.arena}>
            <GameUi />
            <GameOverModal />
            <div className={styles.grid}>
                <div style={{ display: "flex", gap: "10px" }}>
                    {gameStore.game?.field.cells.map((cell) => {
                        const char = gameStore.getCharacterByCell(cell.x);
                        const owner = gameStore.game?.players.find(p => p.character?.id === char?.id);
                        const isSecondPlayer = owner && owner.id !== gameStore.game?.hostId;
                        return (
                            <Cell
                                key={`cell_${cell.x}`}
                                cell={cell}
                                onClick={() => onClickHandle(cell)}
                                character={{char: char, flip: Boolean(isSecondPlayer)}}
                                selectColorHighlight={(gameStore.colorCells.find(c => c.x === cell.x)?.color ?? null) as "red" | "yellow" | null}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
});