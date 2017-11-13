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
var HiloSeries = (function (_super) {
    __extends(HiloSeries, _super);
    function HiloSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiloSeries.prototype.render = function (series) {
        var region;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible &&
                withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                region = this.getRectangle(point.xValue + sideBySideInfo.median, point.high, point.xValue + sideBySideInfo.median, point.low, series);
                argsData = this.triggerPointRenderEvent(series, point);
                if (!argsData.cancel) {
                    if (!series.chart.requireInvertedAxis) {
                        region.width = argsData.border.width;
                        region.x = region.x - (region.width / 2);
                    }
                    else {
                        region.height = argsData.border.width;
                        region.y = region.y - (region.height / 2);
                    }
                    argsData.border.width = 0;
                    this.updateSymbolLocation(point, region, series);
                    this.drawRectangle(series, point, region, argsData);
                }
            }
        }
    };
    HiloSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var border = { color: series.fill, width: Math.max(series.border.width, 2) };
        return _super.prototype.triggerEvent.call(this, series, point, series.interior, border);
    };
    HiloSeries.prototype.getModuleName = function () {
        return 'HiloSeries';
    };
    HiloSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    HiloSeries.prototype.destroy = function (chart) {
    };
    return HiloSeries;
}(ColumnBase));
export { HiloSeries };
