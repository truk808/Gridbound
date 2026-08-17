import styles from "./Bar.module.css"
import {observer} from "mobx-react-lite";

interface BarProps {
    color: 'blue' | 'red' | 'green'
    maxValue: number
    currentValue: number
}

export const Bar = observer(({
                        color,
                        maxValue,
                        currentValue,
                    }: BarProps) => {
    const width = (currentValue) / maxValue * 100

    return (
        <>
            <div
                className={`${styles.barWrapper} ${styles[color]}`}
                style={{width: `${width }%`}}
            />
            {
                maxValue == currentValue ?
                    <span className={styles.barText}> {currentValue} </span> :
                    <span className={styles.barText}> {currentValue} / {maxValue} </span>
            }

        </>
    );
});

