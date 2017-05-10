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
    var StackingAreaSeries = (function (_super) {
        __extends(StackingAreaSeries, _super);
        function StackingAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingAreaSeries.prototype.render = function (series) {
            var point1;
            var point2;
            var lineDirection = '';
            var visiblePoints = series.points;
            var pointsLength = visiblePoints.length;
            var stackedvalue = series.stackedValues;
            var origin = Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
            var border = series.border;
            var options;
            var startPoint = 0;
            point1 = helper_1.getPoint(visiblePoints[0].xValue, origin, series);
            lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
            for (var i = 0; i < pointsLength; i++) {
                visiblePoints[i].symbolLocation = null;
                if (visiblePoints[i].visible && helper_1.withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                    point1 = helper_1.getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                    lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    visiblePoints[i].symbolLocation = helper_1.getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                }
                else {
                    for (var j = i - 1; j >= startPoint; j--) {
                        point2 = helper_1.getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
                        lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (visiblePoints[i + 1] && visiblePoints[i + 1].visible) {
                        point1 = helper_1.getPoint(visiblePoints[i + 1].xValue, stackedvalue.startValues[i + 1], series);
                        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    }
                    startPoint = i + 1;
                }
            }
            for (var j = pointsLength - 1; j >= startPoint; j--) {
                point2 = helper_1.getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
                lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
            options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, lineDirection);
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
        return StackingAreaSeries;
    }(line_base_1.LineBase));
    exports.StackingAreaSeries = StackingAreaSeries;
});
