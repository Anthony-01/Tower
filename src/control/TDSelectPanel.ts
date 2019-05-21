namespace game {
    /**
     * 负责显示四种炮塔
     * */
    export class TDSelectPanel extends egret.DisplayObjectContainer{
        private static _ins: TDSelectPanel;

        public static getIns(): TDSelectPanel {
            if (this._ins == null) {
                this._ins = new TDSelectPanel();
            }
            return this._ins;
        }

        private isOpen: boolean = false;        //当前是否点开
        private callFun: Function;              //调用方法
        private callObj: Object;                //调用对象

        public showPanel(callFunc: Function, thisObj: Object) {
            if (this.isOpen) return;
            this.callFun = callFunc;
            this.callObj = thisObj;
            let data = RES.getRes( "turretskin_json");
            for (let key in data) {
                let mcData = RES.getRes(key + "_json");
                let mcTextrue = RES.getRes(key + "_png");
                let mcFactory = new egret.MovieClipDataFactory(mcData, mcTextrue);

                let mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(key));

                this.addChild(mc);
                mc.x = Math.abs((this.numChildren - 1)) * mc.width + 10;
                mc.gotoAndPlay(1, -1);
                mc.name = key;
                mc.touchEnabled = true;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        private onTouchTap(e: egret.Event) {
            if (e.target instanceof egret.MovieClip) {
                this.callFun.call(this.callObj, [e.target.name]);
            }
            this.closePanel();
        }

        private closePanel() {
            this.isOpen = false;
        }

        public setPoint(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
}