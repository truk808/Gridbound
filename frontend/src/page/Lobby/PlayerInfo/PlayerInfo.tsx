import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/RootStore.ts";
import { CHARACTER_CONFIG } from "../../../config/character.config.ts";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown.tsx";
import { Character } from "../../../models/Character.ts";

export const PlayersInfo = observer(() => {
    const { game } = useStore();

    const characterList = Object.values(CHARACTER_CONFIG).map((char) => ({
        id: char.id,
        label: char.name,
    }));

    const chooseCharacter = (characterId: number | null) => {
        const localPlayer = game.localPlayer;
        if (!localPlayer || characterId === null) return;

        const config = Object.values(CHARACTER_CONFIG).find((c) => c.id === characterId);
        if (config) {
            const newCharacter = new Character(config.name, config.hp);
            localPlayer.setCharacter(newCharacter);
        }
    };

    return (
        <div>
            {game.players.map((player) => {
                const isLocal = player.id === game.localPlayer?.id;

                const selectedConfig = Object.values(CHARACTER_CONFIG).find(
                    (c) => c.name === player.character?.name
                );
                const selectedId = selectedConfig ? selectedConfig.id : null;

                return (
                    <div key={player.id}>
                        <span>{player.nickname}</span>
                        <div>
                            {isLocal ? (
                                <Dropdown
                                    items={characterList}
                                    selectedId={selectedId}
                                    onChange={(id: number | null) => chooseCharacter(id)}
                                    placeholder={'Персонаж'}
                                />
                            ) : (
                                <span>{player.character?.name || 'Выбирает персонажа...'}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});