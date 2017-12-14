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
import { withInRange } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
/**
 * Stacking Bar Module used to render the Stacking Bar series.
 */
var StackingBarSeries = /** @class */ (function (_super) {
    __extends(StackingBarSeries, _super);
    function StackingBarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking bar series.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.render = function (series) {
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var sideBySideInfo = this.getSideBySideInfo(series);
        var stackedValue = series.stackedValues;
        var rect;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointStack = _a[_i];
            pointStack.symbolLocations = [];
            pointStack.regions = [];
            if (pointStack.visible && withInRange(series.points[pointStack.index - 1], pointStack, series.points[pointStack.index + 1], series)) {
                rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, stackedValue.endValues[pointStack.index], pointStack.xValue + sideBySideInfo.end, stackedValue.startValues[pointStack.index], series);
                argsData = this.triggerEvent(series, pointStack, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, pointStack, rect, argsData);
                    this.updateSymbolLocation(pointStack, rect, series);
                }
            }
        }
    };
    /**
     * To destroy the stacking bar.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name.
     */
    StackingBarSeries.prototype.getModuleName = function () {
        return 'StackingBarSeries';
    };
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    StackingBarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    return StackingBarSeries;
}(ColumnBase));
export { StackingBarSeries };
