import express from 'express';
import expressWs from 'express-ws';
import type {ClientMessage, ServerMessage} from '../types/socet.type'
import type { WebSocket } from 'ws';
import {lobbies} from "./state";
import {turnTimers} from './state'
import {messageHandler} from "./handlers/messageHandler";

const expressWsInstance = expressWs(express());
const app = expressWsInstance.app;
const PORT = process.env.PORT || 5000;

export interface CustomWebSocket extends WebSocket {
    playerId?: string;
    nickname?: string;
    roomId?: string;

    sendJSON?: (data: ServerMessage) => void;
}

export const broadcastToRoom = (roomId: string, data: ServerMessage, excludeWs?: CustomWebSocket) => {
    const wss = expressWsInstance.getWss();
    wss.clients.forEach((client) => {
        const customWs = client as CustomWebSocket;
        if (customWs.roomId === roomId && customWs.readyState === 1 && customWs.playerId !== excludeWs?.playerId) {
            customWs.sendJSON?.(data);
        }
    });
};

app.ws('/', (ws: CustomWebSocket) => {
    console.log('Новое WebSocket подключение');

    ws.sendJSON = (data: ServerMessage) => {
        if(ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(data));
        }
    }

    ws.on('message', (rawData: string) => {
        try {
            const msg: ClientMessage = JSON.parse(rawData);

            messageHandler(msg, ws)

        } catch (e) {
            console.error('Ошибка парсинга сообщения:', e);
        }
    });

    ws.on('close', () => {
        if (!ws.roomId || !ws.playerId) return;

        const lobby = lobbies.get(ws.roomId);
        if (lobby) {
            const updatedPlayers = lobby.players.filter(p => p.id !== ws.playerId);
            lobby.setPlayers(updatedPlayers);

            if (updatedPlayers.length === 0) {
                lobbies.delete(ws.roomId);
                console.log('Лобби ', lobby.id, ' закралось ');
            } else {
                lobbies.set(ws.roomId, lobby);
                console.log('Игрок ', ws.nickname, ' вышел из лобби ', ws.roomId);
                broadcastToRoom(ws.roomId, {
                    event: 'player_left',
                    roomId: ws.roomId,
                    playerId: ws.playerId,
                    game: lobby.toDTO()
                });
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});