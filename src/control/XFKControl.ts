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
            let event = new BaseEvent(type, data);
            event.object = data;
            this.getIns().dispatchEvent(event);
        }



        public static addEventListener(type: string, func: Function, thisObj: Object) {
            this.getIns().addEventListener(type, func, thisObj);
        }

        public static removeEventListener(type, func, thisObj) {
            this.getIns().removeEventListener(type, func, thisObj);
        }
    }
}