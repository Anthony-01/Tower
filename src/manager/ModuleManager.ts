namespace game {
    export class ModuleManager {
        private static _ins: ModuleManager;

        public static getInstance(): ModuleManager {
            if (this._ins == null) {
                this._ins = new ModuleManager();
            }
            return this._ins;
        }


        private moduleList: egret.DisplayObjectContainer[] = [];
        /*
        * 注册
        * */
        registerModule(module: egret.DisplayObjectContainer) {
            if (this.moduleList) {
                this.moduleList.push(module);
            }
        }

        /**
         * 注销
         * */
        unRegisterModule(module: egret.DisplayObjectContainer) {
            let index = this.moduleList.indexOf(module);
            if (index = -1) return;
            this.moduleList.splice(index, 1);
        }

        /**
         * 获取游戏模块列表
         * */
        GetModuleList(): any[] {
            return this.moduleList;
        }
    }
}