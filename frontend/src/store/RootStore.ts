import { createContext, useContext } from "react";
import { GameStore } from "./GameStore";
import { PlayerStore } from "./PlayerStore";
import  {FieldStore} from "./FieldStore.ts";
import {CharacterStore} from "./CharacterStore.ts";
import  {CardStore} from "./CardsStore.ts";

export class RootStore {
    gameStore: GameStore;
    playerStore: PlayerStore;
    fieldStore: FieldStore;
    characterStore: CharacterStore
    cardStore: CardStore;

    constructor() {
        this.gameStore = new GameStore(this);
        this.playerStore = new PlayerStore(this);
        this.fieldStore = new FieldStore(this);
        this.characterStore = new CharacterStore(this);
        this.cardStore = new CardStore(this);
    }
}

export const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore>(rootStore);

export const useStore = () => {
    return useContext(RootStoreContext);
};