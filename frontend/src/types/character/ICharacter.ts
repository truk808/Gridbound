import type {ICell} from "../ICell.ts";

export interface ICharacter {
    id: string;
    name: string;
    ap: number;
    hp: number;
    armor: number;
    cell: ICell | null;
}