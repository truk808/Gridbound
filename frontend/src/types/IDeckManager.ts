import type {ICard} from "./ICard.ts";

export interface IDeckManager {
    deck: ICard[];
    discardCards: ICard[];
    hand: ICard[];
    selectedCard: ICard | null;

    setSelectedCard(selectedCard: ICard | null): void
    shuffleDeck(): void
    getSortedDeck(): ICard[]
    setDeck(deck: ICard[]): void

    drawCards(): void;
    takeCard(): void

    discardFromHand(cardInstanceId: string): ICard | null
    recycleDiscard(): void
}