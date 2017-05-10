var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../utils/helper", "./column-base"], function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnSeries = (function (_super) {
        __extends(ColumnSeries, _super);
        function ColumnSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ColumnSeries.prototype.render = function (series) {
            var rect;
            var sideBySideInfo = this.getSideBySideInfo(series);
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    rect = this.getRectangle(point.xValue + sideBySideInfo.start, point.yValue, point.xValue + sideBySideInfo.end, origin, series);
                    argsData = this.triggerEvent(series.chart, series, point);
                    if (!argsData.cancel) {
                        this.updateXRegion(point, rect);
                        this.drawRectangle(series, point, rect, argsData);
                    }
                }
            }
        };
        ColumnSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        ColumnSeries.prototype.getModuleName = function () {
            return 'ColumnSeries';
        };
        ColumnSeries.prototype.destroy = function (chart) {
        };
        return ColumnSeries;
    }(column_base_1.ColumnBase));
    exports.ColumnSeries = ColumnSeries;
});
