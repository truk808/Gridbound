import {makeAutoObservable} from "mobx";
import type {ICard, ICardAction, IConditionContext} from "../types/ICard.ts";
import type {Player} from "./Player.ts";
import type {Character} from "./Character.ts";
import type {ICell} from "../types/ICell.ts";
import type {IPlayer} from "../types/IPlayers.ts";
import {createEffect} from "../utils/createEffect.ts";

export class Card implements ICard {
    readonly instanceId: string = crypto.randomUUID();
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly image: string;
    readonly radius: number;
    readonly apCost: number;
    readonly actions: ICardAction[];

    constructor(id: string, name: string, description: string, apCost: number, image: string, actions: ICardAction[], radius: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.apCost = apCost;
        this.image = image;
        this.actions = actions;
        this.radius = radius;

        makeAutoObservable(this);
    }

    applyEffects(caster: Player, targetCharacter: Character | null) {
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
                    continue;
                }

                if (effect.instant?.damage) target.takeDamage(effect.instant.damage, caster.character);
                if (effect.instant?.armor) target.addArmor(effect.instant.armor);
                if (effect.instant?.ap) caster.addAP(effect.instant.ap);
                if (effect.instant?.move) console.log('!!! ПЕРЕМЕЩЕНИЕ')
                if (effect.instant?.takeCard) caster.cards.takeCard()

                if(effect.status?.status) {
                    target.addEffect(createEffect(effect.status.status, effect.status.duration, effect.status.level))
                }
            }
        }
    }

    isCanUse(caster: IPlayer, targetCell: ICell | null = null): boolean {
        if (caster.character?.hasStatus('stun')) {
            console.log('Нельзя разыграть карту, на персонаже эффект оглушение')
            return false;
        }

        if (caster.ap < this.apCost) {
            console.log(`Недостаточно AP! Требуется: ${this.apCost}, есть: ${caster.ap}`);
            return false;
        }

        if (!targetCell) {
            console.log("Для этой карты нужно выбрать клетку!");
            return false;
        }

        if (!targetCell.isOwn) {
            console.log('на клетке нет перонажа')
            return false;
        }

        const casterCell = caster.character?.cell;
        if (!casterCell) {
            console.log("Персонаж игрока не установлен на поле!");
            return false;
        }

        const distance = Math.abs(casterCell.x - targetCell.x);
        if (distance > this.radius) {
            console.log(`Цель слишком далеко! Радиус: ${this.radius}, расстояние: ${distance}`);
            return false;
        }
        return true;
    }
}