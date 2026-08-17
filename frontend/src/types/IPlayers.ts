import type {ICharacter} from "./character/ICharacter.ts";
import type {IDeckManager} from "./IDeckManager.ts";

export interface IPlayer {
    readonly id: string;
    readonly nickname: string;
    ap: number;
    character: ICharacter | null;
    cards: IDeckManager;

    removeAP(ap: number): void;
    addAP(ap: number): void
    setCharacter(character: ICharacter | null): void
    setAP(ap: number): void
}