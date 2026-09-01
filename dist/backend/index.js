"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToRoom = void 0;
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const state_1 = require("./state");
const messageHandler_1 = require("./handlers/messageHandler");
const expressWsInstance = (0, express_ws_1.default)((0, express_1.default)());
const app = expressWsInstance.app;
const PORT = process.env.PORT || 5000;
const broadcastToRoom = (roomId, data, excludeWs) => {
    const wss = expressWsInstance.getWss();
    wss.clients.forEach((client) => {
        const customWs = client;
        if (customWs.roomId === roomId && customWs.readyState === 1 && customWs.playerId !== excludeWs?.playerId) {
            customWs.sendJSON?.(data);
        }
    });
};
exports.broadcastToRoom = broadcastToRoom;
app.ws('/', (ws) => {
    console.log('Новое WebSocket подключение');
    ws.sendJSON = (data) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(data));
        }
    };
    ws.on('message', (rawData) => {
        try {
            const msg = JSON.parse(rawData);
            (0, messageHandler_1.messageHandler)(msg, ws);
        }
        catch (e) {
            console.error('Ошибка парсинга сообщения:', e);
        }
    });
    ws.on('close', () => {
        if (!ws.roomId || !ws.playerId)
            return;
        const lobby = state_1.lobbies.get(ws.roomId);
        if (lobby) {
            const updatedPlayers = lobby.players.filter(p => p.id !== ws.playerId);
            lobby.setPlayers(updatedPlayers);
            if (updatedPlayers.length === 0) {
                state_1.lobbies.delete(ws.roomId);
                console.log('Лобби ', lobby.id, ' закралось ');
            }
            else {
                state_1.lobbies.set(ws.roomId, lobby);
                console.log('Игрок ', ws.nickname, ' вышел из лобби ', ws.roomId);
                (0, exports.broadcastToRoom)(ws.roomId, {
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
