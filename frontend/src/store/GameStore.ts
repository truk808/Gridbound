import type {RootStore} from "./RootStore.ts";
import type {GameStatus} from "../types/IGame.ts";
import {makeAutoObservable} from "mobx";
import type {IPlayer} from "../types/IPlayers.ts";
import {COUNT_CELL} from "../config/gameConfig.ts";
import type {ICell} from "../types/ICell.ts";

export class GameStore {
    rootStore: RootStore;

    turnEndTime: number | null = null;
    timeStart: number | null = null;
    status: GameStatus = "waiting";
    round: number | null = null;
    currentTurnPlayerId: number | null = null;
    winnerId: number | null = null;
    players: {
        player1: IPlayer ,
        player2: IPlayer,
    } | null = null;
    field: ICell[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, { rootStore: false });
    }

    initGame() {
        const { player1, player2 } = this.rootStore.playerStore;
        const { field } = this.rootStore.fieldStore;
        const { character1,  character2 } = this.rootStore.characterStore;

        if (field.length != COUNT_CELL) {
            console.log('Нельзя начать игру: не созданы поля')
            return;
        }

        if (!player1 || !player2) {
            console.log("Нельзя начать игру: один из игроков не создан")
            return
        }

        if (!character1 || !character2) {
            console.log("Нельзя начать игру: нет персонажей")
            return;
        }


        this.timeStart = Date.now();
        this.status = "in_progress"
        this.round = 1
        this.currentTurnPlayerId = player1.id
        this.players = {
            player1,
            player2,
        }
        this.turnEndTime = Date.now() + 30 * 1000;
        this.field = field
    }
}