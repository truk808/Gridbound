"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinLobby = void 0;
const index_1 = require("../../index");
const Player_1 = require("../../models/Player");
const state_1 = require("../../state");
const joinLobby = (msg, ws) => {
    const game = state_1.lobbies.get(msg.roomId);
    if (!game) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Лобби с таким ID не найдено'
        }));
        return;
    }
    ws.roomId = msg.roomId;
    let player = game.players.find(p => p.nickname === msg.playerName);
    if (!player) {
        player = new Player_1.Player(msg.playerName);
        game.addPlayer(player);
    }
    ws.playerId = player.id;
    ws.nickname = player.nickname;
    (0, index_1.broadcastToRoom)(msg.roomId, {
        event: 'player_joined',
        roomId: msg.roomId,
        game: game.toDTO(),
        newPlayer: player.toDTO()
    });
    console.log(`Пользователь ${player.nickname} зашел в комнату ${msg.roomId}`);
    return;
};
exports.joinLobby = joinLobby;
