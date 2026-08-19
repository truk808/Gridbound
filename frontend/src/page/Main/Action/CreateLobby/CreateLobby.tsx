import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import {useState} from "react";
import {Player} from "../../../../models/Player.ts";
import {useStore} from "../../../../store/RootStore.ts";
import {ROUTES} from "../../../../router/const.ts";
import {useNavigate} from "react-router-dom";

export const CreateLobby = () => {
    const {game, newGame} = useStore();
    const [isCreateLobbyModalOpen, setIsCreateLobbyModalOpen] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    function createLobby() {
        // newGame()
        const player1 = new Player(name, 3)
        game.addPlayer(player1)
        game.setLocalPlayerId(player1.id);
        game.setHostId(player1.id)
        setIsCreateLobbyModalOpen(false)
        navigate(ROUTES.LOBBY)
    }

    return (
        <>
            <Modal
                active={isCreateLobbyModalOpen}
                setActive={setIsCreateLobbyModalOpen}
            >
                <input type="text" placeholder={'Ваше имя'} value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => createLobby()}> далее </button>
            </Modal>
            <button className={`${styles.button}`} onClick={() => setIsCreateLobbyModalOpen(true)}>
                создать лобби
            </button>
        </>

);
};

