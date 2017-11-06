import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { MarkerSettingsModel, } from '../series/chart-series-model';
import { IPointRenderEventArgs } from '../../common/model/interface';
import { pointRender } from '../../common/model/constants';
import { Axis } from '../../chart/axis/axis';

/**
 * Bubble Module used to render the Bubble series.
 */

export class BubbleSeries {

    /**
     * Render the Bubble series.
     * @return {void}
     * @private
     */

    public render(series: Series, xAxis: Axis, yAxis: Axis, isInverted: boolean): void {
        let marker: MarkerSettingsModel = series.marker;
        let visiblePoints: Points[] = series.points;
        let shapeOption: PathOption;
        let argsData: IPointRenderEventArgs;
        //let bubbleMode: RadiusMode = bubbleOptions.radiusMode;
        let segmentRadius: number; let radius: number;
        let value: number = Math.max(series.chart.initialClipRect.height, series.chart.initialClipRect.width);
        let percentChange: number = value / 100;
        let maxRadius: number = series.maxRadius * percentChange;
        let minRadius: number = series.minRadius * percentChange;
        let maximumSize: number = null;
        let maxValue: number = null;
        if ((series.maxRadius === null || series.minRadius === null)) {
            for (let value of series.chart.visibleSeries) {
                if (value.type === 'Bubble' && value.visible === true && (value.maxRadius === null || value.minRadius === null)) {
                    maximumSize = value.sizeMax > maximumSize ? value.sizeMax : maximumSize;
                }
            }
            maxValue = (value / 5) / 2;
            minRadius = maxRadius = 1;
            radius = maxValue * maxRadius;
        } else {
            maximumSize = series.sizeMax;
            radius = maxRadius - minRadius;
        }

        for (let bubblePoint of visiblePoints) {
            bubblePoint.symbolLocations = [];
            bubblePoint.regions = [];
            if (bubblePoint.visible &&
                withInRange(visiblePoints[bubblePoint.index - 1], bubblePoint, visiblePoints[bubblePoint.index + 1], series)) {
                bubblePoint.symbolLocations.push(getPoint(bubblePoint.xValue, bubblePoint.yValue, xAxis, yAxis, isInverted));
                if ((series.maxRadius === null || series.minRadius === null)) {
                    segmentRadius = radius * Math.abs(+bubblePoint.size / maximumSize);
                } else {
                    segmentRadius = minRadius + radius * Math.abs(+bubblePoint.size / maximumSize);
                }

                segmentRadius = segmentRadius || minRadius;

                argsData = {
                    cancel: false, name: pointRender, series: series, point: bubblePoint,
                    fill: series.setPointColor(bubblePoint, series.interior),
                    border: series.setBorderColor(bubblePoint, { width: series.border.width, color: series.border.color }),
                    height: 2 * segmentRadius, width: 2 * segmentRadius
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    bubblePoint.color = argsData.fill;
                    shapeOption = new PathOption(
                        series.chart.element.id + '_Series_' + series.index + '_Point_' + bubblePoint.index,
                        argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null
                    );
                    series.seriesElement.appendChild(
                        drawSymbol(
                            bubblePoint.symbolLocations[0], 'Circle', new Size(argsData.width, argsData.height),
                            marker.imageUrl, shapeOption, bubblePoint.x.toString() + ':' + bubblePoint.yValue.toString()
                        )
                    );
                    bubblePoint.regions.push(
                        new Rect(
                            bubblePoint.symbolLocations[0].x - segmentRadius,
                            bubblePoint.symbolLocations[0].y - segmentRadius,
                            2 * segmentRadius, 2 * segmentRadius
                        )
                    );
                }
            }
        }
    }


    /**
     * To destroy the Bubble.
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
        return 'BubbleSeries';
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
        for (let bubblePoint of series.points) {
            if (!bubblePoint.symbolLocations.length) {
                continue;
            }
            markerAnimate(
                <HTMLElement>rectElements[count], delay, duration,
                series, bubblePoint.index, bubblePoint.symbolLocations[0], false
            );
            count++;
        }
    }

}