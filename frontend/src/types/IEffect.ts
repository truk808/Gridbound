export interface IEffect {
    id: string
    type: EffectType
    duration: number
    level: number

    setDuration(duration: number): void
    setLevel(level: number): void
}

export type EffectType =
    | 'damage'
    | 'armor'
    | 'ap'
    | 'heal'
    | 'move'
    | 'takeCard'
    | 'poison'
    | 'poison_hit'
    | 'stun'
    | 'fire'
    | 'regeneration'
    | 'rage'
    | 'immunity'

export type StatusType = Exclude<EffectType, 'damage' | 'armor' | 'ap' | 'heal' | 'move' | 'takeCard'>;

export interface IInstantEffect {
    damage?: number;
    armor?: number;
    ap?: number;
    heal?: number;
    move?: number;
    takeCard?: number;
}

export interface IStatusEffect {
    status: StatusType;
    duration: number;
    level: number;
}