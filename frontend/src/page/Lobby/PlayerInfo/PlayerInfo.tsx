import styles from './PlayerInfo.module.css'
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../store/RootStore.ts";
import {CHARACTER_CONFIG} from "../../../../../config/character.config.ts";
import {Dropdown} from "../../../components/ui/dropdown/Dropdown.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "../../../router/const.ts";

export const PlayersInfo = observer(() => {
    const {gameStore, socketStore} = useStore();
    const {id: roomId} = useParams<{ id: string }>();
    const navigate = useNavigate()

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
                    navigate(`${ROUTES.GAME}/${roomId}`)
                    break
            }
        });

        const player = gameStore.localPlayer;

        if (roomId && player) {
            socketStore.send({
                method: 'join_lobby',
                roomId: roomId,
                playerName: player.nickname
            });
        } else {
            console.log('Not sending join_lobby - roomId:', roomId, 'player:', player?.nickname);
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

    if (!gameStore.game) return

    return (
        <div className={styles.players}>
            {(gameStore.game.players).map((player) => {
                const isLocal = player.id === gameStore.localPlayer?.id;
                const selectedConfig = Object.values(CHARACTER_CONFIG).find((c) => c.name === player.character?.name);
                const selectedId = selectedConfig ? selectedConfig.id : null;

                return (
                    <div key={player.id} className={styles.playerInfo}>
                        <span className={styles.player}>{player.nickname}</span>
                        <div className={styles.dropdownContainer}>
                            {isLocal ? (
                                <Dropdown
                                    items={characterList}
                                    selectedId={selectedId}
                                    onChange={(id: number | null) => chooseCharacter(id)}
                                    placeholder={'Персонаж'}
                                />
                            ) : (
                                <span>{player.character?.name || 'Выбирает персонажа...'}</span>
                            )}
                        </div>

                    </div>
                );
            })}
        </div>
    );
});