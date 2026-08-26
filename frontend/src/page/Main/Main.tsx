import styles from './Main.module.css'
import {Action} from "./Action/Action.tsx";
import {useEffect} from "react";

export const Main = () => {
    useEffect(() => {

    }, []);

    return (
        <div className={styles.main}>
            <h1 className={styles.name}>GRIDBOUND</h1>
            <span> v0.1.0-alpha </span>
            <div>
                <Action />
            </div>
        </div>
    );
};