import {TopPanel} from "./TopPanel/TopPanel.tsx";
import {BottomPanel} from "./BottomPanel/BottomPanel.tsx";
import styles from "./GameUI.module.css"

export const GameUi = () => {
    return (
        <div className={styles.gameUi}>
            <TopPanel />
            <BottomPanel />
        </div>
    );
};
