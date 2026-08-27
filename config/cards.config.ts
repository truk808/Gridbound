import type {ICardAction} from "../types/ICard.ts";
import {conditions} from "../frontend/src/utils/conditions";

export interface ICardData {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly apCost: number;
    readonly image: string;
    readonly actions: ICardAction[];
    readonly radius: number;
}

export const CARDS_CONFIG = {
    HIT: {
        id: 'HIT',
        name: 'Удар',
        description: 'Наносит 8 урона.',
        apCost: 1,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [{instant: {damage: 8}}],
                condition: conditions.IsTargetEnemy
            },
        ],
    },
    BLOCK: {
        id: 'BLOCK',
        name: 'Блок',
        description: 'Дает 4 защиты.',
        apCost: 1,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{instant: {armor: 4}}]
            },
        ],
    },
    ENERGY: {
        id: 'ENERGY',
        name: 'Энергия',
        description: 'Дает 1 энергию.',
        apCost: 0,
        image: './assets/card/energy.png',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{instant: {ap: 1}}]
            },
        ],
    },
    REGENERATION: {
        id: 'REGENERATION',
        name: 'Регенерация',
        description: 'Дает эффект регенерация 3ур на 3 хода.',
        apCost: 2,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{
                    status: {
                        status: "regeneration",
                        duration: 3,
                        level: 3,
                    }
                }]
            },
        ],
    },
    FLASK_WITH_POISON: {
        id: 'FLASK_WITH_POISON',
        name: 'Колба с ядом',
        description: 'Дает эффект "ядовитый удар"',
        apCost: 2,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{
                    status: {
                        status: "poison_hit",
                        duration: 1,
                        level: 2,
                    }
                }]
            },
        ],
    },
    AGILITY: {
        id: 'AGILITY',
        name: 'Ловкость',
        description: 'дает использовавшему 1 энергию и наносит 4 урона цели',
        apCost: 1,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [{
                    instant: {damage: 4}
                }],
                condition: conditions.IsTargetEnemy
            },
            {
                target: "subject",
                effects: [{
                    instant: {ap: 1}
                }]
            }
        ],
    },
    STANCE: {
        id: 'STANCE',
        name: 'Стойка',
        description: 'дает 10 защиты',
        apCost: 1,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [{
                    instant: {armor: 10}
                }],
            },
        ],
    },
    DASH: {
        id: 'DASH',
        name: 'Рывок',
        description: 'переместите персонажа на 2 клетки',
        apCost: 2,
        image: '',
        radius: 2,
        actions: [
            {
                target: "subject",
                effects: [{
                    instant: {teleport: 1}
                }],
                condition: (context) => conditions.isTargetAtDistance(context, 2)
            },
        ],
    },
    FENCING: {
        id: 'FENCING',
        name: 'Фехтование',
        description: 'наносит 1 урона 3 раза',
        apCost: 1,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [
                    {instant: {damage: 1}},
                    {instant: {damage: 1}},
                    {instant: {damage: 1}},
                ],
                condition: conditions.IsTargetEnemy
            },
        ],
    },
    NEED_TO_THINK_ABOUT_IT: {
        id: 'NEED_TO_THINK_ABOUT_IT',
        name: 'Нужно подумать',
        description: 'Сбросьте эту карту и получите 2',
        apCost: 0,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [
                    {instant: {takeCard: 1}},
                    {instant: {takeCard: 1}},
                ]
            },
        ],
    },
    ORC_RAGE: {
        id: 'ORC_RAGE',
        name: 'Ярость орка',
        description: 'дает эффект ярость на 1 ход',
        apCost: 1,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [
                    {status: {status: "rage", level: 2, duration: 1}}
                ],
                },
        ],
    },
    PAIN: {
        id: 'PAIN',
        name: 'Боль',
        description: 'Получите 8 урона и эффект ярость 3ур',
        apCost: 2,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [
                    {status: {status: "rage", level: 3, duration: 1}}
                ]
            },
        ],
    },
    HEAVY_HIT: {
        id: 'HEAVY_HIT',
        name: 'Тяжелый удар',
        description: 'Наносит 20 урона цели',
        apCost: 2,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [
                    {instant: {damage: 20}},
                ],
                condition: conditions.IsTargetEnemy
            },
        ],
    },
    KICK: {
        id: 'KICK',
        name: 'Пинок',
        description: 'наносит 4 урона и отталкивает цель на 1 клетку',
        apCost: 1,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [
                    {instant: {damage: 4}},
                    {instant: {move: 1}},
                ],
                condition: conditions.IsTargetEnemy
            },
        ],
    },
    DEAD_END: {
        id: 'DEAD_END',
        name: 'Тупик',
        description: 'Если цель находится в углу, накладывает эффект контузия на 2 хода',
        apCost: 0,
        image: '',
        radius: 1,
        actions: [
            {
                target: "object",
                effects: [
                    {status: {status: 'stun', level: 1, duration: 2}},
                ],
                condition: conditions.isTargetInCorner
            },
        ],
    },
    MUSCLE_FLEXING: {
        id: 'MUSCLE_FLEXING',
        name: 'Игра мускулами',
        description: 'дает эффекты на 2 хода: невосприимчивость и контузия',
        apCost: 2,
        image: '',
        radius: 0,
        actions: [
            {
                target: "object",
                effects: [
                    {status: {status: 'immunity', level: 1, duration: 2}},
                    {status: {status: 'stun', level: 1, duration: 2}},
                ],
            },
        ],
    },
} as const satisfies Record<string, ICardData>;