import {createContext, useContext} from "react";
import {Game} from "../models/Game.ts";
import type {IField} from "../types/IField.ts";
import type {IPlayer} from "../types/IPlayers.ts";

export class RootStore {
    game: Game;

    constructor() {
        this.game = new Game();
    }

    newGame = (): void => {
        if (this.game) {
            this.game.destroy();
        }

        this.game = new Game();
    }

    get field(): IField {return this.game.field;}
    get players(): readonly IPlayer[] {return this.game.players;}
    get localPlayer(): IPlayer | null {return this.game.localPlayer;}
    get activePlayer(): IPlayer | null {return this.game.activePlayer;}
}

export const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore>(rootStore);

export const useStore = () => {
    return useContext(RootStoreContext);
};