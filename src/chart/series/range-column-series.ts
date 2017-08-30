import { Rect, withInRange } from '../../common/utils/helper';
import { Chart } from '../chart';
import { DoubleRange } from '../utils/double-range';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../common/model/interface';

/**
 * Column Module used to render the column series.
 */
export class RangeColumnSeries extends ColumnBase {

    /**
     * Render Column series.
     * @return {void}
     * @private
     */

    public render(series: Series): void {
        let rect: Rect;
        let sideBySideInfo: DoubleRange = this.getSideBySideInfo(series);
        //let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        let argsData: IPointRenderEventArgs;
        for (let rangePoint of series.points) {
            rangePoint.symbolLocation = null;
            if (rangePoint.visible && withInRange(series.points[rangePoint.index - 1], rangePoint, series.points[rangePoint.index + 1],
                                                  series)) {
                rect = this.getRectangle(rangePoint.xValue + sideBySideInfo.start, <number>rangePoint.high,
                                         rangePoint.xValue + sideBySideInfo.end, <number>rangePoint.low, series);

                argsData = this.triggerEvent(series.chart, series, rangePoint);
                if (!argsData.cancel) {
                    this.updateXRegion(rangePoint, rect, series);
                    this.drawRectangle(series, rangePoint, rect, argsData);
                }
            }
        }
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        return 'RangeColumnSeries';
        /**
         * return the module name
         */
    }

    /**
     * Animates the series.
     * @return {void}
     * @private
     */

    public doAnimation(series: Series): void {
        this.animate(series);
    }




    /**
     * To destroy the column series.
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}