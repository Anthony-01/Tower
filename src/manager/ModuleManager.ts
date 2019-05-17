namespace game {
    export class ModuleManager {
        private static _ins: ModuleManager;

        public static getInstance(): ModuleManager {
            if (this._ins == null) {
                this._ins = new ModuleManager();
            }
            return this._ins;
        }

        /*
        * 注册
        * */
        registerModule(module: egret.DisplayObjectContainer) {

        }

        /**
         * 注销
         * */
        unRegisterModule(module: egret.DisplayObjectContainer) {

        }
    }
}