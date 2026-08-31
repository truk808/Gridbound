import {Game} from "./models/Game";

export const lobbies = new Map<string, Game>();
export const turnTimers = new Map<string, NodeJS.Timeout>();