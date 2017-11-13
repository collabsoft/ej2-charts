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
var RangeColumnSeries = (function (_super) {
    __extends(RangeColumnSeries, _super);
    function RangeColumnSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColumnSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var rangePoint = _a[_i];
            rangePoint.symbolLocations = [];
            rangePoint.regions = [];
            if (rangePoint.visible && withInRange(series.points[rangePoint.index - 1], rangePoint, series.points[rangePoint.index + 1], series)) {
                rect = this.getRectangle(rangePoint.xValue + sideBySideInfo.start, rangePoint.high, rangePoint.xValue + sideBySideInfo.end, rangePoint.low, series);
                argsData = this.triggerEvent(series, rangePoint, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.updateSymbolLocation(rangePoint, rect, series);
                    this.drawRectangle(series, rangePoint, rect, argsData);
                }
            }
        }
    };
    RangeColumnSeries.prototype.getModuleName = function () {
        return 'RangeColumnSeries';
    };
    RangeColumnSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    RangeColumnSeries.prototype.destroy = function (chart) {
    };
    return RangeColumnSeries;
}(ColumnBase));
export { RangeColumnSeries };
