"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLobby = void 0;
const index_1 = require("../../index");
const Player_1 = require("../../models/Player");
const Game_1 = require("../../models/Game");
const state_1 = require("../../state");
const createLobby = (msg, ws) => {
    const newPlayer = new Player_1.Player(msg.playerName);
    ws.playerId = newPlayer.id;
    ws.nickname = newPlayer.nickname;
    ws.roomId = msg.roomId;
    const game = new Game_1.Game(msg.roomId);
    game.addPlayer(newPlayer);
    game.setHostId(newPlayer.id);
    game.setOnGameOver((winner) => {
        (0, index_1.broadcastToRoom)(msg.roomId, {
            event: 'game_over',
            roomId: msg.roomId,
            game: game.toDTO(),
            playerId: winner?.id ?? ''
        });
    });
    state_1.lobbies.set(msg.roomId, game);
    console.log(`Лобби игрока ${newPlayer.nickname} с ID комнаты ${msg.roomId} создано`);
    ws.send(JSON.stringify({
        event: 'lobby_created',
        roomId: msg.roomId,
        game: game.toDTO()
    }));
    return;
};
exports.createLobby = createLobby;
