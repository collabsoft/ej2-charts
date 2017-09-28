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
import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate } from '../../common/utils/helper';
import { LineBase } from './line-base';
import { pointRender } from '../../common/model/constants';
var ScatterSeries = (function (_super) {
    __extends(ScatterSeries, _super);
    function ScatterSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScatterSeries.prototype.render = function (series, xAxis, yAxis) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = series.border;
        var shape = marker.shape;
        var visiblePoints = this.improveChartPerformance(series);
        var pointIndex;
        var symbolId;
        var shapeOption;
        var argsData;
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.symbolLocation = null;
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                point.symbolLocation = getPoint(point.xValue, point.yValue, xAxis, yAxis);
                symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                argsData = { cancel: false, name: pointRender, series: series, point: point, fill: series.interior,
                    border: border, height: marker.height, width: marker.width
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.color = argsData.fill;
                    shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(drawSymbol(point.symbolLocation, shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                    point.region = new Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height, 2 * marker.width, 2 * marker.height);
                }
            }
        }
    };
    ScatterSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocation) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocation, false);
            count++;
        }
    };
    ScatterSeries.prototype.getModuleName = function () {
        return 'ScatterSeries';
    };
    ScatterSeries.prototype.destroy = function (chart) {
    };
    return ScatterSeries;
}(LineBase));
export { ScatterSeries };
