import {useStore} from "../../../store/RootStore.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {ROUTES} from "../../../router/const.ts";
import {CHARACTER_CONFIG} from "../../../../../config/characters.config.ts";
import type {CharacterName} from "../../../../../types/character/ICharacter.ts";

export const usePlayersInfo = () => {
    const { gameStore, socketStore } = useStore();
    const { id: roomId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = socketStore.onMessage((data) => {
            switch (data.event) {
                case 'player_joined':
                case 'lobby_created':
                case 'player_left':
                case "character_selected":
                    if (data.game) {
                        gameStore.setGame(data.game);
                    }
                    break;
                case 'game_started':
                    if (data.game) {
                        gameStore.setGame(data.game);
                    }
                    navigate(`${ROUTES.GAME}/${roomId}`);
                    break;
            }
        });

        const player = gameStore.localPlayer;

        if (roomId && player) {
            socketStore.send({
                method: 'join_lobby',
                roomId: roomId,
                playerName: player.nickname
            });
        }

        return () => {
            unsubscribe();
        };
    }, [roomId, gameStore.localPlayer?.id]);

    const characterList = Object.values(CHARACTER_CONFIG).map((char) => ({
        id: char.id,
        label: char.name,
    }));

    const chooseCharacter = (characterId: string | null) => {
        const localPlayer = gameStore.localPlayer;
        if (!localPlayer || characterId === null) return;

        const config = Object.values(CHARACTER_CONFIG).find((c) => c.id === characterId);
        if (config) {
            socketStore.send({
                method: 'select_character',
                roomId: roomId ?? '',
                playerId: localPlayer.id,
                characterName: config.name as CharacterName
            });
        }
    };

    const players = gameStore.game?.players || [];
    const emptySlotsCount = Math.max(0, 2 - players.length);

    return {
        gameStore: gameStore,
        character: {chooseCharacter, characterList},
        emptySlotsCount: emptySlotsCount,
    }
}