import { getPoint, withInRange, ChartLocation, PathOption, Rect, TransformToVisible } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { AnimationModel } from '../../common/model/base-model';
import { Axis } from '../../chart/axis/axis';

/**
 * Area Module used to render the Area series.
 */

export class AreaSeries extends LineBase {

    /**
     * Render Area series.
     * @return {void}
     * @private
     */
    public render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void {
        let firstPoint: ChartLocation;
        let endPoint: ChartLocation;
        let startPoint: ChartLocation = null;
        let direction: string = '';
        let pointsLength: number = series.points.length;
        let origin: number = series.chart.chartAreaType === 'PolarRadar' ? series.points[0].yValue :
            Math.max(<number>series.yAxis.visibleRange.min, 0);
        let options: PathOption;
        let point: Points;
        let currentXValue: number;
        let symbolLocation: ChartLocation;
        let getCoordinate: Function = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (let i: number = 0; i < pointsLength; i++) {
            point = series.points[i];
            currentXValue = point.xValue;
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[i - 1], point, series.points[i + 1], series)) {
                if (startPoint === null) {
                    startPoint = new ChartLocation(currentXValue, origin);
                    // Start point for the current path
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    direction += ('M' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                }
                // First Point to draw the area path
                firstPoint = getCoordinate(currentXValue, point.yValue, xAxis, yAxis, isInverted, series);
                direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');

                if (series.points[i + 1] && !series.points[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                    // current start point
                    firstPoint = getCoordinate(currentXValue, origin, xAxis, yAxis, isInverted, series);
                    // current end point
                    endPoint = getCoordinate(<number>startPoint.x, <number>startPoint.y, xAxis, yAxis, isInverted, series);
                    direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ' + 'L' +
                        ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
                    startPoint = null;
                }
                symbolLocation = getCoordinate(
                    currentXValue, point.yValue, xAxis, yAxis, isInverted, series
                );
                point.symbolLocations.push(symbolLocation);
                point.regions.push(
                    new Rect(
                        symbolLocation.x - series.marker.width,
                        symbolLocation.y - series.marker.height,
                        2 * series.marker.width, 2 * series.marker.height
                    )
                );
            }
        }
        if (pointsLength > 1) {
            startPoint = {
                'x': series.points[pointsLength - 1].xValue,
                'y': series.chart.chartAreaType === 'PolarRadar' ? series.points[pointsLength - 1].yValue : origin
            };
            endPoint = getCoordinate(
                <number>startPoint.x, <number>startPoint.y, xAxis, yAxis, isInverted, series
            );
            direction += ('L' + ' ' + (endPoint.x) + ' ' + (endPoint.y) + ' ');
        } else {
            direction = '';
        }
        options = new PathOption(
            series.chart.element.id + '_Series_' + series.index, series.interior,
            series.border.width, series.border.color, series.opacity, series.dashArray, direction
        );
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