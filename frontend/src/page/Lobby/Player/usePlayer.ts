import {CHARACTER_CONFIG} from "../../../../../config/characters.config.ts";
import {useStore} from "../../../store/RootStore.ts";
import type {IPlayerDTO} from "../../../../../types/IPlayer.ts";

export const usePlayer = (player: IPlayerDTO) => {
    const {gameStore} = useStore();

    const isLocal = player.id === gameStore.localPlayer?.id;
    const selectedConfig = Object.values(CHARACTER_CONFIG).find((c) => c.name === player.character?.name);
    const selectedId = selectedConfig ? selectedConfig.id : null;
    const isHost = gameStore.isHost && player.id === gameStore.localPlayer?.id;

    return {
        isLocal,
        selectedConfig,
        selectedId,
        isHost,
    }
}