"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playCard = void 0;
const index_1 = require("../../index");
const state_1 = require("../../state");
const playCard = (msg, ws) => {
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
    const card = player.cards.getCardById(msg.card?.instanceId ?? null);
    const targetCell = game.field.getCellByX(msg.targetCell?.x ?? null);
    if (!targetCell || !card) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нет targetCell и card'
        }));
        return;
    }
    if (game.isCanPlayCard(player, card, targetCell)) {
        game.playCard(player, card, targetCell);
        if (player.cards.deck.length <= 0) {
            player.character?.setHp(player.character.hp - 16);
            player.cards.recycleDiscard();
        }
        console.log(`игрок ${player.nickname} разыграл карту ${card.name} на поле ${targetCell.x}`);
    }
    else {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Эту карту нельзя применить'
        }));
        return;
    }
    (0, index_1.broadcastToRoom)(msg.roomId, {
        event: 'card_played',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    });
};
exports.playCard = playCard;
