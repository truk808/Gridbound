import {ICharacter, ICharacterDTO} from "../../types/character/ICharacter";
import {ICell, ICellDTO} from "../../types/ICell";
import {IEffect, StatusType} from "../../types/IEffect";
import {CharacterName} from "../../config/characters.config";
import {createEffect} from "../../helper/createEffect";
import {events} from "../../frontend/src/models/EventBus";

export class Character implements ICharacter {
    readonly id: string;
    readonly name: CharacterName;
    private _armorTime: number = 2;
    private _distanceToMove: number;
    private _maxHp: number;
    private _hp: number;
    private _armor: number;
    private _status: IEffect[];
    private _cell: ICell | null;

    get distanceToMove(): number { return this._distanceToMove; }
    get maxHp(): number { return this._maxHp; }
    get hp(): number { return this._hp; }
    get armor(): number { return this._armor; }
    get status(): IEffect[] { return this._status; }
    get cell(): ICell | null { return this._cell; }

    constructor(name: CharacterName, maxHp: number, hp?: number, distanceToMove?: number, armor?: number, id?: string, status?: IEffect[], cell?: ICell) {
        this.id = id ?? crypto.randomUUID();
        this.name = name;
        this._maxHp = maxHp;
        this._hp = hp ?? maxHp;
        this._armor = armor ?? 0;
        this._distanceToMove = distanceToMove ?? 1;
        this._status = status ?? []
        this._cell = cell ?? null;
    }

    get armorTime(): number { return this._armor; }

    addArmor(armor: number): void {
        this._armor += armor;
    }

    setArmorTime(value: number) {
        if (this._armor === 0) return;
        if (this._armorTime - value <= 0) {
            this._armorTime = 2;
            this._armor = 0;
            return;
        }
        this._armorTime -= value;
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

    addEffect(effect: IEffect): void {
        const effectCharacter: IEffect | undefined = this._status.find(e => e.type === effect.type);
        if (effectCharacter) {
            effectCharacter.setDuration(effectCharacter.duration + effect.duration);
            effectCharacter.setLevel(effectCharacter.level + effect.level);
        } else {
            this._status.push(effect);
        }
    }

    die(): void {
        if(this._cell) {
            this._cell.setIsOwn(false);
            this._cell = null
        }
    }

    hasStatus(type: StatusType): boolean {
        return this._status.some((effect) => effect.type === type);
    }

    isCanMove(target: ICell | null): boolean {
        if (target && this.cell) {
            if (target.isOwn) return false;
            if (Math.abs(target.x - this.cell.x) !== this.distanceToMove) return false;
        }

        console.log('check stun', this.hasStatus('stun'));
        if (this.hasStatus('stun')) {
            console.log('stun', target);
            return false;
        }

        return true ;
    }

    move(target: ICell | null): void {
        if(this.isCanMove(target) && this._cell && target) {
            this._cell.setIsOwn(false);
            this._cell = target;
            this._cell.setIsOwn(true);
        }
    }

    removeEffect(effect: IEffect): void {
        this._status.filter(e => e.id !== effect.id);
    }

    setArmor(armor: number) {
        this._armor = armor;
    }

    setCell(cell: ICell | null): void {
        this._cell = cell;
        this._cell?.setIsOwn(true);
    }

    tickEffects(): void {
        for (const effect of this._status) {
            switch (effect.type) {
                case "poison":
                    this.takeDamage(effect.level, null)
                    effect.setLevel(effect.level - 1)
                    break;
                case "regeneration":
                    this.heal(effect.level)
            }

            effect.setDuration(effect.duration - 1);
            if (effect.duration === 0) {
                this._status = this._status.filter(e => e.type !== effect.type);
            }
        }
    }

    heal(heal: number) {
        if (this._hp + heal > this.maxHp) {
            this._hp = this.maxHp;
        } else {
            this._hp += heal;
        }
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

    toDTO(): ICharacterDTO {
        return {
            id: this.id,
            name: this.name,
            armorTime: this.armorTime,
            maxHp: this._maxHp,
            hp: this._hp,
            armor: this._armor,
            distanceToMove: this._distanceToMove,
            status: this._status.map( effect => effect.toDTO() ),
            cell: this._cell && this._cell.toDTO()
        };
    }

}