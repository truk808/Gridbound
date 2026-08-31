import type {DeepFieldsOnly} from "../backend/helper/DeepFieldsOnly";

export interface ICellColor {
    x: number;
    color: string | null;
}

export interface ICell {
    readonly x: number;
    isOwn: boolean;

    setIsOwn(value: boolean): void;
    toDTO(): ICellDTO
}

export type ICellDTO = DeepFieldsOnly<ICell>;