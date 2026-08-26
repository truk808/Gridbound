import styles from './Action.module.css';
import {CreateLobby} from "./CreateLobby/CreateLobby.tsx";
import {JoinToLobby} from "./JoinToLobby/JoinToLobby.tsx";
import {OpenProfile} from "./OpenProfile/OpenProfile.tsx";

export const Action = () => {

    return (
        <div className={styles.buttonContainer}>
            <CreateLobby/>
            <JoinToLobby/>
            <OpenProfile/>
            <button className={styles.button}>
                Настройки
            </button>
        </div>
    );
};