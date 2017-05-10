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
import { withInRange } from '../utils/helper';
import { ColumnBase } from './column-base';
var BarSeries = (function (_super) {
    __extends(BarSeries, _super);
    function BarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarSeries.prototype.render = function (series) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var rect;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                rect = this.getRectangle(point.yValue, point.xValue + sideBySideInfo.start, origin, point.xValue + sideBySideInfo.end, series);
                argsData = this.triggerEvent(series.chart, series, point);
                if (!argsData.cancel) {
                    this.updateYRegion(point, rect);
                    this.drawRectangle(series, point, rect, argsData);
                }
            }
        }
    };
    BarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    BarSeries.prototype.destroy = function (chart) {
    };
    BarSeries.prototype.getModuleName = function () {
        return 'BarSeries';
    };
    return BarSeries;
}(ColumnBase));
export { BarSeries };
