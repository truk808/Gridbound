import {broadcastToRoom} from "../index";
import {lobbies, turnTimers} from "../state";

export const startTurnTimer = (roomId: string) => {
    // 1. Сбрасываем текущий таймер комнаты, если он запущен
    clearTurnTimer(roomId);

    const game = lobbies.get(roomId);
    if (!game || game.state !== 'in_progress') return;

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

    turnTimers.set(roomId, timer);
};

export const clearTurnTimer = (roomId: string) => {
    if (turnTimers.has(roomId)) {
        clearTimeout(turnTimers.get(roomId));
        turnTimers.delete(roomId);
    }
};

const handleTurnTimeout = (roomId: string) => {
    const game = lobbies.get(roomId);
    if (!game || game.state !== 'in_progress') return;

    // Передаем ход
    game.endTurn();

    // Запускаем новый таймер для следующего игрока
    startTurnTimer(roomId);

    // Оповещаем всех игроков в комнате
    broadcastToRoom(roomId, {
        event: 'turn_ended',
        game: game.toDTO()
    });
};