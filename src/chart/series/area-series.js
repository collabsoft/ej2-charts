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
    var AreaSeries = (function (_super) {
        __extends(AreaSeries, _super);
        function AreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AreaSeries.prototype.render = function (series) {
            var firstPoint;
            var endPoint;
            var startPoint = null;
            var direction = '';
            var pointsLength = series.points.length;
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var options;
            var point;
            var currentXValue;
            for (var i = 0; i < pointsLength; i++) {
                point = series.points[i];
                currentXValue = point.xValue;
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                    if (startPoint === null) {
                        startPoint = new helper_1.ChartLocation(0, 0);
                        startPoint.x = currentXValue;
                        startPoint.y = origin;
                        firstPoint = helper_1.getPoint(currentXValue, origin, series);
                        direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                    }
                    firstPoint = helper_1.getPoint(currentXValue, point.yValue, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                    if (series.points[i + 1] && !series.points[i + 1].visible) {
                        firstPoint = helper_1.getPoint(currentXValue, origin, series);
                        endPoint = helper_1.getPoint(startPoint.x, startPoint.y, series);
                        direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                            ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                        startPoint = null;
                    }
                    point.symbolLocation = helper_1.getPoint(currentXValue, point.yValue, series);
                }
            }
            if (pointsLength > 1) {
                startPoint = { 'x': series.points[pointsLength - 1].xValue, 'y': origin };
                endPoint = helper_1.getPoint(startPoint.x, startPoint.y, series);
                direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
            }
            else {
                direction = '';
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
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
    }(line_base_1.LineBase));
    exports.AreaSeries = AreaSeries;
});
