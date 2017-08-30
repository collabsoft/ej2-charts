import { withInRange, getPoint, ChartLocation, PathOption, Rect } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from '../../common/model/base-model';

/**
 * Line Module used to render the line series.
 */

export class LineSeries extends LineBase {
    /**
     * Render Line Series.
     * @return {void}.
     * @private
     */
    public render(series: Series): void {
        let point1: ChartLocation;
        let point2: ChartLocation;
        let direction: string = '';
        let prevPoint: Points = null;
        let startPoint: string = 'M';
        let options: PathOption;
        let visiblePoints: Points[] = this.improveChartPerformance(series);
        for (let point of visiblePoints) {
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point1 = getPoint(prevPoint.xValue, prevPoint.yValue, series);
                    point2 = getPoint(point.xValue, point.yValue, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                        'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                prevPoint = point;
                point.symbolLocation = getPoint(point.xValue, point.yValue, series);
                point.region = new Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height,
                                        2 * series.marker.width, 2 * series.marker.height);
            } else {
                prevPoint = null;
                startPoint = 'M';
                point.symbolLocation = null;
            }
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.interior,
                                 series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    }

    /**
     * Animates the series.
     * @return {void}.
     * @private
     */

    public doAnimation(series: Series): void {
        let option: AnimationModel = series.animation;
        this.doProgressiveAnimation(series, option);
    }

    /**
     * Get module name.
     */

    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'LineSeries';
    }

    /**
     * To destroy the line series. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}