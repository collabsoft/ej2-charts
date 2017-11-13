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
import { getPoint, withInRange, ChartLocation, PathOption, Rect } from '../../common/utils/helper';
import { LineBase } from './line-base';
var StepAreaSeries = (function (_super) {
    __extends(StepAreaSeries, _super);
    function StepAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var currentPoint;
        var secondPoint;
        var start = null;
        var direction = '';
        var pointsLength = series.points.length;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var options;
        var point;
        var xValue;
        var lineLength;
        var prevPoint = null;
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        else {
            lineLength = 0;
        }
        for (var i = 0; i < pointsLength; i++) {
            point = series.points[i];
            xValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (start === null) {
                    start = new ChartLocation(xValue, 0);
                    currentPoint = getPoint(xValue - lineLength, origin, xAxis, yAxis, isInverted);
                    direction += ('M' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    currentPoint = getPoint(xValue - lineLength, point.yValue - lineLength, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                if (prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' +
                        (currentPoint.x) + ' ' + (secondPoint.y) + 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                else if (series.emptyPointSettings.mode === 'Gap') {
                    currentPoint = getPoint(point.xValue + lineLength, point.yValue, xAxis, yAxis, isInverted);
                    direction += 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                }
                point.symbolLocations.push(getPoint(xValue, point.yValue, xAxis, yAxis, isInverted));
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
                prevPoint = point;
            }
            if (series.points[i + 1] && !series.points[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                currentPoint = getPoint(xValue + lineLength, origin, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y));
                start = null;
                prevPoint = null;
            }
        }
        if (pointsLength > 1) {
            start = { 'x': series.points[pointsLength - 1].xValue + lineLength, 'y': series.points[pointsLength - 1].yValue };
            secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
            direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
            start = { 'x': series.points[pointsLength - 1].xValue + lineLength, 'y': origin };
            secondPoint = getPoint(start.x, start.y, xAxis, yAxis, isInverted);
            direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    StepAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    StepAreaSeries.prototype.destroy = function (chart) {
    };
    StepAreaSeries.prototype.getModuleName = function () {
        return 'StepAreaSeries';
    };
    return StepAreaSeries;
}(LineBase));
export { StepAreaSeries };
