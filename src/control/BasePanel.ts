namespace game {
    export class BasePanel extends egret.Sprite {
        public backBG: egret.Bitmap;
        public isOpen: boolean = false;
        constructor() {
            super();
        }



        showBackground() {
            if (this.backBG) {return;}
            this.backBG=new egret.Bitmap();
            this.backBG.name="panelbackground";

            this.backBG.texture=RES.getRes("panelbackground_jpg");
            this.backBG.alpha=0.6;
            this.backBG.width=game.XFKLayer.getIns().StageLayer.width;
            this.backBG.height=game.XFKLayer.getIns().StageLayer.height;
            game.XFKLayer.getIns().UiLayer.addChild(this.backBG);
        }

        public show(type: number = 0):void{
            this.isOpen=true;
            //灰色遮罩层显示与否
            if (type==0) {
                this.showBackground();
            }
            game.XFKLayer.getIns().UiLayer.addChild(this);
        }

        public closePanel() {
            this.isOpen = false;
            if (this.backBG && this.backBG.parent) {
                this.backBG.parent.removeChild(this.backBG);
                this.backBG = null;
            }
            while (this.numChildren) {
                this.removeChildAt(0);
            }
            //删除类对象
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

        public setPoint(x: number, y: number):void{
            this.x = x - this.width/2;
            this.y = y - this.height/2;
        }


    }
}