import {IDeckManager, IDeckManagerDTO} from "../../types/IDeckManager";
import {ICard} from "../../types/ICard";

export class Decks implements IDeckManager{
    private _deck: ICard[] = [];
    private _discardCards: ICard[] = [];
    private _hand: ICard[] = [];

    get hand(): ICard[] { return this._hand; }
    get deck(): ICard[] { return this._deck; }
    get discardCards(): ICard[] { return this._discardCards; }

    discardFromHand(cardInstanceId: string | null): void {
        const cardIndex = this._hand.findIndex((card) => card.instanceId === cardInstanceId);
        if (cardIndex === -1) {
            return;
        }

        const [discardedCard] = this._hand.splice(cardIndex, 1);
        this._discardCards.push(discardedCard);
    }

    drawCards(): void {
        while (this._hand.length < 6 && this._deck.length > 0) {
            this.takeCard()
        }
    }

    getCardById(id: string | null): ICard | null {
        for (const card of this._deck) {
            if (card.instanceId === id) {
                return card;
            }
        }

        for (const card of this._hand) {
            if (card.instanceId === id) {
                return card;
            }
        }

        for (const card of this._discardCards) {
            if (card.instanceId === id) {
                return card;
            }
        }
        return null;
    }

    getSortedDeck(): ICard[] {
        return [];
    }

    recycleDiscard(): void {
    }

    discardCard(cardId: string | null ): void {
        if (!cardId) return;

        const cardIndex = this._hand.findIndex((card) => card.instanceId === cardId);
        if (cardIndex === -1) return ;
        const [discardedCard] = this._hand.splice(cardIndex, 1);
        this._discardCards.push(discardedCard);
    }

    setDeck(deck: ICard[]): void {
        this._deck = deck;
    }

    shuffleDeck(): void {
        this._deck.sort(() =>  Math.random() - 0.5);
    }

    takeCard(): void {
        if (this._deck.length <= 0 && this._discardCards.length != 0) {
            this.recycleDiscard();
        } else if (this._deck.length <= 0 && this._discardCards.length <= 0) {
            return
        }
        const card = this._deck?.pop();
        if (card) {
            this._hand.push(card);
        }
    }

    toDTO(): IDeckManagerDTO {
        return {
            deck: this._deck.map((card) => card.toDTO()),
            discardCards: this._discardCards.map((card) => card.toDTO()),
            hand: this._hand.map((card) => card.toDTO()),
        };
    }
}