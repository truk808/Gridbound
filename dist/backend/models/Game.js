"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Field_1 = require("./Field");
const EventBus_1 = require("../models/EventBus");
class Game {
    get state() { return this._state; }
    get players() { return this._players; }
    get activePlayerId() { return this._activePlayerId; }
    get hostId() { return this._hostId; }
    get winnerId() { return this._winnerId; }
    get turn() { return this._turn; }
    get turnTimeEnd() { return this._turnTimeEnd; }
    get timeStart() { return this._timeStart; }
    get activePlayer() { return this.getPlayerById(this._activePlayerId); }
    get host() { return this.getPlayerById(this._hostId); }
    get winner() { return this.getPlayerById(this._winnerId); }
    get turnDuration() { return this._turnDuration; }
    constructor(id) {
        this.field = new Field_1.Field(5);
        this._turnDuration = null;
        this._state = 'waiting';
        this._players = [];
        this._activePlayerId = null;
        this._hostId = null;
        this._winnerId = null;
        this._turn = 0;
        this._turnTimeEnd = null;
        this._timeStart = null;
        this._onGameOverCallback = null;
        this.id = id ?? crypto.randomUUID();
        EventBus_1.events.on('character:died', (payload) => this.handleCharacterDeath(payload));
    }
    setTurnDuration(time) {
        this._turnDuration = time;
    }
    getAlivePlayersCount() {
        return this._players.filter(p => p.character && p.character.hp > 0).length;
    }
    isPlayerAlive(playerId) {
        const player = this.getPlayerById(playerId);
        return player?.character ? player.character.hp > 0 : false;
    }
    setOnGameOver(callback) {
        this._onGameOverCallback = callback;
    }
    setPlayers(players) {
        this._players = players;
    }
    getPlayerById(id) {
        const player = this._players.find((player) => player.id === id);
        if (!player)
            return null;
        return player;
    }
    setTurnTimeEnd(date) {
        this._turnTimeEnd = date;
    }
    setTimeStart(date) {
        this._timeStart = date;
    }
    addPlayer(player) {
        if (this._players.some(p => p.id === player.id || p.nickname === player.nickname)) {
            console.warn(`Player ${player.nickname} (${player.id}) already in game ${this.id}`);
            return;
        }
        this._players.push(player);
    }
    endTurn() {
        const playerIndex = this.players.findIndex(player => player.id === this._activePlayerId);
        if (playerIndex + 1 >= this.players.length) {
            this.setActivePlayerId(this.players[0].id);
        }
        else {
            this.setActivePlayerId(this.players[playerIndex + 1].id);
        }
        for (const player of this._players) {
            if (player.character) {
                player.character.tickEffects();
                player.cards.drawCards();
                player.character.setArmorTime(1);
            }
            player.setAP(3);
        }
        this._turn += 1;
        this._turnTimeEnd = +Date.now() + 30000;
    }
    handleCharacterDeath(payload) {
        const deadCharacter = payload.character;
        if (this._state !== 'in_progress')
            return;
        const alivePlayer = this._players.find(p => p.character && p.character.id !== deadCharacter.id && p.character.hp > 0);
        if (alivePlayer && alivePlayer.id) {
            this.setWinner(alivePlayer.id);
            this.endGame();
            if (this._onGameOverCallback) {
                this._onGameOverCallback(alivePlayer);
            }
            EventBus_1.events.emit('game:over', { winner: alivePlayer });
        }
    }
    setWinner(playerId) {
        this._winnerId = playerId;
    }
    endGame() {
        this._state = 'ended';
    }
    getCharacterByCell(cell) {
        if (!cell)
            return null;
        const player = this._players.find(p => p.character?.cell?.x === cell.x);
        return player?.character ?? null;
    }
    isCanStart() {
        if (this._state === 'ended' || this._state === 'in_progress') {
            console.warn(`Нельзя начать игру ${this.id}: Игра начата или закончена`);
            return false;
        }
        if (this._players.length !== 2) {
            console.warn(`Нельзя начать игру ${this.id}: В игре участвуют ровно 2 игрока`);
            return false;
        }
        for (const player of this._players) {
            if (!player.character) {
                console.warn(`Нельзя начать игру ${this.id}: у игрока ${player.nickname} ${player.id} нет персонажа`);
                return false;
            }
            else {
                if (!player.character.cell) {
                    console.warn(`Нельзя начать игру ${this.id}: персонаж ${player.character.name} игрока ${player.nickname} ${player.id} не установлен`);
                    return false;
                }
            }
        }
        return true;
    }
    setState(state) {
        this._state = state;
    }
    startGame() {
        this.setActivePlayerId(this.hostId);
        this.setTimeStart(+new Date());
        if (this._turnDuration !== null) {
            this.setTurnTimeEnd(+new Date() + (this._turnDuration * 1000));
        }
        this.setState('in_progress');
    }
    isCanPlayCard(caster, card, targetCell) {
        if (!card || !targetCell || !caster.character)
            return false;
        const context = {
            caster: caster.character,
            targetCharacter: this.getCharacterByCell(targetCell),
            targetCell: targetCell,
            boardWidth: 5,
        };
        if (caster.character.status.find((stat) => stat.type === 'stun')) {
            return false;
        }
        for (const action of card.actions) {
            if (action.condition && !action.condition(context)) {
                console.log(`Не выполняется условие ${action.condition}`);
                return false;
            }
        }
        // if (!this.getCharacterByCell(targetCell)) return false;
        if (caster.ap - card.apCost < 0)
            return false;
        if (caster.character?.cell && Math.abs(targetCell.x - caster.character?.cell.x) > card.radius)
            return false;
        return true;
    }
    playCard(caster, card, targetCell) {
        if (!card)
            return;
        card.applyEffects(caster, this.getCharacterByCell(targetCell), this.field, targetCell);
        caster.cards.discardFromHand(card?.instanceId ?? null);
        caster.setAP(caster.ap - card.apCost);
    }
    removePlayer(playerId) {
    }
    setActivePlayerId(playerId) {
        this._activePlayerId = playerId;
    }
    setHostId(playerId) {
        this._hostId = playerId;
    }
    toDTO() {
        return {
            id: this.id,
            field: this.field.toDTO(),
            turnDuration: this.turnDuration,
            state: this._state,
            players: this._players.map(player => player.toDTO()),
            activePlayerId: this._activePlayerId,
            hostId: this._hostId,
            winnerId: this._winnerId,
            turn: this._turn,
            turnTimeEnd: this._turnTimeEnd,
            timeStart: this._timeStart,
        };
    }
}
exports.Game = Game;
