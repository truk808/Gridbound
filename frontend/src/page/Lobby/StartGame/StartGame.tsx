import styles from './StartGame.module.css';
import { observer } from "mobx-react-lite";
import {useStartGame} from "./useStartGame.ts";

export const StartGame = observer(({turnDuration}) => {
    const {gameStore, onClickHandle} = useStartGame(turnDuration)

    if (!gameStore.isHost) return null;

    return (
        <button className={`${styles.startButton}`} onClick={onClickHandle}>
            Начать
        </button>
    );
});