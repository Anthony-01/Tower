var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var XFKLayer = (function () {
        function XFKLayer() {
        }
        XFKLayer.getIns = function () {
            if (this._ins == null) {
                this._ins = new XFKLayer();
            }
            return this._ins;
        };
        XFKLayer.prototype.init = function () {
            this.GameLayer = new egret.DisplayObjectContainer();
            this.GameLayer.name = "GameLayer";
            this.StageLayer.addChild(this.GameLayer);
            this.BgLayer = new egret.DisplayObjectContainer();
            this.BgLayer.name = "BgLayer";
            this.GameLayer.addChild(this.BgLayer);
            this.NpcLayer = new egret.DisplayObjectContainer();
            this.NpcLayer.name = "NpcLayer";
            this.GameLayer.addChild(this.NpcLayer);
            this.DecorationLayer = new egret.DisplayObjectContainer();
            this.DecorationLayer.name = "DecorationLayer";
            this.GameLayer.addChild(this.DecorationLayer);
            this.UiLayer = new egret.DisplayObjectContainer();
            this.UiLayer.name = "UiLayer";
            this.StageLayer.addChild(this.UiLayer);
            this.EuiLayer = new egret.DisplayObjectContainer();
            this.EuiLayer.name = "EuiLayer";
            this.StageLayer.addChild(this.EuiLayer);
        };
        XFKLayer.prototype.load = function (stage) {
            this.StageLayer = stage;
            this.init();
        };
        return XFKLayer;
    }());
    game.XFKLayer = XFKLayer;
    __reflect(XFKLayer.prototype, "game.XFKLayer");
})(game || (game = {}));
