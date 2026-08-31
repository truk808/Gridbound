import {useStore} from "../../../store/RootStore.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ROUTES} from "../../../router/const.ts";

export const useStartGame = (turnDuration: number) => {
    const { gameStore, socketStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'game_started') {
                navigate(`${ROUTES.GAME}/${data.roomId}`);
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
            playerId: gameStore.localPlayerId,
            turnDuration: turnDuration
        });
    };

    return {
        gameStore,
        onClickHandle,
    }
}