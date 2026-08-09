export interface IEffect {
    damage?: number;
    poison?: number;
    armor?: number;
    stupor?: number;
    fire?: [number, number];
    energy?: number;
}

export type TargetType = 'object' | 'subject';

export interface ICardAction {
    target: TargetType;
    effects: IEffect[];
}

export interface ICard {
    id: string;
    name: string;
    description: string;
    apCost: number;
    image: string;
    actions: ICardAction[];
    radius: number;
}

