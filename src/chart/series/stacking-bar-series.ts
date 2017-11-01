import { Rect, withInRange, StackValues } from '../../common/utils/helper';
import { Chart } from '../chart';
import { DoubleRange } from '../utils/double-range';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../common/model/interface';


/**
 * Stacking Bar Module used to render the Stacking Bar series.
 */
export class StackingBarSeries extends ColumnBase {

    /**
     * Render the Stacking bar series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let origin: number = Math.max(series.yAxis.visibleRange.min, 0);
        let sideBySideInfo: DoubleRange = this.getSideBySideInfo(series);
        let stackedValue: StackValues = series.stackedValues;
        let rect: Rect;
        let argsData: IPointRenderEventArgs;
        for (let pointStack of series.points) {
            pointStack.symbolLocations = []; pointStack.regions = [];
            if (pointStack.visible && withInRange(series.points[pointStack.index - 1], pointStack,
                                                  series.points[pointStack.index + 1], series)) {
                rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, stackedValue.endValues[pointStack.index],
                                         pointStack.xValue + sideBySideInfo.end, stackedValue.startValues[pointStack.index], series);
                argsData = this.triggerEvent(series, pointStack, series.interior,
                                             { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, pointStack, rect, argsData);
                    this.updateSymbolLocation(pointStack, rect, series);
                }
            }
        }
    }
    /**
     * To destroy the stacking bar. 
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        return 'StackingBarSeries';
    }
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    public doAnimation(series: Series): void {
        this.animate(series);
    }
}