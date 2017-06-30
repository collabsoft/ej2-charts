import { BorderModel } from '../model/base-model';
import { ChartLocation, PathOption, StackValues, getPoint, withInRange, Rect } from '../utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from './chart-series-model';

/**
 * Stacking Area Module used to render the Stacking Area series.
 */

export class StackingAreaSeries extends LineBase {

    /**
     * Render the Stacking area series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let point1: ChartLocation;
        let point2: ChartLocation;
        let lineDirection: string = '';
        let visiblePoints: Points[] = <Points[]>series.points;
        let pointsLength: number = visiblePoints.length;
        let stackedvalue: StackValues = series.stackedValues;
        let origin: number = Math.max(series.yAxis.visibleRange.min, stackedvalue.startValues[0]);
        let border: BorderModel = series.border;
        let options: PathOption;
        let startPoint: number = 0;
        point1 = getPoint(visiblePoints[0].xValue, origin, series);
        lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
        for (let i: number = 0; i < pointsLength; i++) {
            visiblePoints[i].symbolLocation = null;
            if (visiblePoints[i].visible && withInRange(visiblePoints[i - 1], visiblePoints[i], visiblePoints[i + 1], series)) {
                point1 = getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                lineDirection = lineDirection.concat('L' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                visiblePoints[i].symbolLocation = getPoint(visiblePoints[i].xValue, stackedvalue.endValues[i], series);
                visiblePoints[i].region = new Rect(visiblePoints[i].symbolLocation.x - series.marker.width,
                                                   visiblePoints[i].symbolLocation.y - series.marker.height,
                                                   2 * series.marker.width, 2 * series.marker.height);
            } else {
                for (let j: number = i - 1; j >= startPoint; j--) {
                    point2 = getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
                    lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                }
                if (visiblePoints[i + 1] && visiblePoints[i + 1].visible) {
                    point1 = getPoint(visiblePoints[i + 1].xValue, stackedvalue.startValues[i + 1], series);
                    lineDirection = lineDirection.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                }
                startPoint = i + 1;
            }
        }
        for (let j: number = pointsLength - 1; j >= startPoint; j--) {
            point2 = getPoint(visiblePoints[j].xValue, stackedvalue.startValues[j], series);
            lineDirection = lineDirection.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
        }
        options = new PathOption(
            series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color,
            series.opacity, series.dashArray, lineDirection);
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
     * To destroy the stacking area. 
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
        return 'StackingAreaSeries';
    }

}
