import styles from './Game.module.css'
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/RootStore.ts";
import Cell from "./Cell/Cell.tsx";
import type {ICell} from "../../types/ICell.ts";
import {GameUi} from "../../components/GameUI/GameUI.tsx";
import type {IPlayer} from "../../types/IPlayers.ts";
import type {ICharacter} from "../../types/character/ICharacter.ts";
import {SOLDIER_DECK_CONFIG} from "../../config/characterDeck/soldierDeck.config.ts";

export const solider: ICharacter = {
    id: "s1",
    name: "Soldier",
    hp: 30,
    armor: 30,
    ap: 3,
    cell: {
        x: 0
    },
};

export const mockPlayer1: IPlayer = {
    id: 1,
    nickname: "Player 1",
    character: null,
    hand: [],
    deck: [],
    discardPile: [],
};

export const wizard: ICharacter = {
    id: "w1",
    name: "Wizard",
    hp: 20,
    armor: 12,
    ap: 3,
    cell: {
        x: 4
    },
};

export const mockPlayer2: IPlayer = {
    id: 2,
    nickname: "Player 2",
    character: null,
    hand: [],
    deck: [],
    discardPile: [],
};

export const Game = observer(() => {
    const {playerStore, gameStore, fieldStore, characterStore, cardStore} = useStore();
    const [selectedCell, setSelectedCell] = useState<ICell | null>(null);

    useEffect(() => {
        fieldStore.initField();
        characterStore.setCharacter(solider, wizard);
        playerStore.setPlayers(mockPlayer1, mockPlayer2);
        playerStore.assignCharacters(solider, wizard);
        playerStore.assignCharacters(solider, wizard);
        cardStore.setDeck(SOLDIER_DECK_CONFIG)
        cardStore.takeCardsIntoHand()
        gameStore.initGame();
    }, []);

    // useEffect(() => {
    //     fieldStore.field.map((cell) => {
    //         console.log(cell.x, cell);
    //     })
    // }, [characterStore]);

    function onClickHandle(cell: ICell) {
        console.log(cell);
        if(selectedCell) {
            if(!characterStore.getCharacterByCellIndex(cell.x)) {
                characterStore.move(characterStore.getCharacterByCellIndex(selectedCell.x), cell)
                setSelectedCell(null);
            }
        } else {
            if(characterStore.getCharacterByCellIndex(cell.x)) {
                setSelectedCell(cell)
            }
        }
    }

    return (
        <div className={styles.arena}>
            <GameUi />
            <div className={styles.grid}>
                <div style={{display: "flex", gap: "10px"}}>
                    {fieldStore.field.map((cell) => (
                        <Cell
                            key={`cell_${cell.x}`} cell={cell}
                            onClick={() => onClickHandle(cell)}
                            isSelect={selectedCell?.x === cell.x}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
});
