import {makeAutoObservable} from "mobx";

import type {ICardDTO} from "../../../types/ICard.ts";
import type {ICellDTO} from "../../../types/ICell.ts";
import type {IGameDTO} from "../../../types/IGame.ts";
import type {ICharacterDTO} from "../../../types/character/ICharacter.ts";
import type {IPlayerDTO} from "../../../types/IPlayer.ts";

export class Game {
    private _game: IGameDTO | null = null;
    private _localPlayerId: string = '';

    selectedCard: ICardDTO | null = null;
    selectedCell: ICellDTO | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get game() {
        return this._game;
    }

    get localPlayerId() {
        return this._localPlayerId;
    }

    get localPlayer() {
        return (this._game?.players ?? []).find((player) => player.id === this.localPlayerId);
    }

    get isHost() {
        return this._game?.hostId === this._localPlayerId;
    }

    get isCanTurn() {
        return this._game?.activePlayerId === this._localPlayerId;
    }

    setGame(game: IGameDTO) {
        this._game = {...game};
    }

    setLocalPlayerId(playerId: string) {
        this._localPlayerId = playerId;
    }

    setSelectedCard(selectedCard: ICardDTO | null) {
        this.selectedCard = selectedCard;
    }

    setSelectedCell(cell: ICellDTO | null) {
        this.selectedCell = cell;
    }

    getCharacterByCell(x: number): ICharacterDTO | null {
        if (!this.game) return null;

        for (const player of (this.game?.players ?? [])) {
            if (player.character && player.character.cell && player.character.cell.x === x) {
                return player.character;
            }
        }
        return null;
    }

    getPlayerById(id: string | null): IPlayerDTO | null {
        return this.game?.players.find((player) => player.id === id) ?? null;
    }

    // !!!
    canMoveToCell(targetCell: ICellDTO): boolean {
        if (!this.localPlayer || !this.localPlayer.character || !this.isCanTurn) return false;

        const char = this.localPlayer.character;
        if (!char.cell) return false;

        const distance = Math.abs(char.cell.x - targetCell.x);

        const isOccupied = !!this.getCharacterByCell(targetCell.x);
        const hasEnoughAP = this.localPlayer.ap >= 1;

        return distance === 1 && !isOccupied && hasEnoughAP;
    }

    // !!!
    canPlayCardToCell(card: ICardDTO, targetCell: ICellDTO): boolean {
        // if (!this.selectedCard || !this.localPlayer || !this.isCanTurn || !this.localPlayer.character || !this.localPlayer.character.cell) return false;
        //
        // if (this.localPlayer.ap < this.selectedCard.apCost) return false;
        //
        // console.log(card.radius < Math.abs(targetCell?.x - this.localPlayer.character.cell?.x))
        // if (card.radius < Math.abs(targetCell?.x - this.localPlayer.character.cell?.x)) return false;

        // const targetChar = this.getCharacterByCell(targetCell.x);

        // const myCharX = this.localPlayer.character?.cell?.x ?? 0;
        // const distance = Math.abs(myCharX - targetCell.x);

        // return distance <= this.selectedCard.radius && !!targetChar;

        return false;
    }

    getCharacterByPlayer(playerId: string): ICharacterDTO | null {
        return this._game?.players.find((player) => player.id === playerId)?.character ?? null;
    }
}