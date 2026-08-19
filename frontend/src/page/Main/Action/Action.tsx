import styles from './Action.module.css';
import {CreateLobby} from "./CreateLobby/CreateLobby.tsx";
import {JoinToLobby} from "./JoinToLobby/JoinToLobby.tsx";

export const Action = () => {


    return (
            <div className={styles.buttonContainer}>
                <CreateLobby />
                <JoinToLobby />
                <button className={styles.button}>
                    Настройки
                </button>
            </div>

    );
};