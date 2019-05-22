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
    var XFKBullet = (function (_super) {
        __extends(XFKBullet, _super);
        function XFKBullet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XFKBullet.prototype.setTarget = function (source, target) {
            this.x = source.Point.x;
            this.y = source.Point.y;
            this.target = target;
            var bitmap = new egret.Bitmap(RES.getRes("bullet1_png"));
            bitmap.x = -bitmap.width / 2;
            bitmap.y = -bitmap.height / 2;
            this.addChild(bitmap);
            this.MoveSpeed = 1;
            this.radius = 10;
        };
        XFKBullet.prototype.load = function (parent) {
            parent.addChild(this);
            game.ModuleManager.getInstance().registerModule(this);
        };
        XFKBullet.prototype.release = function () {
            _super.prototype.release.call(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.getInstance().unRegisterModule(this);
        };
        XFKBullet.prototype.update = function (time) {
            _super.prototype.update.call(this, time);
            this.move(time);
        };
        XFKBullet.prototype.move = function (time) {
            var distance = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            if (distance < this.radius) {
                this.target.setHp(this.target.Hp - this.Atc);
                this.target = null;
                this.release();
            }
            else {
                var targetSpeed = game.CommonFunction.GetSpeed(this.target.Point, this.Point, this.MoveSpeed);
                var distanceX = targetSpeed.x * 10;
                var distanceY = targetSpeed.y * 10;
                this.x += distanceX;
                this.y += distanceY;
            }
        };
        return XFKBullet;
    }(game.BaseSprite));
    game.XFKBullet = XFKBullet;
    __reflect(XFKBullet.prototype, "game.XFKBullet");
})(game || (game = {}));
