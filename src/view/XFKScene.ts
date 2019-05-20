namespace game {
    /**
     * view层
     * */
    export class XFKScene implements IObject{
        /**
         * 动作列表
         * */
        private action: any[] = [];

        //视图关键字
        private sceneKey: string = "scene1";

        private id: number;

        constructor() {
            this.id = game.CommonFunction.Token;
        }

        get ID(): number {
            return this.id;
        }

        load(name: string) {
            this.sceneKey = name;

            game.XFKControl.addEventListener(game.BaseEvent.gm_headquaters_hpChange,this.baseHpChange,this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_activation_bullet,this.createBullet,this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_monster_death,this.spriteDeath,this);
            this.init();
        }

        release() {

        }

        update(time: number) {

        }

        private isInit: boolean = false;

        private init() {
            this.createBG();
            this.createTurret();
            this.createAction();
            this.isInit=true;
        }

        private createBG() {
            let bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture=RES.getRes(this.sceneKey + "bg_jpg");
            // game.XFKLayer.Ins.BgLayer.addChild(bitmap);
        }

        private createTurret() {

        }

        private createAction(): void {
            let data: any = RES.getRes(this.sceneKey + "sprite_json");
            let index: number;

            for (let n = 0; n < data.sprite.length; n++) {
                data.sprite[n].path = data.Path;
                data.sprite[n].delay = parseInt(data.sprite[n].delay);
                //根据怪物的数量来生成怪物
                for (let j = 0; j < data.sprite[n].count; j++) {
                    index = this.action.push(data.sprite[n]);
                }
            }
        }

        private baseHpChange(e: BaseEvent) {

        }

        private createBullet() {

        }

        private spriteDeath() {

        }
    }
}