import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
    active: boolean;
    setActive: (flag: boolean) => void;
    children: React.ReactNode;
}

const Modal = ({ active, setActive, children }: ModalProps) => {
    if (!active) return null;

    return createPortal(
        <div
            className={`${styles.modal} ${styles.active}`}
            onClick={() => setActive(false)}
        >
            <div
                className={`${styles.modalContent} ${styles.active}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;