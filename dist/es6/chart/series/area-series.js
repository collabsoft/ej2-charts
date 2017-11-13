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
import { getPoint, withInRange, ChartLocation, PathOption, Rect, TransformToVisible } from '../../common/utils/helper';
import { LineBase } from './line-base';
var AreaSeries = (function (_super) {
    __extends(AreaSeries, _super);
    function AreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var firstPoint;
        var endPoint;
        var startPoint = null;
        var direction = '';
        var pointsLength = series.points.length;
        var origin = series.chart.chartAreaType === 'PolarRadar' ? series.points[0].yValue :
            Math.max(series.yAxis.visibleRange.min, 0);
        var options;
        var point;
        var currentXValue;
        var symbolLocation;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var i = 0; i < pointsLength; i++) {
            point = series.points[i];
            currentXValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (startPoint === null) {
                    startPoint = new ChartLocation(currentXValue, origin);
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                }
                firstPoint = getCoordinate(currentXValue, point.yValue, xAxis, yAxis, isInverted, series);
                direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                if (series.points[i + 1] && !series.points[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    endPoint = getCoordinate(startPoint.x, startPoint.y, xAxis, yAxis, isInverted, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                        ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                    startPoint = null;
                }
                symbolLocation = getCoordinate(currentXValue, point.yValue, xAxis, yAxis, isInverted, series);
                point.symbolLocations.push(symbolLocation);
                point.regions.push(new Rect(symbolLocation.x - series.marker.width, symbolLocation.y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
        }
        if (pointsLength > 1) {
            startPoint = {
                'x': series.points[pointsLength - 1].xValue,
                'y': series.chart.chartAreaType === 'PolarRadar' ? series.points[pointsLength - 1].yValue : origin
            };
            endPoint = getCoordinate(startPoint.x, startPoint.y, xAxis, yAxis, isInverted, series);
            direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
        }
        else {
            direction = '';
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    AreaSeries.prototype.destroy = function (chart) {
    };
    AreaSeries.prototype.getModuleName = function () {
        return 'AreaSeries';
    };
    AreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    return AreaSeries;
}(LineBase));
export { AreaSeries };
