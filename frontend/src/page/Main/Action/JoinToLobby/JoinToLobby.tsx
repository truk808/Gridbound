import styles from "../Action.module.css";
import { useState } from "react";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../router/const.ts";
import { useStore } from "../../../../store/RootStore.ts";

export const JoinToLobby = () => {
    const { gameStore, socketStore } = useStore();
    const [isJoinToLobbyModalOpen, setIsJoinToLobbyModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [hasSavedUser, setHasSavedUser] = useState(false);
    const navigate = useNavigate();

    function joinToLobby(playerName: string, roomId: string) {
        if (!playerName.trim() || !roomId.trim()) return;

        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'player_joined') {
                console.log("joinToLobby", data);
                gameStore.setLocalPlayerId(data.newPlayer.id);
                setIsJoinToLobbyModalOpen(false);
                unsubscribe();
                navigate(`${ROUTES.LOBBY}/${roomId}`);
            }

            if (data.event === 'error') {
                alert(data.message);
                unsubscribe();
            }
        });

        socketStore.send({
            method: 'join_lobby',
            roomId: roomId.trim(),
            playerName: playerName.trim()
        });
    }

    function handleOpenModal() {
        const savedUser = localStorage.getItem('user_name');
        if (savedUser) {
            setName(savedUser);
            setHasSavedUser(true);
        } else {
            setName("");
            setHasSavedUser(false);
        }
        setIsJoinToLobbyModalOpen(true);
    }

    function handleJoinClick() {
        const finalName = name.trim();
        if (!finalName || !id.trim()) return;

        if (!hasSavedUser) {
            localStorage.setItem('user_name', finalName);
        }

        joinToLobby(finalName, id.trim());
    }

    return (
        <>
            <Modal
                active={isJoinToLobbyModalOpen}
                setActive={setIsJoinToLobbyModalOpen}
            >
                <h2 className={styles.title}> Присоединиться </h2>
                {!hasSavedUser && (
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                )}
                <input
                    type="text"
                    placeholder="ID сервера"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <button onClick={handleJoinClick}>Далее</button>
            </Modal>

            <button className={styles.button} onClick={handleOpenModal}>
                Присоединиться
            </button>
        </>
    );
};