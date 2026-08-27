import type {IGameDTO} from "./IGame";
import type {IPlayerDTO} from "./IPlayer";
import type {ICharacterDTO} from "./character/ICharacter";
import type {ICellDTO} from "./ICell";
import type {ICardDTO} from "./ICard";


export type ServerMessage =
    | { event: 'lobby_created'; roomId: string; game: IGameDTO }
    | { event: 'player_left'; roomId: string; playerId: string, game: IGameDTO }
    | { event: 'player_joined'; roomId: string; game: IGameDTO, newPlayer: IPlayerDTO }
    | { event: 'character_selected'; roomId: string; game: IGameDTO, playerId: string  }
    | { event: 'game_started'; roomId: string, game: IGameDTO}
    | { event: 'character_moved'; roomId: string, game: IGameDTO, playerId: string }
    | { event: 'card_played'; roomId: string, game: IGameDTO, playerId: string }
    | { event: 'turn_end'; roomId: string, game: IGameDTO, playerId: string }
    | { event: 'card_discarded'; roomId: string, game: IGameDTO, playerId: string }
    | { event: 'error'; message: string };

export type ClientMessage =
    | { method: 'create_lobby'; roomId: string, playerName: string, }
    | { method: 'join_lobby'; roomId: string, playerName: string }
    | { method: 'select_character'; roomId: string, playerId: string, characterName: string }
    | { method: 'start_game'; roomId: string, playerId: string }
    | { method: 'move_character'; roomId: string, playerId: string, character: ICharacterDTO | null, targetCell: ICellDTO | null }
    | { method: 'play_card'; roomId: string, playerId: string, card: ICardDTO | null, targetCell: ICellDTO | null, selectedCell?: ICellDTO | null }
    | { method: 'next_turn'; roomId: string, playerId: string}
    | { method: 'discard_card'; roomId: string, playerId: string, cardId: string
}


export type ExtractClientMessage<M extends ClientMessage['method']> = Extract<ClientMessage, { method: M }>;