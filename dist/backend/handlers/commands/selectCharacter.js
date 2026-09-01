"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCharacter = void 0;
const index_1 = require("../../index");
const state_1 = require("../../state");
const createCharacter_1 = require("../../helper/createCharacter");
const selectCharacter = (msg, ws) => {
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
    const character = (0, createCharacter_1.createCharacter)(msg.characterName);
    if (msg.playerId === game.hostId) {
        character.setCell(game.field.getCellByX(0));
    }
    else {
        character.setCell(game.field.getCellByX(4));
    }
    player.setCharacter(character);
    (0, index_1.broadcastToRoom)(msg.roomId, {
        event: 'character_selected',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    });
};
exports.selectCharacter = selectCharacter;
