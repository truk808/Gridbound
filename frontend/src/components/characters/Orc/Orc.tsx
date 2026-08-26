import {type FC} from "react";
import type {SpriteProps} from "../Character.tsx";
import {observer} from "mobx-react-lite";

export const OrcSprite: FC<SpriteProps> = observer(({isFlipped = false, character}: SpriteProps) => {
    return (
        <>
            <div style={{width: '25px', height: '25px', background: 'red'}}>
                {character.name}
            </div>
            {/*<div className={`${styles.sprite} ${isFlipped ? styles.flipped : ''}`}/>*/}
        </>

    );
});