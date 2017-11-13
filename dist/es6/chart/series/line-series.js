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
import { withInRange, getPoint, PathOption, Rect, TransformToVisible } from '../../common/utils/helper';
import { LineBase } from './line-base';
var LineSeries = (function (_super) {
    __extends(LineSeries, _super);
    function LineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var point1;
        var point2;
        var direction = '';
        var prevPoint = null;
        var startPoint = 'M';
        var options;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        var visiblePoints = this.improveChartPerformance(series);
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point1 = getCoordinate(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted, series);
                    point2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                        'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                prevPoint = point;
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                prevPoint = (series.emptyPointSettings.mode === 'Drop') ? prevPoint : null;
                startPoint = (series.emptyPointSettings.mode === 'Drop') ? startPoint : 'M';
                point.symbolLocations = [];
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar') {
            if (series.isClosed) {
                point2 = getCoordinate(visiblePoints[visiblePoints.length - 1].xValue, visiblePoints[visiblePoints.length - 1].yValue, xAxis, yAxis, isInverted, series);
                point1 = getCoordinate(visiblePoints[0].xValue, visiblePoints[0].yValue, xAxis, yAxis, isInverted, series);
                direction = direction.concat(startPoint + ' ' + point2.x + ' ' + point2.y + ' ' + 'L' + ' ' + point1.x + ' ' + point1.y);
            }
        }
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                series.chart.element.id + '_Series_' + series.index;
        options = new PathOption(name, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    LineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doProgressiveAnimation(series, option);
    };
    LineSeries.prototype.getModuleName = function () {
        return 'LineSeries';
    };
    LineSeries.prototype.destroy = function (chart) {
    };
    return LineSeries;
}(LineBase));
export { LineSeries };
