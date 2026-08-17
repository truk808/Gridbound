import React from 'react';
import styles from './SoldierSprite.module.css';
import {CharacterInfoUi} from "../../GameUI/PlaterInfo/CharacterInfoUi/CharacterInfoUi.tsx";
import type {ICharacter} from "../../../types/character/ICharacter.ts";
import {observer} from "mobx-react-lite";

interface SoldierSpriteProps {
    isFlipped?: boolean;
    character: ICharacter;
}

export const SoldierSprite: React.FC<SoldierSpriteProps> = observer(({isFlipped = false, character}) => {
    return (
        <>
            <div className={`${styles.sprite} ${isFlipped ? styles.flipped : ''}`}/>
        </>

    );
});