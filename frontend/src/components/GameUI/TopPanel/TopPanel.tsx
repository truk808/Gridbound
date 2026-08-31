import styles from "./TopPanel.module.css";
import { PlayerInfo } from "../PlaterInfo/PlayerInfo.tsx";
import { useStore } from "../../../store/RootStore.ts";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";

export const TopPanel = observer(() => {
    const { gameStore } = useStore();

    const players = useMemo(() => {
        return gameStore.game?.players;
    }, [gameStore.game?.players]);

    if (!gameStore.game || !players) {
        return null;
    }

    const activePlayer = gameStore.getPlayerById(gameStore.game.activePlayerId);

    return (
        <div className={styles.topPanel}>
            <div className={styles.playerInfoWrapper}>
                {players[0] && (
                    <PlayerInfo
                        player={players[0]}
                        isActivePlayer={players[0].id === gameStore.game.activePlayerId}
                        isLocalPlayer={players[0].id === gameStore.localPlayerId}
                    />
                )}
            </div>

            <div className={styles.gameInfo}>
                <span>РАУНД {Math.trunc(gameStore.game.turn / 2) + 1}</span>
                <span>Ход игрока: {activePlayer?.nickname}</span>
            </div>

            <div className={styles.playerInfoWrapper}>
                {players[1] && (
                    <PlayerInfo
                        player={players[1]}
                        isActivePlayer={players[1].id === gameStore.game.activePlayerId}
                        isLocalPlayer={players[1].id === gameStore.localPlayerId}
                    />
                )}
            </div>
        </div>
    );
});