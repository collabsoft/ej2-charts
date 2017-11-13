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
import { PathOption, getPoint, withInRange, Rect, TransformToVisible } from '../../common/utils/helper';
import { LineBase } from './line-base';
var StackingAreaSeries = (function (_super) {
    __extends(StackingAreaSeries, _super);
    function StackingAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackingAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var lineDirection = '';
        var visiblePoints = series.points;
        var pointsLength = visiblePoints.length;
        var stackedvalue = series.stackedValues;
        var origin = series.chart.chartAreaType === 'PolarRadar' ?
            Math.max(series.yAxis.visibleRange.min, stackedvalue.endValues[0]) :
            Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
        var border = series.border;
        var options;
        var startPoint = 0;
        var point1 = getCoordinate(visiblePoints[0].xValue, origin, xAxis, yAxis, isInverted, series);
        var point2;
        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        for (var i = 0; i < pointsLength; i++) {
            visiblePoints[i].symbolLocations = [];
            visiblePoints[i].regions = [];
            if (visiblePoints[i].visible && withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                point1 = getCoordinate(visiblePoints[i].xValue, stackedvalue.endValues[i], xAxis, yAxis, isInverted, series);
                lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                visiblePoints[i].symbolLocations.push(getCoordinate(visiblePoints[i].xValue, stackedvalue.endValues[i], xAxis, yAxis, isInverted, series));
                visiblePoints[i].regions.push(new Rect(visiblePoints[i].symbolLocations[0].x - series.marker.width, visiblePoints[i].symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                if (series.emptyPointSettings.mode !== 'Drop') {
                    for (var j = i - 1; j >= startPoint; j--) {
                        point2 = getCoordinate(visiblePoints[j].xValue, stackedvalue.startValues[j], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (visiblePoints[i + 1] && visiblePoints[i + 1].visible) {
                        point1 = getCoordinate(visiblePoints[i + 1].xValue, stackedvalue.startValues[i + 1], xAxis, yAxis, isInverted, series);
                        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                    startPoint = i + 1;
                }
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar' && visiblePoints.length > 1) {
            point1 = { 'x': series.points[0].xValue, 'y': stackedvalue.endValues[0] };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            lineDirection += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            point1 = { 'x': series.points[0].xValue, 'y': stackedvalue.startValues[0] };
            point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
            lineDirection += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
        }
        for (var j = pointsLength - 1; j >= startPoint; j--) {
            var previousSeries = this.getPreviousSeries(series);
            if (previousSeries.emptyPointSettings.mode !== 'Drop' || !previousSeries.points[j].isEmpty) {
                point2 = getCoordinate(visiblePoints[j].xValue, stackedvalue.startValues[j], xAxis, yAxis, isInverted, series);
                lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, lineDirection);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    StackingAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    StackingAreaSeries.prototype.destroy = function (chart) {
    };
    StackingAreaSeries.prototype.getModuleName = function () {
        return 'StackingAreaSeries';
    };
    StackingAreaSeries.prototype.getPreviousSeries = function (series) {
        var seriesCollection = series.chart.visibleSeries;
        for (var i = 0, length_1 = seriesCollection.length; i < length_1; i++) {
            if (series.index === seriesCollection[i].index && i !== 0) {
                return seriesCollection[i - 1];
            }
        }
        return seriesCollection[0];
    };
    return StackingAreaSeries;
}(LineBase));
export { StackingAreaSeries };
