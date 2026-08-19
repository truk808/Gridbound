import styles from './Main.module.css'
import {Action} from "./Action/Action.tsx";
import {useEffect} from "react";

export const Main = () => {
    useEffect(() => {

    }, []);

    return (
        <div className={styles.main}>
            <Action />
        </div>
    );
};