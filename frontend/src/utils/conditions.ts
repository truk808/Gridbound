import { COUNT_CELL } from "../../../config/gameConfig.ts";
import type { IConditionContext } from "../../../types/ICard.ts";

export const conditions = {
    isTargetInCorner: ({ targetCell, boardWidth = COUNT_CELL }: IConditionContext): boolean => {
        if (!targetCell) return false;
        return targetCell.x === 0 || targetCell.x === boardWidth - 1;
    },

    isTargetAtDistance: ({ targetCell, caster }: IConditionContext, distance: number = 1): boolean => {
        if (!targetCell || !caster?.cell) return false;
        console.log('------------------------')
        console.log('targetCell.x', targetCell.x);
        console.log('caster.cell.x', caster.cell.x);
        console.log('distance', distance);
        console.log('------------------------')
        return Math.abs(targetCell.x - caster.cell.x) === distance;
    },

    IsTargetEnemy({ caster, targetCharacter }: IConditionContext): boolean {
        const isCaster = caster.id !== targetCharacter?.id
        return isCaster && targetCharacter !== null
    }
};