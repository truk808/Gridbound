import styles from "../Action.module.css";
import {useState} from "react";
import Modal from "../../../../components/ui/modal/Modal.tsx";

export const JoinToLobby = () => {
    const [isJoinToLobbyModalOpen, setIsJoinToLobbyModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    function joinToLobby() {
        setIsJoinToLobbyModalOpen(false);
    }

    return (
        <>
            <Modal
                active={isJoinToLobbyModalOpen}
                setActive={setIsJoinToLobbyModalOpen}
            >
                <input type="text" placeholder={'Ваше имя'} value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder={'id сервера'} value={id} onChange={e => setId(e.target.value)} />
                <button onClick={() => joinToLobby()}> далее </button>
            </Modal>
            <button className={styles.button} onClick={() => setIsJoinToLobbyModalOpen(true)}>
                conect
            </button>
        </>

    );
};

