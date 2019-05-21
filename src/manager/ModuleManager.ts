namespace game {
    export class ModuleManager {
        private static _ins: ModuleManager;

        public static getInstance(): ModuleManager {
            if (this._ins == null) {
                this._ins = new ModuleManager();
            }
            return this._ins;
        }

        constructor() {
            game.XFKLayer.getIns().StageLayer.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }


        private moduleList: game.IObject[] = [];
        /*
        * 注册
        * */
        registerModule(module: game.IObject) {
            if (this.moduleList) {
                this.moduleList.push(module);
            }
        }

        /**
         * 注销
         * */
        unRegisterModule(module: game.IObject) {
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

        public IsStop: boolean = true;
        private update() {
            if (this.IsStop) {
                return
            }
            for (let key in this.moduleList) {
                (<game.IObject>this.moduleList[key]).update(egret.getTimer())
            }
        }
    }
}