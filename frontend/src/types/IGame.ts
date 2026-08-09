import type {IPlayer} from "./IPlayers.ts";
import type {IField} from "./IField.ts";

export type GameStatus = 'waiting' | 'in_progress' | 'ended';

export interface IGame {
    id: number;
    players: {
        player1: IPlayer;
        player2: IPlayer;
    }
    timeStart: Date
    round: number;
    currentTurnPlayerId: number;
    turnEndTime: Date
    winnerId: number | null ;
    field: IField;
}