import {DeckManager} from "./DeckManager.ts";
import {makeAutoObservable} from "mobx";
import type {IPlayer} from "../types/IPlayers.ts";
import type {ICharacter} from "../types/character/ICharacter.ts";
import type {IDeckManager} from "../types/IDeckManager.ts";

export class Player implements IPlayer {
    readonly id: string = crypto.randomUUID();
    readonly nickname: string;
    private _ap: number;
    private _character: ICharacter | null = null;
    private _cards: IDeckManager;

    constructor(nickname: string, maxAp: number = 3) {
        this.nickname = nickname;
        this._ap = maxAp;
        this._cards = new DeckManager();

        makeAutoObservable(this);
    }

    get ap(): number { return this._ap; }
    get character(): ICharacter | null { return this._character; }
    get cards(): IDeckManager { return this._cards; }

    setCharacter(character: ICharacter | null): void {
        this._character = character;
    }

    setAP(ap: number): void {
        this._ap = ap;
    }

    removeAP(ap: number) {
        this._ap -= ap;
    }

    addAP(ap: number): void {
        this._ap += ap;
    }

}