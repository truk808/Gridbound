import type { IPlayer } from '../../../types/IPlayers.ts';
import type { ICard } from '../../../types/ICard.ts'
import type { ICell } from '../../../types/ICell.ts';
import type {ICharacter} from "../../../types/character/ICharacter.ts";

export type GameEventPayloads = {
    'character:moved'?: { player: IPlayer; from: ICell; to: ICell; cost: number };
    'card:played'?: { player: IPlayer; card: ICard; targetCell: ICell | null };
    'character:damaged'?: { targetPlayer: IPlayer; amount: number; currentHp: number };
    'turn:ended'?: { activePlayer: IPlayer };

    'character:died' : { character: ICharacter; };
    'game:over' : { winner: IPlayer | null };
};

export type GameEvent = keyof GameEventPayloads;