var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * view层
     * */
    var XFKScene = (function () {
        function XFKScene() {
            /**
             * 动作列表
             * */
            this.action = [];
            //视图关键字
            this.sceneKey = "scene1";
            this.lastTime = 0;
            this.isInit = false;
            this.id = game.CommonFunction.Token;
        }
        Object.defineProperty(XFKScene.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        XFKScene.prototype.load = function (name) {
            this.release();
            this.sceneKey = name;
            this.startTime = egret.getTimer();
            game.ModuleManager.getInstance().registerModule(this);
            //监听血量变化、子弹创建以及敌人死亡事件
            game.XFKControl.addEventListener(game.BaseEvent.gm_headquaters_hpChange, this.baseHpChange, this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_activation_bullet, this.createBullet, this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_monster_death, this.spriteDeath, this);
            this.init();
        };
        XFKScene.prototype.release = function () {
            this.startTime = null;
            game.ModuleManager.getInstance().unRegisterModule(this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_headquaters_hpChange, this.baseHpChange, this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_activation_bullet, this.createBullet, this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_monster_death, this.spriteDeath, this);
            this.removeAll();
        };
        XFKScene.prototype.removeAll = function () {
            while (game.XFKLayer.getIns().NpcLayer.numChildren > 0) {
                var obj = game.XFKLayer.getIns().NpcLayer.removeChildAt(0);
                obj.release();
            }
        };
        XFKScene.prototype.update = function (time) {
            if (this.isInit && time > this.lastTime) {
                this.createSp();
                this.lastTime = time + 800;
            }
        };
        XFKScene.prototype.init = function () {
            this.createBG();
            this.createTurret();
            this.createAction();
            this.isInit = true;
        };
        XFKScene.prototype.createBG = function () {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(this.sceneKey + "bg_jpg");
            game.XFKLayer.getIns().BgLayer.addChild(bitmap);
        };
        /**
         * 创建防御塔
         * */
        XFKScene.prototype.createTurret = function () {
            var data = RES.getRes(this.sceneKey + "turret_json");
            for (var n = 0; n < data.turret.length; n++) {
                var turret = new game.XFKTurret();
                turret.Parse(data.turret[n]);
                turret.load(game.XFKLayer.getIns().NpcLayer);
            }
        };
        XFKScene.prototype.createAction = function () {
            var data = RES.getRes(this.sceneKey + "sprite_json");
            var index;
            for (var n = 0; n < data.sprite.length; n++) {
                data.sprite[n].path = data.Path;
                data.sprite[n].delay = parseInt(data.sprite[n].delay);
                //根据怪物的数量来生成怪物
                for (var j = 0; j < data.sprite[n].count; j++) {
                    index = this.action.push(data.sprite[n]);
                }
            }
        };
        /**
         * 创建敌方精灵
         * */
        XFKScene.prototype.createSp = function () {
            if (this.action.length > 0) {
                if (this.action[0].delay + this.startTime <= egret.getTimer()) {
                    var sp = new game.XFKSprite();
                    sp.parse(this.action.shift());
                    sp.load(game.XFKLayer.getIns().NpcLayer);
                }
            }
        };
        XFKScene.prototype.baseHpChange = function (e) {
        };
        XFKScene.prototype.createBullet = function (e) {
            var bullet = new game.XFKBullet();
            bullet.setTarget(e.object[0], e.object[1]);
            bullet.load(game.XFKLayer.getIns().NpcLayer);
        };
        XFKScene.prototype.spriteDeath = function () {
        };
        return XFKScene;
    }());
    game.XFKScene = XFKScene;
    __reflect(XFKScene.prototype, "game.XFKScene", ["game.IObject", "game.ILoad", "game.IUpdate"]);
})(game || (game = {}));
