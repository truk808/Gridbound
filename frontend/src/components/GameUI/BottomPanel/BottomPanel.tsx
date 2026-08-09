import styles from "./BottomPanel.module.css"
import {GameStats} from "./GameStats/GameStats.tsx";
import {CardPanel} from "./CardPanel/CardPanel.tsx";

export const BottomPanel = () => {
    return (
        <div className={styles.bottomPanel}>
            <GameStats />
            <CardPanel />
        </div>
    );
};

