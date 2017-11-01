import { withInRange, getPoint, ChartLocation, PathOption, Rect, TransformToVisible } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from '../../common/model/base-model';
import { Axis } from '../../chart/axis/axis';

/**
 * Line Module used to render the line series.
 */

export class LineSeries extends LineBase {
    /**
     * Render Line Series.
     * @return {void}.
     * @private
     */
    public render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void {
        let point1: ChartLocation;
        let point2: ChartLocation;
        let direction: string = '';
        let prevPoint: Points = null;
        let startPoint: string = 'M';
        let options: PathOption;
        let getCoordinate: Function = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        let visiblePoints: Points[] = this.improveChartPerformance(series);
        for (let point of visiblePoints) {
            point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (prevPoint != null) {
                    point1 = getCoordinate(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted, series);
                    point2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                    direction = direction.concat(startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                        'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    startPoint = 'L';
                }
                prevPoint = point;
                point.symbolLocations.push(
                    getCoordinate(
                        point.xValue, point.yValue,
                        xAxis, yAxis, isInverted, series
                    )
                );
                point.regions.push(
                    new Rect(
                        point.symbolLocations[0].x - series.marker.width,
                        point.symbolLocations[0].y - series.marker.height,
                        2 * series.marker.width,
                        2 * series.marker.height
                    )
                );
            } else {
                prevPoint = (series.emptyPointSettings.mode === 'Drop') ? prevPoint : null;
                startPoint = (series.emptyPointSettings.mode === 'Drop') ? startPoint : 'M';
                point.symbolLocations = [];
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar') {
            if (series.isClosed) {
                point2 = getCoordinate(
                    visiblePoints[visiblePoints.length - 1].xValue, visiblePoints[visiblePoints.length - 1].yValue,
                    xAxis, yAxis, isInverted, series
                );
                point1 = getCoordinate(visiblePoints[0].xValue, visiblePoints[0].yValue, xAxis, yAxis, isInverted, series);
                direction = direction.concat(startPoint + ' ' + point2.x + ' ' + point2.y + ' ' + 'L' + ' ' + point1.x + ' ' + point1.y);
            }
        }
        let name: string = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
            series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                series.chart.element.id + '_Series_' + series.index;

        options = new PathOption(
            name, 'none', series.width, series.interior,
            series.opacity, series.dashArray, direction
        );
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