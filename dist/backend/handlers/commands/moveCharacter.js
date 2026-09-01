"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCharacter = void 0;
const index_1 = require("../../index");
const state_1 = require("../../state");
const moveCharacter = (msg, ws) => {
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
    if (!player.character) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нет персонажа'
        }));
        return;
    }
    if (!msg.targetCell) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'нет клетки'
        }));
        return;
    }
    const targetCell = game.field.getCellByX(msg.targetCell.x);
    if (player.character.isCanMove(targetCell)) {
        if (player.ap - 1 < 0)
            return;
        player.character.move(targetCell);
        player.setAP(player.ap - 1);
    }
    else {
        ws.send(JSON.stringify({
            event: 'error',
            message: `персонаж ${player.character.name} не может походить на клетку ${targetCell?.x}`,
        }));
        return;
    }
    console.log(`Персонаж ${player.character.name} перемаестился в ${targetCell?.x}`);
    (0, index_1.broadcastToRoom)(msg.roomId, {
        event: 'character_moved',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    });
};
exports.moveCharacter = moveCharacter;
