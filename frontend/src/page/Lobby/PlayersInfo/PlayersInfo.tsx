import styles from './PlayersInfo.module.css';
import React from "react";
import {observer} from "mobx-react-lite";
import {Player} from "../Player/Player.tsx";
import {usePlayersInfo} from "./usePlayersInfo.ts";
import type {IPlayerDTO} from "../../../../../types/IPlayer.ts";

export const PlayersInfo = observer(() => {
    const { character, gameStore, emptySlotsCount } = usePlayersInfo()

    if (!gameStore.game) return null;

    return (
        <div className={styles.playersContainer}>
            {gameStore.game.players.map((player: IPlayerDTO, index: number) => {
                return <Player
                    index={index}
                    key={`lobby_player_${player.id}`}
                    player={player}
                    chooseCharacter={character.chooseCharacter}
                    characterList={character.characterList}
                />
            })}

            {Array.from({length: emptySlotsCount}).map((_, index) => (
                <React.Fragment key={`empty-${index}`}>
                    {gameStore.game?.players && gameStore.game?.players.length > 0 && <div className={styles.vsDivider}>VS</div>}
                    <div className={styles.emptySlot}>
                        <div className={styles.waitingBadge}>Ждемс...</div>
                        <span className={styles.emptyText}>Пустой слот</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
});