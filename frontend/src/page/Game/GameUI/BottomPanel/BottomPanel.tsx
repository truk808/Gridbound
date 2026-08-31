import styles from "./BottomPanel.module.css"
import {CardPanel} from "./CardPanel/CardPanel.tsx";

export const BottomPanel = () => {
    return (
        <div className={styles.bottomPanel}>
            <CardPanel/>
        </div>
    );
};

