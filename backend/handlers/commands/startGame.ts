import {ExtractClientMessage} from "../../../types/socet.type";
import {broadcastToRoom, CustomWebSocket} from "../../index";
import {lobbies} from "../../state";
import {CHARACTER_DECK} from "../../../config/characterDeck/characterDeck";
import {createCard} from "../../../helper/createCard";

export const startGame = (msg: ExtractClientMessage<'start_game'>, ws: CustomWebSocket) => {
    const game = lobbies.get(msg.roomId);

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
        if(player.character && player.character.name) {
                const baseDeck = CHARACTER_DECK[player.character.name] || [];
                const clonedDeck = baseDeck.map((c) => createCard((c.id) as any));
                player.cards.setDeck(clonedDeck);
                player.cards.shuffleDeck()
                player.setAP(3)
                player.cards.drawCards();
            }
        }

    game.startGame()

    broadcastToRoom(msg.roomId, {
        event: 'game_started',
        roomId: msg.roomId,
        game: game.toDTO(),
    });
}