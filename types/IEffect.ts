import type {DeepFieldsOnly} from "../backend/helper/DeepFieldsOnly";

export interface IEffect {
    readonly id: string
    readonly type: EffectType
    duration: number
    level: number

    setDuration(duration: number): void
    setLevel(level: number): void

    toDTO(): IEffectDTO
}

export type IEffectDTO = DeepFieldsOnly<IEffect>

export type EffectType =
    | 'damage'
    | 'armor'
    | 'ap'
    | 'heal'
    | 'move'
    | 'takeCard'
    | 'teleport'
    | 'poison'
    | 'poison_hit'
    | 'stun'
    | 'fire'
    | 'regeneration'
    | 'rage'
    | 'immunity'

export type StatusType = Exclude<EffectType, 'damage' | 'armor' | 'ap' | 'heal' | 'move' | 'takeCard' | 'teleport'>;

export interface IInstantEffect {
    damage?: number;
    armor?: number;
    ap?: number;
    heal?: number;
    move?: number;
    takeCard?: number;
    teleport?: number;
}

export interface IStatusEffect {
    status: StatusType;
    duration: number;
    level: number;
}