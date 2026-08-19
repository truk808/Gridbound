import {makeAutoObservable} from "mobx";
import {Field} from "./Field.ts";
import {Player} from "./Player.ts";
import type {GameStatus, IGame} from "../types/IGame.ts";
import type {ICell} from "../types/ICell.ts";
import type {ICharacter} from "../types/character/ICharacter.ts";
import type {IPlayer} from "../types/IPlayers.ts";
import type {IField} from "../types/IField.ts";
import type {ICard} from "../types/ICard.ts";
import {events} from "./EventBus.ts";

export class Game implements IGame {
    readonly id: string = crypto.randomUUID();
    readonly field: IField = new Field();
    private _hostId: string | null = null;
    private _state: GameStatus = "waiting";
    private _players: IPlayer[] = [];
    private _activePlayerId: string | null = null;
    private _localPlayerId: string | null = null;
    private _turn: number = 2;
    private _timeStart: number = 0;
    private _winner: IPlayer | null = null;

    constructor() {
        makeAutoObservable(this);

        events.on('character:died', this.handleCharacterDied)
    }

    get winner(): IPlayer | null { return this._winner }
    get state(): GameStatus {return this._state}
    get players(): IPlayer[] {return this._players}
    get activePlayer(): IPlayer | null {return this.getPlayerById(this._activePlayerId);}
    get localPlayer(): IPlayer | null {return this.getPlayerById(this._localPlayerId);}
    get round(): number {return this._turn;}
    get timeStart(): number {return this._timeStart;}
    get host(): IPlayer | null {return this.getPlayerById(this._hostId);}

    // !!!
    private handleCharacterDied = ({ character }: { character: ICharacter }) => {
        const ownerPlayer = this.players.find(p => p.character?.id === character.id);

        if (ownerPlayer) {
            ownerPlayer.setCharacter(null);
        }

        this.checkGameOver();
    };

    checkGameOver() {
        for(const player of this.players) {
            if (player.character !== null) {
                this._winner = player
                console.log('игра окончена победил ', player.nickname)
            }
        }
    }

    setLocalPlayerId(playerId: string): void {
        this._localPlayerId = playerId;
    }

    setHostId(hostId: string): void {
        this._hostId = hostId;
    }

    setActivePlayerId(playerId: string): void {
        this._activePlayerId = playerId;
        this._localPlayerId = playerId;
    }

    getPlayerById(id: string | null): IPlayer | null {
        const player = this._players.find(p => p.id === id);
        if (!player) return null;
        return player;
    }

    isCanStart() {
        if (this._players.length !== 2) {
            console.log('нет игроков достаточного кол-ва игроков')
            return false;
        } else {
            for (const player of this._players) {
                if (!player.character) {
                    console.log(`у игрока ${player.nickname} нет персонажа`)
                    return false;
                } else {
                    if (!player.character.cell) {
                        console.log(`персонаж ${player.character.name} игрока ${player.nickname} не установлен`)
                        return false;
                    }
                }
            }

            if (this._localPlayerId && this.getPlayerById(this._localPlayerId)?.cards.deck.length === 0) {
                console.log(`у игрока ${this.localPlayer?.nickname} нет карт`)
                return false;
            }
        }

        return true;
    }

    startGame() {
        if (!this.isCanStart()) {
            console.log("Нельзя начать игру!");
            return;
        }

        this._timeStart = Date.now();
        this._turn = 1
    }

    addPlayer(player: Player) {
        this._players.push(player);
    }

    getCharacterByCell(cell: ICell): ICharacter | null {
        for (const player of this._players) {
            if (player.character && player.character.cell?.x === cell.x) {
                return player.character;
            }
        }
        return null;
    }

    playCard(card: ICard, targetCell: ICell) {
        const player = this.localPlayer
        const targetCharacter = this.getCharacterByCell(targetCell);

        if (!player) return;

        if (!card.isCanUse(player, targetCell)) {
            return
        }
        player.setAP(player.ap - card.apCost);
        card?.applyEffects(player, targetCharacter)
        player.cards.discardFromHand(card.instanceId)

        events.emit('card:played', {
            card,
            player,
            targetCell,
        })
    }

    endTurn(): void {
        this.field.setSelectedCell(null)
        this.localPlayer?.cards.setSelectedCard(null)

        for (const player of this._players) {
            if (player.character) {
                player.character.tickEffects()
            }
        }

        const nextPlayer = this._players.find(p => p.id !== this._activePlayerId);

        if(nextPlayer) {
            this._activePlayerId = nextPlayer.id;
        }

        this._turn += 1

        if(this._turn % 2 === 1) {
            this.localPlayer?.cards.drawCards()
            this.localPlayer?.setAP(3)
            this.localPlayer?.character?.setArmor(0)
        }
    }

    destroy() {
        events.off('character:died', this.handleCharacterDied);
        console.log("Старый экземпляр игры успешно уничтожен.");
    }

}