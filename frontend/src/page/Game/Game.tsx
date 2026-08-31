import styles from './Game.module.css'
import {observer} from "mobx-react-lite";
import Cell from "./Cell/Cell.tsx";
import {GameOverModal} from "./GameOverModal/GameOverModal.tsx";
import {GameUi} from "./GameUI/GameUI.tsx";
import {useGame} from "./useGame.ts";

export const Game = observer(() => {
    const { getColorHighlight, onClickHandle, gameStore} = useGame()

    return (
        <div className={styles.arena}>
            <GameUi/>
            <GameOverModal/>
            <div className={styles.grid}>
                <div style={{display: "flex", gap: "10px"}}>
                    {gameStore.game?.field.cells.map((cell) => {
                        return (
                            <Cell
                                key={`cell_${cell.x}`}
                                cell={cell}
                                onClick={() => onClickHandle(cell)}
                                character={{
                                    char: gameStore.getCharacterByCell(cell.x),
                                    flip: !gameStore.isHost,
                                }}
                                selectColorHighlight={gameStore.colorCells.find(c => c.x === cell.x)?.color ?? null}
                            />
                        )
                    })}
                </div>
            </div>
        </div>

    );
});
