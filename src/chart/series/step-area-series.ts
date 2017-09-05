import { getPoint, withInRange, ChartLocation, PathOption, Rect } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from '../../common/model/base-model';

/**
 * StepArea Module used to render the StepArea series.
 */

export class StepAreaSeries extends LineBase {

    /**
     * Render StepArea series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let currentPoint: ChartLocation;
        let secondPoint: ChartLocation;
        let start: ChartLocation = null;
        let direction: string = '';
        let pointsLength: number = series.points.length;
        let origin: number = Math.max(<number>series.yAxis.visibleRange.min, 0);
        let options: PathOption;
        let point: Points;
        let xValue: number;
        let prevPoint: Points = null;

        for (let i: number = 0; i < pointsLength; i++) {
            point = series.points[i];
            xValue = point.xValue;
            point.symbolLocation = null;
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (start === null) {
                    start = new ChartLocation(xValue, 0);
                    // Start point for the current path
                    currentPoint = getPoint(xValue, origin, series);
                    direction += ('M' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    currentPoint = getPoint(xValue, point.yValue, series);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                // First Point to draw the Steparea path
                if (prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.yValue, series);
                    secondPoint = getPoint(prevPoint.xValue, prevPoint.yValue, series);
                    direction += ('L' + ' ' +
                                  (currentPoint.x) + ' ' + (secondPoint.y) + 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                point.symbolLocation = getPoint(xValue, point.yValue, series);
                point.region = new Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height,
                                        2 * series.marker.width, 2 * series.marker.height);
                prevPoint = point;
            }
            if (series.points[i + 1] && !series.points[i + 1].visible) {
                // current start point
                currentPoint = getPoint(xValue, origin, series);
                direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y));
                start = null;
                prevPoint = null;
            }
        }

        if (pointsLength > 1) {
            start = { 'x': series.points[pointsLength - 1].xValue, 'y': origin };
            secondPoint = getPoint(start.x, start.y, series);
            direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior,
                                 series.border.width, series.border.color, series.opacity, series.dashArray, direction);
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
        this.doLinearAnimation(series, option);
    }
    /**
     * To destroy the step Area series.
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method calling here
         */
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'StepAreaSeries';
    }
}
