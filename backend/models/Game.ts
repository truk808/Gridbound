import {Field} from "./Field";
import {GameStatus, IGame, IGameDTO} from "../../types/IGame";
import {IPlayer} from "../../types/IPlayer";
import {IField} from "../../types/IField";
import {ICell} from "../../types/ICell";
import {ICharacter} from "../../types/character/ICharacter";
import {Card} from "../../frontend/src/models/Card";
import {ICard} from "../../types/ICard";

export class Game implements IGame {
    readonly id: string
    readonly field: IField = new Field(5)
    private _state: GameStatus = 'waiting'
    private _players: IPlayer[] = []
    private _activePlayerId: string | null = null
    private _hostId: string | null = null
    private _winnerId: string | null = null
    private _turn: number = 0
    private _turnTimeEnd: number | null = null
    private _timeStart: number | null = null

    get state() {
        return this._state
    }

    get players() {
        return this._players
    }

    get activePlayerId() {
        return this._activePlayerId
    }

    get hostId() {
        return this._hostId
    }

    get winnerId() {
        return this._winnerId
    }

    get turn() {
        return this._turn
    }

    get turnTimeEnd(): number | null {
        return this._turnTimeEnd
    }

    get timeStart(): number | null {
        return this._timeStart
    }

    get activePlayer() {
        return this.getPlayerById(this._activePlayerId)
    }

    get host() {
        return this.getPlayerById(this._hostId)
    }

    get winner() {
        return this.getPlayerById(this._winnerId)
    }

    constructor(id?: string) {
        this.id = id ?? crypto.randomUUID();
    }

    setPlayers(players: IPlayer[]): void {
        this._players = players;
    }

    getPlayerById(id: string | null): IPlayer | null {
        const player = this._players.find((player) => player.id === id)
        if (!player) return null;
        return player
    }

    setTurnTimeEnd(date: number | null): void {
        this._turnTimeEnd = date
    }

    setTimeStart(date: number | null): void {
        this._timeStart = date
    }


    addPlayer(player: IPlayer): void {
        if (this._players.some(p => p.id === player.id || p.nickname === player.nickname)) {
            console.warn(`Player ${player.nickname} (${player.id}) already in game ${this.id}`);
            return;
        }
        this._players.push(player);
    }

    endTurn(): void {
        const playerIndex = this.players.findIndex(player => player.id === this._activePlayerId);
        if (playerIndex + 1 >= this.players.length) {
            this.setActivePlayerId(this.players[0].id)
        } else {
            this.setActivePlayerId(this.players[playerIndex + 1].id)
        }

        for (const player of this._players) {
            if(player.character) {
                player.character.tickEffects()
            }
        }

        this._turn += 1
        this._turnTimeEnd = +Date.now() + 30000
    }

    getCharacterByCell(cell: ICell | null): ICharacter | null {
        if (!cell) return null;

        const player = this._players.find(p => p.character?.cell?.x === cell.x);
        return player?.character ?? null;
    }

    isCanStart(): boolean {
        if (this._state === 'ended' || this._state === 'in_progress') {
            console.warn(`Нельзя начать игру ${this.id}: Игра начата или закончена`)
            return false;
        }

        if (this._players.length !== 2) {
            console.warn(`Нельзя начать игру ${this.id}: В игре участвуют ровно 2 игрока`)
            return false;
        }

        for (const player of this._players) {
            if (!player.character) {
                console.warn(`Нельзя начать игру ${this.id}: у игрока ${player.nickname} ${player.id} нет персонажа`)
                return false;
            } else {
                if (!player.character.cell) {
                    console.warn(`Нельзя начать игру ${this.id}: персонаж ${player.character.name} игрока ${player.nickname} ${player.id} не установлен`)
                    return false;
                }
            }
        }

        return true;
    }

    setState(state: GameStatus): void {
        this._state = state;
    }

    startGame(): void {
        this.setActivePlayerId(this.hostId);
        this.setTimeStart(+new Date())
        this.setTurnTimeEnd(+new Date() + 30000)
        this.setState('in_progress')
    }

    isCanPlayCard(caster: IPlayer, card: ICard | null, targetCell: ICell | null): boolean {
        if (!card || !targetCell) return false;
        // if (!this.getCharacterByCell(targetCell)) return false;
        console.log('card.radius', card.radius)
        if (caster.character?.cell && Math.abs(targetCell.x - caster.character?.cell.x) > card.radius) return false;
        return true;
    }

    playCard(caster: IPlayer, card: ICard | null, targetCell: ICell | null): void {
        card?.applyEffects(caster, this.getCharacterByCell(targetCell), this.field, targetCell);
        caster.cards.discardFromHand(card?.instanceId ?? null)
    }

    removePlayer(playerId: string): void {
    }

    setActivePlayerId(playerId: string | null): void {
        this._activePlayerId = playerId;
    }

    setHostId(playerId: string | null): void {
        this._hostId = playerId;
    }

    toDTO(): IGameDTO {
        return {
            id: this.id,
            state: this._state,
            field: this.field.toDTO(),
            players: this._players.map(player => player.toDTO()),
            activePlayerId: this._activePlayerId,
            hostId: this._hostId,
            winnerId: this._winnerId,
            turn: this._turn,
            turnTimeEnd: this._turnTimeEnd,
            timeStart: this._timeStart
        };
    }
}