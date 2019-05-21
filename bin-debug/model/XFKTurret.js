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
    var XFKTurret = (function (_super) {
        __extends(XFKTurret, _super);
        function XFKTurret() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastTime = 0;
            return _this;
        }
        XFKTurret.prototype.createSp = function () {
            var data = RES.getRes(this.skin + "_json");
            var textrue = RES.getRes(this.skin + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, textrue);
            if (this.sp != null) {
                this.sp.parent.removeChild(this.sp);
                this.sp.stop();
            }
            this.sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.skin));
            this.sp.gotoAndPlay(1, -1);
            this.sp.x = -this.sp.width / 2 + this.offsetX;
            this.sp.y = -this.sp.height / 2 + this.offsetY;
            this.addChild(this.sp);
            this.sp.touchEnabled = true;
        };
        XFKTurret.prototype.load = function (parent) {
            _super.prototype.load.call(this, parent);
            parent.addChild(this);
            this.createSp();
            if (this.radiusShape == null) {
                this.radiusShape = new egret.Shape();
                var graphics = this.radiusShape.graphics;
                graphics.beginFill(0xffff60, 1);
                graphics.drawCircle(0, 0, this.radius);
                this.radiusShape.alpha = 0.2;
                this.addChild(this.radiusShape);
            }
            //model->controller
            game.TDSelectPanel.getIns().showPanel(this.onChange, this);
            game.TDSelectPanel.getIns().setPoint(this.Point.x, this.Point.y + this.radiusShape.height);
        };
        XFKTurret.prototype.onChange = function (name) {
            this.parseSkin(name);
            this.createSp();
            if (this.radiusShape != null) {
                this.radiusShape.parent.removeChild(this.radiusShape);
                this.radiusShape = null;
            }
        };
        XFKTurret.prototype.Parse = function (obj) {
            this.x = parseInt(obj.x);
            this.y = parseInt(obj.y);
            this.parseSkin(obj.type);
        };
        XFKTurret.prototype.parseSkin = function (name) {
            var data = RES.getRes("turretskin_json");
            this.skin = name;
            this.offsetX = parseInt(data[name].offsetx);
            this.offsetY = parseInt(data[name].offsety);
            this.radius = parseInt(data[name].radius);
            this.name = data[name].name;
            this.cost = parseInt(data[name].glob);
            this.MoveSpeed = parseInt(data[name].speed);
        };
        XFKTurret.prototype.update = function (time) {
            _super.prototype.update.call(this, time);
            if (this.MoveSpeed == 0) {
                return;
            }
            this.searchTarget();
        };
        XFKTurret.prototype.searchTarget = function () {
            var objectList = game.ModuleManager.getInstance().GetModuleList();
            var tempSp;
            for (var key in objectList) {
                if (objectList[key] instanceof game.XFKSprite) {
                    tempSp = objectList[key];
                    if (game.CommonFunction.GetDistance(this.Point, tempSp.Point) <= this.radius) {
                        this.createBullet(this, tempSp);
                    }
                }
            }
        };
        XFKTurret.prototype.createBullet = function (curret, target) {
            var now = egret.getTimer();
            if (now > this.lastTime) {
                this.lastTime = now + this.MoveSpeed;
                game.XFKControl.dispatchEvent(game.BaseEvent.gm_activation_bullet, [curret, target]);
                this.changeOrientation(target.Point);
            }
        };
        XFKTurret.prototype.changeOrientation = function (point) {
            var angle = Math.atan2(point.y - this.y, point.x - this.x);
            angle *= Math.PI;
            angle -= 180;
            if (angle < 0)
                angle += 360;
            var index = Math.round(this.sp.totalFrames * angle / 360);
            this.sp.gotoAndStop(index);
        };
        return XFKTurret;
    }(game.BaseSprite));
    game.XFKTurret = XFKTurret;
    __reflect(XFKTurret.prototype, "game.XFKTurret");
})(game || (game = {}));
