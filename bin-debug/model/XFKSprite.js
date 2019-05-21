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
    var XFKSprite = (function (_super) {
        __extends(XFKSprite, _super);
        function XFKSprite() {
            var _this = _super.call(this) || this;
            //行走轨迹
            _this.Path = [];
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
            _this.hpImg = new game.XFKHpImg();
            return _this;
        }
        XFKSprite.prototype.onStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);
            this.addEventListener("gm_directionChange", this.onDirectionChange, this);
            //设置初始位置以及方向
            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
            this.setDirection(this.Path[1]);
        };
        /**
         * 监听血量变化，小于0的时候通知全局死亡
         * model监听，发送控制器改变逻辑（view->controller）
         * */
        XFKSprite.prototype.onHpChange = function (e) {
            this.hpImg.setHp(this.Hp, this.MaxHp);
            if (this.Hp < 0) {
                // game.XFKControl.dispatchEvent(game.BaseEvent.gm_monster_death, this);
                this.release();
            }
        };
        XFKSprite.prototype.onDirectionChange = function (e) {
            //创建一个movieClip,可否算作一个view？
            var data = RES.getRes(this.Type + "_" + this.Direction + "_json");
            var texture = RES.getRes(this.Type + "_" + this.Direction + "_png");
            var mcFactory = new egret.MovieClipDataFactory(data, texture);
            if (this._sp != null) {
                this._sp.parent.removeChild(this._sp);
                this._sp.stop();
            }
            this._sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.Type + "_" + this.Direction));
            this.addChild(this._sp);
            this._sp.x = -20;
            this._sp.y = -30;
            this._sp.gotoAndPlay(1, -1);
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xffff60, 1);
            shape.graphics.drawRect(0, 0, 3, 3);
            shape.graphics.endFill();
            this.addChild(shape);
        };
        /**
         * 重写load
         * */
        XFKSprite.prototype.load = function (parent) {
            _super.prototype.load.call(this, parent);
            parent.addChild(this);
            //注册
            game.ModuleManager.getInstance().registerModule(this);
            //添加血条
            this.hpImg.load(this);
        };
        XFKSprite.prototype.parse = function (obj) {
            this.MaxHp = parseInt(obj.hp);
            this.Hp = parseInt(obj.hp);
            // this.Gold = parseInt(obj.gold);
            this.MoveSpeed = parseFloat(obj.speed);
            this.Type = obj.type;
            this.Path = [];
            for (var n = 0; n < obj.path.length; n++) {
                this.Path.push(new egret.Point(parseInt(obj.path[n].x), parseInt(obj.path[n].y)));
            }
        };
        XFKSprite.prototype.update = function (passTime) {
            _super.prototype.update.call(this, passTime);
            this.move(passTime);
        };
        XFKSprite.prototype.move = function (time) {
            if (this.Path.length == 0)
                return;
            var point = this.Path[0];
            //计算x以及y方向上需要行进的距离?
            var targetSpeed;
            targetSpeed = game.CommonFunction.GetSpeed(this.Point, point, this.MoveSpeed);
            var distanceX = targetSpeed.x * 10; //为什么要乘以10
            var distanceY = targetSpeed.y * 10;
            if (Math.abs(point.x - this.x) <= Math.abs(distanceX) && Math.abs(point.y - this.y) <= Math.abs(distanceY)) {
                this.x = point.x;
                this.y = point.y;
                this.Path.shift();
                if (this.Path.length == 0) {
                    //全局通知移动到终点
                    this.release();
                    return;
                }
                else {
                    this.setDirection(this.Path[0]);
                }
            }
            else {
                this.x += distanceX;
                this.y += distanceY;
            }
        };
        XFKSprite.prototype.release = function () {
            _super.prototype.release.call(this);
            this.removeEventListener("gm_hpChange", this.onHpChange, this);
            this.removeEventListener("gm_directionChange", this.onDirectionChange, this);
            if (this._sp) {
                this._sp.stop();
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.getInstance().unRegisterModule(this);
            this.hpImg.release();
        };
        return XFKSprite;
    }(game.BaseSprite));
    game.XFKSprite = XFKSprite;
    __reflect(XFKSprite.prototype, "game.XFKSprite");
})(game || (game = {}));
