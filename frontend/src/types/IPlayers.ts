import type {ICharacter} from "./character/ICharacter.ts";
import type {ICard} from "./ICard.ts";

export interface IPlayer {
    id: number;
    nickname: string;
    character: ICharacter | null;
    hand: ICard[]
    deck: ICard[]
    discardPile: ICard[]
}