import { Rect, withInRange } from '../utils/helper';
import { Chart } from '../chart';
import { DoubleRange } from '../utils/double-range';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../model/interface';

/**
 * Column Module used to render the column series.
 */
export class ColumnSeries extends ColumnBase {

    /**
     * Render Column series.
     * @return {void}
     * @private
     */

    public render(series: Series): void {
        let rect: Rect;
        let sideBySideInfo: DoubleRange = this.getSideBySideInfo(series);
        let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        let argsData: IPointRenderEventArgs;
        for (let point of series.points) {
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, point.yValue,
                                         point.xValue + sideBySideInfo.end, origin, series);
                argsData = this.triggerEvent(series.chart, series, point);
                if (!argsData.cancel) {
                    this.updateXRegion(point, rect, series);
                    this.drawRectangle(series, point, rect, argsData);
                }
            }
        }
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
     * Get module name.
     */
    protected getModuleName(): string {
        return 'ColumnSeries';
        /**
         * return the module name
         */
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