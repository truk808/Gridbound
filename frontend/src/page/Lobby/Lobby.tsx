import {observer} from "mobx-react-lite/src/observer.ts";
import {PlayersInfo} from "./PlayerInfo/PlayerInfo.tsx";
import {StartGame} from "./StartGame/StartGame.tsx";
import {useParams} from "react-router-dom";
import styles from './Lobby.module.css'

const Lobby = observer(() => {
    const param = useParams()

    function copyId() {
        navigator.clipboard.writeText(param.id ?? '');
    }

    return (
        <div className={styles.lobby}>
            <div className={styles.top}>
                <h1> Лобби </h1>
                <span> lobby id: {param.id} </span>
                <button onClick={copyId}>+</button>
            </div>
            {/*<div>Настройки</div>*/}
            <div className={styles.players}>
                <PlayersInfo/>
            </div>
            <div className={styles.start}>
                <StartGame/>
            </div>
        </div>
    );
});
export default Lobby

