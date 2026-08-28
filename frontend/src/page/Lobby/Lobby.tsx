import { observer } from "mobx-react-lite";
import { PlayersInfo } from "./PlayerInfo/PlayerInfo";
import { StartGame } from "./StartGame/StartGame";
import { useParams } from "react-router-dom";
import styles from './Lobby.module.css';

const Lobby = observer(() => {
    const param = useParams();

    function copyId() {
        if (param.id) {
            navigator.clipboard.writeText(param.id);
        }
    }

    return (
        <div className={styles.lobby}>
            <div className={styles.top}>
                <h1>Лобби</h1>
                <div className={styles.lobbyIdContainer}>
                    <span className={styles.lobbyIdText}>
                        Lobby ID: <span className={styles.lobbyIdValue}>{param.id}</span>
                    </span>
                    <button className={styles.copyBtn} onClick={copyId} title="Copy ID">
                        #
                    </button>
                </div>
            </div>

            <div className={styles.mainContent}>
                <PlayersInfo />
            </div>

            <div className={styles.start}>
                <StartGame />
            </div>
        </div>
    );
});

export default Lobby;