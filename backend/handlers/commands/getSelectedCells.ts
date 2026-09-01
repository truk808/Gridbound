import {ExtractClientMessage} from "../../../types/socet.type";
import {CustomWebSocket} from "../../index";
import {lobbies} from "../../state";

export const getSelectedCells = (msg: ExtractClientMessage<'get_selected_cells'>, ws: CustomWebSocket) => {
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

    const card = player.cards.getCardById(msg.card?.instanceId ?? null);

    const selectedCells = []
    if (msg.card) {
        for (const cell of game.field.cells) {
            if (game.isCanPlayCard(player, card, cell)) {
                selectedCells.push({
                    x: cell.x,
                    color: 'yellow',
                });
            } else {
                selectedCells.push({
                    x: cell.x,
                    color: null,
                });
            }
        }
    }


    if (msg.cell) {
        const cellChar = game.field.cells.find(c => c.x === msg.cell?.x );
        const character = game.getCharacterByCell(cellChar ?? null)
        for (const cell of game.field.cells) {
            if (character?.isCanMove(cell) &&  player.ap > 0) {
                selectedCells.push({
                    x: cell.x,
                    color: 'yellow',
                });
            } else {
                if (cell.x == cellChar?.x) {
                    selectedCells.push({
                        x: cell.x,
                        color: 'red',
                    });
                }
                selectedCells.push({
                    x: cell.x,
                    color: null,
                });
            }
        }
    }

    ws.send(JSON.stringify({
        event: 'cell_updated',
        roomId: msg.roomId,
        cellsColor: selectedCells,
        playerId: msg.playerId,
    }))
}