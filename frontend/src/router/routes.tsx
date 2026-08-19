import type {ReactElement} from "react";
import {Main} from "../page/Main/Main.tsx";
import {ROUTES} from "./const.ts";
import {Game} from "../page/Game/Game.tsx";
import Lobby from "../page/Lobby/Lobby.tsx";

interface IRoute {
    path: string;
    element: ReactElement;
}

export const routes: IRoute[] = [
    {
        element: <Main/>,
        path: ROUTES.MAIN
    },
    {
        element: <Game/>,
        path: ROUTES.GAME
    },
    {
        element: <Lobby/>,
        path: ROUTES.LOBBY
    }
]