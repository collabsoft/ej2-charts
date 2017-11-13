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
import { withInRange, PathOption } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
var CandleSeries = (function (_super) {
    __extends(CandleSeries, _super);
    function CandleSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CandleSeries.prototype.render = function (series) {
        var sideBySideInfo = this.getSideBySideInfo(series);
        var argsData;
        var borderWidth = Math.max(series.border.width, 1);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var direction = '';
            var centerRegion = void 0;
            var tickRegion = void 0;
            var midPoint = void 0;
            midPoint = (sideBySideInfo.start + sideBySideInfo.end) / 2;
            point.regions = [];
            point.symbolLocations = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                tickRegion = this.getRectangle((point.xValue + sideBySideInfo.median), Math.max(point.high, point.low), (point.xValue + sideBySideInfo.median), Math.min(point.high, point.low), series);
                if (!series.chart.requireInvertedAxis) {
                    tickRegion.x -= borderWidth / 2;
                    tickRegion.width = borderWidth;
                }
                else {
                    tickRegion.y -= borderWidth / 2;
                    tickRegion.height = borderWidth;
                }
                centerRegion = this.getRectangle((point.xValue + sideBySideInfo.start), Math.max(point.open, point.close), (point.xValue + sideBySideInfo.end), Math.min(point.open, point.close), series);
                direction = this.getPathString(tickRegion, centerRegion, series);
                argsData = this.triggerPointRenderEvent(series, point);
                if (!argsData.cancel) {
                    this.drawCandle(series, point, centerRegion, argsData, direction);
                    this.updateSymbolLocation(point, tickRegion, series);
                    this.updateSymbolLocation(point, centerRegion, series);
                }
            }
        }
    };
    CandleSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var fill;
        fill = this.getCandleColor(point, series);
        var border = { color: series.border.color, width: Math.max(series.border.width, 1) };
        return this.triggerEvent(series, point, fill, border);
    };
    CandleSeries.prototype.getCandleColor = function (point, series) {
        var currentPoint = point;
        var previousPoint = series.points[point.index - 1];
        if (series.enableSolidCandles === false) {
            if (!previousPoint) {
                return series.bearFillColor;
            }
            else {
                return previousPoint.close > point.close ? series.bullFillColor :
                    series.bearFillColor;
            }
        }
        else {
            return point.open > point.close ? series.bullFillColor :
                series.bearFillColor;
        }
    };
    CandleSeries.prototype.getPathString = function (topRect, midRect, series) {
        var direction = '';
        var width = series.chart.requireInvertedAxis ? topRect.height : topRect.width;
        var center = series.chart.requireInvertedAxis ? topRect.y + topRect.height / 2 :
            topRect.x + topRect.width / 2;
        direction += !series.chart.requireInvertedAxis ?
            'M' + ' ' + (center) + ' ' + (topRect.y) + ' ' + 'L' + ' ' + (center) + ' ' + midRect.y :
            'M' + ' ' + (topRect.x) + ' ' + (center) + ' ' + 'L' + ' ' + (midRect.x) + ' ' + center;
        direction = direction.concat(' M' + ' ' + (midRect.x) + ' ' + (midRect.y) + ' ' +
            'L' + ' ' + (midRect.x + midRect.width) + ' ' + (midRect.y) + ' ' +
            'L' + ' ' + (midRect.x + midRect.width) + ' ' +
            (midRect.y + midRect.height) + ' ' +
            'L' + ' ' + (midRect.x) + ' ' + (midRect.y + midRect.height) +
            ' ' + 'Z');
        direction += !series.chart.requireInvertedAxis ?
            ' M' + ' ' + (center) + ' ' + (midRect.y + midRect.height) + ' ' + 'L' + ' ' + (center) + ' ' + (topRect.y +
                topRect.height) :
            ' M' + ' ' + (midRect.x + midRect.width) + ' ' + (center) + ' ' + 'L' + ' ' +
                (topRect.x + topRect.width) + ' ' + center;
        return direction;
    };
    CandleSeries.prototype.drawCandle = function (series, point, rect, argsData, direction) {
        var check = series.chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        var fill = !series.enableSolidCandles ?
            (point.open > point.close ? argsData.fill : 'transparent') : argsData.fill;
        argsData.border.color = argsData.fill;
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
        var candleElement = series.chart.renderer.drawPath(options);
        candleElement.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString()
            + ':' + point.low.toString() + ':' + point.close.toString() + ':' + point.open.toString());
        series.seriesElement.appendChild(candleElement);
    };
    CandleSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    CandleSeries.prototype.getModuleName = function () {
        return 'CandleSeries';
    };
    CandleSeries.prototype.destroy = function (chart) {
    };
    return CandleSeries;
}(ColumnBase));
export { CandleSeries };
