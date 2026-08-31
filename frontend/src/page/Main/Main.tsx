import styles from './Main.module.css'
import {Action} from "./Action/Action.tsx";

export const Main = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.name}>GRIDBOUND</h1>
            <span className={styles.version}> v0.1.0-alpha </span>
            <div>
                <Action />
            </div>
        </div>
    );
};