import styles from "./GameStats.module.css";

export const GameStats = () => {
    return (
        <div className={styles.gameStats}>
            <div className={styles.ap}>
                3
            </div>

            <div className={styles.barsContainer}>
                <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.health}`} />
                    <span className={styles.value}>100/100</span>
                </div>
                <div className={styles.barGroup}>
                    <div className={`${styles.bar} ${styles.armor}`} />
                    <span className={styles.value}>75/100</span>
                </div>
                <div className={styles.status}>

                </div>
            </div>

            <div className={styles.nextTurn}>
                {"->"}
            </div>
        </div>
    );
};