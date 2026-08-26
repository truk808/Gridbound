import styles from "../Action.module.css";
import Modal from "../../../../components/ui/modal/Modal.tsx";
import {useEffect, useState} from "react";

export const OpenProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            const user = localStorage.getItem('user_name');
            setValue(user ?? '');
        }
    }, [isOpen]);

     function saveName() {
        if (!value.trim()) return;
        localStorage.setItem('user_name', value.trim());
        setIsOpen(false);
    }

    return (
        <>
            <Modal
                active={isOpen}
                setActive={setIsOpen}
            >
                <div>
                    <h2 className={styles.title}>Профиль</h2>
                    <input placeholder={'Никнейм...'} type="text" value={value}
                           onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={() => saveName()}> сохранить</button>
                </div>
            </Modal>
            <button onClick={() => setIsOpen(true)} className={styles.button}>
                Профиль
            </button>
        </>
    );
};


