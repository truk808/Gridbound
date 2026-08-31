import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import {useCreateLobby} from "./useCreateLobby.ts";

export const CreateLobby = () => {
    const { modal, name, handlers } = useCreateLobby()

    return (
        <>
            <Modal
                active={modal.isOpen}
                setActive={modal.setIsOpen}
            >
                <h2 className={styles.title}>Создать лобби</h2>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name.name}
                    onChange={e => name.setName(e.target.value)}
                />
                <button onClick={handlers.handleSaveNameAndCreate}>Далее</button>
            </Modal>

            <button className={styles.button} onClick={handlers.handleCreateLobbyClick}>
                Создать лобби
            </button>
        </>
    );
};