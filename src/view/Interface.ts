namespace game {
    export interface ILoad {

        load(layer: egret.DisplayObjectContainer): void;
        /**
         * 卸载
         * */
        release(): void;
    }

    export interface IUpdate {
        update(time: number): void;
    }

    export interface IObject extends ILoad,IUpdate {
        ID: number;
    }
}