var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var ModuleManager = (function () {
        function ModuleManager() {
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
        };
        /**
         * 注销
         * */
        ModuleManager.prototype.unRegisterModule = function (module) {
        };
        return ModuleManager;
    }());
    game.ModuleManager = ModuleManager;
    __reflect(ModuleManager.prototype, "game.ModuleManager");
})(game || (game = {}));
