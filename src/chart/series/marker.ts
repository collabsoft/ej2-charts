import { drawSymbol, PathOption, Size, markerAnimate } from '../utils/helper';
import { Chart } from '../chart';
import { BorderModel } from '../model/base-model';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { Series } from './chart-series';
import { IPointRenderEventArgs } from '../model/interface';
import { pointRender } from '../model/constants';

/**
 * Marker Module used to render the marker for line type series.
 */
export class Marker {
    private chart: Chart;
    private elementId: string;

    /**
     * Constructor for the marker module.
     * @private
     */

    constructor(chart: Chart) {
        this.chart = chart;
        this.elementId = chart.element.id;
    }

    /**
     * Render the marker for series.
     * @return {void}
     * @private
     */

    public render(series: Series): void {
        let seriesIndex: number = series.index;
        let marker: MarkerSettingsModel = series.marker;
        let border: BorderModel = marker.border;
        let shape: string = marker.shape;
        let symbolId: string;
        let shapeOption: PathOption;
        let fill: string = marker.fill || series.interior;
        let argsData: IPointRenderEventArgs;
        for (let point of series.points) {
            if (point.visible && point.symbolLocation) {
                border.color = border.color || fill;
                symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol';
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point, fill: fill, border: border, height :  marker.height,
                     width : marker.width
                };
                this.chart.trigger(pointRender, argsData);
                point.color = argsData.fill;
                if (!argsData.cancel) {
                    shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width,
                                                 argsData.border.color, marker.opacity, null);
                    series.symbolElement.appendChild(drawSymbol(point.symbolLocation, shape, new Size(argsData.width, argsData.height),
                                                                marker.imageUrl, shapeOption,
                                                                point.x.toString() + ':' + point.y.toString()));
                } else {
                    point.symbolLocation = null;
                }
            }
        }
    }

    /**
     * Animates the marker.
     * @return {void}.
     * @private
     */
    public doMarkerAnimation(series: Series): void {
        if (!(series.type.indexOf('Column') > -1 || series.type.indexOf('Bar') > -1 || series.type === 'Scatter')) {
            let markerElements: HTMLCollection = <HTMLCollection>series.symbolElement.childNodes;
            let delay: number = series.animation.delay + series.animation.duration;
            let j: number = 1;
            for (let i: number = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocation) {
                    continue;
                }
                markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocation, false);
                j++;
            }
        }
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns te module name
         */
        return 'Marker';
    }

    /**
     * To destroy the marker. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}