import type {ICell} from "./ICell.ts";
import type {ICharacter} from "./character/ICharacter.ts";
import type {IInstantEffect, IStatusEffect} from "./IEffect.ts";
import type {IPlayer} from "./IPlayer";
import type {DeepFieldsOnly} from "../backend/helper/DeepFieldsOnly";
import type {IField} from "./IField";

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

    applyEffects(caster: IPlayer, targetCharacter: ICharacter | null, field: IField, targetCell: ICell | null): void

    toDTO(): ICardDTO;
}

export type ICardDTO = DeepFieldsOnly<ICard>
export type ICardActionDTO = DeepFieldsOnly<ICardAction>

