import {useStore} from "../../../../../store/RootStore.ts";
import {useMemo, useState} from "react";
import type {ICardDTO} from "../../../../../../../types/ICard.ts";

export const useCardPanel = () => {
    const {gameStore, socketStore} = useStore()
    const [isOpenModalDeck, setIsOpenModalDeck] = useState<boolean>(false)
    const [isOpenModalDiscardCards, setIsOpenModalDiscardCards] = useState<boolean>(false)

    function onClickHandle(card: ICardDTO) {
        gameStore.setSelectedCell(null)
        if(gameStore.selectedCard?.instanceId === card.instanceId) {
            gameStore.setSelectedCard(null)
            socketStore.send({
                method: 'get_selected_cells',
                roomId: gameStore.game?.id ?? '',
                playerId: gameStore.localPlayer?.id ?? '',
            })
            return;
        }
        gameStore.setSelectedCard(card)
        socketStore.send({
            method: 'get_selected_cells',
            roomId: gameStore.game?.id ?? '',
            playerId: gameStore.localPlayer?.id ?? '',
            card: card,
        })
    }

    const removeCard = (id: string) => {
        console.log(id)
        socketStore.send({
            method: 'discard_card',
            cardId: id,
            roomId: gameStore.game?.id ?? '',
            playerId: gameStore.localPlayer?.id ?? '',
        })
    }

    //!!! карты должны перемешиваться на сервере
    const deckCards = useMemo(() => {
        return gameStore.localPlayer?.cards.deck
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [])

    return {
        gameStore: gameStore,
        deckCards: deckCards ?? [],
        modalDeck: {isOpenModalDeck, setIsOpenModalDeck},
        modalDiscardCards: {isOpenModalDiscardCards, setIsOpenModalDiscardCards},
        removeCard,
        onClickHandle,
    }
}