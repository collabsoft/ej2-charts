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
import { VisibleLabels } from '../axis/axis';
import { Double } from '../axis/double-axis';
import { DoubleRange } from '../utils/double-range';
import { withIn } from '../utils/helper';
import { axisLabelRender } from '../model/constants';
var Category = (function (_super) {
    __extends(Category, _super);
    function Category(chart) {
        return _super.call(this, chart) || this;
    }
    Category.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    Category.prototype.getActualRange = function (axis, size) {
        axis.doubleRange = new DoubleRange(this.min, this.max);
        axis.actualRange = {};
        if (!axis.interval) {
            axis.actualRange.interval = Math.max(1, Math.floor(axis.doubleRange.delta / axis.getActualDesiredIntervalsCount(size)));
        }
        else {
            axis.actualRange.interval = Math.ceil(axis.interval);
        }
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
        axis.actualRange.delta = axis.doubleRange.delta;
    };
    Category.prototype.applyRangePadding = function (axis, size) {
        var ticks = (axis.labelPlacement === 'BetweenTicks') ? 0.5 : 0;
        if (ticks > 0) {
            axis.actualRange.min -= ticks;
            axis.actualRange.max += ticks;
        }
        else {
            axis.actualRange.max += axis.actualRange.max ? 0 : 0.5;
        }
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        axis.actualRange.delta = axis.doubleRange.delta;
        this.calculateVisibleRange(size, axis);
    };
    Category.prototype.calculateVisibleLabels = function (axis) {
        axis.visibleLabels = [];
        var tempInterval;
        tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        var position;
        var format = this.getLabelFormat();
        axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
        axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
        var argsData;
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                position = Math.round(tempInterval);
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis, value: position,
                    text: axis.labels[position] ? axis.labels[position] : position.toString()
                };
                this.chart.trigger(axisLabelRender, argsData);
                if (!argsData.cancel) {
                    axis.visibleLabels.push(new VisibleLabels(argsData.text, argsData.value));
                }
            }
        }
        axis.getMaxLabelWidth(this.chart);
    };
    Category.prototype.getLabelFormat = function () {
        return '';
    };
    Category.prototype.getModuleName = function () {
        return 'Category';
    };
    Category.prototype.destroy = function (chart) {
    };
    return Category;
}(Double));
export { Category };
