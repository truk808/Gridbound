"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditions = void 0;
const game_config_1 = require("../../config/game.config");
exports.conditions = {
    isTargetInCorner: ({ targetCell, boardWidth = game_config_1.COUNT_CELL }) => {
        if (!targetCell)
            return false;
        return targetCell.x === 0 || targetCell.x === boardWidth - 1;
    },
    isTargetAtDistance: ({ targetCell, caster }, distance = 1) => {
        if (!targetCell || !caster?.cell)
            return false;
        return Math.abs(targetCell.x - caster.cell.x) === distance;
    },
    IsTargetEnemy({ caster, targetCharacter }) {
        const isCaster = caster.id !== targetCharacter?.id;
        return isCaster && targetCharacter !== null;
    }
};
