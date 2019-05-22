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
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            var _this = _super.call(this) || this;
            _this.isOpen = false;
            return _this;
        }
        BasePanel.prototype.showBackground = function () {
            if (this.backBG) {
                return;
            }
            this.backBG = new egret.Bitmap();
            this.backBG.name = "panelbackground";
            this.backBG.texture = RES.getRes("panelbackground_jpg");
            this.backBG.alpha = 0.6;
            this.backBG.width = game.XFKLayer.getIns().StageLayer.width;
            this.backBG.height = game.XFKLayer.getIns().StageLayer.height;
            game.XFKLayer.getIns().UiLayer.addChild(this.backBG);
        };
        BasePanel.prototype.show = function (type) {
            if (type === void 0) { type = 0; }
            this.isOpen = true;
            //灰色遮罩层显示与否
            if (type == 0) {
                this.showBackground();
            }
            game.XFKLayer.getIns().UiLayer.addChild(this);
        };
        BasePanel.prototype.closePanel = function () {
            this.isOpen = false;
            if (this.backBG && this.backBG.parent) {
                this.backBG.parent.removeChild(this.backBG);
                this.backBG = null;
            }
            while (this.numChildren) {
                this.removeChildAt(0);
            }
            //删除类对象
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        BasePanel.prototype.setPoint = function (x, y) {
            this.x = x - this.width / 2;
            this.y = y - this.height / 2;
        };
        return BasePanel;
    }(egret.Sprite));
    game.BasePanel = BasePanel;
    __reflect(BasePanel.prototype, "game.BasePanel");
})(game || (game = {}));
