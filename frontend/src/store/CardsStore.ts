import type {ICard} from "../types/ICard.ts";
import type {RootStore} from "./RootStore.ts";
import {makeAutoObservable} from "mobx";

export class CardStore {
    rootStore: RootStore;

    deck: ICard[] = [];
    hand: ICard[] = [];
    discardPile: ICard[] = [];

    selectedCard: ICard | null = null;
    isTargeting: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {rootStore: false});
    }

    setDeck(deck: ICard[]) {
        this.deck = deck;
    }

    setHand(hand: ICard[]) {
        this.hand = hand;
    }

    getHand() {
        return this.hand;
    }

    getSelectedCard() {
        return this.selectedCard;
    }

    setSelectedCard(selectedCard: ICard) {
        this.selectedCard = selectedCard
    }

    addCardToDiscardPile(card: ICard) {
        this.discardPile.push(card);
    }

    takeCardsIntoHand() {
        while (this.hand.length < 6 && this.deck.length > 0) {
            const card = this.deck.pop();
            if (card) {
                this.hand.push(card);
            }
        }
    }
}