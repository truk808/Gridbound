import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {Player} from "../../models/Player";
import {lobbies} from "../../state";

export const joinLobby = (msg: ExtractClientMessage<'join_lobby'>, ws: CustomWebSocket ) => {
    const game = lobbies.get(msg.roomId);

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
        player = new Player(msg.playerName);
        game.addPlayer(player);
    }

    ws.playerId = player.id;
    ws.nickname = player.nickname;

    broadcastToRoom(msg.roomId, {
        event: 'player_joined',
        roomId: msg.roomId,
        game: game.toDTO(),
        newPlayer: player.toDTO()
    });

    console.log(`Пользователь ${player.nickname} зашел в комнату ${msg.roomId}`);
    return;
}