import { Chart } from '../chart';
import { AnimationOptions, Animation, Browser } from '@syncfusion/ej2-base';
import {
    measureText, findDirection, textElement, getValueXByPoint, stopTimer,
    getValueYByPoint, TextOption, Size, Rect, ChartLocation, PathOption, withInBounds,
    removeElement
} from '../../common/utils/helper';
import { Axis } from '../axis/axis';
import { CrosshairSettingsModel } from '../chart-model';


/**
 * Crosshair Module used to render the crosshair for chart.
 */
export class Crosshair {

    //Internal variables      
    private elementID: string;
    private elementSize: Size;
    private crosshairInterval: number;
    private arrowLocation: ChartLocation = new ChartLocation(0, 0);
    private isTop: boolean; private isBottom: boolean; private isLeft: boolean; private isRight: boolean;
    private valueX : number;
    private valueY : number;
    private rx : number = 2;
    private ry : number = 2;

    //Module declarations
     private chart: Chart;

    /**
     * Constructor for crosshair module.
     * @private
     */

    constructor(chart: Chart) {
        this.chart = chart;
        this.elementID = this.chart.element.id;
        this.addEventListener();
    }

    /**
     * @hidden
     */
    private addEventListener(): void {
        if (this.chart.isDestroyed) { return; }
        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);

    }

    private mouseUpHandler(): void {
        if (this.chart.startMove) {
            this.removeCrosshair(2000);
        }
    }

    private mouseLeaveHandler(): void {
        this.removeCrosshair(1000);
    }

    private mouseMoveHandler(): void {
        let chart: Chart = this.chart;
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip) {
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.startMove || !chart.isTouch ) {
                    this.crosshair();
                }
            } else {
                this.removeCrosshair(1000);
            }
        }
    }

    /**
     * Handles the long press on chart. 
     * @return {boolean}
     * @private
     */
    private longPress(): boolean {
        let chart : Chart = this.chart;
        if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            if (chart.startMove) {
                this.crosshair();
            }
        }
        return false;
    }

    /**
     * Renders the crosshair.
     * @return {void}
     * @private
     */
    public crosshair(): void {

        let chart: Chart = this.chart;
        let horizontalCross: string = '';
        let verticalCross: string = '';
        let options: PathOption;
        let crosshair: CrosshairSettingsModel = chart.crosshair;
        let chartRect : Rect = chart.chartAxisLayoutPanel.seriesClipRect;
        let crossGroup: HTMLElement = document.getElementById(this.elementID + '_UserInteraction');

        this.stopAnimation();

        if (chart.tooltip.enable && !withInBounds(chart.tooltipModule.valueX, chart.tooltipModule.valueY, chartRect)) {
           return null;
        }

        this.valueX = chart.tooltip.enable ? chart.tooltipModule.valueX :  chart.mouseX;
        this.valueY = chart.tooltip.enable ? chart.tooltipModule.valueY : chart.mouseY;

        crossGroup.setAttribute('opacity', '1');
        if (crosshair.lineType === 'Both' || crosshair.lineType === 'Horizontal') {
            horizontalCross += 'M ' + chartRect.x + ' ' + this.valueY +
                ' L ' + (chartRect.x + chartRect.width) + ' ' + this.valueY;
        }
        if (crosshair.lineType === 'Both' || crosshair.lineType === 'Vertical') {
            verticalCross += 'M ' + this.valueX + ' ' + chartRect.y +
                ' L ' + this.valueX + ' ' + (chartRect.y + chartRect.height);
        }

        if (crossGroup.childNodes.length === 0) {
            let axisTooltipGroup: Element = chart.renderer.createGroup({ 'id': this.elementID + '_crosshair_axis' });
            options = new PathOption(this.elementID + '_HorizontalLine', 'none', crosshair.line.width, crosshair.line.color, 1,
                                     null, horizontalCross);
            this.renderCrosshairLine(options, crossGroup);

            options.d = verticalCross; options.id = this.elementID + '_VerticalLine';
            this.renderCrosshairLine(options, crossGroup);

            crossGroup.appendChild(axisTooltipGroup);

            this.renderAxisTooltip(chart, chartRect, <Element>crossGroup.lastChild);

        } else {
            document.getElementById(this.elementID + '_HorizontalLine').setAttribute('d', horizontalCross);
            document.getElementById(this.elementID + '_VerticalLine').setAttribute('d', verticalCross);
            this.renderAxisTooltip(chart, chartRect, <Element>crossGroup.lastChild);
        }
    }

    private renderCrosshairLine(options: PathOption, crossGroup: HTMLElement): void {

        let htmlObject : HTMLElement = this.chart.renderer.drawPath(options) as HTMLElement;

        crossGroup.appendChild(htmlObject);
    }

    private renderAxisTooltip(chart: Chart, chartRect : Rect, axisGroup: Element): void {
        let axis: Axis; let text: string;
        let rect: Rect;
        let pathElement: Element;
        let textElem: Element;
        let options: TextOption;
        let padding: number = 5;
        let direction: string;
        for (let k: number = 0, length: number = chart.axisCollections.length; k < length; k++) {
            axis = chart.axisCollections[k];
            if (axis.crosshairTooltip.enable) {
                if ((this.valueX <= (axis.rect.x + axis.rect.width) && axis.rect.x <= this.valueX) ||
                  (this.valueY <= (axis.rect.y + axis.rect.height) && axis.rect.y <= this.valueY)) {
                    pathElement = document.getElementById(this.elementID + '_axis_tooltip_' + k);
                    textElem = document.getElementById(this.elementID + '_axis_tooltip_text_' + k);
                    text = this.getAxisText(axis);
                    if (!text) {
                        continue;
                    }
                    rect = this.tooltipLocation(text, axis, chartRect);
                    if (pathElement === null) {
                        pathElement = chart.renderer.drawPath({
                            'id': this.elementID + '_axis_tooltip_' + k,
                            'fill': axis.crosshairTooltip.fill
                        });
                        axisGroup.appendChild(pathElement);
                        options = new TextOption(this.elementID + '_axis_tooltip_text_' + k, 0, 0, 'start', text);
                        textElem = textElement(options, axis.crosshairTooltip.textStyle, axis.crosshairTooltip.textStyle.color, axisGroup);
                    }
                    direction = findDirection(
                        this.rx, this.ry, rect, this.arrowLocation, 10,
                        this.isTop, this.isBottom, this.isLeft, this.valueX, this.valueY
                    );
                    pathElement.setAttribute('d', direction);
                    textElem.textContent = text;
                    textElem.setAttribute('x', (rect.x + padding).toString());
                    textElem.setAttribute('y', (rect.y + padding + 3 * this.elementSize.height / 4).toString());
                } else {
                    removeElement(this.elementID + '_axis_tooltip_' + k);
                    removeElement(this.elementID + '_axis_tooltip_text_' + k);
                }
            }
        }
    }

    private getAxisText(axis: Axis): string {
        let value: number;
        this.isBottom = false; this.isTop = false; this.isLeft = false; this.isRight = false;
        let labelValue: number = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks')
            ? 0.5 : 0;
        if (axis.orientation === 'Horizontal') {
            value = getValueXByPoint(Math.abs(this.valueX - axis.rect.x), axis.rect.width, axis) + labelValue;
            this.isBottom = !axis.opposedPosition; this.isTop = axis.opposedPosition;
        } else {
            value = getValueYByPoint(Math.abs(this.valueY - axis.rect.y), axis.rect.height, axis) + labelValue;
            this.isRight = axis.opposedPosition; this.isLeft = !axis.opposedPosition;
        }
        if (axis.valueType === 'DateTime') {
            return axis.format(new Date(value));
        } else if (axis.valueType === 'Category') {
            return axis.labels[Math.floor(<number>value)];
        } else if (axis.valueType === 'Logarithmic') {
            return value = axis.format(Math.pow(axis.logBase, value));
        } else {
            let customLabelFormat: boolean = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            return customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(value)) : axis.format(value);
        }
    }



    private tooltipLocation(text: string, axis: Axis, bounds: Rect): Rect {

        let isBottom: boolean = false; let isLeft: boolean = false;
        let padding: number = 5; let arrowPadding: number = 10;
        let tooltipRect: Rect;
        let boundsX: number = bounds.x;
        let boundsY: number = bounds.y;

        this.elementSize = measureText(text, axis.crosshairTooltip.textStyle);

        if (axis.orientation === 'Horizontal') {
            this.arrowLocation = new ChartLocation(this.valueX, axis.rect.y);

            tooltipRect = new Rect(
                (this.valueX - (this.elementSize.width / 2) - padding), axis.rect.y + arrowPadding,
                this.elementSize.width + padding * 2, this.elementSize.height + padding * 2
            );
            if (axis.opposedPosition) {
                tooltipRect.y = axis.rect.y - (this.elementSize.height + padding * 2 + arrowPadding);
            }
            if (tooltipRect.x < boundsX) {
                tooltipRect.x = boundsX;
            }
            if (tooltipRect.x + tooltipRect.width > boundsX + bounds.width) {
                tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - (boundsX + bounds.width));
            }
            if (this.arrowLocation.x + arrowPadding / 2 > tooltipRect.x + tooltipRect.width - this.rx) {
                    this.arrowLocation.x = tooltipRect.x + tooltipRect.width - this.rx - arrowPadding / 2;
            }
            if (this.arrowLocation.x - arrowPadding / 2 < tooltipRect.x + this.rx) {
                  this.arrowLocation.x = tooltipRect.x + this.rx + arrowPadding / 2;
            }
        } else {
            this.arrowLocation = new ChartLocation(axis.rect.x, this.valueY);
            tooltipRect = new Rect(
                axis.rect.x - (this.elementSize.width) - (padding * 2 + arrowPadding),
                this.valueY - (this.elementSize.height / 2) - padding,
                this.elementSize.width + (padding * 2), this.elementSize.height + padding * 2
            );
            if (axis.opposedPosition) {
                tooltipRect.x = axis.rect.x + arrowPadding;
                if ((tooltipRect.x + tooltipRect.width) > this.chart.availableSize.width) {
                      this.arrowLocation.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                      tooltipRect.x -= ((tooltipRect.x + tooltipRect.width) - this.chart.availableSize.width);
                }
            } else {
                if (tooltipRect.x < 0 ) {
                      this.arrowLocation.x -= tooltipRect.x;
                      tooltipRect.x = 0;
                }
            }
            if (tooltipRect.y < boundsY) {
                tooltipRect.y = boundsY;
            }
            if (tooltipRect.y + tooltipRect.height >= boundsY + bounds.height) {
                tooltipRect.y -= ((tooltipRect.y + tooltipRect.height) - (boundsY + bounds.height));
            }
            if (this.arrowLocation.y + arrowPadding / 2 > tooltipRect.y + tooltipRect.height - this.ry) {
                this.arrowLocation.y = tooltipRect.y + tooltipRect.height - this.ry - arrowPadding / 2;
            }
            if (this.arrowLocation.y - arrowPadding / 2 < tooltipRect.y + this.ry) {
                  this.arrowLocation.y = tooltipRect.y + this.ry + arrowPadding / 2;
            }
        }
        return tooltipRect;
    }
    private stopAnimation() : void {
        stopTimer(this.crosshairInterval);
    }
    /**
     * Removes the crosshair on mouse leave.
     * @return {void}
     * @private
     */

    public removeCrosshair(duration: number): void {
        let chart: Chart = this.chart;
        let crosshair: HTMLElement = document.getElementById(this.elementID + '_UserInteraction');
        this.stopAnimation();
        if (crosshair && crosshair.getAttribute('opacity') !== '0') {
            this.crosshairInterval = setTimeout(
                (): void => {
                    new Animation({}).animate(crosshair, {
                        duration: 200,
                        progress: (args: AnimationOptions): void => {
                           // crosshair.removeAttribute('e-animate');
                            crosshair.style.animation = '';
                            crosshair.setAttribute('opacity', (1 - (args.timeStamp / args.duration)).toString());
                        },
                        end: (model: AnimationOptions): void => {
                            crosshair.setAttribute('opacity', '0');
                            chart.startMove = false;
                            if (chart.tooltipModule) {
                                chart.tooltipModule.valueX = null;
                                chart.tooltipModule.valueY = null;
                            }
                        }
                    });
                },
                duration);
        }
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name
         */
        return 'Crosshair';
    }
    /**
     * To destroy the crosshair. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}