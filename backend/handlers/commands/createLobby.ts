import {ClientMessage, ExtractClientMessage} from "../../../types/socet.type";
import {CustomWebSocket, broadcastToRoom} from "../../index";
import {Player} from "../../models/Player";
import {Game} from "../../models/Game";
import {lobbies} from "../../state";

export const createLobby = (msg: ExtractClientMessage<'create_lobby'>, ws: CustomWebSocket) => {
    const newPlayer = new Player(msg.playerName);

    ws.playerId = newPlayer.id;
    ws.nickname = newPlayer.nickname;
    ws.roomId = msg.roomId;

    const game = new Game(msg.roomId);
    game.addPlayer(newPlayer);
    game.setHostId(newPlayer.id);

    game.setOnGameOver((winner) => {
        broadcastToRoom(msg.roomId, {
            event: 'game_over',
            roomId: msg.roomId,
            game: game.toDTO(),
            playerId: winner?.id ?? ''
        });
    });

    lobbies.set(msg.roomId, game);
    console.log(`Лобби игрока ${newPlayer.nickname} с ID комнаты ${msg.roomId} создано`);

    ws.send(JSON.stringify({
        event: 'lobby_created',
        roomId: msg.roomId,
        game: game.toDTO()
    }));
    return;
}