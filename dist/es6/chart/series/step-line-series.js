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
import { PathOption, getPoint, withInRange, Rect } from '../../common/utils/helper';
import { LineBase } from './line-base';
var StepLineSeries = (function (_super) {
    __extends(StepLineSeries, _super);
    function StepLineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var direction = '';
        var startPoint = 'M';
        var prevPoint = null;
        var pathOptions;
        var lineLength;
        var point1;
        var point2;
        var visiblePoints = this.improveChartPerformance(series);
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        else {
            lineLength = 0;
        }
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point2 = getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                    point1 = getPoint(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' + 'L' + ' ' +
                        (point2.x) + ' ' + (point1.y) + 'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                else {
                    point1 = getPoint(point.xValue - lineLength, point.yValue, xAxis, yAxis, isInverted);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    startPoint = 'L';
                }
                point.symbolLocations.push(getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted));
                prevPoint = point;
                point.regions.push(new Rect(point.symbolLocations[0].x - series.marker.width, point.symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
            }
            else {
                prevPoint = series.emptyPointSettings.mode === 'Drop' ? prevPoint : null;
                startPoint = series.emptyPointSettings.mode === 'Drop' ? startPoint : 'M';
            }
        }
        point1 = getPoint(visiblePoints[visiblePoints.length - 1].xValue + lineLength, visiblePoints[visiblePoints.length - 1].yValue, xAxis, yAxis, isInverted);
        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        pathOptions = new PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(pathOptions, series);
        this.renderMarker(series);
    };
    StepLineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    StepLineSeries.prototype.destroy = function (chart) {
    };
    StepLineSeries.prototype.getModuleName = function () {
        return 'StepLineSeries';
    };
    return StepLineSeries;
}(LineBase));
export { StepLineSeries };
