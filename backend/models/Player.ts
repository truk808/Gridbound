import type {ICharacter} from "../../types/character/ICharacter";
import type {IDeckManager} from "../../types/IDeckManager";
import type {IPlayer, IPlayerDTO} from "../../types/IPlayer";
import {Decks} from "./Deck";

export class Player implements IPlayer {
    readonly id: string;
    readonly nickname: string;
    private _ap: number;
    private _character: ICharacter | null = null;
    private _cards: IDeckManager = new Decks();

    constructor(nickname: string, ap?: number, id?: string) {
        this.id = id ?? crypto.randomUUID();
        this._ap = ap ?? 0
        this.nickname = nickname;
    }

    get ap() { return this._ap; }
    get character() { return this._character; }
    get cards() { return this._cards; }

    removeAP(ap: number): void {
        throw new Error("Method not implemented.");
    }
    addAP(ap: number): void {
        this._ap += ap;
    }
    setCharacter(character: ICharacter | null): void {
        this._character = character;
    }
    setAP(ap: number): void {
        this._ap = ap;
    }

    toDTO(): IPlayerDTO {
        return {
            id: this.id,
            nickname: this.nickname,
            ap: this._ap,
            character: this._character && this._character.toDTO(),
            cards: this._cards && this._cards.toDTO()
        };
    }
}