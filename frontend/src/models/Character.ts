import type {ICharacter} from "../types/character/ICharacter.ts";
import type {ICell} from "../types/ICell.ts";
import {makeAutoObservable} from "mobx";
import type {IEffect, StatusType} from "../types/IEffect.ts";
import {createEffect} from "../utils/createEffect.ts";
import {events} from "./EventBus.ts";

export class Character implements ICharacter {
    readonly id: string = crypto.randomUUID();
    readonly distance: number;
    readonly name: string;
    private _maxHp: number;
    private _hp: number;
    private _armor: number;
    private _status: IEffect[];
    private _cell: ICell | null;

    constructor(name: string, maxHp: number) {
        this.distance = 1;
        this.name = name;
        this._maxHp = maxHp;
        this._hp = maxHp;
        this._armor = 0;
        this._status = [];
        this._cell = null;

        makeAutoObservable(this)
    }

    get maxHp(): number {
        return this._maxHp;
    }

    get hp(): number {
        return this._hp
    }

    get armor(): number {
        return this._armor
    }

    get status(): IEffect[] {
        return this._status
    }

    get cell(): ICell | null {
        return this._cell
    }

    heal(hp: number) {
        console.log('heal')
        if(hp + this._hp > this.maxHp) {
            this._hp = this.maxHp;
        } else {
            this._hp += hp;
        }
    }

    setArmor(armor: number) {
        this._armor = armor;
    }

    setCell(cell: ICell | null): void {
        this._cell = cell;
        if (this.cell)
            this.cell.setIsOwn(true);
    }

    isCanMove(target: ICell | null) {
        if (this.hasStatus('stun')) {
            return false;
        }

        if (target && !target.isOwn && this.cell) {
            if (Math.abs(target?.x - this.cell.x) === this.distance) {
                return true
            }
        }
        return false;
    }

    move(target: ICell | null): void {
        if (this._cell && target)
            if (this.isCanMove(target)) {
                this._cell.setIsOwn(false);
                this._cell = target;
                this._cell.setIsOwn(true)
            }
    }

    hasStatus(type: StatusType): boolean {
        return this._status.some((effect) => effect.type === type);
    }

    takeDamage(damage: number, attacker: ICharacter | null): void {
        if (this.hasStatus('immunity')) {
            console.log(`${this.name} неуязвим! Урон заблокирован.`);
            return;
        }

        this._armor = this._armor - damage;
        if (this._armor < 0) {
            this._hp += this._armor;
            this._armor = 0;
        }

        if (attacker) this.applyAttackerPassiveEffect(attacker, damage);

        if  (this._hp <= 0) this.die()
    }

    die(): void {
        if(this._cell) {
            this._cell.setIsOwn(false);
            this._cell = null
        }

        events.emit('character:died', {character: this})
    }

    applyAttackerPassiveEffect(attacker: ICharacter, damage: number) {
        for (const effect of attacker.status) {
            if (effect.type == 'poison_hit') {
                this.addEffect(createEffect('poison', effect.level, effect.level));
            }
            if (effect.type == 'rage') {
                this._armor = this._armor - damage * (effect.level - 1);
                if (this._armor < 0) {
                    this._hp += this._armor;
                    this._armor = 0;
                }
            }
        }
    }

    addArmor(armor: number): void {
        this._armor += armor;
    }

    addEffect(effect: IEffect): void {
        const effectCharacter: IEffect | undefined = this._status.find(e => e.type === effect.type);
        if (effectCharacter) {
            effectCharacter.setDuration(effectCharacter.duration + effect.duration);
            effectCharacter.setLevel(effectCharacter.level + effect.level);
        } else {
            this._status.push(effect);
        }
    }

    tickEffects(): void {
        for (const effect of this._status) {
            switch (effect.type) {
                case "poison":
                    this.takeDamage(effect.level, null)
                    effect.setLevel(effect.level - 1)
                    break;
                case "regeneration":
                    console.log('heal char')
                    this.heal(effect.level)
            }

            effect.setDuration(effect.duration - 1);
            if (effect.duration === 0) {
                this._status = this._status.filter(e => e.type !== effect.type);
            }
        }
    }

    removeEffect(effect: IEffect): void {
        this._status.filter(e => e.id !== effect.id);
    }
}