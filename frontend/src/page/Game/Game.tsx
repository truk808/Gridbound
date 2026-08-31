import styles from './Game.module.css'
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/RootStore.ts";
import Cell from "./Cell/Cell.tsx";
import type {ICellDTO} from "../../../../types/ICell.ts";
import {GameUi} from "../../components/GameUI/GameUI.tsx";
import {useParams} from "react-router-dom";
import {GameOverModal} from "./GameOverModal/GameOverModal.tsx";

export const Game = observer(() => {
            const {gameStore, socketStore} = useStore();
            const roomId = useParams();

            if (!roomId.id) return

            useEffect(() => {
                console.log('asdsadasd')
            }, []);

            useEffect(() => {
                const unsubscribe = socketStore.onMessage((data) => {
                    switch (data.event) {
                        case "card_played":
                        case 'character_moved':
                        case 'turn_end':
                        case 'card_discarded':
                            console.log("Поле меняется")
                            gameStore.setSelectedCell(null)
                            gameStore.setSelectedCard(null)
                            gameStore.setGame(data.game)
                            break
                    }
                });
                unsubscribe()
            }, []);

            function onClickHandle(cell: ICellDTO) {
                if (gameStore.game?.state !== 'in_progress') {
                    console.log('Game: игра не началась или закончилась')
                    return;
                }

                const localPlayer = gameStore.localPlayer
                const isCanTurn = gameStore.isCanTurn

                if (!localPlayer) {
                    console.log('Game: нет игрока localPlayer')
                    return;
                }
                if (!isCanTurn) {
                    console.log('Game: сайчас не ваш ход')
                    return;
                }

                if (gameStore.selectedCard && !gameStore.selectedCell) {
                    gameStore.setSelectedCell(null)
                    socketStore.send({
                        method: "play_card",
                        roomId: roomId.id ?? '',
                        playerId: localPlayer.id,
                        targetCell: cell,
                        card: gameStore.selectedCard,
                    })
                    // console.log(game.activePlayer?.cards.selectedCard, field.selectedCell)
                    gameStore.setSelectedCard(null)
                    gameStore.setSelectedCell(null)
                    return;
                }

                if (gameStore.selectedCell) {
                    if (!gameStore.getCharacterByCell(cell.x)) {

                        socketStore.send({
                            method: "move_character",
                            roomId: roomId.id ?? '',
                            playerId: localPlayer.id,
                            targetCell: cell,
                            character: localPlayer.character,
                        })
                        gameStore.setSelectedCell(null);
                    }
                } else {
                    if (localPlayer.character === gameStore.getCharacterByCell(cell.x)) {
                        if (gameStore.getCharacterByCell(cell.x)) {
                            gameStore.setSelectedCell(cell)
                        }
                    }

                }
            }

            // const canPlayCardToCell = (card: ICardDTO, targetCell: ICellDTO): boolean => {
            //     socketStore.send({
            //         method: "canPlayCard",
            //         roomId: roomId.id ?? '',
            //         playerId: localPlayer.id,
            //         character: card,
            //         targetCell: targetCell,
            //     })
            // }

            const getColorHighlight = (cell: ICellDTO): 'red' | 'yellow' | null => {
                if (gameStore.selectedCell?.x === cell.x) {
                    return 'red';
                }

                if (gameStore.selectedCard) {
                    if (gameStore.canPlayCardToCell(gameStore.selectedCard, cell)) {
                        return 'yellow';
                    }
                }

                if (gameStore.selectedCell && !gameStore.selectedCard) {
                    if (gameStore.canMoveToCell(cell)) {
                        return 'yellow';
                    }
                }

                return null;
            };

            useEffect(() => {
                console.log('isHost', gameStore.isHost)
            }, [gameStore]);

            if (!gameStore.game) {
                console.log('нет игры')
                return
            }

            return (
                <div className={styles.arena}>
                    <GameUi/>
                    <GameOverModal/>
                    <div className={styles.grid}>
                        <div style={{display: "flex", gap: "10px"}}>
                            {gameStore.game.field.cells.map((cell) => {
                                return (
                                    <Cell
                                        key={`cell_${cell.x}`}
                                        cell={cell}
                                        onClick={() => onClickHandle(cell)}
                                        character={{
                                            char: gameStore.getCharacterByCell(cell.x),
                                            flip: !gameStore.isHost,
                                        }}
                                        selectColorHighlight={getColorHighlight(cell)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>

            );
        }
    )
;
