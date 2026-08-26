import styles from "./CardPanel.module.css"
import {Card} from "../../../Card/Card.tsx";
import type {ICardDTO} from "../../../../../../types/ICard.ts";
import {observer} from "mobx-react-lite/src/observer.ts";
import {useStore} from "../../../../store/RootStore.ts";
import {useEffect, useState} from "react";
import Modal from "../../../ui/modal/Modal.tsx";

export const CardPanel = observer(() => {
    const {gameStore} = useStore()
    const [isOpenModalDeck, setIsOpenModalDeck] = useState<boolean>(false)
    const [isOpenModalDiscardCards, setIsOpenModalDiscardCards] = useState<boolean>(false)

    useEffect(() => {
        // console.log(game.players[0].cards.)
    }, []);

    function onClickHandle(card: ICardDTO) {
        gameStore.setSelectedCell(null)
        if(gameStore.selectedCard?.instanceId === card.instanceId) {
            gameStore.setSelectedCard(null)
            return;
        }
        gameStore.setSelectedCard(card)
        // if (players[0].cards.selectedCard) {
        //
        // } else {
        //     players[0].cards.setSelectedCard(card)
        // }
    }

    return (
        <div className={styles.cardPanel}>
            <Modal
                active={isOpenModalDeck}
                setActive={setIsOpenModalDeck}
            >
                <div className={styles.a}>
                    {
                        gameStore.localPlayer?.cards.deck.map((card) => {
                            return <Card
                                key={card.id}
                                onClick={() => {
                                }}
                                isSelected={false}
                                name={card.name}
                                image={card.image}
                                ap={card.apCost}
                                description={card.description}
                            />
                        })
                    }
                </div>
            </Modal>
            <Modal
                active={isOpenModalDiscardCards}
                setActive={setIsOpenModalDiscardCards}
            >
                <div className={styles.a}>
                    {
                        gameStore.localPlayer?.cards.discardCards.map((card) => {
                            return <Card
                                key={card.id}
                                onClick={() => {
                                }}
                                isSelected={false}
                                name={card.name}
                                image={card.image}
                                ap={card.apCost}
                                description={card.description}
                            />
                        })
                    }
                </div>

            </Modal>
            <div className={styles.deck} onClick={() => setIsOpenModalDeck(true)}>Колода</div>
            <div className={styles.hand}>
                {
                    gameStore.localPlayer?.cards.hand.map((card) => {
                        return <Card
                            onClick={() => onClickHandle(card)}
                            key={`hand-${card.instanceId}`}
                            image={card.image}
                            name={card.name}
                            isSelected={gameStore.selectedCard?.instanceId === card.instanceId}
                            description={card.description}
                            ap={card.apCost}
                        />
                    })
                }
            </div>
            <div onClick={() => {
                setIsOpenModalDiscardCards(true)
            }} className={styles.deck}>Сброс
            </div>
        </div>
    );
});

