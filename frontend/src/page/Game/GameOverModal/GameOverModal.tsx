import Modal from "../../../components/ui/modal/Modal.tsx";
import { useStore } from "../../../store/RootStore.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/const.ts";
import { observer } from "mobx-react-lite";
import styles from './GameOverModal.module.css';

export const GameOverModal = observer(() => {
    const { gameStore, socketStore } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            if (data.event === 'game_over') {
                if (data.game) {
                    gameStore.setGame(data.game);
                }
                setIsOpen(true);
            }
        });

        return () => unsubscribe();
    }, [socketStore]);

    const handleClose = () => {
        navigate(ROUTES.MAIN);
        setIsOpen(false);
    };

    const isWinner = gameStore.winer?.id === gameStore.localPlayer?.id;

    return (
        <Modal active={isOpen} setActive={() => {}}>
            <div className={styles.container}>
                <h1 className={`${styles.title} ${!isWinner ? styles.defeatTitle : ''}`}>
                    {isWinner ? "ПОБЕДА" : "ПОРАЖЕНИЕ"}
                </h1>

                <hr className={styles.divider} />

                <div className={styles.statsTable}>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Победитель:</span>
                        <span className={styles.statValue}>
                            {gameStore.winer?.nickname || '—'}
                        </span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Раундов:</span>
                        <span className={styles.statValue}>
                            {gameStore.game?.turn ?? 1}
                        </span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Время:</span>
                        <span className={styles.statValue}>—</span>
                    </div>
                </div>

                <button className={styles.button} onClick={handleClose}>
                   Вернуться
                </button>
            </div>
        </Modal>
    );
});