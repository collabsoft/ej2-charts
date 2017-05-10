define(["require", "exports", "../axis/axis", "../utils/helper", "../utils/double-range", "../utils/helper", "../model/constants"], function (require, exports, axis_1, helper_1, double_range_1, helper_2, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var minInterval = Math.pow(10, Math.floor(helper_2.logBase(niceInterval, 10)));
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
            axis.doubleRange = new double_range_1.DoubleRange(this.min, this.max);
            axis.actualRange = {};
        };
        Double.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis, size);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        Double.prototype.calculateRange = function (axis, size) {
            var series;
            var paddingInterval = 0;
            this.min = null;
            this.max = null;
            if (!axis.setRange()) {
                for (var _i = 0, _a = axis.series; _i < _a.length; _i++) {
                    var series_1 = _a[_i];
                    if (!series_1.visible) {
                        continue;
                    }
                    paddingInterval = 0;
                    if (series_1.type.indexOf('Column') > -1 || series_1.type.indexOf('Bar') > -1) {
                        if (series_1.xAxis.valueType === 'Double') {
                            paddingInterval = helper_1.getMinPointsDelta(series_1.xAxis, axis.series) / 2;
                        }
                    }
                    if (axis.orientation === 'Horizontal') {
                        if (this.chart.requireInvertedAxis) {
                            this.findMinMax(series_1.yMin, series_1.yMax);
                        }
                        else {
                            this.findMinMax(series_1.xMin - paddingInterval, series_1.xMax + paddingInterval);
                        }
                    }
                    if (axis.orientation === 'Vertical') {
                        if (this.chart.requireInvertedAxis) {
                            this.findMinMax(series_1.xMin - paddingInterval, series_1.xMax + paddingInterval);
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
                var rangePadding = axis.rangePadding === 'Auto' ?
                    (axis.orientation === 'Vertical' && !this.chart.requireInvertedAxis) ? 'Normal' :
                        (axis.orientation === 'Horizontal' && this.chart.requireInvertedAxis) ? 'Normal' :
                            'None' : axis.rangePadding;
                if (rangePadding === 'Additional' || rangePadding === 'Round') {
                    this.findAdditional(axis, start, end, interval);
                }
                else if (rangePadding === 'Normal') {
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
            axis.actualRange.min = minimum;
            axis.actualRange.max = maximum;
            axis.actualRange.interval = interval;
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
            axis.doubleRange = new double_range_1.DoubleRange(minimum, maximum);
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
        Double.prototype.calculateVisibleLabels = function (axis) {
            axis.visibleLabels = [];
            var tempInterval = axis.visibleRange.min;
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            axis.format = this.chart.intl.getNumberFormat({ format: this.getLabelFormat(axis), useGrouping: this.chart.useGroupingSeparator });
            var argsData;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            }
            axis.startLabel = axis.format(axis.visibleRange.min);
            axis.endLabel = axis.format(axis.visibleRange.max);
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                if (helper_2.withIn(tempInterval, axis.visibleRange)) {
                    argsData = {
                        cancel: false, name: constants_1.axisLabelRender, axis: axis,
                        text: customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(tempInterval))
                            : axis.format(tempInterval), value: tempInterval
                    };
                    this.chart.trigger(constants_1.axisLabelRender, argsData);
                    if (!argsData.cancel) {
                        axis.visibleLabels.push(new axis_1.VisibleLabels(argsData.text, argsData.value));
                    }
                }
            }
            axis.getMaxLabelWidth(this.chart);
        };
        Double.prototype.getLabelFormat = function (axis) {
            var customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            var skeleton = customLabelFormat ? '' : axis.labelFormat;
            return skeleton;
        };
        return Double;
    }());
    exports.Double = Double;
});
