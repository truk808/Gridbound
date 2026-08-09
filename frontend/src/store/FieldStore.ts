    import type {RootStore} from "./RootStore.ts";
    import {makeAutoObservable} from "mobx";
    import {COUNT_CELL} from "../config/gameConfig.ts";
    import type {ICell} from "../types/ICell.ts";


    export class FieldStore {
        rootStore: RootStore;

        field: ICell[] = [];

        constructor(rootStore: RootStore) {
            this.rootStore = rootStore;
            makeAutoObservable(this, {rootStore: false})
        }

        initField() {
            const cells: ICell[] = [];
            for (let i = 0; i < COUNT_CELL; i++) {
                cells.push({
                    x: i,
                });
            }

            this.field = cells;
        }

    }