import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";

export const moveCharacter = (msg: ExtractClientMessage<'move_character'>, ws: CustomWebSocket) => {
    const game = lobbies.get(msg.roomId);
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

    if (!player.character) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'Нет персонажа'
        }));
        return;
    }

    if (!msg.targetCell) {
        ws.send(JSON.stringify({
            event: 'error',
            message: 'нет клетки'
        }))
        return;
    }

    const targetCell = game.field.getCellByX(msg.targetCell.x)

    if(player.character.isCanMove(targetCell)) {
        player.character.move(targetCell);
    } else {
        ws.send(JSON.stringify({
            event: 'error',
            message: `персонаж ${player.character.name} не может походить на клетку ${targetCell?.x}`,
        }));
        return;
    }

    console.log(`Персонаж ${player.character.name} перемаестился в ${targetCell?.x}`)

    broadcastToRoom(msg.roomId, {
        event: 'character_moved',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    })
}