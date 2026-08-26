import {createContext, useContext} from "react";
import {Game} from "../models/Game.ts";

import {SocketStore} from "../models/SocketStore.ts";

export class RootStore {
    gameStore: Game;
    socketStore: SocketStore;

    constructor() {
        this.gameStore = new Game();
        this.socketStore = new SocketStore();
    }
}

export const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore>(rootStore);

export const useStore = () => {
    return useContext(RootStoreContext);
};