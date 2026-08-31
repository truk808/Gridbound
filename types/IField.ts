import type {ICell} from "./ICell.ts";
import type {DeepFieldsOnly} from "../backend/helper/DeepFieldsOnly";

export interface IField {
    readonly cells: ICell[];

    getCellByX(x: number | null): ICell | null
    toDTO(): IFieldDTO
}

export type IFieldDTO = DeepFieldsOnly<IField>