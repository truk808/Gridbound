import {CharacterInfoUi} from "./CharacterInfoUi/CharacterInfoUi.tsx";
import {observer} from "mobx-react-lite";
import styles from './PlayerInfo.module.css'
import {useStore} from "../../../store/RootStore.ts";
import type {IPlayer} from "../../../types/IPlayers.ts";

interface PlayerInfoProps {
    player: IPlayer;
    isActivePlayer?: boolean;
}

export const PlayerInfo = observer(({player, isActivePlayer}: PlayerInfoProps) => {
    const character = player?.character;
    const {game} = useStore()
    if (!character) return <p>Грузим персонажа</p>;

    return (
        <div className={styles.playerInfo}>
            <div className={styles.info}>
                <span>{player.nickname}</span>
                <span>{player.ap}</span>
                {
                    isActivePlayer &&
                    <button onClick={() => game.endTurn()}>далее</button>
                }
            </div>
            <CharacterInfoUi
                character={character}
            />

        </div>
    );
});
