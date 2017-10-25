import { Rect, withInRange } from '../../common/utils/helper';
import { Chart } from '../chart';
import { DoubleRange } from '../utils/double-range';
import { Series } from './chart-series';
import { ColumnBase } from './column-base';
import { IPointRenderEventArgs } from '../../common/model/interface';

/**
 * Bar Module used to render the bar series.
 */
export class BarSeries extends ColumnBase {
    /**
     * Render Bar series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let origin: number = Math.max(series.yAxis.visibleRange.min, 0);
        let sideBySideInfo: DoubleRange = this.getSideBySideInfo(series);
        let rect: Rect;
        let argsData: IPointRenderEventArgs;
        for (let pointBar of series.points) {
            pointBar.symbolLocation = null;
            if (pointBar.visible && withInRange(series.points[pointBar.index - 1], pointBar, series.points[pointBar.index + 1], series)) {
                rect = this.getRectangle(pointBar.yValue, pointBar.xValue + sideBySideInfo.start, origin,
                                         pointBar.xValue + sideBySideInfo.end, series);
                argsData = this.triggerEvent(series.chart, series, pointBar);
                if (!argsData.cancel) {
                    this.updateYRegion(pointBar, rect, series);
                    this.drawRectangle(series, pointBar, rect, argsData);
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
     * To destroy the bar series. 
     * @return {void}
     * @private
     */

    protected destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }

    /**
     * Get module name
     */

    protected getModuleName(): string {
        return 'BarSeries';
    }
}