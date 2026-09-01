"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextTurn = void 0;
const index_1 = require("../../index");
const state_1 = require("../../state");
const nextTurn = (msg, ws) => {
    const game = state_1.lobbies.get(msg.roomId);
    if (!game) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Лобби с таким ID не найдено'
        }));
        return;
    }
    game.endTurn();
    (0, index_1.broadcastToRoom)(ws.roomId || msg.roomId, {
        event: 'turn_end',
        game: game.toDTO(),
        playerId: msg.playerId,
        roomId: msg.roomId,
    });
};
exports.nextTurn = nextTurn;
