import { type ChangeEvent, useState } from "react";
import styles from "./Settings.module.css";
import {useStore} from "../../../store/RootStore.ts";

export const Settings = ({isTimerEnabled, setIsTimerEnabled, endTurnTime, setEndTurnTime}) => {
    const {gameStore} = useStore()

    const handleToggle = () => {
        setIsTimerEnabled((prev) => {
            const nextState = !prev;
            if (nextState) {
                setEndTurnTime(30);
            } else {
                setEndTurnTime(null);
            }
            return nextState;
        });
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setEndTurnTime(value);
        }
    };

    if (!gameStore.isHost) return null;

    return (
        <div className={styles.settingRow}>
            <div className={styles.labelGroup}>
                <span className={styles.label}>Время хода</span>

                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={isTimerEnabled}
                        onChange={handleToggle}
                    />
                    <span className={styles.slider} />
                </label>
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="number"
                    min={10}
                    max={180}
                    disabled={!isTimerEnabled}
                    className={styles.input}
                    value={isTimerEnabled ? (endTurnTime ?? 30) : ''}
                    placeholder="∞"
                    onChange={handleOnChange}
                />
                <span className={`${styles.unit} ${!isTimerEnabled ? styles.unitDisabled : ''}`}>
                    сек
                </span>
            </div>
        </div>
    );
};