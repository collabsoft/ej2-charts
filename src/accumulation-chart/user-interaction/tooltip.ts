/**
 * AccumulationChart Tooltip file
 */
import { Browser, AnimationOptions, Animation} from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';

import { AccPoints, AccumulationSeries, getSeriesFromIndex } from '../model/acc-base';
import { AccumulationChart } from '../accumulation';
import { TooltipSettingsModel } from '../../common/model/base-model';
import { Index } from '../../common/model/base';
import {
         getElement, AccPointData, withInBounds,
         Rect, ChartLocation, PathOption, drawSymbol, Size, indexFinder
       } from '../../common/utils/helper';
import { BaseTooltip, Side} from '../../common/user-interaction/tooltip';

/**
 * `AccumulationTooltip` module is used to render tooltip for accumulation chart.
 */
export class AccumulationTooltip extends BaseTooltip {
    public accumulation: AccumulationChart;
    constructor(accumulation: AccumulationChart) {
        super(accumulation);
        this.accumulation = accumulation;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    private addEventListener(): void {
        if (this.accumulation.isDestroyed) { return; }
        this.accumulation.on(Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseLeaveHandler, this);
        this.accumulation.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.accumulation.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }

    private mouseLeaveHandler(e: PointerEvent): void {
          this.removeTooltip(1000);
    }

    private mouseUpHandler(e: PointerEvent | TouchEvent): void {
        let control: AccumulationChart = this.accumulation;
        if (control.tooltip.enable && control.isTouch && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
            this.removeTooltip(2000);
        }
    }


    private mouseMoveHandler(e: PointerEvent | TouchEvent): void {
        let control: AccumulationChart = this.accumulation;
        // Tooltip for chart series.    
        if (control.tooltip.enable && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
        }
    }



    /**
     * Renders the tooltip.
     * @param  {PointerEvent} event - Mouse move event.
     * @return {void}
     */
    public tooltip(event: PointerEvent | TouchEvent): void {
        let isTooltip: HTMLElement = this.getElement(this.element.id + '_tooltip');
        let tooltipDiv: HTMLDivElement = this.getTooltipElement(isTooltip);
        this.renderSeriesTooltip(event, this.accumulation, !isTooltip, tooltipDiv);
    }

    private renderSeriesTooltip(e: PointerEvent | TouchEvent, chart : AccumulationChart, isFirst: boolean,
                                tooltipDiv: HTMLDivElement) : void {
        let data: AccPointData = this.getPieData(e, chart, chart.mouseX, chart.mouseY);
        let rect : Rect = chart.initialClipRect;
        this.currentPoints = [];
        let markerSide : Side;
        if (data.point && (!this.previousPoints[0] || (this.previousPoints[0].point !== data.point))) {
            if (this.pushData(data, isFirst, tooltipDiv, false)) {
                let text : string =  this.getTooltipText(data, chart.tooltip);
                if (!chart.tooltip.template) {
                    if (this.header !== '') {
                       this.findHeader(data);
                    }
                    markerSide = this.renderTooltip(data, rect, data.point.symbolLocation, text, isFirst, false);
                    if (markerSide) {
                        this.drawMarker(markerSide.isBottom, 10);
                    }
                } else {
                   this.renderTemplate(data, rect, data.point.symbolLocation, this.getTemplateText(data), isFirst);
                }
                this.isRemove = true;
            }
            this.previousPoints = <AccPointData[]>extend([], this.currentPoints, null, true);
        } else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(1000);
                this.isRemove = false;
            }
        }
    }

    private drawMarker(isBottom: boolean,  size: number): void {
        let count: number = 0;
        let shapeOption: PathOption;
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        let markerGroup: HTMLElement = <HTMLElement>this.chart.renderer.createGroup({ id: this.element.id + '_tooltip_trackball_group' });
        let x: number = (this.padding * 2) + (size / 2);
        let y : number;
        let series: AccumulationSeries;
        for (let data of (<AccPointData[]>this.currentPoints)) {
            series = data.series;
            y = this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : 0);
            shapeOption = new PathOption(this.element.id + '_Tooltip_Trackball_' + series.index, data.point.color, 1, '#cccccc',
                                         series.opacity, null);
            markerGroup.appendChild(drawSymbol(new ChartLocation(x, y), 'Circle', new Size(size, size), null, shapeOption, null));
            count++;
        }
        groupElement.appendChild(markerGroup);
    }
    private getPieData(e: PointerEvent | TouchEvent, chart: AccumulationChart, x: number, y: number) : AccPointData {
        let target: Element = e.target as Element;
        let id: Index = indexFinder(target.id, true);
        if (!isNaN(id.series)) {
            let seriesIndex: number = id.series;
            let pointIndex: number = id.point;
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                let series: AccumulationSeries = this.getSeriesFromIndex(seriesIndex, chart.visibleSeries);
                if (series.enableTooltip) {
                    return new AccPointData(series.points[pointIndex], series);
                }
            }
        }
        return new AccPointData(null, null);
    }

    /**
     * To get series from index
     */
    private getSeriesFromIndex(index: number, visibleSeries: AccumulationSeries[]): AccumulationSeries {
        return <AccumulationSeries>visibleSeries[0];
    }

    private getTemplateText(data : AccPointData) : AccPoints {
        let point: AccPoints = extend({}, data.point) as AccPoints;
        return point;
    }

    private getTooltipText(data : AccPointData, tooltip: TooltipSettingsModel) : string {
        let series: AccumulationSeries = data.series;
        let format: string = tooltip.format ? tooltip.format : '${point.x} : <b>${point.y}</b>';
        return this.parseTemplate(data.point, series, format);
    }

    private findHeader(data : AccPointData) : void {
        this.header = this.parseTemplate(data.point, data.series, this.header);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            this.formattedText = this.formattedText.concat(this.header);
        }
    }

    private parseTemplate(point : AccPoints, series : AccumulationSeries, format : string) : string {
        let value: RegExp;
        let textValue: string;
        for (let dataValue of Object.keys(point)) {
            value = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }

        for (let dataValue of Object.keys(Object.getPrototypeOf(series))) {
            value = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    }

    /**
     * Removes the tooltip on mouse leave.
     * @return {void}
     * @private
     */

    public removeTooltip(duration: number): void {
        let chart: AccumulationChart = <AccumulationChart>this.control;
        let tooltipElement: HTMLElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            let data: AccPointData[] = <AccPointData[]>this.previousPoints;
            this.toolTipInterval = setTimeout(
                (): void => {
                    let series: AccumulationSeries = data[0].series;
                    let tooltipGroup: HTMLElement = tooltipElement.firstChild as HTMLElement;
                    let opacity: number = parseFloat(tooltipGroup.getAttribute('opacity')) || 1;
                    let element: HTMLElement = this.getElement(chart.element.id + '_Series_' + data[0].series.index
                        + '_Point_' + data[0].point.index);
                    let rectOpacity: number;
                    if (element) {
                        rectOpacity = parseFloat(element.getAttribute('opacity'));
                    }
                    new Animation({}).animate(tooltipGroup, {
                        duration: 200,
                        progress: (args: AnimationOptions): void => {
                            this.progressAnimation(element, tooltipGroup, series, opacity, rectOpacity,
                                                   (args.timeStamp / args.duration), series.isRectSeries, false);
                        },
                        end: (model: AnimationOptions) => {
                            this.previousPoints = [];
                            this.endAnimation(element, tooltipGroup, series, false);
                        }
                    });
                },
                duration);
        }
    }
    /**
     * Get module name
     */
    protected getModuleName(): string {
        return 'AccumulationTooltip';
    }
    /**
     * To destroy the Tooltip. 
     * @return {void}
     * @private
     */
    public destroy(chart: AccumulationChart): void {
        /**
         * Destroy method calling here
         */
    }
}