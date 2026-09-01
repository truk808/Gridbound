import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";
import {Character} from "../../models/Character";
import {createCharacter} from "../../helper/createCharacter";

export const selectCharacter = (msg: ExtractClientMessage<'select_character'>, ws: CustomWebSocket ) => {
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

    const character = createCharacter(msg.characterName as import('../../../types/character/ICharacter').CharacterName);
    if (msg.playerId === game.hostId) {
        character.setCell(game.field.getCellByX(0))
    } else {
        character.setCell(game.field.getCellByX(4))
    }

    player.setCharacter(character);

    broadcastToRoom(msg.roomId, {
        event: 'character_selected',
        game: game.toDTO(),
        roomId: msg.roomId,
        playerId: msg.playerId,
    })
}