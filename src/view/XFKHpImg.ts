namespace game {
    export class XFKHpImg extends egret.Sprite implements ILoad {

        private _parent: egret.DisplayObjectContainer;
        private _bar: eui.ProgressBar;

        constructor() {
            super();
        }

        load(parent: egret.DisplayObjectContainer) {
            this._parent = parent;
            this.init();
        }

        private init() {
            this._bar = new eui.ProgressBar();

            this.setHp(100,100);
            this._bar.x = -20;
            this._bar.y = -40;
            this._parent.addChild(this._bar);
        }

        public setHp(current, total) {
            let value = Math.floor((current / total) * 100);
            this._bar.value = value;
        }

        release() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            while(this.numChildren) {
                this.removeChildAt(0);
            }
            this._parent = null;
        }
    }
}