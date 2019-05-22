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
    /**
     * 负责显示四种炮塔
     * */
    var TDSelectPanel = (function (_super) {
        __extends(TDSelectPanel, _super);
        function TDSelectPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TDSelectPanel.getIns = function () {
            if (this._ins == null) {
                this._ins = new TDSelectPanel();
            }
            return this._ins;
        };
        TDSelectPanel.prototype.showPanel = function (callFunc, thisObj) {
            if (this.isOpen)
                return;
            this.show(0);
            this.callFun = callFunc;
            this.callObj = thisObj;
            var data = RES.getRes("turretskin_json");
            for (var key in data) {
                var mcData = RES.getRes(key + "_json");
                var mcTextrue = RES.getRes(key + "_png");
                var mcFactory = new egret.MovieClipDataFactory(mcData, mcTextrue);
                var mc = new egret.MovieClip(mcFactory.generateMovieClipData(key));
                this.addChild(mc);
                mc.x = Math.abs((this.numChildren - 1)) * mc.width + 10;
                mc.gotoAndPlay(1, -1);
                mc.name = key;
                mc.touchEnabled = true;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        TDSelectPanel.prototype.onTouchTap = function (e) {
            if (e.target instanceof egret.MovieClip) {
                this.callFun.call(this.callObj, [e.target.name]);
            }
            this.closePanel();
        };
        return TDSelectPanel;
    }(game.BasePanel));
    game.TDSelectPanel = TDSelectPanel;
    __reflect(TDSelectPanel.prototype, "game.TDSelectPanel");
})(game || (game = {}));
