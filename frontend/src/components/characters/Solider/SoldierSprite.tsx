import {type FC} from 'react';
import styles from './SoldierSprite.module.css';
import {observer} from "mobx-react-lite";
import type {SpriteProps} from "../Character.tsx";

export const SoldierSprite: FC<SpriteProps> = observer(({isFlipped = false, character}) => {
    return (
        <>
            <div className={`${styles.sprite} ${isFlipped ? styles.flipped : ''}`}/>
        </>

    );
});