namespace game {
    export class CommonFunction {
        public static GetDistance(point1:  egret.Point, point2: egret.Point): number {
            return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        }

        private static token:number=0;
        public static get Token():number{
            return this.token++;
        }

        /**
         * 获得在x以及y上的分速度
         * */
        public static GetSpeed(target: egret.Point, current: egret.Point, speed: number): any {
            let back: any = {};
            let dis = this.GetDistance(target, current);
            back.x = speed * Math.abs(target.x - current.x) / dis;
            back.y = speed * Math.abs(target.y - current.y) / dis;
            return back;
        }
    }
}