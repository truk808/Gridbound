import {TopPanel} from "./TopPanel/TopPanel.tsx";
import {BottomPanel} from "./BottomPanel/BottomPanel.tsx";
import styles from "./GameUI.module.css"
import {observer} from "mobx-react-lite/src/observer.ts";

export const GameUi = observer(() => {
    return (
        <div className={styles.gameUi}>
            <TopPanel />
            <BottomPanel />
        </div>
    );
});
