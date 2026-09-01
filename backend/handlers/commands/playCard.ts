import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";

export const playCard = (msg: ExtractClientMessage<'play_card'>, ws: CustomWebSocket) => {
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


    const card = player.cards.getCardById(msg.card?.instanceId ?? null);
    const targetCell = game.field.getCellByX(msg.targetCell?.x ?? null)

    if (!targetCell || !card) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нет targetCell и card'
        }));
        return;
    }

    if (game.isCanPlayCard(player, card, targetCell)) {
        game.playCard(player, card, targetCell);
        if(player.cards.deck.length <= 0) {
            player.character?.setHp(player.character.hp - 16)
            player.cards.recycleDiscard()
        }
        console.log(`игрок ${player.nickname} разыграл карту ${card.name} на поле ${targetCell.x}`)
    } else {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Эту карту нельзя применить'
        }));
        return;
    }

    broadcastToRoom(msg.roomId, {
        event: 'card_played',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    })
}