"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTurnTimer = exports.startTurnTimer = void 0;
const state_1 = require("../state");
const startTurnTimer = (roomId) => {
    // 1. Сбрасываем текущий таймер комнаты, если он запущен
    (0, exports.clearTurnTimer)(roomId);
    const game = state_1.lobbies.get(roomId);
    if (!game || game.state !== 'in_progress')
        return;
    // Если время на ход не задано (бесконечный ход), не создаем setTimeout
    if (!game.turnDuration) {
        game.setTurnTimeEnd(null);
        return;
    }
    // 2. Устанавливаем время конца хода (timestamp)
    const turnEndsAt = Date.now() + game.turnDuration * 1000;
    game.setTurnTimeEnd(turnEndsAt);
    // 3. Запускаем setTimeout на сервере
    const timer = setTimeout(() => {
        handleTurnTimeout(roomId);
    }, game.turnDuration * 1000);
    state_1.turnTimers.set(roomId, timer);
};
exports.startTurnTimer = startTurnTimer;
const clearTurnTimer = (roomId) => {
    if (state_1.turnTimers.has(roomId)) {
        clearTimeout(state_1.turnTimers.get(roomId));
        state_1.turnTimers.delete(roomId);
    }
};
exports.clearTurnTimer = clearTurnTimer;
const handleTurnTimeout = (roomId) => {
    const game = state_1.lobbies.get(roomId);
    if (!game || game.state !== 'in_progress')
        return;
    game.endTurn();
    (0, exports.startTurnTimer)(roomId);
    // broadcastToRoom(roomId, {
    //     event: 'turn_end',
    //     game: game.toDTO()
    //
    // });
};
