import type {IPlayer} from "./IPlayers.ts";
import type {IField} from "./IField.ts";
import {Player} from "../models/Player.ts";
import type {ICell} from "./ICell.ts";
import type {ICharacter} from "./character/ICharacter.ts";
import type {Card} from "../models/Card.ts";

export type GameStatus = 'waiting' | 'in_progress' | 'ended';

export interface IGame {
    readonly id: string
    readonly field: IField
    winner: IPlayer | null
    state: GameStatus
    players: IPlayer[]
    activePlayer: IPlayer | null
    localPlayer: IPlayer | null
    round: number
    timeStart: number

    isCanStart(): boolean
    startGame(): void
    addPlayer(player: Player): void
    getCharacterByCell(cell: ICell): ICharacter | null
    playCard(card: Card | null, targetCell: ICell | null): void
    endTurn(): void
    setActivePlayerId(playerId: string): void
}