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
import { withInRange, getPoint, PathOption, Rect } from '../../common/utils/helper';
import { LineBase } from './line-base';
/**
 * RangeAreaSeries Module used to render the rangeArea series.
 */
var RangeAreaSeries = /** @class */ (function (_super) {
    __extends(RangeAreaSeries, _super);
    function RangeAreaSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render RangeArea Series.
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.render = function (series) {
        var point;
        var direction = '';
        var command = 'M';
        var closed = undefined;
        var visiblePoints = this.improveChartPerformance(series);
        for (var i = 0, length_1 = visiblePoints.length; i < length_1; i++) {
            point = visiblePoints[i];
            point.symbolLocations = [];
            point.regions = [];
            var low = Math.min(point.low, point.high);
            var high = Math.max(point.low, point.high);
            if (series.yAxis.isInversed) {
                var temp = low;
                low = high;
                high = temp;
            }
            var lowPoint = getPoint(point.xValue, low, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            var highPoint = getPoint(point.xValue, high, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            point.symbolLocations.push(highPoint);
            point.symbolLocations.push(lowPoint);
            var rect = new Rect(Math.min(lowPoint.x, highPoint.x), Math.min(lowPoint.y, highPoint.y), Math.max(Math.abs(highPoint.x - lowPoint.x), series.marker.width), Math.max(Math.abs(highPoint.y - lowPoint.y), series.marker.width));
            if (!series.chart.requireInvertedAxis) {
                rect.x -= series.marker.width / 2;
            }
            else {
                rect.y -= series.marker.width / 2;
            }
            point.regions.push(rect);
            //Path to connect the high points
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                direction = direction.concat(command + ' ' + (lowPoint.x) + ' ' + (lowPoint.y) + ' ');
                closed = false;
                if ((i + 1 < visiblePoints.length && !visiblePoints[i + 1].visible)
                    || i === visiblePoints.length - 1) {
                    // Path to connect the low points
                    direction = this.closeRangeAreaPath(visiblePoints, point, series, direction, i);
                    command = 'M';
                    direction = direction.concat(' ' + 'Z');
                    closed = true;
                }
                command = 'L';
            }
            else {
                if (closed === false && i !== 0) {
                    direction = this.closeRangeAreaPath(visiblePoints, point, series, direction, i);
                    closed = true;
                }
                command = 'M';
                point.symbolLocations = [];
            }
        }
        var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.chart.element.id + '_Series_' + series.index;
        var options = new PathOption(name, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    };
    /**
     * path for rendering the low points
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.closeRangeAreaPath = function (visiblePoints, point, series, direction, i) {
        for (var j = i; j >= 0; j--) {
            if (visiblePoints[j].visible && visiblePoints[j].symbolLocations[0]) {
                point = visiblePoints[j];
                direction += 'L' + ' ' + (point.symbolLocations[0].x) + ' ' + ((point.symbolLocations[0].y)) + ' ';
            }
            else {
                break;
            }
        }
        return direction;
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    RangeAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * Get module name.
     */
    RangeAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'RangeAreaSeries';
    };
    /**
     * To destroy the line series.
     * @return {void}
     * @private
     */
    RangeAreaSeries.prototype.destroy = function (chart) {
        /**
         * Destroys range area series
         */
    };
    return RangeAreaSeries;
}(LineBase));
export { RangeAreaSeries };
