import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate, TransformToVisible } from '../../common/utils/helper';
import { pointRender } from '../../common/model/constants';
/**
 * Scatter Module used to render the scatter series.
 */
var ScatterSeries = /** @class */ (function () {
    function ScatterSeries() {
    }
    /**
     * Render the scatter series.
     * @return {void}
     * @private
     */
    ScatterSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = series.border;
        var shape = marker.shape;
        var visiblePoints = series.points;
        var pointIndex;
        var symbolId;
        var shapeOption;
        var argsData;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
            var point = visiblePoints_1[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point,
                    fill: series.setPointColor(point, series.interior),
                    border: series.setBorderColor(point, { width: series.border.width, color: series.border.color }),
                    height: marker.height, width: marker.width
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.color = argsData.fill;
                    shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(drawSymbol(point.symbolLocations[0], shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.yValue.toString()));
                    point.regions.push(new Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
                }
            }
        }
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    ScatterSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocations.length || !rectElements[count]) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
            count++;
        }
    };
    /**
     * Get module name.
     */
    ScatterSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'ScatterSeries';
    };
    /**
     * To destroy the scatter.
     * @return {void}
     * @private
     */
    ScatterSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return ScatterSeries;
}());
export { ScatterSeries };
