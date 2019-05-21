namespace game {
    export class XFKLayer {
        private static _ins: XFKLayer;

        public static getIns(): XFKLayer {
            if (this._ins == null) {
                this._ins = new XFKLayer();
            }
            return this._ins;
        }

        public StageLayer: egret.DisplayObjectContainer;
        //游戏层
        public GameLayer: egret.DisplayObjectContainer;
        //场景层
        public BgLayer: egret.DisplayObjectContainer;
        //精灵层
        public NpcLayer: egret.DisplayObjectContainer;
        //没法归类的精灵层
        public DecorationLayer: egret.DisplayObjectContainer;
        //EUI层
        public EuiLayer: egret.DisplayObjectContainer;
        //自定义UI层
        public UiLayer: egret.DisplayObjectContainer;

        private init() {
            this.GameLayer = new egret.DisplayObjectContainer();
            this.GameLayer.name = "GameLayer";
            this.StageLayer.addChild(this.GameLayer);

            this.BgLayer = new egret.DisplayObjectContainer();
            this.BgLayer.name = "BgLayer";
            this.GameLayer.addChild(this.BgLayer);

            this.NpcLayer = new egret.DisplayObjectContainer();
            this.NpcLayer.name = "NpcLayer";
            this.GameLayer.addChild(this.NpcLayer);

            this.DecorationLayer = new egret.DisplayObjectContainer();
            this.DecorationLayer.name = "DecorationLayer";
            this.GameLayer.addChild(this.DecorationLayer);

            this.UiLayer = new egret.DisplayObjectContainer();
            this.UiLayer.name = "UiLayer";
            this.StageLayer.addChild(this.UiLayer);

            this.EuiLayer = new egret.DisplayObjectContainer();
            this.EuiLayer.name = "EuiLayer";
            this.StageLayer.addChild(this.EuiLayer);
        }

        load(stage: egret.DisplayObjectContainer): void {
            this.StageLayer = stage;
            this.init();
        }
    }
}