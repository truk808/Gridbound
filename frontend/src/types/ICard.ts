import type {IPlayer} from "./IPlayers.ts";
import type {ICell} from "./ICell.ts";
import type {ICharacter} from "./character/ICharacter.ts";
import type {IInstantEffect, IStatusEffect} from "./IEffect.ts";

export interface ICardTypeEffect {
    instant?: IInstantEffect;
    status?: IStatusEffect;
}

export type TargetType = 'object' | 'subject';

export interface IConditionContext {
    caster: ICharacter;
    targetCharacter: ICharacter | null;
    targetCell: ICell | null;
    boardWidth?: number;
}

export interface ICardAction {
    target: TargetType;
    effects: ICardTypeEffect[];
    condition?: (condition: IConditionContext) => boolean;
}

export interface ICard {
    readonly instanceId: string;
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly apCost: number;
    readonly image: string;
    readonly actions: ICardAction[];
    readonly radius: number;

    isCanUse(caster: IPlayer, targetCell: ICell | null): boolean
    applyEffects(caster: IPlayer, targetCharacter: ICharacter | null): void
}

