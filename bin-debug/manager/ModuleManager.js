var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ModuleManager = (function () {
        function ModuleManager() {
            this.moduleList = [];
            this.IsStop = true;
            game.XFKLayer.getIns().StageLayer.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        ModuleManager.getInstance = function () {
            if (this._ins == null) {
                this._ins = new ModuleManager();
            }
            return this._ins;
        };
        /*
        * 注册
        * */
        ModuleManager.prototype.registerModule = function (module) {
            if (this.moduleList) {
                this.moduleList.push(module);
            }
        };
        /**
         * 注销
         * */
        ModuleManager.prototype.unRegisterModule = function (module) {
            var index = this.moduleList.indexOf(module);
            if (index == -1) {
                console.warn("未找到需要注销的模块:", module);
                return;
            }
            this.moduleList.splice(index, 1);
        };
        /**
         * 获取游戏模块列表
         * */
        ModuleManager.prototype.GetModuleList = function () {
            return this.moduleList;
        };
        ModuleManager.prototype.update = function () {
            if (this.IsStop) {
                return;
            }
            for (var key in this.moduleList) {
                this.moduleList[key].update(egret.getTimer());
            }
        };
        return ModuleManager;
    }());
    game.ModuleManager = ModuleManager;
    __reflect(ModuleManager.prototype, "game.ModuleManager");
})(game || (game = {}));
