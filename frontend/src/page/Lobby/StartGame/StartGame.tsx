import styles from './StartGame.module.css';
import { useStore } from "../../../store/RootStore.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/const.ts";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

export const StartGame = observer(() => {
    const { gameStore, socketStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'game_started' && data.bool) {
                navigate(ROUTES.GAME);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate, gameStore, socketStore]);

    const onClickHandle = () => {
        if (!gameStore.game?.id) return;

        socketStore.send({
            method: 'start_game',
            roomId: gameStore.game?.id,
            playerId: gameStore.localPlayerId
        });
    };

    if (!gameStore.isHost) return null;

    return (
        <button className={styles.startButton} onClick={onClickHandle}>
            Начать
        </button>
    );
});