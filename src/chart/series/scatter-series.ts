import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { BorderModel } from '../../common/model/base-model';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { IPointRenderEventArgs } from '../../common/model/interface';
import { pointRender } from '../../common/model/constants';

/**
 * Scatter Module used to render the scatter series.
 */

export class ScatterSeries extends LineBase {

    /**
     * Render the scatter series.
     * @return {void}
     * @private
     */

    public render(series: Series): void {
        let seriesIndex: number = series.index;
        let marker: MarkerSettingsModel = series.marker;
        let border: BorderModel = series.border;
        let shape: string = marker.shape;
        let visiblePoints: Points[] = this.improveChartPerformance(series);
        let pointIndex: number;
        let symbolId: string;
        let shapeOption: PathOption;
        let argsData: IPointRenderEventArgs;
        for (let point of visiblePoints) {
            point.symbolLocation = null;
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                point.symbolLocation = getPoint(point.xValue, point.yValue, series);
                symbolId = series.chart.element.id + '_Series_' + seriesIndex + '_Point_' + point.index;
                argsData = { cancel: false, name: pointRender, series: series, point: point, fill: series.interior,
                            border: border, height :  marker.height, width : marker.width
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    point.color = argsData.fill;
                    shapeOption = new PathOption(symbolId, argsData.fill,
                                                 argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(
                        drawSymbol(point.symbolLocation, shape, new Size(argsData.width, argsData.height),
                                   marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                    point.region = new Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height,
                                            2 * marker.width, 2 * marker.height);
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
            if (!point.symbolLocation) {
                continue;
            }
            markerAnimate(<HTMLElement>rectElements[count], delay, duration, series, point.index, point.symbolLocation, false);
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