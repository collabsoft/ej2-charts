/**
 * AccumulationChart Tooltip file
 */
import { compile as templateComplier } from '@syncfusion/ej2-base';
import { createElement, setStyleAttribute } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';
import { AccPoints, AccumulationSeries, getSeriesFromIndex } from '../model/acc-base';
import { IAccTooltipRenderEventArgs } from '../model/pie-interface';
import { AccumulationChart } from '../accumulation';
import { getElement } from '../../common/utils/helper';
import { AccumulationTooltipSettingsModel } from '../model/acc-base-model';
import { FontModel } from '../../common/model/base-model';
import { tooltipRender } from '../../common/model/constants';
export class AccumulationTooltip {
    public accumulation: AccumulationChart;
    private templateFn: Function;
    public tooltip: Tooltip;
    private tooltipOption: AccumulationTooltipSettingsModel;
    private targetId: string;
    private tooltipIndex: string;
    private currentPoint: AccPoints;
    private clearTooltip: number;
    constructor(accumulation: AccumulationChart) {
        this.accumulation = accumulation;
        this.tooltipOption = accumulation.tooltip;
        this.targetId = accumulation.element.id + '_pie_tooltip';
        let targetElement: HTMLDivElement = <HTMLDivElement>createElement('div', {
            id: this.targetId,
            styles: 'position: absolute;background: transparent;height: 2px;width: 2px;'
        });
        accumulation.element.appendChild(targetElement);
        this.tooltip = new Tooltip({
            opensOn: 'custom',
            beforeOpen: this.tooltipCustomization.bind(this),
            openDelay: 0,
            closeDelay: 1000
        });
        this.tooltip.appendTo(accumulation.element);
    }
    /**
     * To set template function for toooltip
     */
    private setTemplateFunction(template: string): void {
        let e: Object;
        try {
            if (document.querySelectorAll(template).length) {
                this.templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
            }
        } catch (e) {
            this.templateFn = templateComplier(template);
        }
    }
    /**
     * To render the tooltip for the point
     * @private
     */
    public renderTooltip(point: AccPoints, seriesIndex: number): void {
        let element: Element = getElement(this.targetId);
        if (element && (element.getAttribute('data-tooltip-id') === null) ||
            this.tooltipIndex !== 'series_' + seriesIndex + '_point_' + point.index) {
            this.updatePosition(
                this.targetId, point.symbolLocation.x, point.symbolLocation.y,
                this.accumulation.element.id + '_Series_0_Point_' + point.index);
            this.setTemplateFunction(this.tooltipOption.template);
            this.currentPoint = point;
            this.tooltip.content = this.getTooltipContent(point, seriesIndex);
            this.tooltip.open(getElement(this.targetId) as HTMLElement);
            this.tooltipIndex = 'series_' + seriesIndex + '_point_' + point.index;
        }
    }
    /**
     * To remove accumulation chart tooltip with animation
     * @private
     */
    public fadeOutTooltip(): void {
        clearTimeout(this.clearTooltip);
        this.removeTooltip = this.removeTooltip.bind(this);
        this.clearTooltip = setTimeout(this.removeTooltip, 500);
    }
    /**
     * To remove accumulation chart tooltip element
     * @private
     */
    public removeTooltip(): void {
        if (this.tooltip) {
            this.tooltip.close();
        }
    }
    /**
     * To get accumulation chart point tooltip content
     */
    private getTooltipContent(point: AccPoints, seriesIndex: number): HTMLElement | string {
        if (this.tooltipOption.template && this.templateFn) {
            let templates: HTMLCollection = this.templateFn(point);
            let element: HTMLElement = createElement('div');
            while (templates.length > 0) {
                element.appendChild(templates[0]);
            }
            return element;
        } else {
            return this.getTooltipText(point, this.tooltipOption, seriesIndex);
        }
    }
    /**
     * To customize the accumulation chart tooltip
     */
    private tooltipCustomization(args: TooltipEventArgs): void {
        let argsData: IAccTooltipRenderEventArgs = {
            cancel: false, name: tooltipRender,
            content: this.tooltip.content,
            textStyle: this.tooltipOption.textStyle,
            series: this.accumulation.visibleSeries[0],
            point: this.currentPoint
        };
        this.accumulation.trigger(tooltipRender, argsData);
        args.cancel = argsData.cancel;
        this.tooltip.content = argsData.content;
        this.tooltipOption.textStyle = argsData.textStyle;
        let content: HTMLElement = document.getElementsByClassName('e-tooltip-wrap')[0] as HTMLElement;
        let font: FontModel = this.tooltipOption.textStyle;
        let position: string[] = this.tooltip.position.split(' ');
        let borderColor: string = this.tooltipOption.border.color || this.currentPoint.color;
        let pointerSize: number = 8;
        let outerWidth: string;
        let innerWidth: string;
        args.element.classList.remove('e-popup-close');
        args.element.classList.add('e-popup-open');
        let arrowEle: Element = args.element.querySelector('.e-arrow-tip');
        let borderWidth: number = this.tooltipOption.border.width;
        setStyleAttribute(args.element, {
            'backgroundColor': this.tooltipOption.fill, 'borderColor': borderColor,
            'borderWidth': borderWidth, 'borderRadius': '5px', 'pointer-events': 'none'
        });
        setStyleAttribute(args.element.querySelector('.e-tip-content') as HTMLElement, {
            'color': font.color || '#000000', 'fontFamily': font.fontFamily, 'fontSize': font.size,
            'fontWeight': font.fontWeight, 'opacity': font.opacity.toString(), 'fontStyle': font.fontStyle
        });

        pointerSize = (args.element.querySelector('.e-arrow-tip') as HTMLElement).offsetHeight;
        outerWidth = pointerSize + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-outer') as HTMLElement, {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': outerWidth, 'borderRightWidth': outerWidth, 'borderBottomWidth': outerWidth,
            'borderTopColor': borderColor,
        });
        innerWidth = (pointerSize - borderWidth) + 'px';
        setStyleAttribute(args.element.querySelector('.e-arrow-tip-inner') as HTMLElement, {
            'borderRightColor': 'transparent', 'borderLeftColor': 'transparent', 'borderBottomColor': borderColor,
            'borderLeftWidth': innerWidth, 'borderRightWidth': innerWidth, 'borderBottomWidth': innerWidth,
            'left': borderWidth, 'top': 0, 'borderTopColor': this.tooltipOption.fill
        });

        setStyleAttribute(args.element, {
            'display': 'block', 'transitionProperty': 'left,top',
            'transitionDuration': this.tooltipOption.enableAnimation ? '500ms' : '0ms'
        });
        this.tooltip.dataBind();
    }
    /**
     * To update the tooltip element position
     * @private
     */
    public updatePosition(id: string, x: number, y: number, pointId: string): void {
        let pointElement: HTMLElement = <HTMLElement>getElement(pointId);
        let translate: string = pointElement.getAttribute('transform');
        if (!isNullOrUndefined(translate) && translate !== '') {
            translate = translate.replace('translate(', '');
            translate = translate.replace(')', '');
            let tx: number = parseInt(translate.split(',')[0], 10);
            let ty: number = parseInt(translate.split(',')[1], 10);
            x = !isNaN(tx) ? tx + x : x;
            y = !isNaN(ty) ? ty + y : y;
        }
        let tooltip: HTMLElement = getElement(id) as HTMLElement;
        if (tooltip) {
            tooltip.style.top = y + 'px';
            tooltip.style.left = x + 'px';
        } else {
            tooltip = createElement('div', {
                id: id,
                styles: 'position:absolute;left:' + x + 'px;top:' + y +
                'px;width:2px;height:2px;background:transparent'
            });
            getElement(this.accumulation.element.id + '_Secondary_Element').appendChild(tooltip);
        }
    }
    /**
     * To get accumulation chart tooltip text from format.
     */
    private getTooltipText(point: AccPoints, tooltip: AccumulationTooltipSettingsModel, seriesIndex: number): string {
        let format: string = tooltip.format ? tooltip.format : '${point.x} : ${point.y}';
        let series: AccumulationSeries = getSeriesFromIndex(seriesIndex, this.accumulation.visibleSeries);
        return this.parseTemplate(point, format, series);
    }
    /**
     * To parse the tooltip template
     */
    private parseTemplate(point: AccPoints, format: string, series: AccumulationSeries): string {
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
     * Get module name
     */
    protected getModuleName(): string {
        return 'AccumulationTooltip';
    }
    /**
     * To destroy the Legend. 
     * @return {void}
     * @private
     */
    public destroy(chart: AccumulationChart): void {
        /**
         * Destroy method calling here
         */
    }
}