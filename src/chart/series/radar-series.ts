import { Chart } from '../chart';
import { Series } from './chart-series';
import { firstToLowerCase } from '../../common/utils/helper';
import { PolarSeries } from '../series/polar-series';

/**
 * `RadarSeries` module is used to render the radar series.
 */

export class RadarSeries extends PolarSeries {
    /**
     * Render radar Series.
     * @return {void}.
     * @private
     */
    public render(series: Series): void {
        let seriesType: string = firstToLowerCase(series.drawType);
        if (series.drawType.indexOf('Column') === -1) {
            series.chart[seriesType + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        } else {
            this.columnDrawTypeRender(series);
        }
    }
    /**
     * Get module name.
     */

    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'RadarSeries';
    }

    /**
     * To destroy the radar series.
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}