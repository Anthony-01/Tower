var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var XFKControl = (function (_super) {
        __extends(XFKControl, _super);
        function XFKControl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XFKControl.getIns = function () {
            if (this._ins == null) {
                this._ins = new XFKControl();
            }
            return this._ins;
        };
        XFKControl.dispatchEvent = function (type, data) {
            this.getIns().dispatchEvent(new egret.Event(type, data));
        };
        XFKControl.addEventListener = function (type, func, thisObj) {
        };
        XFKControl.removeEventListener = function (type, func, thisObj) {
        };
        return XFKControl;
    }(egret.EventDispatcher));
    game.XFKControl = XFKControl;
    __reflect(XFKControl.prototype, "game.XFKControl");
})(game || (game = {}));
