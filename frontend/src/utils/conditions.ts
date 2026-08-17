import {COUNT_CELL} from "../config/gameConfig.ts";
import type {IConditionContext} from "../types/ICard.ts";

export const conditions = {
    isTargetInCorner: ({ targetCell, boardWidth = COUNT_CELL }: IConditionContext): boolean => {
        if(!targetCell) return false;
        return targetCell.x === 0 || targetCell.x === boardWidth - 1;
    }
}