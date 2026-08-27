import type {ICard} from "./ICard.ts";
import type {DeepFieldsOnly} from "../helper/DeepFieldsOnly";

export interface IDeckManager {
    deck: ICard[];
    discardCards: ICard[];
    hand: ICard[];

    shuffleDeck(): void
    getSortedDeck(): ICard[]
    setDeck(deck: ICard[]): void
    drawCards(): void;
    discardCard(cardId: string | null ): void
    takeCard(): void
    getCardById(id: string | null): ICard | null
    discardFromHand(cardInstanceId: string | null): void
    recycleDiscard(): void
    toDTO(): IDeckManagerDTO
}

export type IDeckManagerDTO = DeepFieldsOnly<IDeckManager>