import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";

export const discardCard = (msg: ExtractClientMessage<'discard_card'>, ws: CustomWebSocket) => {
    const game = lobbies.get(msg.roomId);
    if (!game) {

        ws.send(JSON.stringify({
            event: 'error',
            message: 'Лобби с таким ID не найдено'
        }));
        return;
    }

    const player = game.getPlayerById(msg.playerId);
    if (!player) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нет игрока с таким id'
        }));
        return;
    }

    if (!msg.cardId) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'нет карты id'
        }))
        return;
    }

    player.cards.discardCard(msg.cardId);
    player.setAP(player.ap - 1)
    player.cards.takeCard()

    // broadcastToRoom(msg.roomId, {
        // event: 'card_discarded',
        // game: game.toDTO(),
        // roomId: msg.roomId,
        // playerId: player.id
    // })

    ws.sendJSON({
        event: 'card_discarded',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: player.id
    })
}