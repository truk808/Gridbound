import {ICard, ICardAction, ICardActionDTO, ICardDTO, type IConditionContext} from "../../types/ICard";
import {IPlayer} from "../../types/IPlayer";
import {ICharacter} from "../../types/character/ICharacter";
import {ICell} from "../../types/ICell";
import type {Player} from "../../frontend/src/models/Player";
import type {Character} from "../../frontend/src/models/Character";
import {createEffect} from "../../helper/createEffect";
import {IField} from "../../types/IField";
import {COUNT_CELL} from "../../config/gameConfig";

export class Card implements ICard {
    readonly instanceId: string;
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly apCost: number;
    readonly radius: number;
    readonly image: string;
    readonly actions: ICardAction[];

    constructor(id: string, name: string, description: string, apCost: number, radius: number, image: string, actions: ICardAction[]) {
        this.instanceId = crypto.randomUUID();
        this.id = id;
        this.name = name;
        this.description = description;
        this.apCost = apCost;
        this.radius = radius;
        this.image = image;
        this.actions = actions;
    }

    applyEffects(caster: IPlayer, targetCharacter: ICharacter | null, field: IField, targetCell: ICell | null): void {
        for (const action of this.actions) {
            const target = action.target === 'subject' ? caster.character : targetCharacter;

            if (!target) continue;
            if (!caster.character) continue;

            const context: IConditionContext = {
                caster: caster.character,
                targetCharacter: target,
                targetCell: target.cell,
                boardWidth: 5,
            }

            for (const effect of action.effects) {
                if (action.condition && !action.condition(context)) {
                    console.log('con', false)
                    continue;
                }

                if (effect.instant?.damage) target.takeDamage(effect.instant.damage, caster.character);
                if (effect.instant?.armor) target.addArmor(effect.instant.armor);
                if (effect.instant?.ap) caster.addAP(effect.instant.ap);
                if (effect.instant?.move) {
                    if(!target.cell || !caster.character.cell) return
                    const direction = target.cell.x - caster.character.cell.x > 0 ? 1 : -1
                    const cellX = (target.cell.x) + effect.instant.move * direction
                    if (cellX < 0 || cellX > COUNT_CELL - 1) {
                        target.cell.setIsOwn(false)
                        target.setCell(field.getCellByX(cellX))
                    }
                }
                if (effect.instant?.takeCard) caster.cards.takeCard()

                if(effect.status?.status) {
                    target.addEffect(createEffect(effect.status.status, effect.status.duration, effect.status.level))
                }
            }
        }
    }

    isCanUse(caster: IPlayer, targetCell: ICell | null): boolean {
        return false;
    }

    toDTO(): ICardDTO {
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
            })) ,
        }
    }
}