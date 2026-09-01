"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const Deck_1 = require("./Deck");
class Player {
    constructor(nickname, ap, id) {
        this._character = null;
        this._cards = new Deck_1.Decks();
        this.id = id ?? crypto.randomUUID();
        this._ap = ap ?? 0;
        this.nickname = nickname;
    }
    get ap() { return this._ap; }
    get character() { return this._character; }
    get cards() { return this._cards; }
    removeAP(ap) {
        throw new Error("Method not implemented.");
    }
    addAP(ap) {
        this._ap += ap;
    }
    setCharacter(character) {
        this._character = character;
    }
    setAP(ap) {
        this._ap = ap;
    }
    toDTO() {
        return {
            id: this.id,
            nickname: this.nickname,
            ap: this._ap,
            character: this._character && this._character.toDTO(),
            cards: this._cards && this._cards.toDTO()
        };
    }
}
exports.Player = Player;
