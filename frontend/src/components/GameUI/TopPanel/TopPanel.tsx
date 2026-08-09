import styles from "./TopPanel.module.css"

export const TopPanel = () => {
    return (
        <div className={styles.topPanel}>
            <div className={styles.gameInfo}>
                <span>РАУНД 1</span>
                <span>Ход игрока: truk808</span>
                <span>До конца хода: 30с</span>
            </div>
        </div>
    );
};

