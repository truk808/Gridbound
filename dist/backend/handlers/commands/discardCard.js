"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discardCard = void 0;
const state_1 = require("../../state");
const discardCard = (msg, ws) => {
    const game = state_1.lobbies.get(msg.roomId);
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
        }));
        return;
    }
    if (player.ap - 1 < 0)
        return;
    player.cards.discardCard(msg.cardId);
    player.setAP(player.ap - 1);
    player.cards.takeCard();
    if (player.cards.deck.length <= 0) {
        player.character?.setHp(player.character.hp - 16);
        player.cards.recycleDiscard();
    }
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
    });
};
exports.discardCard = discardCard;
