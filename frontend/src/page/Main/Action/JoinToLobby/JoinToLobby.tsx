import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import {useJoinToLobby} from "./useJoinToLobby.ts";

export const JoinToLobby = () => {
    const {modal, hasSavedUser, name, id, handlers} = useJoinToLobby()

    return (
        <>
            <Modal
                active={modal.isOpen}
                setActive={modal.setIisOpen}
            >
                <h2 className={styles.title}> Присоединиться </h2>
                {!hasSavedUser.hasSavedUser && (
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name.name}
                        onChange={e => name.setName(e.target.value)}
                    />
                )}
                <input
                    type="text"
                    placeholder="ID сервера"
                    value={id.id}
                    onChange={e => id.setId(e.target.value)}
                />
                <button onClick={handlers.handleJoinClick}>Далее</button>
            </Modal>

            <button className={styles.button} onClick={handlers.handleOpenModal}>
                Присоединиться
            </button>
        </>
    );
};