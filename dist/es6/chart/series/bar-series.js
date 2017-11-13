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
import { withInRange } from '../../common/utils/helper';
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
            var pointBar = _a[_i];
            pointBar.symbolLocations = [];
            pointBar.regions = [];
            if (pointBar.visible && withInRange(series.points[pointBar.index - 1], pointBar, series.points[pointBar.index + 1], series)) {
                rect = this.getRectangle(pointBar.xValue + sideBySideInfo.start, pointBar.yValue, pointBar.xValue + sideBySideInfo.end, origin, series);
                argsData = this.triggerEvent(series, pointBar, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(pointBar, rect, series);
                    this.drawRectangle(series, pointBar, rect, argsData);
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
