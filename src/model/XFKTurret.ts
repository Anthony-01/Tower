namespace game {
    export class XFKTurret extends BaseSprite {
        private offsetX: number;     //炮塔中心点相关
        private offsetY: number;
        private skin: string;        //炮塔皮肤
        private radius: number;      //炮塔攻击范围
        private cost: number;        //炮塔的金币花费

        private sp: egret.MovieClip; //炮塔动画对象
        private createSp(): void {   //炮台创建
            let data = RES.getRes(this.skin + "_json");
            let textrue = RES.getRes(this.skin + "_png");
            let mcFactory = new egret.MovieClipDataFactory(data, textrue);

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
        }

        private radiusShape: egret.Shape;
        load(parent: egret.DisplayObjectContainer) {
            super.load(parent);
            parent.addChild(this);
            this.createSp();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
            game.ModuleManager.getInstance().registerModule(this);
            //model -> controller

        }

        release() {
            super.release();
            if(this.sp!=null){
                this.sp.stop();
            }
            if(this.parent!=null){
                this.parent.removeChild(this);
            }
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTab,this);
            game.ModuleManager.getInstance().unRegisterModule(this);
        }

        private onTouchTab(e: egret.TouchEvent) {
            if (this.radiusShape == null) {
                this.radiusShape = new egret.Shape();
                let graphics = this.radiusShape.graphics;
                graphics.beginFill(0xffff60, 1);
                graphics.drawCircle(0, 0, this.radius);
                this.radiusShape.alpha = 0.2;
                this.addChild(this.radiusShape);
            }
            game.TDSelectPanel.getIns().showPanel(this.onChange, this);
            game.TDSelectPanel.getIns().setPoint(this.Point.x, this.Point.y + this.radiusShape.height);
        }

        private onChange(name: string) {
            this.parseSkin(name);
            this.createSp();
            if (this.radiusShape != null) {
                this.radiusShape.parent.removeChild(this.radiusShape);
                this.radiusShape = null;
            }
        }

        public Parse(obj: any) {
            this.x = parseInt(obj.x);
            this.y = parseInt(obj.y);
            this.parseSkin(obj.type);
        }

        private parseSkin(name: string) {
            let data = RES.getRes("turretskin_json");
            this.skin = name;
            this.offsetX = parseInt(data[name].offsetx);
            this.offsetY = parseInt(data[name].offsety);
            this.radius = parseInt(data[name].radius);
            this.name = data[name].name;
            this.cost = parseInt(data[name].glob);
            this.MoveSpeed = parseInt(data[name].speed);
        }

        public update(time: number) {
            super.update(time);
            if (this.MoveSpeed == 0) {
                return;
            }
            this.searchTarget();
        }

        private searchTarget() {
            let objectList = game.ModuleManager.getInstance().GetModuleList();
            let tempSp: BaseSprite;
            for (let key in objectList) {
                if (objectList[key] instanceof XFKSprite) {
                    tempSp = objectList[key];
                    if (game.CommonFunction.GetDistance(this.Point, tempSp.Point) <= this.radius) {
                        this.createBullet(this, tempSp);
                    }
                }
            }
        }

        private lastTime: number = 0;

        private createBullet(curret: BaseSprite, target: BaseSprite) {
            let now = egret.getTimer();
            if (now > this.lastTime) {
                this.lastTime = now + this.MoveSpeed;
                game.XFKControl.dispatchEvent(game.BaseEvent.gm_activation_bullet, [curret, target]);
                this.changeOrientation(target.Point);
            }
        }

        private changeOrientation(point: egret.Point) {
            let angle = Math.atan2(point.y - this.y, point.x - this.x);
            angle *= Math.PI;
            angle -= 180;
            if (angle < 0) angle += 360;
            let index = Math.round(this.sp.totalFrames * angle / 360);
            this.sp.gotoAndStop(index);
        }
    }
}
