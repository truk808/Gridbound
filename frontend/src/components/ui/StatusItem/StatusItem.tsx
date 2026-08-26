import styles from "./StatusItem.module.css";
import { observer } from "mobx-react-lite";
import type {EffectType, StatusType} from "../../../../../types/IEffect.ts";
import {EFFECTS_CONFIG} from "../../../../../config/effects.config.ts";

interface StatusItemProps {
    type: EffectType;
    level: number;
    duration?: number;
}

export const StatusItem = observer(({ type, level, duration }: StatusItemProps) => {
    const statusConfig = EFFECTS_CONFIG[type];

    return (
        <div className={styles.statusItem}>
            {statusConfig?.image && (
                <img
                    src={statusConfig.image}
                    alt={`Статус: ${statusConfig.name}`}
                    className={styles.img}
                />
            )}
            <span>
                {statusConfig?.name || type} (ур {level} {duration ? `дл ${duration}` : ''})
            </span>
        </div>
    );
});