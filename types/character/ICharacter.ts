import type {ICell} from "../ICell.ts";
import type {IEffect, StatusType} from "../IEffect.ts";
import type {DeepFieldsOnly} from "../../backend/helper/DeepFieldsOnly";

export interface ICharacter {
    readonly id: string;
    readonly name: CharacterName;
    armorTime: number;
    distanceToMove: number;
    maxHp: number;
    hp: number;
    armor: number;
    status: IEffect[];
    cell: ICell | null;

    setArmorTime(value: number): void;
    setCell(cell: ICell | null): void
    setArmor(armor: number): void
    hasStatus(type: StatusType): boolean
    isCanMove(target: ICell | null): boolean;
    move(target: ICell | null): void
    addEffect(effect: IEffect): void
    removeEffect(effect: IEffect): void
    tickEffects(): void
    addArmor(armor: number): void
    takeDamage(damage: number, attacker: ICharacter): void
    applyAttackerPassiveEffect(attacker: ICharacter, damage: number): void
    die(): void
    toDTO(): ICharacterDTO
}

export type CharacterName =
    'soldier'
    | 'orc'

export type ICharacterDTO = DeepFieldsOnly<ICharacter>