import type { IConditionContext } from "../../types/ICard.ts";
import {COUNT_CELL} from "../../config/game.config";

export const conditions = {
    isTargetInCorner: ({ targetCell, boardWidth = COUNT_CELL }: IConditionContext): boolean => {
        if (!targetCell) return false;
        return targetCell.x === 0 || targetCell.x === boardWidth - 1;
    },

    isTargetAtDistance: ({ targetCell, caster }: IConditionContext, distance: number = 1): boolean => {
        if (!targetCell || !caster?.cell) return false;
        return Math.abs(targetCell.x - caster.cell.x) === distance;
    },

    IsTargetEnemy({ caster, targetCharacter }: IConditionContext): boolean {
        const isCaster = caster.id !== targetCharacter?.id
        return isCaster && targetCharacter !== null
    }
};