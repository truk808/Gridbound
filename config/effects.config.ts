import type {StatusType} from "../types/IEffect.ts";

export interface IEffectConfig {
    id: number;
    type: StatusType;
    name: string;
    description: string;
    image: string;
}

export const EFFECTS_CONFIG: Record<StatusType,  IEffectConfig> = {
    fire: {
        id: 1,
        type: 'fire',
        name: 'огонь',
        description: 'наносит постоянный урон на протяжении короткого времени',
        image: '/assets/status/iconFire.png',
    },
    poison: {
        id: 2,
        type: 'poison',
        name: 'яд',
        description: 'наносит урон. Постепенно снижается',
        image: '/assets/status/iconPoison.png',
    },
    stun: {
        id: 3,
        type: 'stun',
        name: 'оглушение',
        description: 'оглушает персонажа. не дает сделать ход',
        image: '/assets/status/stunn.png',
    },
    regeneration: {
        id: 4,
        type: 'regeneration',
        name: 'регенерация',
        description: 'Повышает здоровье',
        image: '',
    },
    rage: {
        id: 5,
        type: 'rage',
        name: 'ярость',
        description: 'Усиливает наносимый урон',
        image: '',
    },
    poison_hit: {
      id: 6,
      type: 'poison_hit',
      name: 'ядовитый удар',
      description: 'ваши атаки накладывают на цель эффект яд',
      image: '',
    },
    immunity :{
        id: 7,
        type: 'immunity',
        name: 'невосприимчивость',
        description: 'Вы неуязвимы к вражеским атакам и эффектам',
        image: '',
    },
}