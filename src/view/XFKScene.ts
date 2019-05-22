namespace game {
    /**
     * view层
     * */
    export class XFKScene implements IObject {
        /**
         * 动作列表
         * */
        private action: any[] = [];

        //视图关键字
        private sceneKey: string = "scene1";

        private startTime: number;

        private id: number;

        constructor() {
            this.id = game.CommonFunction.Token;
        }

        get ID(): number {
            return this.id;
        }

        load(name: string) {
            this.release();
            this.sceneKey = name;
            this.startTime = egret.getTimer();
            game.ModuleManager.getInstance().registerModule(this);

            //监听血量变化、子弹创建以及敌人死亡事件
            game.XFKControl.addEventListener(game.BaseEvent.gm_headquaters_hpChange,this.baseHpChange,this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_activation_bullet,this.createBullet,this);
            game.XFKControl.addEventListener(game.BaseEvent.gm_monster_death,this.spriteDeath,this);
            this.init();

        }

        release() {
            this.startTime = null;
            game.ModuleManager.getInstance().unRegisterModule(this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_headquaters_hpChange,this.baseHpChange,this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_activation_bullet,this.createBullet,this);
            game.XFKControl.removeEventListener(game.BaseEvent.gm_monster_death,this.spriteDeath,this);
            this.removeAll();
        }

        private removeAll() {
            while(game.XFKLayer.getIns().NpcLayer.numChildren>0){
                let obj:any = game.XFKLayer.getIns().NpcLayer.removeChildAt(0);
                (<ILoad>obj).release();
            }
        }

        private lastTime: number = 0;
        update(time: number) {
            if (this.isInit && time > this.lastTime) {
                this.createSp();
                this.lastTime = time + 800;
            }
        }

        private isInit: boolean = false;

        private init() {
            this.createBG();
            this.createTurret();
            this.createAction();
            this.isInit = true;
        }

        private createBG() {
            let bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture=RES.getRes(this.sceneKey + "bg_jpg");
            game.XFKLayer.getIns().BgLayer.addChild(bitmap);
        }

        /**
         * 创建防御塔
         * */
        private createTurret() {
            let data = RES.getRes(this.sceneKey + "turret_json");
            for (let n = 0; n < data.turret.length; n++) {
                let turret = new XFKTurret();
                turret.Parse(data.turret[n]);
                turret.load(game.XFKLayer.getIns().NpcLayer);
            }
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

        /**
         * 创建敌方精灵
         * */
        private createSp() {
            if (this.action.length > 0) {
                if (this.action[0].delay + this.startTime <= egret.getTimer()) {
                    let sp = new XFKSprite();
                    sp.parse(this.action.shift());
                    sp.load(game.XFKLayer.getIns().NpcLayer);
                }
            }
        }

        private baseHpChange(e: BaseEvent) {

        }

        private createBullet(e: BaseEvent) {
            let bullet:game.XFKBullet=new XFKBullet();
            bullet.setTarget(e.object[0], e.object[1]);
            bullet.load(game.XFKLayer.getIns().NpcLayer);
        }

        private spriteDeath() {

        }
    }
}