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
import { DoubleRange } from '../utils/double-range';
import { withIn } from '../../common/utils/helper';
/**
 * Category module is used to render category axis.
 */
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    /**
     * Constructor for the category module.
     * @private
     */
    function Category(chart) {
        return _super.call(this, chart) || this;
    }
    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     * @private
     */
    Category.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    /**
     * Actual Range for the axis.
     * @private
     */
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
    /**
     * Padding for the axis.
     * @private
     */
    Category.prototype.applyRangePadding = function (axis, size) {
        var ticks = (axis.labelPlacement === 'BetweenTicks' && this.chart.chartAreaType !== 'PolarRadar') ? 0.5 : 0;
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
    /**
     * Calculate label for the axis.
     * @private
     */
    Category.prototype.calculateVisibleLabels = function (axis) {
        /*! Generate axis labels */
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        var position;
        axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
        axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                position = Math.round(tempInterval);
                axis.triggerLabelRender(this.chart, position, axis.labels[position] ? axis.labels[position] : position.toString());
            }
        }
        axis.getMaxLabelWidth(this.chart);
    };
    /**
     * Get module name
     */
    Category.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'Category';
    };
    /**
     * To destroy the category axis.
     * @return {void}
     * @private
     */
    Category.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    return Category;
}(Double));
export { Category };
