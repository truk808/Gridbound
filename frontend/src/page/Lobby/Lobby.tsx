import {observer} from "mobx-react-lite/src/observer.ts";
import {PlayersInfo} from "./PlayerInfo/PlayerInfo.tsx";
import {StartGame} from "./StartGame/StartGame.tsx";


const Lobby = observer(() => {

    return (
        <div>
            <h1>Лобби</h1>
            <div>Настройки</div>
            <PlayersInfo />
            <StartGame/>
        </div>
    );
});
export default Lobby

