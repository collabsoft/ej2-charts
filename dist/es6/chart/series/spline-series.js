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
import { ChartLocation, PathOption, ControlPoints, getPoint, Rect, withInRange } from '../../common/utils/helper';
import { LineBase } from './line-base';
var SplineSeries = (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.naturalSplinePoints = [];
        return _this;
    }
    SplineSeries.prototype.render = function (series, xAxis, yAxis) {
        var chart = series.chart;
        var marker = series.marker;
        var ySpline;
        var options;
        var firstPoint = null;
        var secondPoint = null;
        var direction = '';
        var pt1;
        var pt2;
        var bpt1;
        var bpt2;
        var data;
        var controlPointCount = 0;
        var controlPoint1;
        var controlPoint2;
        var startPoint = 'M';
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                if (firstPoint !== null) {
                    data = series.drawPoints[point.index - 1];
                    controlPoint1 = data.controlPoint1;
                    controlPoint2 = data.controlPoint2;
                    pt1 = getPoint(firstPoint.xValue, firstPoint.yValue, xAxis, yAxis);
                    pt2 = getPoint(point.xValue, point.yValue, xAxis, yAxis);
                    bpt1 = getPoint(controlPoint1.x, controlPoint1.y, xAxis, yAxis);
                    bpt2 = getPoint(controlPoint2.x, controlPoint2.y, xAxis, yAxis);
                    direction = direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
                        + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
                    startPoint = 'L';
                }
                firstPoint = point;
                point.symbolLocation = getPoint(point.xValue, point.yValue, xAxis, yAxis);
                point.region = new Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height, 2 * marker.width, 2 * marker.height);
            }
            else {
                startPoint = 'M';
                firstPoint = null;
                point.symbolLocation = null;
            }
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    SplineSeries.prototype.findSplinePoint = function (series) {
        var spline = series.chart.splineSeriesModule;
        var value;
        this.naturalSplinePoints = this.naturalSpline(series.points);
        if (series.points.length > 1) {
            series.yMax = null;
            series.yMin = null;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (point.index !== 0) {
                    value = this.getControlPoints(series.points[point.index - 1], point, this.naturalSplinePoints[point.index - 1], this.naturalSplinePoints[point.index]);
                    series.drawPoints.push(value);
                    series.yMin = (Math.min(series.yMin, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                    series.yMax = (Math.max(series.yMax, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                }
            }
        }
    };
    SplineSeries.prototype.naturalSpline = function (points) {
        var count = points.length;
        var a = 6;
        var ySpline = [];
        var ySplineDuplicate = [];
        var d1;
        var d2;
        var d3;
        var dy1;
        var dy2;
        ySpline[0] = ySplineDuplicate[0] = 0;
        ySpline[points.length - 1] = 0;
        for (var i = 1; i < count - 1; i++) {
            d1 = points[i].xValue - points[i - 1].xValue;
            d2 = points[i + 1].xValue - points[i - 1].xValue;
            d3 = points[i + 1].xValue - points[i].xValue;
            dy1 = points[i + 1].yValue - points[i].yValue;
            dy2 = points[i].yValue - points[i - 1].yValue;
            if (d1 === 0 || d2 === 0 || d3 === 0) {
                ySpline[i] = 0;
                ySplineDuplicate[i] = 0;
            }
            else {
                var p = 1 / (d1 * ySpline[i - 1] + 2 * d2);
                ySpline[i] = -p * d3;
                ySplineDuplicate[i] = p * (a * (dy1 / d3 - dy2 / d1) - d1 * ySplineDuplicate[i - 1]);
            }
        }
        for (var k = count - 2; k >= 0; k--) {
            ySpline[k] = ySpline[k] * ySpline[k + 1] + ySplineDuplicate[k];
        }
        return ySpline;
    };
    SplineSeries.prototype.getControlPoints = function (point1, point2, ySpline1, ySpline2) {
        var one3 = 1 / 3.0;
        var deltaX2 = (point2.xValue - point1.xValue);
        deltaX2 = deltaX2 * deltaX2;
        var y1 = one3 * (((2 * point1.yValue) + point2.yValue) - one3 * deltaX2 * (ySpline1 + 0.5 * ySpline2));
        var y2 = one3 * ((point1.yValue + (2 * point2.yValue)) - one3 * deltaX2 * (0.5 * ySpline1 + ySpline2));
        var control1 = new ChartLocation((2 * (point1.xValue) + (point2.xValue)) * one3, y1);
        var control2 = new ChartLocation(((point1.xValue) + 2 * (point2.xValue)) * one3, y2);
        var points = new ControlPoints(control1, control2);
        return points;
    };
    SplineSeries.prototype.getModuleName = function () {
        return 'SplineSeries';
    };
    SplineSeries.prototype.destroy = function (chart) {
    };
    SplineSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    return SplineSeries;
}(LineBase));
export { SplineSeries };
