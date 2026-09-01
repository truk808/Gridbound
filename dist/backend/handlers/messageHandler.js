"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = void 0;
const createLobby_1 = require("./commands/createLobby");
const joinLobby_1 = require("./commands/joinLobby");
const startGame_1 = require("./commands/startGame");
const selectCharacter_1 = require("./commands/selectCharacter");
const moveCharacter_1 = require("./commands/moveCharacter");
const playCard_1 = require("./commands/playCard");
const nextTurn_1 = require("./commands/nextTurn");
const discardCard_1 = require("./commands/discardCard");
const getSelectedCells_1 = require("./commands/getSelectedCells");
const messageHandler = (msg, ws) => {
    if (msg.method === 'create_lobby') {
        (0, createLobby_1.createLobby)(msg, ws);
        return;
    }
    if (msg.method === 'join_lobby') {
        (0, joinLobby_1.joinLobby)(msg, ws);
        return;
    }
    if (msg.method === 'start_game') {
        (0, startGame_1.startGame)(msg, ws);
        return;
    }
    if (msg.method === 'select_character') {
        (0, selectCharacter_1.selectCharacter)(msg, ws);
        return;
    }
    if (msg.method === 'move_character') {
        (0, moveCharacter_1.moveCharacter)(msg, ws);
        return;
    }
    if (msg.method === 'play_card') {
        (0, playCard_1.playCard)(msg, ws);
        return;
    }
    if (msg.method === 'next_turn') {
        (0, nextTurn_1.nextTurn)(msg, ws);
        return;
    }
    if (msg.method === 'discard_card') {
        (0, discardCard_1.discardCard)(msg, ws);
    }
    if (msg.method === 'get_selected_cells') {
        (0, getSelectedCells_1.getSelectedCells)(msg, ws);
    }
};
exports.messageHandler = messageHandler;
