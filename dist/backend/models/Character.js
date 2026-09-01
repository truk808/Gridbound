"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const createEffect_1 = require("../helper/createEffect");
const EventBus_1 = require("./EventBus");
class Character {
    get distanceToMove() { return this._distanceToMove; }
    get maxHp() { return this._maxHp; }
    get hp() { return this._hp; }
    get armor() { return this._armor; }
    get status() { return this._status; }
    get cell() { return this._cell; }
    constructor(name, maxHp, hp, distanceToMove, armor, id, status, cell) {
        this._armorTime = 2;
        this.id = id ?? crypto.randomUUID();
        this.name = name;
        this._maxHp = maxHp;
        this._hp = hp ?? maxHp;
        this._armor = armor ?? 0;
        this._distanceToMove = distanceToMove ?? 1;
        this._status = status ?? [];
        this._cell = cell ?? null;
    }
    get armorTime() { return this._armor; }
    setHp(hp) {
        this._hp = hp;
        if (this._hp <= 0)
            this.die();
    }
    addArmor(armor) {
        this._armor += armor;
    }
    setArmorTime(value) {
        if (this._armor === 0)
            return;
        if (this._armorTime - value <= 0) {
            this._armorTime = 2;
            this._armor = 0;
            return;
        }
        this._armorTime -= value;
    }
    applyAttackerPassiveEffect(attacker, damage) {
        for (const effect of attacker.status) {
            if (effect.type == 'poison_hit') {
                this.addEffect((0, createEffect_1.createEffect)('poison', effect.level, effect.level));
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
    addEffect(effect) {
        const effectCharacter = this._status.find(e => e.type === effect.type);
        if (effectCharacter) {
            effectCharacter.setDuration(effectCharacter.duration + effect.duration);
            effectCharacter.setLevel(effectCharacter.level + effect.level);
        }
        else {
            this._status.push(effect);
        }
    }
    die() {
        if (this._cell) {
            this._cell.setIsOwn(false);
            this._cell = null;
        }
        EventBus_1.events.emit('character:died', {
            character: this
        });
    }
    hasStatus(type) {
        return this._status.some((effect) => effect.type === type);
    }
    isCanMove(target, ap) {
        if (target && this.cell) {
            if (target.isOwn)
                return false;
            if (Math.abs(target.x - this.cell.x) !== this.distanceToMove)
                return false;
        }
        // console.log('ap', ap, ap && ap >= 0)
        if (ap) {
            console.log('appppppppppp', ap);
            if ((ap <= 0))
                return false;
        }
        if (this.hasStatus('stun')) {
            console.log('stun', target);
            return false;
        }
        return true;
    }
    move(target) {
        if (this.isCanMove(target) && this._cell && target) {
            this._cell.setIsOwn(false);
            this._cell = target;
            this._cell.setIsOwn(true);
        }
    }
    removeEffect(effect) {
        this._status.filter(e => e.id !== effect.id);
    }
    setArmor(armor) {
        this._armor = armor;
    }
    setCell(cell) {
        this._cell = cell;
        this._cell?.setIsOwn(true);
    }
    tickEffects() {
        for (const effect of this._status) {
            switch (effect.type) {
                case "poison":
                    this.takeDamage(effect.level, null);
                    effect.setLevel(effect.level - 1);
                    break;
                case "regeneration":
                    this.heal(effect.level);
            }
            effect.setDuration(effect.duration - 1);
            if (effect.duration === 0) {
                this._status = this._status.filter(e => e.type !== effect.type);
            }
        }
    }
    heal(heal) {
        if (this._hp + heal > this.maxHp) {
            this._hp = this.maxHp;
        }
        else {
            this._hp += heal;
        }
    }
    takeDamage(damage, attacker) {
        if (this.hasStatus('immunity')) {
            console.log(`${this.name} неуязвим! Урон заблокирован.`);
            return;
        }
        this._armor = this._armor - damage;
        if (this._armor < 0) {
            this._hp += this._armor;
            this._armor = 0;
        }
        if (attacker)
            this.applyAttackerPassiveEffect(attacker, damage);
        if (this._hp <= 0)
            this.die();
    }
    toDTO() {
        return {
            id: this.id,
            name: this.name,
            armorTime: this.armorTime,
            maxHp: this._maxHp,
            hp: this._hp,
            armor: this._armor,
            distanceToMove: this._distanceToMove,
            status: this._status.map(effect => effect.toDTO()),
            cell: this._cell && this._cell.toDTO()
        };
    }
}
exports.Character = Character;
