import { Rect, PathOption } from '../../common/utils/helper';
import { VisibleRangeModel } from '../axis/axis';
import { Series, Points } from './chart-series';
import { AnimationModel } from '../../common/model/base-model';
import { Animation, AnimationOptions } from '@syncfusion/ej2-base';


/**
 * render Line series
 */

export class LineBase {
    /**
     * To improve the chart performance. 
     * @return {void}
     * @private
     */
    public improveChartPerformance(series: Series): Points[] {
        let tempPoints: Points[] = [];
        let xVisibleRange: VisibleRangeModel = series.xAxis.visibleRange;
        let yVisibleRange: VisibleRangeModel = series.yAxis.visibleRange;
        let seriesPoints: Points[] = <Points[]>series.points;
        let areaBounds: Rect = series.clipRect;
        let xTolerance: number = Math.abs(xVisibleRange.delta / areaBounds.width);
        let yTolerance: number = Math.abs(yVisibleRange.delta / areaBounds.height);
        let prevXValue: number = (seriesPoints[0] && seriesPoints[0].x > xTolerance) ? 0 : xTolerance;
        let prevYValue: number = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
        let xVal: number = 0;
        let yVal: number = 0;
        let currentPoint: Points;
        for (let currentPoint of seriesPoints) {
            currentPoint.symbolLocation = null;
            xVal = currentPoint.xValue ? currentPoint.xValue : xVisibleRange.min;
            yVal = currentPoint.yValue ? currentPoint.yValue : yVisibleRange.min;
            if (Math.abs(prevXValue - xVal) >= xTolerance || Math.abs(prevYValue - yVal) >= yTolerance) {
                tempPoints.push(currentPoint);
                prevXValue = xVal;
                prevYValue = yVal;
            }
        }
        return tempPoints;
    }
    /**
     * To append the line path. 
     * @return {void}
     * @private
     */
    public appendLinePath(options: PathOption, series: Series): void {
        let htmlObject: HTMLElement = series.chart.renderer.drawPath(options) as HTMLElement;
        series.pathElement = htmlObject;
        series.seriesElement.appendChild(htmlObject);
        series.isRectSeries = false;
    }

    /**
     * To render the marker for the series. 
     * @return {void}
     * @private
     */
    public renderMarker(series: Series): void {
        if (series.marker.visible) {
            series.chart.markerModule.render(series);
        }
    }
    /**
     * To do the progressive animation. 
     * @return {void}
     * @private
     */
     public doProgressiveAnimation(series: Series, option : AnimationModel): void {
        let animation: Animation = new Animation({});
        let path: HTMLElement = <HTMLElement>series.pathElement;
        let strokeDashArray: string = path.getAttribute('stroke-dasharray');
        let pathLength: number = (<SVGPathElement>series.pathElement).getTotalLength();
        let currentTime: number;
        path.style.visibility = 'hidden';
        animation.animate(path, {
            duration: option.duration,
            delay: option.delay,
            progress: (args: AnimationOptions): void => {
                if (args.timeStamp >= args.delay) {
                    path.style.visibility = 'visible';
                    currentTime = Math.abs(Math.round(((args.timeStamp - args.delay) * pathLength) / args.duration));
                    path.setAttribute('stroke-dasharray', currentTime + ',' + pathLength);
                }
            },
            end: (model: AnimationOptions) => {
                path.setAttribute('stroke-dasharray', strokeDashArray);
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    }
    /**
     * To do the linear animation. 
     * @return {void}
     * @private
     */
    public doLinearAnimation(series: Series, animation : AnimationModel): void {
        let clipRect: HTMLElement = <HTMLElement>series.clipRectElement.childNodes[0].childNodes[0];
        let eleWidth: number = +clipRect.getAttribute('width');
        let width: number = 0;
        clipRect.setAttribute('width', '0');
        new Animation({}).animate(clipRect, {
            delay: animation.delay,
            duration: animation.duration,
            progress: (args: AnimationOptions): void => {
                if (args.timeStamp >= args.delay) {
                    width = ((args.timeStamp - args.delay) / args.duration) * eleWidth;
                    clipRect.setAttribute('width', width.toString());
                }
            },
            end: (model: AnimationOptions) => {
                clipRect.setAttribute('width', eleWidth.toString());
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    }
}