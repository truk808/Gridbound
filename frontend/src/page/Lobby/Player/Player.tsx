import {usePlayer} from "./usePlayer.ts";
import styles from "./Player.module.css";
import {Character} from "../../../components/Сharacter/Character.tsx";
import {Dropdown} from "../../../components/ui/dropdown/Dropdown.tsx";
import type {IPlayerDTO} from "../../../../../types/IPlayer.ts";

interface PlayerProps {
    index: number;
    player: IPlayerDTO;
    characterList: { id: string, label: string }[],
    chooseCharacter: (id: string | null) => void;
}

export const Player = ({index, player, characterList, chooseCharacter}: PlayerProps) => {
    const {isHost, isLocal, selectedId} = usePlayer(player)

    return (
        <>
            {index > 0 && <div className={styles.vsDivider}>VS</div>}
            <div className={`${styles.playerCard} ${isLocal ? styles.isLocal : ''}`}>
                {isHost && <div className={styles.hostBadge}>Host</div>}

                <div className={styles.playerHeader}>
                    <span className={styles.nickname}>{player.nickname}</span>
                </div>

                <div className={styles.avatarArea}>
                    <Character
                        character={player.character}
                        state={'idle'}
                        flip={index > 0}
                    />
                </div>

                <div className={styles.dropdownContainer}>
                    {isLocal ? (
                        <Dropdown
                            items={characterList}
                            selectedId={selectedId}
                            onChange={(id: string | null) => chooseCharacter(id)}
                            placeholder={'Персонаж'}
                        />
                    ) : (
                        <span className={styles.characterName}>
                            {player.character?.name || 'Выбирает персонажа...'}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};