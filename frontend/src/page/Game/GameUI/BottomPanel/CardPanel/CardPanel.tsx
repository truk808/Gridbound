import styles from "./CardPanel.module.css"
import {observer} from "mobx-react-lite";
import {useCardPanel} from "./useCardPanel.ts";
import {DeckModal} from "./DeckModal/DeckModal.tsx";
import {Hand} from "./Hand/Hand.tsx";
import type {ICardDTO} from "../../../../../../../types/ICard.ts";

export const CardPanel = observer(() => {
    const {gameStore, deckCards, modalDeck, modalDiscardCards, removeCard, onClickHandle} = useCardPanel()

    return (
        <>
            <DeckModal
                isOpen={modalDeck.isOpenModalDeck}
                setIsOpen={modalDeck.setIsOpenModalDeck}
                cards={deckCards}
            />

            <DeckModal
                isOpen={modalDiscardCards.isOpenModalDiscardCards}
                setIsOpen={modalDiscardCards.setIsOpenModalDiscardCards}
                cards={gameStore.localPlayer?.cards.discardCards ?? []}
            />
            <div className={styles.cardPanel}>
                <div className={styles.deck} onClick={() => modalDeck.setIsOpenModalDeck(true)}>Колода</div>
                <Hand
                    cards={gameStore.localPlayer?.cards.hand ?? []}
                    removeCard={(id:string) => removeCard(id)}
                    onClickHandle={(id:ICardDTO) => onClickHandle(id)}
                    selectedCard={gameStore.selectedCard}
                />
                <div onClick={() => {modalDiscardCards.setIsOpenModalDiscardCards(true)}} className={styles.deck}>Сброс</div>
            </div>
        </>

    );
});

