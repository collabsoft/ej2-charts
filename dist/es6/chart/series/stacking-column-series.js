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
var StackingColumnSeries = (function (_super) {
    __extends(StackingColumnSeries, _super);
    function StackingColumnSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackingColumnSeries.prototype.render = function (series) {
        series.isRectSeries = true;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var rect;
        var argsData;
        var stackedValue = series.stackedValues;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, stackedValue.endValues[point.index], point.xValue + sideBySideInfo.end, stackedValue.startValues[point.index], series);
                argsData = this.triggerEvent(series.chart, series, point);
                if (!argsData.cancel) {
                    this.drawRectangle(series, point, rect, argsData);
                    this.updateXRegion(point, rect, series);
                }
            }
        }
    };
    StackingColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    StackingColumnSeries.prototype.destroy = function (chart) {
    };
    StackingColumnSeries.prototype.getModuleName = function () {
        return 'StackingColumnSeries';
    };
    return StackingColumnSeries;
}(ColumnBase));
export { StackingColumnSeries };
