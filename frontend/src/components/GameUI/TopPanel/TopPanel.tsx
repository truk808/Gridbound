import styles from "./TopPanel.module.css";
import { PlayerInfo } from "../PlaterInfo/PlayerInfo.tsx";
import { useStore } from "../../../store/RootStore.ts";
import { observer } from "mobx-react-lite";

export const TopPanel = observer(() => {
    const { game, players, activePlayer } = useStore();

    return (
        <div className={styles.topPanel}>
            <div className={styles.playerInfoWrapper}>
                {players[0] && <PlayerInfo player={players[0]} isActivePlayer={players[0].id === activePlayer?.id}/>}
            </div>

            <div className={styles.gameInfo}>
                <span>РАУНД {Math.trunc(game.round / 2)}</span>
                <span>Ход игрока: {`${game?.activePlayer?.nickname}`}</span>
                <span>До конца хода: 30с</span>
            </div>

            <div className={styles.playerInfoWrapper}>
                {players[1] && <PlayerInfo player={players[1]} isActivePlayer={players[1].id === activePlayer?.id} />}
            </div>
        </div>
    );
});