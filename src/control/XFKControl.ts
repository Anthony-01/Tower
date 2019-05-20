namespace game {
    export class XFKControl extends egret.EventDispatcher{
        private static _ins: XFKControl;

        public static getIns(): XFKControl {
            if (this._ins == null) {
                this._ins = new XFKControl();
            }
            return this._ins;
        }

        public static dispatchEvent(type: string, data: any) {
            this.getIns().dispatchEvent(new egret.Event(type, data));
        }

        public static addEventListener(type: string, func: Function, thisObj: Object) {

        }
    }
}