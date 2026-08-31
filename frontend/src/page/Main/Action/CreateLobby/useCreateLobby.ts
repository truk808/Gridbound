import {useStore} from "../../../../store/RootStore.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../../router/const.ts";

export const useCreateLobby = () => {
    const { gameStore, socketStore } = useStore();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

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

    return {
        modal: {isOpen, setIsOpen},
        name: {name, setName},
        handlers: {handleCreateLobbyClick, handleSaveNameAndCreate}
    }
}