import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate, TransformToVisible } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { BorderModel } from '../../common/model/base-model';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { IPointRenderEventArgs } from '../../common/model/interface';
import { pointRender } from '../../common/model/constants';
import { Axis } from '../../chart/axis/axis';

/**
 * Scatter Module used to render the scatter series.
 */

export class ScatterSeries {

    /**
     * Render the scatter series.
     * @return {void}
     * @private
     */

    public render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void {
        let seriesIndex: number = series.index;
        let marker: MarkerSettingsModel = series.marker;
        let border: BorderModel = series.border;
        let shape: string = marker.shape;
        let visiblePoints: Points[] = series.points;
        let pointIndex: number;
        let symbolId: string;
        let shapeOption: PathOption;
        let argsData: IPointRenderEventArgs;
        let getCoordinate: Function = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (let point of visiblePoints) {
            point.symbolLocations = []; point.regions = [];
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                point.symbolLocations.push(
                    getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series)
                );
                symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point,
                    fill: series.setPointColor(point, series.interior),
                    border: series.setBorderColor(point, { width: series.border.width, color: series.border.color }),
                    height: marker.height, width: marker.width
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.color = argsData.fill;
                    shapeOption = new PathOption(
                        symbolId, argsData.fill,
                        argsData.border.width, argsData.border.color, series.opacity, null
                    );
                    series.seriesElement.appendChild(
                        drawSymbol(
                            point.symbolLocations[0], shape, new Size(argsData.width, argsData.height),
                            marker.imageUrl, shapeOption, point.x.toString() + ':' + point.yValue.toString()
                        )
                    );
                    point.regions.push(new Rect(
                        point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height,
                        2 * marker.width, 2 * marker.height
                    ));
                }
            }
        }
    }
    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    public doAnimation(series: Series): void {
        let duration: number = series.animation.duration;
        let delay: number = series.animation.delay;
        let rectElements: HTMLCollection = <HTMLCollection>series.seriesElement.childNodes;
        let count: number = 1;
        for (let point of series.points) {
            if (!point.symbolLocations.length || !rectElements[count]) {
                continue;
            }
            markerAnimate(
                <HTMLElement>rectElements[count], delay, duration, series,
                point.index, point.symbolLocations[0], false
            );
            count++;
        }
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'ScatterSeries';
    }

    /**
     * To destroy the scatter. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method calling here
         */
    }

}