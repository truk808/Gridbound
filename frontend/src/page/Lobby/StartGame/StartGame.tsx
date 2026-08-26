import {useStore} from "../../../store/RootStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../router/const.ts";
import {useEffect} from "react";

export const StartGame = () => {
    const { gameStore, socketStore } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'game_started') {
                if (data.bool) {
                    console.log('ИГРА НАЧИНАЕТСЯ')
                    // gameStore.setGame(data.);
                    navigate(ROUTES.GAME)
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigate, gameStore, socketStore]);

    const ocClickHandle = () => {
        if (!gameStore.game?.id) return;

        socketStore.send({
            method: 'start_game',
            roomId: gameStore.game?.id,
            playerId: gameStore.localPlayerId
        });
    }

    return (
        <>
            {
                gameStore.isHost &&
                <button disabled={false} onClick={() => {ocClickHandle()}}>
                    начать
                </button>
            }
        </>

    );
};

