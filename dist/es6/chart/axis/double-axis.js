import { getMinPointsDelta } from '../../common/utils/helper';
import { DoubleRange } from '../utils/double-range';
import { withIn, logBase } from '../../common/utils/helper';
var Double = (function () {
    function Double(chart) {
        this.chart = chart;
    }
    Double.prototype.calculateNumericNiceInterval = function (axis, delta, size) {
        var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
        var niceInterval = delta / actualDesiredIntervalsCount;
        if (axis.desiredIntervals != null) {
            return niceInterval;
        }
        var minInterval = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (var _i = 0, _a = axis.intervalDivs; _i < _a.length; _i++) {
            var interval = _a[_i];
            var currentInterval = minInterval * interval;
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    Double.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    };
    Double.prototype.initializeDoubleRange = function (axis) {
        if (axis.minimum !== null) {
            this.min = axis.minimum;
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = 0;
        }
        if (axis.maximum !== null) {
            this.max = axis.maximum;
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = 5;
        }
        if (this.min === this.max) {
            this.max = this.min + 1;
        }
        axis.doubleRange = new DoubleRange(this.min, this.max);
        axis.actualRange = {};
    };
    Double.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis, this.chart);
    };
    Double.prototype.calculateRange = function (axis, size) {
        var series;
        this.min = null;
        this.max = null;
        if (!axis.setRange()) {
            for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                if (!series_1.visible) {
                    continue;
                }
                this.paddingInterval = 0;
                if ((series_1.type.indexOf('Column') > -1 && axis.orientation === 'Horizontal')
                    || (series_1.type.indexOf('Bar') > -1 && axis.orientation === 'Vertical')) {
                    if ((series_1.xAxis.valueType === 'Double' || series_1.xAxis.valueType === 'DateTime')
                        && series_1.xAxis.rangePadding === 'Auto') {
                        this.paddingInterval = getMinPointsDelta(series_1.xAxis, axis.series) / 2;
                    }
                }
                if (axis.orientation === 'Horizontal') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series_1.yMin, series_1.yMax);
                    }
                    else {
                        this.findMinMax(series_1.xMin - this.paddingInterval, series_1.xMax + this.paddingInterval);
                    }
                }
                if (axis.orientation === 'Vertical') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series_1.xMin - this.paddingInterval, series_1.xMax + this.paddingInterval);
                    }
                    else {
                        this.findMinMax(series_1.yMin, series_1.yMax);
                    }
                }
            }
        }
    };
    Double.prototype.findMinMax = function (min, max) {
        if (this.min === null || this.min > min) {
            this.min = min;
        }
        if (this.max === null || this.max < max) {
            this.max = max;
        }
    };
    Double.prototype.applyRangePadding = function (axis, size) {
        var range;
        var start = axis.actualRange.min;
        var end = axis.actualRange.max;
        if (!axis.setRange()) {
            var interval = axis.actualRange.interval;
            var padding = axis.getRangePadding(this.chart);
            if (padding === 'Additional' || padding === 'Round') {
                this.findAdditional(axis, start, end, interval);
            }
            else if (padding === 'Normal') {
                this.findNormal(axis, start, end, interval, size);
            }
            else {
                this.updateActualRange(axis, start, end, interval);
            }
        }
        axis.actualRange.delta = axis.actualRange.max - axis.actualRange.min;
        this.calculateVisibleRange(size, axis);
    };
    Double.prototype.updateActualRange = function (axis, minimum, maximum, interval) {
        axis.actualRange.min = axis.minimum != null ? axis.minimum : minimum;
        axis.actualRange.max = axis.maximum != null ? axis.maximum : maximum;
        axis.actualRange.interval = axis.interval != null ? axis.interval : interval;
    };
    Double.prototype.findAdditional = function (axis, start, end, interval) {
        var minimum;
        var maximum;
        minimum = Math.floor(start / interval) * interval;
        maximum = Math.ceil(end / interval) * interval;
        if (axis.rangePadding === 'Additional') {
            minimum -= interval;
            maximum += interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    };
    Double.prototype.findNormal = function (axis, start, end, interval, size) {
        var remaining;
        var minimum;
        var maximum;
        var startValue = start;
        if (start < 0) {
            startValue = 0;
            minimum = start + (start / 20);
            remaining = interval + (minimum % interval);
            if ((0.365 * interval) >= remaining) {
                minimum -= interval;
            }
            if (minimum % interval < 0) {
                minimum = (minimum - interval) - (minimum % interval);
            }
        }
        else {
            minimum = start < ((5.0 / 6.0) * end) ? 0 : (start - (end - start) / 2);
            if (minimum % interval > 0) {
                minimum -= (minimum % interval);
            }
        }
        maximum = (end > 0) ? (end + (end - startValue) / 20) : (end - (end - startValue) / 20);
        remaining = interval - (maximum % interval);
        if ((0.365 * interval) >= remaining) {
            maximum += interval;
        }
        if (maximum % interval > 0) {
            maximum = (maximum + interval) - (maximum % interval);
        }
        axis.doubleRange = new DoubleRange(minimum, maximum);
        if (minimum === 0) {
            interval = this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            maximum = Math.ceil(maximum / interval) * interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    };
    Double.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming && axis.valueType !== 'Category') ?
                this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size)
                : axis.visibleRange.interval;
        }
    };
    Double.prototype.calculateVisibleLabels = function (axis, chart) {
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0 || this.paddingInterval) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        var format = this.getFormat(axis);
        var isCustom = format.match('{value}') !== null;
        axis.format = chart.intl.getNumberFormat({ format: isCustom ? '' : format,
            useGrouping: chart.useGroupingSeparator });
        axis.startLabel = axis.format(axis.visibleRange.min);
        axis.endLabel = axis.format(axis.visibleRange.max);
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange)) {
                axis.triggerLabelRender(chart, tempInterval, this.formatValue(axis, isCustom, format, tempInterval));
            }
        }
        axis.getMaxLabelWidth(chart);
    };
    Double.prototype.getFormat = function (axis) {
        if (axis.labelFormat) {
            return axis.labelFormat;
        }
        return axis.isStack100 ? '{value}%' : '';
    };
    Double.prototype.formatValue = function (axis, isCustom, format, tempInterval) {
        return isCustom ? format.replace('{value}', axis.format(tempInterval))
            : axis.format(tempInterval);
    };
    return Double;
}());
export { Double };
