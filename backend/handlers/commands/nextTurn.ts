import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";

export const nextTurn = (msg: ExtractClientMessage<'next_turn'>, ws: CustomWebSocket)=> {
    const game = lobbies.get(msg.roomId);
    if (!game) {

        ws.send(JSON.stringify({
            event: 'error',
            message: 'Лобби с таким ID не найдено'
        }));
        return;
    }

    game.endTurn()

    broadcastToRoom(ws.roomId || msg.roomId, {
        event: 'turn_end',
        game: game.toDTO(),
        playerId: msg.playerId,
        roomId: msg.roomId,
    })
}