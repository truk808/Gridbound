import {useStore} from "../../../store/RootStore.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../router/const.ts";

export const StartGame = () => {
    const { game } = useStore()
    const navigate = useNavigate()

    return (
        <>
            {
                game.localPlayer?.id === game.host?.id &&
                <button disabled={!game.isCanStart()} onClick={() => {navigate(ROUTES.GAME)}}>
                    начать
                </button>
            }
        </>

    );
};

