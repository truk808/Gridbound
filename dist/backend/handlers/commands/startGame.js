"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = void 0;
const index_1 = require("../../index");
const state_1 = require("../../state");
const characterDeck_1 = require("../../../config/characterDeck/characterDeck");
const createCard_1 = require("../../helper/createCard");
const startGame = (msg, ws) => {
    const game = state_1.lobbies.get(msg.roomId);
    if (!game) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Лобби с таким ID не найдено'
        }));
        return;
    }
    if (game.hostId !== msg.playerId) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Начать игру может только хост'
        }));
        return;
    }
    // const isCanStart = game.isCanStart();
    if (false) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нельзя начать игру'
        }));
        return;
    }
    for (const player of game.players) {
        if (player.character && player.character.name) {
            const baseDeck = characterDeck_1.CHARACTER_DECK[player.character.name] || [];
            const clonedDeck = baseDeck.map((c) => (0, createCard_1.createCard)((c.id)));
            player.cards.setDeck(clonedDeck);
            player.cards.shuffleDeck();
            player.setAP(3);
            player.cards.drawCards();
        }
    }
    game.startGame();
    (0, index_1.broadcastToRoom)(msg.roomId, {
        event: 'game_started',
        roomId: msg.roomId,
        game: game.toDTO(),
    });
};
exports.startGame = startGame;
