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
            var pointColumn = _a[_i];
            pointColumn.symbolLocations = [];
            pointColumn.regions = [];
            if (pointColumn.visible && withInRange(series.points[pointColumn.index - 1], pointColumn, series.points[pointColumn.index + 1], series)) {
                rect = this.getRectangle(pointColumn.xValue + sideBySideInfo.start, pointColumn.yValue, pointColumn.xValue + sideBySideInfo.end, origin, series);
                var color = series.category === 'Indicator' ? pointColumn.color : series.interior;
                argsData = this.triggerEvent(series, pointColumn, color, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(pointColumn, rect, series);
                    this.drawRectangle(series, pointColumn, rect, argsData);
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
}(ColumnBase));
export { ColumnSeries };
