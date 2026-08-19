import styles from './Game.module.css'
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/RootStore.ts";
import Cell from "./Cell/Cell.tsx";
import type {ICell} from "../../types/ICell.ts";
import {GameUi} from "../../components/GameUI/GameUI.tsx";
import {Player} from "../../models/Player.ts";
import {Character} from "../../models/Character.ts";
import {createCard} from "../../utils/createCard.ts";


export const Game = observer(() => {
    const {game, field} = useStore();

    useEffect(() => {
        // const p1 = new Player("Player 1", 100);
        const p2 = new Player("Player 2", 3);
        const ch1 = new Character("s", 100);
        const ch2 = new Character("orc", 2);

        ch1.setCell(field.getCellByIndex(0))
        ch2.setCell(field.getCellByIndex(4))
        p1.setCharacter(ch1);
        p2.setCharacter(ch2);

        // p1.cards.setDeck(SOLDIER_DECK_CONFIG);
        p1.cards.setDeck([
            createCard('REGENERATION'),
            // createCard('HIT'),
            // createCard('HIT'),
            createCard('HIT'),
        ]);
        game.addPlayer(p1);

        game.setLocalPlayerId(p1.id)
        game.setActivePlayerId(p1.id)
        p1.cards.drawCards()

        game.addPlayer(p2);
        game.startGame();
    }, []);

    // useEffect(() => {
    //     if (player1?.cards)  {
    //         console.log('deck', player1.cards.deck.map((a) => a))
    //         console.log('hand', player1.cards.hand.map((a) => a))
    //     }
    // }, [player1?.cards.deck, player1?.cards.hand]);

    function onClickHandle(cell: ICell) {
        const localPlayer = game.localPlayer
        const activePlayer = game.activePlayer

        if (!localPlayer) {
            console.log('Game: нет игрока localPlayer')
            return;
        }
        if (!activePlayer) {
            console.log('Game: нет игрока activePlayer')
            return;
        }

        if (localPlayer !== activePlayer) {
            console.log('Game: сечас ход игрока ', activePlayer)
            return;
        }

        if (localPlayer.cards.selectedCard && !field.selectedCell) {
            game.playCard(localPlayer.cards.selectedCard, cell)
            // console.log(game.activePlayer?.cards.selectedCard, field.selectedCell)
            localPlayer.cards.setSelectedCard(null)
            field.setSelectedCell(null)
            return;
        }

        if (field.selectedCell) {
            if (!game.getCharacterByCell(cell)) {
                game.getCharacterByCell(field.selectedCell)?.move(cell)
                field.setSelectedCell(null);
            }
        } else {
            if (localPlayer.character === game.getCharacterByCell(cell)) {
                if (game.getCharacterByCell(cell)) {
                    field.setSelectedCell(cell)
                }
            }

        }
    }

    const getColorHighlight = (cell: ICell): 'red' | 'yellow' | null => {
        if (field.selectedCell) {
            if (field.selectedCell === cell) {
                return 'red'
            } else if (game.getCharacterByCell(field.selectedCell)?.isCanMove(cell)) {
                return 'yellow'
            }
        }

        if (game.localPlayer?.cards.selectedCard?.isCanUse(game.localPlayer, cell)) {
            return 'yellow'
        }
        return null
    }

    return (
        <div className={styles.arena}>
            <GameUi/>
            <div className={styles.grid}>
                <div style={{display: "flex", gap: "10px"}}>
                    {game.field.cells.map((cell) => (
                        <Cell
                            key={`cell_${cell.x}`} cell={cell}
                            onClick={() => onClickHandle(cell)}
                            character={game.getCharacterByCell(cell)}
                            selectColorHighlight={getColorHighlight(cell)}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
});
