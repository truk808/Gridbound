import { makeAutoObservable } from "mobx";
import type { RootStore } from "./RootStore";
import type {IPlayer} from "../types/IPlayers.ts";
import type {ICharacter} from "../types/character/ICharacter.ts";

export class PlayerStore {
    rootStore: RootStore;

    player1: IPlayer | null = null;
    player2: IPlayer | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });
    }

    setPlayers (p1: IPlayer, p2: IPlayer) {
        this.player1 = p1;
        this.player2 = p2;
    }

    assignCharacters(ch1: ICharacter, ch2: ICharacter) {
        if (this.player1) this.player1.character = ch1;
        if (this.player2) this.player2.character = ch2;
    }
}