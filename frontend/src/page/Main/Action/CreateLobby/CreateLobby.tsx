import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import { useState } from "react";
import { useStore } from "../../../../store/RootStore.ts";
import { ROUTES } from "../../../../router/const.ts";
import { useNavigate } from "react-router-dom";

export const CreateLobby = () => {
    const { gameStore, socketStore } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    function createLobby(playerName: string) {
        if (!playerName.trim()) return;

        const roomId = Date.now().toString(16);

        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === "lobby_created") {
                gameStore.setGame(data.game);

                if (!data.game.hostId) {
                    console.error('Нет хоста');
                    unsubscribe();
                    return;
                }

                gameStore.setLocalPlayerId(data.game.hostId);
                setIsOpen(false);
                unsubscribe();
                navigate(`${ROUTES.LOBBY}/${data.roomId}`);
            }
        });

        socketStore.send({
            method: "create_lobby",
            roomId: roomId,
            playerName: playerName.trim(),
        });
    }

    function handleCreateLobbyClick() {
        const savedUser = localStorage.getItem('user_name');

        if (savedUser) {
            createLobby(savedUser);
        } else {
            setIsOpen(true);
        }
    }

    function handleSaveNameAndCreate() {
        if (!name.trim()) return;
        localStorage.setItem('user_name', name.trim());
        createLobby(name.trim());
    }

    return (
        <>
            <Modal
                active={isOpen}
                setActive={setIsOpen}
            >
                <h2 className={styles.title}>Создать лобби</h2>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={handleSaveNameAndCreate}>Далее</button>
            </Modal>

            <button className={styles.button} onClick={handleCreateLobbyClick}>
                Создать лобби
            </button>
        </>
    );
};