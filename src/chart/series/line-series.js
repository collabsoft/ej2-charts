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
define(["require", "exports", "../utils/helper", "./line-base"], function (require, exports, helper_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LineSeries = (function (_super) {
        __extends(LineSeries, _super);
        function LineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineSeries.prototype.render = function (series) {
            var point1;
            var point2;
            var direction = '';
            var prevPoint = null;
            var startPoint = 'M';
            var options;
            var visiblePoints = this.improveChartPerformance(series);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    if (prevPoint != null) {
                        point1 = helper_1.getPoint(prevPoint.xValue, prevPoint.yValue, series);
                        point2 = helper_1.getPoint(point.xValue, point.yValue, series);
                        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                            'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                        startPoint = 'L';
                    }
                    prevPoint = point;
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    point.region = new helper_1.Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height);
                }
                else {
                    prevPoint = null;
                    startPoint = 'M';
                    point.symbolLocation = null;
                }
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
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
    }(line_base_1.LineBase));
    exports.LineSeries = LineSeries;
});
