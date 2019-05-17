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
    var XFKHpImg = (function (_super) {
        __extends(XFKHpImg, _super);
        function XFKHpImg() {
            return _super.call(this) || this;
        }
        XFKHpImg.prototype.load = function (parent) {
            this._parent = parent;
            this.init();
        };
        XFKHpImg.prototype.init = function () {
            this._bar = new eui.ProgressBar();
            this.setHp(100, 100);
            this._bar.x = -20;
            this._bar.y = -40;
            this._parent.addChild(this._bar);
        };
        XFKHpImg.prototype.setHp = function (current, total) {
            var value = Math.floor((current / total) * 100);
            this._bar.value = value;
        };
        XFKHpImg.prototype.release = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            while (this.numChildren) {
                this.removeChildAt(0);
            }
            this._parent = null;
        };
        return XFKHpImg;
    }(egret.Sprite));
    game.XFKHpImg = XFKHpImg;
    __reflect(XFKHpImg.prototype, "game.XFKHpImg", ["game.ILoad"]);
})(game || (game = {}));
