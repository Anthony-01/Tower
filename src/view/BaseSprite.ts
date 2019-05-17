namespace game {
    export enum EDirectionMap {
        Down   = "down",
        UP     = "up",
        RIGHT  = "right",
        LEFT   = "left",
        NONE   = ""
    }
    export const C_DIRECTION_MAP: {[key: string]: EDirectionMap} = {
        "01": EDirectionMap.Down,
        "02": EDirectionMap.UP,
        "10": EDirectionMap.RIGHT,
        "20": EDirectionMap.LEFT,
        "else": EDirectionMap.NONE
    };
    /**
     * 精灵的基础类别
     * */
    export class BaseSprite extends egret.Sprite implements IObject{
        private id: number = Math.random(); //随机分配id

        constructor() {
            super();
        }

        get ID(): number {
            return this.id;
        }

        get Direction(): string {
            return this.direction;
        }

        get Point(): egret.Point {
            return new egret.Point(this.x, this.y);
        }

        //精灵当前血量以及最大血量
        public Hp: number = 100;
        public MaxHp: number = 100;

        public setHp(value: number) {
            this.Hp = value;
            this.dispatchEvent(new egret.Event("gm_hpChange"));
        }

        //精灵种类
        public Type: string = "sprite1";

        //移动速度
        public MoveSpeed: number = 1;

        //攻击力
        public Atc: number = 1;

        //行动方向
        public direction: string = "";


        /**
         * 设定朝向
         * @param p: 需要朝向的点
         * */
        public setDirection(p: egret.Point) {
            let offX = p.x - this.x > 0 ? 1 : (p.x - this.x == 0 ? 0 : 2);
            let offY = p.y - this.y > 0 ? 1 : (p.y - this.y == 0 ? 0 : 2);

            let tempDirection = C_DIRECTION_MAP["" + offX + offY] || C_DIRECTION_MAP["else"];

            if (tempDirection != this.direction) {
                this.direction = tempDirection;
                this.dispatchEvent(new egret.Event("gm_directionChange"));
            }
        }



        //需要重写的方法
        public update(time: number) {

        }

        public load(layer: egret.DisplayObjectContainer) {

        }

        public release(): void {

        }

    }
}