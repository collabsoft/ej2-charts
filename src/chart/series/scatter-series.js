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
define(["require", "exports", "../utils/helper", "./line-base", "../model/constants"], function (require, exports, helper_1, line_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScatterSeries = (function (_super) {
        __extends(ScatterSeries, _super);
        function ScatterSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScatterSeries.prototype.render = function (series) {
            var seriesIndex = series.index;
            var marker = series.marker;
            var border = series.border;
            var shape = marker.shape;
            var visiblePoints = this.improveChartPerformance(series);
            var pointIndex;
            var symbolId;
            var shapeOption;
            var argsData;
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.symbolLocation = null;
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    point.symbolLocation = helper_1.getPoint(point.xValue, point.yValue, series);
                    symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                    argsData = { cancel: false, name: constants_1.pointRender, series: series, point: point, fill: series.interior,
                        border: border, height: marker.height, width: marker.width
                    };
                    series.chart.trigger(constants_1.pointRender, argsData);
                    if (!argsData.cancel) {
                        point.color = argsData.fill;
                        shapeOption = new helper_1.PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                        series.seriesElement.appendChild(helper_1.drawSymbol(point.symbolLocation, shape, new helper_1.Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                        point.region = new helper_1.Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height, 2 * marker.width, 2 * marker.height);
                    }
                }
            }
        };
        ScatterSeries.prototype.doAnimation = function (series) {
            var duration = series.animation.duration;
            var delay = series.animation.delay;
            var rectElements = series.seriesElement.childNodes;
            var count = 1;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocation) {
                    continue;
                }
                helper_1.markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocation, false);
                count++;
            }
        };
        ScatterSeries.prototype.getModuleName = function () {
            return 'ScatterSeries';
        };
        ScatterSeries.prototype.destroy = function (chart) {
        };
        return ScatterSeries;
    }(line_base_1.LineBase));
    exports.ScatterSeries = ScatterSeries;
});
