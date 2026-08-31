import type {IField} from "./IField.ts";
import type {ICell} from "./ICell.ts";
import type {ICharacter} from "./character/ICharacter.ts";
import type {IPlayer} from "./IPlayer";
import type {DeepFieldsOnly} from "../helper/DeepFieldsOnly";
import type {ICard} from "./ICard";

export type GameStatus = 'waiting' | 'in_progress' | 'ended';

export interface IGame {
    readonly id: string
    readonly field: IField
    state: GameStatus
    players: IPlayer[]
    winnerId: string | null
    activePlayerId: string | null
    hostId: string | null
    turn: number
    timeStart: number | null
    turnTimeEnd: number | null
    turnDuration: number | null

    setPlayers(players: IPlayer[]): void
    setTurnDuration(time: number): void
    endGame(): void
    setWinner(playerId: string): void
    setOnGameOver(callback: (winner: IPlayer | null) => void): void
    getPlayerById(id: string): IPlayer | null
    isCanStart(): boolean
    startGame(): void
    addPlayer(player: IPlayer): void
    removePlayer(playerId: string): void
    getCharacterByCell(cell: ICell): ICharacter | null
    isCanPlayCard(caster: IPlayer, card: ICard | null, targetCell: ICell | null): boolean
    playCard(caster: IPlayer, card: ICard | null, targetCell: ICell | null): void
    endTurn(): void
    setActivePlayerId(playerId: string): void
    setHostId(playerId: string): void
    getAlivePlayersCount(): number
    isPlayerAlive(playerId: string): boolean
    toDTO(): IGameDTO
}

export type IGameDTO = DeepFieldsOnly<IGame>