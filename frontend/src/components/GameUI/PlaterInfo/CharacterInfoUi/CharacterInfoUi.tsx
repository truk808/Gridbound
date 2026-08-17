import styles from "./CharacterInfoUi.module.css";
import {Bar} from "../../../ui/Bar/Bar.tsx";
import {StatusList} from "../../../ui/StatusList/StatusList.tsx";
import {observer} from "mobx-react-lite";
import type {ICharacter} from "../../../../types/character/ICharacter.ts";


interface CharacterInfoUiProps {
    character: ICharacter;
}

export const CharacterInfoUi = observer(({character}: CharacterInfoUiProps) => {
    return (
        <div className={styles.characterInfoUi}>
            <div className={styles.barsContainer}>
                <div className={styles.barWrapper}>
                    <Bar
                        maxValue={character.maxHp}
                        color={'red'}
                        currentValue={character.hp}
                    />
                </div>
                <div className={styles.barWrapper}>
                    <Bar
                        maxValue={character.armor}
                        color={'blue'}
                        currentValue={character.armor}
                    />
                </div>

                <StatusList
                    statuses={character.status}
                />
            </div>
        </div>
    );
});