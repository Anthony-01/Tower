import XFKScene = game.XFKScene;

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        game.XFKLayer.getIns().load(this.stage);
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            await RES.loadGroup("game", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private _isStop: boolean = true;
    private createGameScene() {
        // this._isStop = false;

        this.startGame();
        let buttonLevel1 = new eui.Button();
        game.XFKLayer.getIns().EuiLayer.addChild(buttonLevel1);
        buttonLevel1.labelDisplay.text = "开始";
        buttonLevel1.x = 0;
        buttonLevel1.y = 0;
        buttonLevel1.name = "scene1";
        buttonLevel1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButton, this);

    }

    private scene: XFKScene;

    private startGame() {
        if(this.scene){
            this.scene.release();
        }
        this.scene =new game.XFKScene();
        this.scene.load("scene1");
    }

    private onButton(e: egret.TouchEvent) {
        if(this._isStop){
            e.target.labelDisplay.text="开始";
        }
        else{
            e.target.labelDisplay.text="暂停";
        }
        this._isStop=!this._isStop;
        game.ModuleManager.getInstance().IsStop=this._isStop;
    }

    /*
    * M(model)V(view)C(controller)
    * */


}
