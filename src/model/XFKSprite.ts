namespace game {
    export class XFKSprite extends game.BaseSprite {

        constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
            this.hpImg = new XFKHpImg();
        }

        private onStage() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onStage, this);
            this.addEventListener("gm_hpChange", this.onHpChange, this);
            this.addEventListener("gm_directionChange", this.onDirectionChange, this);


            //设置初始位置以及方向
            this.x = this.Path[0].x;
            this.y = this.Path[0].y;
            this.setDirection(this.Path[1]);
        }

        /**
         * 监听血量变化，小于0的时候通知全局死亡
         * model监听，发送控制器改变逻辑（view->controller）
         * */
        private onHpChange(e:egret.Event) {
            this.hpImg.setHp(this.Hp, this.MaxHp);
            if (this.Hp < 0) {
                // game.XFKControl.dispatchEvent(game.BaseEvent.gm_monster_death, this);
                this.release();
            }
        }

        //动画
        private _sp: egret.MovieClip;

        private onDirectionChange(e: egret.Event) {
            //创建一个movieClip,可否算作一个view？
            let data = RES.getRes(this.Type + "_" + this.Direction + "_json");
            let texture = RES.getRes(this.Type + "_" + this.Direction + "_png");
            let mcFactory = new egret.MovieClipDataFactory(data, texture);

            if (this._sp != null) {
                this._sp.parent.removeChild(this._sp);
                this._sp.stop();
            }

            this._sp = new egret.MovieClip(mcFactory.generateMovieClipData(this.Type + "_" + this.Direction));
            this.addChild(this._sp);

            this._sp.x = -20;
            this._sp.y = -30;
            this._sp.gotoAndPlay(1, -1);

            let shape = new egret.Shape();
            shape.graphics.beginFill(0xffff60, 1);
            shape.graphics.drawRect(0, 0, 3, 3);
            shape.graphics.endFill();
            this.addChild(shape);
        }

        private hpImg: XFKHpImg;
        /**
         * 重写load
         * */
        public load(parent: egret.DisplayObjectContainer) {
            super.load(parent);
            parent.addChild(this);
            //注册
            game.ModuleManager.getInstance().registerModule(this);
            //添加血条
            this.hpImg.load(this);
        }

        //行走轨迹
        public Path: egret.Point[] = [];

        public parse(obj: any) {
            this.MaxHp = parseInt(obj.hp);
            this.Hp = parseInt(obj.hp);
            // this.Gold = parseInt(obj.gold);
            this.MoveSpeed = parseFloat(obj.speed);
            this.Type = obj.type;

            this.Path = [];

            for (let n = 0; n < obj.path.length; n++) {
                this.Path.push(new egret.Point(parseInt(obj.path[n].x), parseInt(obj.path[n].y)));
            }
        }

        public update(passTime: number) {
            super.update(passTime);
            this.move(passTime);
        }

        private move(time: number) { //通知view状态更新？
            if (this.Path.length ==0) return;

            let point = this.Path[0];
            //计算x以及y方向上需要行进的距离?
            let targetSpeed: any;
            targetSpeed = game.CommonFunction.GetSpeed(this.Point, point, this.MoveSpeed);
            let distanceX = targetSpeed.x * 10; //为什么要乘以10
            let distanceY = targetSpeed.y * 10;


            if (Math.abs(point.x - this.x) <= Math.abs(distanceX) && Math.abs(point.y - this.y) <= Math.abs(distanceY)) {
                this.x = point.x;
                this.y = point.y;
                this.Path.shift();
                if (this.Path.length == 0) {
                    //全局通知移动到终点
                    this.release();
                    return;
                } else {
                    this.setDirection(this.Path[0]);
                }
            } else {
                this.x += distanceX;
                this.y += distanceY;
            }
        }

        public release() { //释放整个model
            super.release();
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
        }
    }
}