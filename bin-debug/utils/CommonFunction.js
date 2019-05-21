var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CommonFunction = (function () {
        function CommonFunction() {
        }
        CommonFunction.GetDistance = function (point1, point2) {
            return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        };
        Object.defineProperty(CommonFunction, "Token", {
            get: function () {
                return this.token++;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获得在x以及y上的分速度
         * */
        CommonFunction.GetSpeed = function (target, current, speed) {
            var back = {};
            var dis = this.GetDistance(target, current);
            if (dis == 0) {
                back.x = 0;
                back.y = 0;
                return back;
            }
            back.x = speed * Math.abs(target.x - current.x) / dis;
            back.y = speed * Math.abs(target.y - current.y) / dis;
            return back;
        };
        CommonFunction.token = 0;
        return CommonFunction;
    }());
    game.CommonFunction = CommonFunction;
    __reflect(CommonFunction.prototype, "game.CommonFunction");
})(game || (game = {}));
