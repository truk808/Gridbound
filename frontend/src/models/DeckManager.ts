import {makeAutoObservable} from "mobx";
import type {Card} from "./Card.ts";
import type {ICard} from "../../../types/ICard.ts";
import type {IDeckManager} from "../../../types/IDeckManager.ts";

export class DeckManager implements IDeckManager{
    private _deck: ICard[] = [];
    private _hand: ICard[] = [];
    private _discardCards: ICard[] = [];
    selectedCard: ICard | null = null;

    constructor(initialDeck: Card[] = []) {
        this._deck = initialDeck;
        makeAutoObservable(this);
    }

    get deck(): ICard[] { return this._deck; }
    get hand(): ICard[] { return this._hand; }
    get discardCards(): ICard[] { return this._discardCards; }

    shuffleDeck(): void {
        const shuffled = [...this._deck];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this._deck = shuffled;
    }

    setSelectedCard(selectedCard: ICard | null): void {
        this.selectedCard = selectedCard;
    }

    getSortedDeck(): ICard[] {
        return this._deck.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    recycleDiscard(): void {
        this.setDeck(this.discardCards);
        this._discardCards = [];
    }

    drawCards() {
        while (this._hand.length < 6 && this._deck.length != 0) {
            this.takeCard()
        }
    }

    takeCard(): void {
        if (this._deck.length <= 0 && this._discardCards.length >= 0) {
            console.log('Card: нет карт в колоде и сбросе')
            return
        };

        if (this._deck.length <= 0) {
            this.recycleDiscard()
        }

        const card = this._deck.pop()
        if (card) {
            this.hand.push(card);
        }
    }

    discardFromHand(cardInstanceId: string): ICard | null {
        const index = this.hand.findIndex((c) => c.instanceId === cardInstanceId);
        if (index === -1) return null;

        const [card] = this.hand.splice(index, 1);
        this._discardCards.push(card);
        return card;
    }
}