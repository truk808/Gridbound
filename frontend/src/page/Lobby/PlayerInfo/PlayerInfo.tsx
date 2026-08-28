import styles from './PlayerInfo.module.css';
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/RootStore.ts";
import { CHARACTER_CONFIG } from "../../../../../config/character.config.ts";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../router/const.ts";
import {Character} from "../../../components/characters/Character.tsx";

export const PlayersInfo = observer(() => {
    const { gameStore, socketStore } = useStore();
    const { id: roomId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            switch (data.event) {
                case 'player_joined':
                case 'lobby_created':
                case 'player_left':
                case "character_selected":
                    if (data.game) {
                        gameStore.setGame(data.game);
                    }
                    break;
                case 'game_started':
                    if (data.game) {
                        gameStore.setGame(data.game);
                    }
                    navigate(`${ROUTES.GAME}/${roomId}`);
                    break;
            }
        });

        const player = gameStore.localPlayer;

        if (roomId && player) {
            socketStore.send({
                method: 'join_lobby',
                roomId: roomId,
                playerName: player.nickname
            });
        }

        return () => {
            unsubscribe();
        };
    }, [roomId, gameStore.localPlayer?.id]);

    const characterList = Object.values(CHARACTER_CONFIG).map((char) => ({
        id: char.id,
        label: char.name,
    }));

    const chooseCharacter = (characterId: number | null) => {
        const localPlayer = gameStore.localPlayer;
        if (!localPlayer || characterId === null) return;

        const config = Object.values(CHARACTER_CONFIG).find((c) => c.id === characterId);
        if (config) {
            socketStore.send({
                method: 'select_character',
                roomId: roomId,
                playerId: localPlayer.id,
                characterName: config.name
            });
        }
    };

    if (!gameStore.game) return null;

    const players = gameStore.game.players || [];
    const maxPlayers = 2;
    const emptySlotsCount = Math.max(0, maxPlayers - players.length);

    return (
        <div className={styles.playersContainer}>
            {players.map((player, index) => {
                const isLocal = player.id === gameStore.localPlayer?.id;
                const selectedConfig = Object.values(CHARACTER_CONFIG).find((c) => c.name === player.character?.name);
                const selectedId = selectedConfig ? selectedConfig.id : null;
                const isHost = index === 0;

                return (
                    <React.Fragment key={player.id}>
                        {index > 0 && <div className={styles.vsDivider}>VS</div>}
                        <div className={`${styles.playerCard} ${isLocal ? styles.isLocal : ''}`}>
                            {isHost && <div className={styles.hostBadge}>Host</div>}

                            <div className={styles.playerHeader}>
                                <span className={styles.nickname}>{player.nickname}</span>
                            </div>

                            <div className={styles.avatarArea}>
                                <Character
                                    character={player.character}
                                    state={'idle'}
                                    flip={!isHost}
                                />
                            </div>

                            <div className={styles.dropdownContainer}>
                                {isLocal ? (
                                    <Dropdown
                                        items={characterList}
                                        selectedId={selectedId}
                                        onChange={(id: number | null) => chooseCharacter(id)}
                                        placeholder={'Персонаж'}
                                    />
                                ) : (
                                    <span className={styles.characterName}>
                                        {player.character?.name || 'Выбирает персонажа...'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}

            {Array.from({ length: emptySlotsCount }).map((_, index) => (
                <React.Fragment key={`empty-${index}`}>
                    {players.length > 0 && <div className={styles.vsDivider}>VS</div>}
                    <div className={styles.emptySlot}>
                        <div className={styles.waitingBadge}>Ждемс...</div>
                        <span className={styles.emptyText}>Пустой слот</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
});