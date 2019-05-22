namespace game {
    export class XFKBullet extends BaseSprite {
        private radius: number;         //攻击范围
        private target: BaseSprite;     //攻击目标

        setTarget(source: BaseSprite, target: BaseSprite) {
            this.x = source.Point.x;
            this.y = source.Point.y;

            this.target = target;

            let bitmap = new egret.Bitmap(RES.getRes("bullet1_png"));
            bitmap.x = -bitmap.width / 2;
            bitmap.y = -bitmap.height / 2;

            this.addChild(bitmap);

            this.MoveSpeed = 1;
            this.radius = 10;
        }

        load(parent: egret.DisplayObjectContainer) {
            parent.addChild(this);
            game.ModuleManager.getInstance().registerModule(this);
        }

        release() {
            super.release();
            if (this.parent) {
                this.parent.removeChild(this);
            }
            game.ModuleManager.getInstance().unRegisterModule(this);
        }

        update(time: number) {
            super.update(time);
            this.move(time);
        }

        private move(time: number) {
            let distance = game.CommonFunction.GetDistance(this.Point, this.target.Point);
            if (distance < this.radius) {
                this.target.setHp(this.target.Hp - this.Atc);
                this.target = null;
                this.release();
            } else {
                let targetSpeed = game.CommonFunction.GetSpeed(this.target.Point, this.Point, this.MoveSpeed);
                let distanceX = targetSpeed.x * 10;
                let distanceY = targetSpeed.y * 10;
                this.x += distanceX;
                this.y += distanceY;
            }
        }
    }
}