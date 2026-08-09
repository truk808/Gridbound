import React from 'react';
import styles from './SoldierSprite.module.css';

interface SoldierSpriteProps {
    isFlipped?: boolean;
}

export const SoldierSprite: React.FC<SoldierSpriteProps> = ({ isFlipped = false }) => {
    return (
        <div
            className={`${styles.sprite} ${isFlipped ? styles.flipped : ''}`}
        />
    );
};