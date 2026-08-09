import type {RootStore} from "./RootStore.ts";
import {makeAutoObservable} from "mobx";
import type {ICharacter} from "../types/character/ICharacter.ts";
import type {ICell} from "../types/ICell.ts";

export class CharacterStore {
    rootStore: RootStore;

    character1: ICharacter | null = null;
    character2: ICharacter | null = null

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {rootStore: false})
    }

    getCharacterByCellIndex(x: number): ICharacter | null {
        if (this.character1?.cell?.x === x) return this.character1;
        if (this.character2?.cell?.x === x) return this.character2;
        return null;
    }

    setCharacter(ch1: ICharacter, ch2: ICharacter) {
        this.character1 = ch1;
        this.character2 = ch2;
    }

    isCanMove(): boolean {
        return true
    }

    move(character: ICharacter | null, target: ICell): void {
        if(this.isCanMove() && character !==null) {
            character.cell = target;
        }
    }
}