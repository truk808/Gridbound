import type { IPlayer } from './IPlayers.ts';
import type { ICard } from './ICard.ts'
import type { ICell } from './ICell.ts';
import type {ICharacter} from "./character/ICharacter.ts";

export type GameEventPayloads = {
    'character:moved'?: { player: IPlayer; from: ICell; to: ICell; cost: number };
    'card:played'?: { player: IPlayer; card: ICard; targetCell: ICell | null };
    'character:damaged'?: { targetPlayer: IPlayer; amount: number; currentHp: number };
    'turn:ended'?: { activePlayer: IPlayer };

    'character:died' : { character: ICharacter; };
    'game:over' : { winner: IPlayer | null };
};

export type GameEvent = keyof GameEventPayloads;