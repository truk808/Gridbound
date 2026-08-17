
export interface ICell {
    readonly x: number;
    isOwn: boolean;

    setIsOwn(value: boolean): void;
}