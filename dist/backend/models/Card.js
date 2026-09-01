"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const createEffect_1 = require("../helper/createEffect");
const game_config_1 = require("../../config/game.config");
class Card {
    constructor(id, name, description, apCost, radius, image, actions) {
        this.instanceId = crypto.randomUUID();
        this.id = id;
        this.name = name;
        this.description = description;
        this.apCost = apCost;
        this.radius = radius;
        this.image = image;
        this.actions = actions;
    }
    applyEffects(caster, targetCharacter, field, targetCell) {
        for (const action of this.actions) {
            const target = action.target === 'subject' ? caster.character : targetCharacter;
            if (!target)
                continue;
            if (!caster.character)
                continue;
            for (const effect of action.effects) {
                if (effect.instant?.damage)
                    target.takeDamage(effect.instant.damage, caster.character);
                if (effect.instant?.armor)
                    target.addArmor(effect.instant.armor);
                if (effect.instant?.ap)
                    caster.addAP(effect.instant.ap);
                if (effect.instant?.move) {
                    if (!target.cell || !caster.character.cell)
                        return;
                    const direction = target.cell.x - caster.character.cell.x > 0 ? 1 : -1;
                    const cellX = (target.cell.x) + effect.instant.move * direction;
                    if (cellX >= 0 || cellX <= game_config_1.COUNT_CELL - 1) {
                        target.cell.setIsOwn(false);
                        target.setCell(field.getCellByX(cellX));
                    }
                }
                if (effect.instant?.teleport) {
                    if (target.cell && targetCell && targetCell.x >= 0 && targetCell.x <= game_config_1.COUNT_CELL - 1) {
                        target.cell.setIsOwn(false);
                        target.setCell(field.getCellByX(targetCell.x));
                    }
                }
                if (effect.instant?.takeCard)
                    caster.cards.takeCard();
                if (effect.status?.status) {
                    target.addEffect((0, createEffect_1.createEffect)(effect.status.status, effect.status.duration, effect.status.level));
                }
            }
        }
    }
    isCanUse(caster, targetCell) {
        return false;
    }
    toDTO() {
        return {
            instanceId: this.instanceId,
            id: this.id,
            name: this.name,
            description: this.description,
            apCost: this.apCost,
            radius: this.radius,
            image: this.image,
            actions: this.actions.map((action) => ({
                target: action.target,
                effects: action.effects,
            })),
        };
    }
}
exports.Card = Card;
