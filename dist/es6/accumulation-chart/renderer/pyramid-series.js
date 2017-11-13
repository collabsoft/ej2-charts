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
import { TriangularBase } from './triangular-base';
var PyramidSeries = (function (_super) {
    __extends(PyramidSeries, _super);
    function PyramidSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PyramidSeries.prototype.getSegmentData = function (point, series, chart) {
        var area = series.triangleSize;
        var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
        var points = [];
        var offset = 0;
        var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
        var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
        var top = point.yRatio;
        var bottom = point.yRatio + point.heightRatio;
        var topRadius = 0.5 * (1 - point.yRatio);
        var bottomRadius = 0.5 * (1 - bottom);
        top += seriesTop / area.height;
        bottom += seriesTop / area.height;
        var line1 = {
            x: emptySpaceAtLeft + offset + topRadius * area.width,
            y: top * area.height
        };
        var line2 = {
            x: emptySpaceAtLeft + offset + (1 - topRadius) * area.width,
            y: top * area.height
        };
        var line3 = {
            x: emptySpaceAtLeft + offset + (1 - bottomRadius) * area.width,
            y: bottom * area.height
        };
        var line4 = {
            x: emptySpaceAtLeft + offset + bottomRadius * area.width,
            y: bottom * area.height
        };
        var polygon = [line1, line2, line3, line4];
        this.setLabelLocation(series, point, polygon);
        var direction = this.findPath(polygon);
        return direction;
    };
    PyramidSeries.prototype.initializeSizeRatio = function (points, series) {
        if (series.pyramidMode === 'Linear') {
            _super.prototype.initializeSizeRatio.call(this, points, series, true);
        }
        else {
            this.calculateSurfaceSegments(series);
        }
    };
    PyramidSeries.prototype.calculateSurfaceSegments = function (series) {
        var count = series.points.length;
        var sumOfValues = series.sumOfPoints;
        var yRatio = 0;
        var y = [];
        var height = [];
        var gapRatio = Math.min(0, Math.max(series.gapRatio, 1));
        var gapHeight = gapRatio / (count - 1);
        var preSum = this.getSurfaceHeight(0, sumOfValues);
        var currY = 0;
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                y[i] = currY;
                height[i] = this.getSurfaceHeight(currY, Math.abs(series.points[i].y));
                currY += height[i] + gapHeight * preSum;
            }
        }
        var coef = 1 / (currY - gapHeight * preSum);
        for (var i = 0; i < count; i++) {
            if (series.points[i].visible) {
                series.points[i].yRatio = coef * y[i];
                series.points[i].heightRatio = coef * height[i];
            }
        }
    };
    PyramidSeries.prototype.getSurfaceHeight = function (y, surface) {
        var result = this.solveQuadraticEquation(1, 2 * y, -surface);
        return result;
    };
    PyramidSeries.prototype.solveQuadraticEquation = function (a, b, c) {
        var root1;
        var root2;
        var d = b * b - 4 * a * c;
        if (d >= 0) {
            var sd = Math.sqrt(d);
            root1 = (-b - sd) / (2 * a);
            root2 = (-b + sd) / (2 * a);
            return Math.max(root1, root2);
        }
        return 0;
    };
    PyramidSeries.prototype.renderPoint = function (point, series, chart, options) {
        var direction = this.getSegmentData(point, series, chart);
        point.midAngle = 0;
        options.d = direction;
    };
    PyramidSeries.prototype.getModuleName = function () {
        return 'PyramidSeries';
    };
    PyramidSeries.prototype.destroy = function (accumulation) {
    };
    return PyramidSeries;
}(TriangularBase));
export { PyramidSeries };
