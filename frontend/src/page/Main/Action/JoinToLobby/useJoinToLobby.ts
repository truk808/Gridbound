import {useStore} from "../../../../store/RootStore.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../router/const.ts";

export const useJoinToLobby = () => {
    const { gameStore, socketStore } = useStore();
    const navigate = useNavigate();
    const [isOpen, setIisOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [hasSavedUser, setHasSavedUser] = useState(false);

    function joinToLobby(playerName: string, roomId: string) {
        if (!playerName.trim() || !roomId.trim()) return;

        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'player_joined') {
                console.log("joinToLobby", data);
                gameStore.setLocalPlayerId(data.newPlayer.id);
                setIisOpen(false);
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
        setIisOpen(true);
    }

    function handleJoinClick() {
        const finalName = name.trim();
        if (!finalName || !id.trim()) return;

        if (!hasSavedUser) {
            localStorage.setItem('user_name', finalName);
        }

        joinToLobby(finalName, id.trim());
    }

    return {
        modal: {isOpen, setIisOpen},
        hasSavedUser: {hasSavedUser, setHasSavedUser},
        name: {name, setName},
        id: {id, setId},
        handlers: {handleOpenModal, handleJoinClick}
    }
}