import type {ICard} from "../types/ICard.ts";

export const CARDS_CONFIG: Record<string, ICard> = {
    SWORD: {
        id: 'SWORD',
        name: 'Меч',
        description: 'Наносит 5 урона.',
        apCost: 1,
        image: './assets/card/sword.png',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [{damage: 5}]
            },
        ],
    },
    SHIELD: {
        id: 'SHIELD',
        name: 'Щит',
        description: 'Дает 3 защиты.',
        apCost: 1,
        image: './assets/card/shield.png',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{armor: 3}]
            },
        ],
    },
    ENERGY: {
        id: 'ENERGY',
        name: 'Энергия',
        description: 'Дает 1 энергию.',
        apCost: 1,
        image: './assets/card/energy.png',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{energy: 1}]
            },
        ],
    }

}