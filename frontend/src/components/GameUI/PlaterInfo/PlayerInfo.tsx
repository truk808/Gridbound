import {CharacterInfoUi} from "./CharacterInfoUi/CharacterInfoUi.tsx";
import {observer} from "mobx-react-lite";
import styles from './PlayerInfo.module.css'
import type {IPlayerDTO} from "../../../../../types/IPlayer.ts";
import {useStore} from "../../../store/RootStore.ts";

interface PlayerInfoProps {
    player: IPlayerDTO;
    isActivePlayer?: boolean;
    isLocalPlayer?: boolean;
}

export const PlayerInfo = observer(({player, isActivePlayer, isLocalPlayer}: PlayerInfoProps) => {
    const {gameStore, socketStore} = useStore()
    const character = player?.character;
    if (!character) return <p>Грузим персонажа</p>;

    function nextTurn() {
        socketStore.send({
            method: 'next_turn',
            playerId: gameStore.localPlayer?.id ?? '',
            roomId: gameStore.game?.id ?? ''
        })
    }

    return (
        <div className={styles.playerInfo}>
            <div className={styles.info}>
                <span>{player.nickname}</span>
                <span>{player.ap}</span>
                {
                    isActivePlayer && isLocalPlayer &&
                    <button onClick={() => {nextTurn()}}>далее</button>
                }
            </div>
            <CharacterInfoUi
                character={character}
            />

        </div>
    );
});
