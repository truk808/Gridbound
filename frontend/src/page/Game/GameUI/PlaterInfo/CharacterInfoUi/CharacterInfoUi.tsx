import styles from "./CharacterInfoUi.module.css";
import {observer} from "mobx-react-lite";
import type {ICharacterDTO} from "../../../../../../../types/character/ICharacter.ts";
import {Bar} from "../../../../../components/ui/Bar/Bar.tsx";
import {StatusList} from "../../../../../components/StatusList/StatusList.tsx";


interface CharacterInfoUiProps {
    character: ICharacterDTO;
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