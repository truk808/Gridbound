import {CustomWebSocket} from "../index";
import {ClientMessage} from "../../types/socet.type";
import {createLobby} from "./commands/createLobby";
import {joinLobby} from "./commands/joinLobby";
import {startGame} from "./commands/startGame";
import {selectCharacter} from "./commands/selectCharacter";
import {moveCharacter} from "./commands/moveCharacter";
import {playCard} from "./commands/playCard";
import {nextTurn} from "./commands/nextTurn";
import {discardCard} from "./commands/discardCard";

export const messageHandler = (msg: ClientMessage, ws: CustomWebSocket) => {
    if (msg.method === 'create_lobby') {
        createLobby(msg, ws)
        return;
    }

    if (msg.method === 'join_lobby') {
        joinLobby(msg, ws)
        return;
    }

    if (msg.method === 'start_game') {
        startGame(msg, ws)
        return;
    }

    if (msg.method === 'select_character') {
        selectCharacter(msg, ws)
        return;
    }

    if (msg.method === 'move_character') {
        moveCharacter(msg, ws)
        return;
    }

    if (msg.method === 'play_card') {
        playCard(msg, ws)
        return;
    }

    if (msg.method === 'next_turn') {
        nextTurn(msg, ws)
        return;
    }

    if (msg.method === 'discard_card') {
        discardCard(msg, ws)
    }

};