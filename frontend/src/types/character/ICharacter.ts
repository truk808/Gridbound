import type {ICell} from "../ICell.ts";
import type {IEffect, StatusType} from "../IEffect.ts";

export interface ICharacter {
    readonly id: string;
    readonly distance: number;
    readonly name: string;
    maxHp: number;
    hp: number;
    armor: number;
    status: IEffect[];
    cell: ICell | null;

    setCell(cell: ICell | null): void
    isCanMove(target: ICell | null): boolean;
    move(target: ICell | null): void
    addEffect(effect: IEffect): void
    removeEffect(effect: IEffect): void
    tickEffects(): void

    takeDamage(damage: number, attacker: ICharacter): void
    addArmor(armor: number): void
    applyAttackerPassiveEffect(attacker: ICharacter, damage: number): void
    hasStatus(type: StatusType): boolean
    setArmor(armor: number): void
    die(): void
}