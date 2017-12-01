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
import { withInRange, PathOption, logBase, CoefficientToVector, markerAnimate, PolarArc, valueToCoefficient, firstToLowerCase, valueToPolarCoefficient } from '../../common/utils/helper';
import { PolarRadarPanel } from '../axis/polar-radar-panel';
import { pointRender } from '../../common/model/constants';
import { Animation } from '@syncfusion/ej2-base';
/**
 * `PolarSeries` Module used to render the polar series.
 */
var PolarSeries = /** @class */ (function (_super) {
    __extends(PolarSeries, _super);
    function PolarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render Polar Series.
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.render = function (series) {
        var seriesType = firstToLowerCase(series.drawType);
        if (series.drawType.indexOf('Column') > -1) {
            this.columnDrawTypeRender(series);
        }
        else {
            series.chart[seriesType + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        }
    };
    /**
     * Render Column DrawType.
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.columnDrawTypeRender = function (series) {
        var visiblePoints = series.points;
        var rect;
        var options;
        var argsData;
        var startAngle;
        var endAngle;
        var itemCurrentXPos;
        var radius;
        var pointStartAngle;
        var pointEndAngle;
        var x1;
        var x2;
        var y1;
        var y2;
        var startValue;
        var endValue;
        var innerRadius;
        var centerX = (series.clipRect.width / 2) + series.clipRect.x;
        var dStartX;
        var dStartY;
        var centerY = (series.clipRect.height / 2) + series.clipRect.y;
        var dEndX;
        var dEndY;
        var axisInversed = series.xAxis.isInversed ? 1 : 0;
        var direction = '';
        var sumofYValues = 0;
        var interval = (series.points[1] ? series.points[1].xValue : 2 * series.points[0].xValue) - series.points[0].xValue;
        var ticks = series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks' ? 0 : interval / 2;
        var rangeInterval = series.xAxis.valueType === 'DateTime' ? series.xAxis.dateTimeInterval : 1;
        var min = series.xAxis.actualRange.min;
        var inversedValue;
        var vector;
        this.getSeriesPosition(series);
        var position = series.xAxis.isInversed ? (series.rectCount - 1 - series.position) : series.position;
        var ticksbwtLabel = series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks' ? 0.5
            : 0.5 - (series.rectCount / 2);
        do {
            sumofYValues += rangeInterval;
            min += rangeInterval;
        } while (min <= series.xAxis.actualRange.max - (series.xAxis.valueType === 'Category' ? 0 : 1));
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                inversedValue = series.xAxis.isInversed ? (series.xAxis.visibleRange.max - point.xValue) :
                    point.xValue - series.xAxis.visibleRange.min;
                itemCurrentXPos = (inversedValue) +
                    ((interval / series.rectCount) * position - ticks) + (sumofYValues / 360 * series.xAxis.startAngle);
                itemCurrentXPos = (((itemCurrentXPos) / (sumofYValues)));
                startAngle = 2 * Math.PI * (itemCurrentXPos + series.xAxis.startAngle);
                endAngle = 2 * Math.PI * ((itemCurrentXPos + series.xAxis.startAngle) + (interval / series.rectCount) / (sumofYValues));
                pointStartAngle = startAngle;
                pointEndAngle = endAngle;
                startAngle = (startAngle - 0.5 * Math.PI);
                endAngle = (endAngle - 0.5 * Math.PI) - 0.000001;
                if (series.drawType === 'StackingColumn' || series.drawType === 'RangeColumn') {
                    startValue = series.drawType === 'RangeColumn' ? point.low : series.stackedValues.startValues[point.index];
                    endValue = series.drawType === 'RangeColumn' ? point.high : series.stackedValues.endValues[point.index];
                    endValue = (series.yAxis.valueType === 'Logarithmic' ?
                        logBase(endValue === 0 ? 1 : endValue, series.yAxis.logBase) : endValue);
                    endValue = endValue > series.yAxis.actualRange.max ? series.yAxis.actualRange.max : endValue;
                    radius = startValue === endValue ? 0 : series.chart.radius * valueToCoefficient(endValue, series.yAxis);
                    x1 = centerX + radius * Math.cos(startAngle);
                    x2 = centerX + radius * Math.cos(endAngle);
                    y1 = centerY + radius * Math.sin(startAngle);
                    y2 = centerY + radius * Math.sin(endAngle);
                    innerRadius = series.chart.radius * valueToCoefficient((startValue === 0 && series.yAxis.visibleRange.min !== 0) ? series.yAxis.visibleRange.min : startValue, series.yAxis);
                    dStartX = centerX + innerRadius * Math.cos(startAngle);
                    dStartY = centerY + innerRadius * Math.sin(startAngle);
                    dEndX = centerX + innerRadius * Math.cos(endAngle);
                    dEndY = centerY + innerRadius * Math.sin(endAngle);
                    if (series.type === 'Polar') {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'A' + ' ' + radius + ' ' + radius + ' ' + '0' + ' '
                            + '0' + ' ' + 1 + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' ' + dEndX + ' ' + dEndY + ' ' +
                            'A' + ' ' + innerRadius + ' ' + innerRadius + ' ' + '1' + ' ' + '0' + ' ' + '0' + ' '
                            + dStartX + ' ' + dStartY + ' ' + 'z');
                    }
                    else {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'L'
                            + dEndX + ' ' + dEndY + ' ' + 'L' + ' ' + dStartX + ' ' + dStartY + ' ' + 'z');
                    }
                    point.regionData = new PolarArc(pointStartAngle, pointEndAngle, innerRadius, radius, itemCurrentXPos);
                }
                else {
                    endValue = point.yValue > series.yAxis.actualRange.max ? series.yAxis.actualRange.max : point.yValue;
                    radius = series.chart.radius * valueToCoefficient((series.yAxis.valueType === 'Logarithmic' ? logBase(endValue, series.yAxis.logBase) : endValue), series.yAxis);
                    x1 = centerX + radius * Math.cos(startAngle);
                    x2 = centerX + radius * Math.cos(endAngle);
                    y1 = centerY + radius * Math.sin(startAngle);
                    y2 = centerY + radius * Math.sin(endAngle);
                    if (series.type === 'Polar') {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'A' + ' ' + radius + ' ' + radius + ' ' + '0' + ' ' +
                            '0' + ' ' + 1 + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' ' + centerX + ' ' +
                            centerY + ' ' + 'z');
                    }
                    else {
                        direction = ('M' + ' ' + x1 + ' ' + y1 + ' ' + 'L' + ' ' + x2 + ' ' + y2 + ' ' + 'L' + ' '
                            + centerX + ' ' + centerY + ' ' + 'z');
                    }
                    point.regionData = new PolarArc(pointStartAngle, pointEndAngle, 0, radius, itemCurrentXPos);
                }
                argsData = this.triggerEvent(series.chart, series, point);
                options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
                if (!argsData.cancel) {
                    this.appendLinePath(options, series);
                    if (series.type === 'Polar') {
                        vector = CoefficientToVector(valueToPolarCoefficient((point.xValue + ticksbwtLabel / series.rectCount + series.position / series.rectCount), series.xAxis), series.chart.primaryXAxis.startAngle);
                        point.symbolLocations.push({
                            x: series.clipRect.width / 2 + series.clipRect.x + radius * vector.x,
                            y: series.clipRect.height / 2 + series.clipRect.y + radius * vector.y
                        });
                    }
                    else {
                        point.symbolLocations.push({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 });
                    }
                }
            }
        }
        series.isRectSeries = true;
    };
    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.triggerEvent = function (chart, series, point) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point,
            fill: series.setPointColor(point, series.interior),
            border: series.setBorderColor(point, { width: series.border.width, color: series.border.color })
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    /** get position for column drawtypes
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.getSeriesPosition = function (series) {
        var chart = series.chart;
        var seriesCollection = [];
        var stackingGroup = [];
        var vSeries = { rectCount: 0, position: null };
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (series_1.visible && (series_1.type === 'Polar' || series_1.type === 'Radar') && series_1.drawType.indexOf('Column') !== -1) {
                seriesCollection.push(series_1);
            }
        }
        seriesCollection.forEach(function (series) {
            if (series.drawType.indexOf('Stacking') !== -1) {
                if (series.stackingGroup) {
                    if (stackingGroup[series.stackingGroup] === undefined) {
                        series.position = vSeries.rectCount;
                        stackingGroup[series.stackingGroup] = vSeries.rectCount++;
                    }
                    else {
                        series.position = stackingGroup[series.stackingGroup];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        series.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        series.position = vSeries.position;
                    }
                }
            }
            else {
                series.position = vSeries.rectCount++;
            }
        });
        seriesCollection.forEach(function (value) {
            value.rectCount = vSeries.rectCount;
        });
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    PolarSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        if (series.drawType === 'Scatter') {
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocations.length || !rectElements[count]) {
                    continue;
                }
                markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
                count++;
            }
        }
        else {
            for (count = 1; count < rectElements.length; count++) {
                this.doPolarRadarAnimation(rectElements[count], delay, duration, series);
            }
        }
    };
    /**
     * To do the Polar Radar draw type column animation.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.doPolarRadarAnimation = function (animateElement, delay, duration, series) {
        var chartcenterX = series.clipRect.width / 2 + series.clipRect.x;
        var chartcenterY = series.clipRect.height / 2 + series.clipRect.y;
        var elementHeight = 0;
        animateElement.style.visibility = 'hidden';
        new Animation({}).animate(animateElement, {
            duration: duration,
            delay: delay,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    elementHeight = ((args.timeStamp - args.delay) / args.duration);
                    animateElement.setAttribute('transform', 'translate(' + chartcenterX
                        + ' ' + chartcenterY + ') scale(' + elementHeight + ') translate(' + (-chartcenterX) + ' ' + (-chartcenterY) + ')');
                }
            },
            end: function (model) {
                animateElement.style.visibility = 'visible';
                animateElement.removeAttribute('transform');
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    };
    /**
     * Get module name.
     */
    PolarSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'PolarSeries';
    };
    /**
     * To destroy the polar series.
     * @return {void}
     * @private
     */
    PolarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return PolarSeries;
}(PolarRadarPanel));
export { PolarSeries };
