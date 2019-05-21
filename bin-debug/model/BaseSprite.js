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
    var EDirectionMap;
    (function (EDirectionMap) {
        EDirectionMap["Down"] = "down";
        EDirectionMap["UP"] = "up";
        EDirectionMap["RIGHT"] = "right";
        EDirectionMap["LEFT"] = "left";
        EDirectionMap["NONE"] = "";
    })(EDirectionMap = game.EDirectionMap || (game.EDirectionMap = {}));
    game.C_DIRECTION_MAP = {
        "01": EDirectionMap.Down,
        "02": EDirectionMap.UP,
        "10": EDirectionMap.RIGHT,
        "20": EDirectionMap.LEFT,
        "else": EDirectionMap.NONE
    };
    /**
     * 精灵的基础类别
     * */
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite() {
            var _this = _super.call(this) || this;
            //精灵当前血量以及最大血量
            _this.Hp = 100;
            _this.MaxHp = 100;
            //精灵种类
            _this.Type = "sprite1";
            //移动速度
            _this.MoveSpeed = 1;
            //攻击力
            _this.Atc = 1;
            //行动方向
            _this.direction = "";
            _this.id = game.CommonFunction.Token;
            return _this;
        }
        Object.defineProperty(BaseSprite.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSprite.prototype, "Direction", {
            get: function () {
                return this.direction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseSprite.prototype, "Point", {
            get: function () {
                return new egret.Point(this.x, this.y);
            },
            enumerable: true,
            configurable: true
        });
        BaseSprite.prototype.setHp = function (value) {
            this.Hp = value;
            //发送血量更改给控制器
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        };
        /**
         * 设定朝向
         * @param p: 需要朝向的点
         * */
        BaseSprite.prototype.setDirection = function (p) {
            var offX = p.x - this.x > 0 ? 1 : (p.x - this.x == 0 ? 0 : 2);
            var offY = p.y - this.y > 0 ? 1 : (p.y - this.y == 0 ? 0 : 2);
            var tempDirection = game.C_DIRECTION_MAP["" + offX + offY] || game.C_DIRECTION_MAP["else"];
            if (tempDirection != this.direction) {
                this.direction = tempDirection;
                this.dispatchEvent(new egret.Event("gm_directionChange"));
            }
        };
        //需要重写的方法
        BaseSprite.prototype.update = function (time) {
        };
        /**
         * 重写的load
         * */
        BaseSprite.prototype.load = function (layer) {
        };
        /**
         * 重写的release
         * */
        BaseSprite.prototype.release = function () {
        };
        return BaseSprite;
    }(egret.Sprite));
    game.BaseSprite = BaseSprite;
    __reflect(BaseSprite.prototype, "game.BaseSprite", ["game.IObject", "game.ILoad", "game.IUpdate"]);
})(game || (game = {}));
