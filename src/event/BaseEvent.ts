namespace game {
    export class BaseEvent extends egret.Event {
        public static gm_monster_death = "death";
        public static gm_moveEnd = "move_end";
        public static gm_activation_bullet = "activation_bullet";
        public static gm_headquaters_hpChange = "base_hp_change";

        public object:any;

        constructor(name: string, bubbles?:boolean,cancelable?:boolean) {
            super(name, bubbles, cancelable);
        }
    }
}