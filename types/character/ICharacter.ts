import type {ICell} from "../ICell.ts";
import type {IEffect, StatusType} from "../IEffect.ts";
import type {DeepFieldsOnly} from "../../helper/DeepFieldsOnly";
import type {CharacterName} from "../../config/characters.config";

export interface ICharacter {
    readonly id: string;
    readonly name: CharacterName;
    distanceToMove: number;
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
    toDTO(): ICharacterDTO
}

export type ICharacterDTO = DeepFieldsOnly<ICharacter>