import { ChartLocation, PathOption, getPoint, withInRange, Rect } from '../utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from './chart-series-model';

/**
 * StepLine Module used to render the step line series.
 */

export class StepLineSeries extends LineBase {

    /**
     * Render the Step line series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let direction: string = '';
        let startPoint: string = 'M';
        let prevPoint: Points = null;
        let pathOptions: PathOption;
        let lineLength: number;
        let point1: ChartLocation;
        let point2: ChartLocation;
        let visiblePoints: Points[] = this.improveChartPerformance(series);
        if (series.xAxis.valueType === 'Category' && series.xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        } else {
            lineLength = 0;
        }
        for (let point of visiblePoints) {
            point.symbolLocation = null;
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point2 = getPoint(point.xValue, point.yValue, series);
                    point1 = getPoint(prevPoint.xValue, prevPoint.yValue, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' + 'L' + ' ' +
                        (point2.x) + ' ' + (point1.y) + 'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                } else {
                    point1 = getPoint(point.xValue - lineLength, point.yValue, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    startPoint = 'L';
                }
                point.symbolLocation = getPoint(point.xValue, point.yValue, series);
                prevPoint = point;
                point.region = new Rect(point.symbolLocation.x - series.marker.width, point.symbolLocation.y - series.marker.height,
                                        2 * series.marker.width, 2 * series.marker.height);
            } else {
                prevPoint = null;
                startPoint = 'M';
            }
        }
        point1 = getPoint((visiblePoints[visiblePoints.length - 1].xValue + lineLength),
                          visiblePoints[visiblePoints.length - 1].yValue, series);
        direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        pathOptions = new PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior,
                                     series.opacity, series.dashArray, direction);
        this.appendLinePath(pathOptions, series);
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
     * To destroy the step line series. 
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
        return 'StepLineSeries';
    }
}
