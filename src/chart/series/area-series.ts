import { getPoint, withInRange, ChartLocation, PathOption } from '../utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from './chart-series-model';

/**
 * Area Module used to render the Area series.
 */

export class AreaSeries extends LineBase {

    /**
     * Render Area series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let firstPoint: ChartLocation;
        let endPoint: ChartLocation;
        let startPoint: ChartLocation = null;
        let direction: string = '';
        let pointsLength: number = series.points.length;
        let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        let options: PathOption;
        let point: Points;
        let currentXValue: number;

        for (let i: number = 0; i < pointsLength; i++) {
            point = series.points[i];
            currentXValue = point.xValue;
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (startPoint === null) {
                    startPoint = new ChartLocation(0, 0);
                    startPoint.x = currentXValue;
                    startPoint.y = origin;
                    // Start point for the current path
                    firstPoint = getPoint(currentXValue, origin, series);
                    direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                }
                // First Point to draw the area path
                firstPoint = getPoint(currentXValue, point.yValue, series);
                direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');

                if (series.points[i + 1] && !series.points[i + 1].visible) {
                    // current start point
                    firstPoint = getPoint(currentXValue, origin, series);
                    // current end point
                    endPoint = getPoint(<number>startPoint.x, <number>startPoint.y, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                        ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                    startPoint = null;
                }
                point.symbolLocation = getPoint(currentXValue, point.yValue, series);
            }
        }

        if (pointsLength > 1) {
            startPoint = { 'x': series.points[pointsLength - 1].xValue, 'y': origin };
            endPoint = getPoint(<number>startPoint.x, <number>startPoint.y, series);
            direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
        } else {
            direction = '';
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior,
                                 series.border.width, series.border.color, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    }

    /**
     * To destroy the area series.
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method calling here
         */
    }

    /**
     * Get module name
     */

    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'AreaSeries';
    }

    /**
     * Animates the series.
     * @return {void}
     * @private
     */

    public doAnimation(series: Series): void {
        let option: AnimationModel = series.animation;
        this.doLinearAnimation(series, option);
    }

}