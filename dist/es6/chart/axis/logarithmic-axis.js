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
import { Double } from '../axis/double-axis';
import { logBase, withIn } from '../../common/utils/helper';
var Logarithmic = (function (_super) {
    __extends(Logarithmic, _super);
    function Logarithmic(chart) {
        return _super.call(this, chart) || this;
    }
    Logarithmic.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.calculateVisibleRange(size, axis);
        this.calculateVisibleLabels(axis, this.chart);
    };
    Logarithmic.prototype.getActualRange = function (axis, size) {
        this.initializeDoubleRange(axis);
        var logStart = logBase(this.min, axis.logBase);
        logStart = isFinite(logStart) ? logStart : this.min;
        var logEnd = logBase(this.max, axis.logBase);
        logEnd = isFinite(logStart) ? logEnd : this.max;
        this.min = Math.floor(logStart / 1);
        this.max = Math.ceil(logEnd / 1);
        axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(this.max - this.min, size, axis);
        axis.actualRange.min = this.min;
        axis.actualRange.max = this.max;
        axis.actualRange.delta = this.max - this.min;
    };
    Logarithmic.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateLogNiceInterval(axis.doubleRange.delta, size, axis)
                : axis.visibleRange.interval;
            axis.visibleRange.interval = Math.floor(axis.visibleRange.interval) === 0 ? 1 : Math.floor(axis.visibleRange.interval);
        }
    };
    Logarithmic.prototype.calculateLogNiceInterval = function (delta, size, axis) {
        var actualDesiredIntervalsCount = axis.getActualDesiredIntervalsCount(size);
        var niceInterval = delta;
        var minInterval = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (var j = 0, len = axis.intervalDivs.length; j < len; j++) {
            var currentInterval = minInterval * axis.intervalDivs[j];
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    };
    Logarithmic.prototype.calculateVisibleLabels = function (axis, chart) {
        var tempInterval = axis.visibleRange.min;
        axis.visibleLabels = [];
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        var axisFormat = this.getFormat(axis);
        var isCustomFormat = axisFormat.match('{value}') !== null;
        axis.format = chart.intl.getNumberFormat({ format: isCustomFormat ? '' : axisFormat,
            useGrouping: chart.useGroupingSeparator });
        axis.startLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.min));
        axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.actualRange)) {
                axis.triggerLabelRender(this.chart, tempInterval, this.formatValue(axis, isCustomFormat, axisFormat, Math.pow(axis.logBase, tempInterval)));
            }
        }
        axis.getMaxLabelWidth(this.chart);
    };
    Logarithmic.prototype.getModuleName = function () {
        return 'Logarithmic';
    };
    Logarithmic.prototype.destroy = function (chart) {
    };
    return Logarithmic;
}(Double));
export { Logarithmic };
