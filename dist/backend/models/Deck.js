"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decks = void 0;
class Decks {
    constructor() {
        this._deck = [];
        this._discardCards = [];
        this._hand = [];
    }
    get hand() { return this._hand; }
    get deck() { return this._deck; }
    get discardCards() { return this._discardCards; }
    discardFromHand(cardInstanceId) {
        const cardIndex = this._hand.findIndex((card) => card.instanceId === cardInstanceId);
        if (cardIndex === -1) {
            return;
        }
        const [discardedCard] = this._hand.splice(cardIndex, 1);
        this._discardCards.push(discardedCard);
    }
    drawCards() {
        while (this._hand.length < 6 && this._deck.length > 0) {
            this.takeCard();
        }
    }
    getCardById(id) {
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
    getSortedDeck() {
        return [];
    }
    recycleDiscard() {
        this._deck = this._discardCards;
        this._discardCards = [];
    }
    discardCard(cardId) {
        if (!cardId)
            return;
        const cardIndex = this._hand.findIndex((card) => card.instanceId === cardId);
        if (cardIndex === -1)
            return;
        const [discardedCard] = this._hand.splice(cardIndex, 1);
        this._discardCards.push(discardedCard);
    }
    setDeck(deck) {
        this._deck = deck;
    }
    shuffleDeck() {
        this._deck.sort(() => Math.random() - 0.5);
    }
    takeCard() {
        if (this._deck.length <= 0 && this._discardCards.length != 0) {
            // this.recycleDiscard();
        }
        else if (this._deck.length <= 0 && this._discardCards.length <= 0) {
            return;
        }
        const card = this._deck?.pop();
        if (card) {
            this._hand.push(card);
        }
    }
    toDTO() {
        return {
            deck: this._deck.map((card) => card.toDTO()),
            discardCards: this._discardCards.map((card) => card.toDTO()),
            hand: this._hand.map((card) => card.toDTO()),
        };
    }
}
exports.Decks = Decks;
