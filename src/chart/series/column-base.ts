import { Animation, AnimationOptions } from '@syncfusion/ej2-base';
import { DoubleRange } from '../utils/double-range';
import { Rect, ChartLocation, valueToCoefficient, getMinPointsDelta, PathOption, logBase } from '../../common/utils/helper';
import { getAnimationFunction } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Column, Row } from '../axis/axis';
import { Series, Points } from './chart-series';
import { AnimationModel } from '../../common/model/base-model';
import { IPointRenderEventArgs } from '../../common/model/interface';
import { pointRender } from '../../common/model/constants';


/**
 * Column Series Base
 */

export class ColumnBase {

    /**
     * To get the position of the column series.
     * @return {DoubleRange}
     * @private
     */
    protected getSideBySideInfo(series: Series): DoubleRange {
        if (!series.position) {
            this.getSideBySidePositions(series);
        }
        series.isRectSeries = true;
        let visibleSeries: Series[] = series.chart.visibleSeries;
        let seriesSpacing: number = 0; // Column Spacing
        let pointSpacing: number = 0.7; // Column width
        let minimumPointDelta: number = getMinPointsDelta(series.xAxis, visibleSeries);
        let width: number = minimumPointDelta * pointSpacing;
        let radius: number;
        let location: number = (series.position) / series.rectCount - 0.5;
        let doubleRange: DoubleRange = new DoubleRange(location, location + (1 / series.rectCount));
        if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
            doubleRange = new DoubleRange(doubleRange.start * width, doubleRange.end * width);
            radius = (seriesSpacing) * (doubleRange.start - doubleRange.end);
            doubleRange = new DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
        }
        return doubleRange;
    }
    /**
     * To get the rect values.
     * @return {Rect}
     * @private
     */
    protected getRectangle(x1: number, y1: number, x2: number, y2: number, series: Series): Rect {
        let point1: ChartLocation = this.getPointOrigin(x1, y1, series);
        let point2: ChartLocation = this.getPointOrigin(x2, y2, series);
        return new Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y),
                        Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
    }
    /**
     * @return {Location}
     * @private
     */
    protected getPointOrigin(x: number, y: number, series: Series): ChartLocation {
        if (series.chart.requireInvertedAxis) {
            x = (series.yAxis.valueType === 'Logarithmic' ? logBase(x === 0 ? 1 : x, series.yAxis.logBase) : x);
            y = (series.xAxis.valueType === 'Logarithmic' ? logBase(y, series.xAxis.logBase) : y);
            return new ChartLocation((valueToCoefficient(x, series.yAxis)) * series.yAxis.rect.width,
                                     (1 - valueToCoefficient(y, series.xAxis)) * series.xAxis.rect.height);
        } else {
            x = (series.xAxis.valueType === 'Logarithmic' ? logBase(x, series.xAxis.logBase) : x);
            y = (series.yAxis.valueType === 'Logarithmic' ? logBase(y === 0 ? 1 : y, series.yAxis.logBase) : y);
            return new ChartLocation((valueToCoefficient(x, series.xAxis)) * series.xAxis.rect.width,
                                     (1 - valueToCoefficient(y, series.yAxis)) * series.yAxis.rect.height);
        }
    }
    /**
     * To get the position of each series.
     * @return {void}
     * @private
     */
    private getSideBySidePositions(series: Series): void {
        let chart: Chart = series.chart;
        let seriesCollection: Series[] = [];
        for (let columnItem of chart.columns) {
               for (let item of chart.rows) {
                 this.findRectPosition(series.findSeriesCollection(<Column>columnItem, <Row>item, false));
            }
        }
    }
    private findRectPosition(seriesCollection : Series[]) : void {
        let stackingGroup: string[] = [];
        let vSeries: RectPosition = {rectCount : 0, position : null};
        seriesCollection.forEach((value: Series) => {
            if (value.type.indexOf('Stacking') !== -1) {
                if (value.stackingGroup) {
                    if (stackingGroup[value.stackingGroup] === undefined) {
                        value.position = vSeries.rectCount;
                        stackingGroup[value.stackingGroup] = vSeries.rectCount++;
                    } else {
                        value.position = stackingGroup[value.stackingGroup];
                    }
                } else {
                    if (vSeries.position === null) {
                        value.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    } else {
                        value.position = vSeries.position;
                    }
                }
            } else {
                value.position = vSeries.rectCount++;
            }
        });
        seriesCollection.forEach((value: Series) => {
            value.rectCount = vSeries.rectCount;
        });
    }
    /**
     * Update the region for the point.
     * @return {void}
     * @private
     */
    protected updateXRegion(point: Points, rect: Rect, series: Series): void {
        point.region = rect;
        point.symbolLocation = {
            x: rect.x + (rect.width) / 2,
            y: ((series.seriesType === 'HighLow' && series.yAxis.isInversed) || (point.yValue < 0 !== series.yAxis.isInversed)) ?
                 rect.y + rect.height : rect.y
        };
    }
    /**
     * Update the region for the point in bar series.
     * @return {void}
     * @private
     */
    protected updateYRegion(point: Points, rect: Rect, series: Series): void {
        point.region = new Rect(rect.x, rect.y, rect.width, rect.height);
        point.symbolLocation = {
            x: point.yValue < 0 !== series.yAxis.isInversed ? rect.x : rect.x + rect.width,
            y: rect.y + rect.height / 2
        };
    }

    /**
     * To trigger the point rendering event.
     * @return {void}
     * @private
     */
    protected triggerEvent(chart: Chart, series: Series, point: Points): IPointRenderEventArgs {
        let argsData: IPointRenderEventArgs = {
            cancel: false, name: pointRender, series: series, point: point, fill: series.interior, border: series.border
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    }
    /**
     * To draw the rectangle for points.
     * @return {void}
     * @private
     */
    protected drawRectangle(series: Series, point: Points, rect: Rect, argsData: IPointRenderEventArgs): void {
        let check: number = series.chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        let direction: string = ('M' + ' ' + (rect.x) + ' ' + (rect.y + rect.height) + ' ' +
            'L' + ' ' + (rect.x) + ' ' + (rect.y) + ' ' +
            'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y) + ' ' +
            'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + 'Z');
        let options: PathOption = new PathOption(
            series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index,
            argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
        let element: HTMLElement = series.chart.renderer.drawPath(options) as HTMLElement;
        switch (series.seriesType) {
            case 'XY':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.y.toString());
                break;
            case 'HighLow':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString() + ':' + point.low.toString());
                break;
        }
        series.seriesElement.appendChild(element);
    }
    /**
     * To animate the series.
     * @return {void}
     * @private
     */
    protected animate(series: Series): void {
        let rectElements: HTMLCollection = <HTMLCollection>series.seriesElement.childNodes;
        let count: number = 1;
        for (let point of series.points) {
            if (!point.symbolLocation) {
                continue;
            }
            this.animateRect(<HTMLElement>rectElements[count], series, point);
            count++;
        }
    }
    /**
     * To animate the series.
     * @return {void}
     * @private
     */
    private animateRect(element: HTMLElement, series: Series, point: Points): void {
        let option: AnimationModel = series.animation;
        let effect: Function = getAnimationFunction('Linear');
        let isPlot: boolean = point.yValue < 0;
        let x: number;
        let y: number;
        let elementHeight: number = +point.region.height;
        let elementWidth: number = +point.region.width;
        let centerX: number;
        let centerY: number;
        if (!series.chart.requireInvertedAxis) {
            x = +point.region.x;
            if (series.type === 'StackingColumn' || series.type === 'StackingColumn100') {
                y = (1 - valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                centerX = x;
                centerY = y;
            } else {
                y = +point.region.y;
                centerY = (series.seriesType === 'HighLow') ? y + elementHeight / 2 :
                                                             (isPlot !== series.yAxis.isInversed) ? y : y + elementHeight;
                centerX = isPlot ? x : x + elementWidth;
            }
        } else {
            y = +point.region.y;
            if (series.type === 'StackingBar' || series.type === 'StackingBar100') {
                x = (valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                centerX = x;
                centerY = y;
            } else {
                x = +point.region.x;
                centerY = isPlot ? y : y + elementHeight;
                centerX = isPlot !== series.yAxis.isInversed ? x + elementWidth : x;
            }
        }

        let value: number;
        element.style.visibility = 'hidden';
        new Animation({}).animate(element, {
            duration: option.duration,
            delay: option.delay,
            progress: (args: AnimationOptions): void => {
                if (args.timeStamp >= args.delay) {
                    element.style.visibility = 'visible';
                    if (!series.chart.requireInvertedAxis) {
                        elementHeight = elementHeight ? elementHeight : 1;
                        value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                        element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                            ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                    } else {
                        elementWidth = elementWidth ? elementWidth : 1;
                        value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                        element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                            ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                    }
                }
            },
            end: (model: AnimationOptions) => {
                element.setAttribute('transform', 'translate(0,0)');
                if ((point.index === series.points.length - 1)) {
                    series.chart.trigger('animationComplete', { series: series });
                }
            }
        });
    }

}
export interface RectPosition {
    position : number;
    rectCount : number;
}