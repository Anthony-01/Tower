var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent(name, bubbles, cancelable) {
            return _super.call(this, name, bubbles, cancelable) || this;
        }
        BaseEvent.gm_monster_death = "death";
        BaseEvent.gm_moveEnd = "move_end";
        BaseEvent.gm_activation_bullet = "activation_bullet";
        BaseEvent.gm_headquaters_hpChange = "base_hp_change";
        return BaseEvent;
    }(egret.Event));
    game.BaseEvent = BaseEvent;
    __reflect(BaseEvent.prototype, "game.BaseEvent");
})(game || (game = {}));
