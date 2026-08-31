import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import {useOpenProfile} from "./useOpenProfile.ts";

export const OpenProfile = () => {
    const {modal, value, saveName} = useOpenProfile()

    return (
        <>
            <Modal
                active={modal.isOpen}
                setActive={modal.setIsOpen}
            >
                <div>
                    <h2 className={styles.title}>Профиль</h2>
                    <input placeholder={'Никнейм...'} type="text" value={value.value}
                           onChange={(e) => value.setValue(e.target.value)}/>
                    <button onClick={() => saveName()}> сохранить</button>
                </div>
            </Modal>
            <button onClick={() => modal.setIsOpen(true)} className={styles.button}>
                Профиль
            </button>
        </>
    );
};


