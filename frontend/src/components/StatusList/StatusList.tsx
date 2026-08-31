import styles from './StatusList.module.css';
import {observer} from "mobx-react-lite";
import {StatusItem} from "../StatusItem/StatusItem.tsx";
import type {IEffectDTO} from '../../../../types/IEffect.ts';

interface StatusListProps {
    statuses: IEffectDTO[];
}

export const StatusList = observer(({statuses}: StatusListProps) => {
    if (!statuses || statuses.length === 0) return null;

    return (
        <div className={styles.statusList}>
            {statuses.map((effect) => (
                <StatusItem
                    key={effect.id}
                    type={effect.type}
                    level={effect.level}
                    duration={effect.duration}
                />
            ))}
        </div>
    );
});