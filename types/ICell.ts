import type {DeepFieldsOnly} from "../helper/DeepFieldsOnly";

export interface ICell {
    readonly x: number;
    isOwn: boolean;

    setIsOwn(value: boolean): void;
    toDTO(): ICellDTO
}

export type ICellDTO = DeepFieldsOnly<ICell>;