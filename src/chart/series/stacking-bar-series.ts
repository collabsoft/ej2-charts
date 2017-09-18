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
        for (let point of series.points) {
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                rect = this.getRectangle(stackedValue.endValues[point.index], point.xValue + sideBySideInfo.start,
                                         stackedValue.startValues[point.index], point.xValue + sideBySideInfo.end, series);
                argsData = this.triggerEvent(series.chart, series, point);
                if (!argsData.cancel) {
                    this.drawRectangle(series, point, rect, argsData);
                    this.updateYRegion(point, rect, series);
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