import { Chart } from '../chart';
import { createElement } from '@syncfusion/ej2-base/dom';
import { extend } from '@syncfusion/ej2-base/util';
import { AnimationOptions, Animation, compile as templateComplier } from '@syncfusion/ej2-base';
import { measureText, withInBounds, TextOption, Size, Rect, PointData, ChartLocation, textElement, stopTimer } from '../utils/helper';
import {
    drawSymbol, getValueXByPoint, getValueYByPoint, findDirection,
    valueToCoefficient, TextCollection, PathOption, removeElement
} from '../utils/helper';
import { Axis } from '../axis/axis';
import { Series, Points } from '../series/chart-series';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { FontModel } from '../model/base-model';
import { ITooltipRenderEventArgs } from '../model/interface';
import { tooltipRender } from '../model/constants';


/**
 * Tooltip Module used to render the tooltip for series.
 */
export class Tooltip {
    //Internal variables
    private element: HTMLElement;
    private elementSize: Size;
    private textStyle: FontModel;
    private isRemove: boolean;
    private toolTipInterval: number;
    private padding: number = 5;
    private arrowPadding: number = 10;
    private textElements: Element[];
    private textCollection: TextCollection[];
    private templateFn: Function;
    private rx : number = 2;
    private ry : number = 2;
    private isComplete : boolean;

    //Module declarations
    private chart: Chart;
    /** @private */
    public valueX: number;
    /** @private */
    public valueY: number;
    /**
     * Constructor for tooltip module.
     * @private.
     */
    constructor(chart: Chart) {
        this.chart = chart;
        this.element = this.chart.element;
        this.textStyle = chart.tooltip.textStyle;
    }
    /**
     * Renders the tooltip.
     * @return {void}
     * @private
     */
    public tooltip(): void {
        let isTooltip: HTMLElement = this.getElement(this.element.id + '_tooltip');
        let tooltipDiv: HTMLDivElement;
        let chart: Chart = this.chart;
        this.textCollection = [];
        this.updateTemplateFn(chart);
        if (!isTooltip) {
            tooltipDiv = this.createElement(chart);
        }
        if (!chart.tooltip.shared) {
            this.renderSeriesTooltip(chart, !isTooltip, tooltipDiv);
        } else {
            this.renderGroupedTooltip(chart, !isTooltip, tooltipDiv);
        }
    }
    private createElement(chart: Chart): HTMLDivElement {
        this.textElements = [];
        let tooltipDiv: HTMLDivElement = document.createElement('div');
        tooltipDiv.id = this.element.id + '_tooltip'; tooltipDiv.className = 'ejTooltip' + this.element.id;
        tooltipDiv.setAttribute('style', 'pointer-events:none; position:absolute;z-index: 1');

        if (!chart.tooltip.template || chart.tooltip.shared) {
            // SVG element for tooltip
            let svgObject: Element = chart.renderer.createSvg({ id: this.element.id + '_tooltip_svg' });
            tooltipDiv.appendChild(svgObject);

            // Group to hold text and path.
            let groupElement: HTMLElement = <HTMLElement>chart.renderer.createGroup({ id: this.element.id + '_tooltip_group' });
            svgObject.appendChild(groupElement);
            let pathElement: Element = chart.renderer.drawPath({
                'id': this.element.id + '_tooltip_path', 'stroke-width': 1,
                'fill': chart.tooltip.fill
            });
            groupElement.appendChild(pathElement);
        }

        return tooltipDiv;
    }

    private getElement(id: string): HTMLElement {
        return document.getElementById(id);
    }
    private renderPoint(point: PointData, isFirst: boolean, fill: string): boolean {
        let argsData: ITooltipRenderEventArgs = {
            cancel: false, name: tooltipRender, textCollections: this.getTooltipText(point),
            point: point.point, series: point.series, textStyle: this.textStyle
        };
        this.chart.trigger(tooltipRender, argsData);
        if (!argsData.cancel) {
            this.renderText(argsData.textCollections, argsData.textStyle, fill, isFirst);
        }
        return !argsData.cancel;
    }
    private removeText(): void {
        this.textElements = [];
        let element: Element = this.getElement(this.element.id + '_tooltip_group');
        if (element.childNodes.length > 0) {
            while (element.lastChild && element.childNodes.length !== 1) {
                element.removeChild(element.lastChild);
            }
        }
    }

    private renderSeriesTooltip(chart: Chart, isFirst: boolean, tooltipDiv: HTMLDivElement): void {
        let data: PointData = this.getData(chart);
        if (data.point && data.series.enableTooltip) {
            if (!chart.storedPoints[0] || (chart.storedPoints[0].point !== data.point)) {
                this.stopAnimation();
                if (isFirst) {
                    document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
                if (!chart.tooltip.template) {
                    if (this.renderPoint(data, isFirst, this.textStyle.color || '#212121')) {
                      this.removeHighlight(chart);
                      this.chart.storedPoints.push(data);
                      this.highlightPoints(data);
                      this.renderTooltip(chart, data, isFirst);
                    } else {
                        this.removeHighlight(chart);
                        this.getElement(this.element.id + '_tooltip').remove();
                    }
                } else {
                    this.removeHighlight(chart);
                    this.chart.storedPoints.push(data);
                    this.createTemplate(chart, data, this.getElement(this.element.id + '_tooltip') as HTMLDivElement, isFirst);
                }
                this.isRemove = true;
            }
        } else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(null);
                this.isRemove = false;
            } else {
                for (let series of chart.visibleSeries) {
                    if (series.visible) {
                        data = this.getClosestX(chart, series) || data;
                     }
                }
            }
        }
        if (data && data.point) {
            this.findMouseValue(data, chart);
        }
    }

    private updateTemplateFn(chart: Chart): void {
        if (chart.tooltip.template) {
            let e: Object;
            try {
                if (document.querySelectorAll(chart.tooltip.template).length) {
                    this.templateFn = templateComplier(document.querySelector(chart.tooltip.template).innerHTML.trim());
                }
            } catch (e) {
                this.templateFn = templateComplier(chart.tooltip.template);
            }
        }
    }

    private createTemplate(chart: Chart, data: PointData, parent: HTMLDivElement, isFirst: boolean): void {
        this.highlightPoints(data);
        let argsData: ITooltipRenderEventArgs = { cancel: false, name: tooltipRender, point: data.point, series: data.series, };
        this.chart.trigger(tooltipRender, argsData);
        let firstElement: HTMLElement = this.getElement(this.element.id + '_tooltip').firstChild as HTMLElement;
        if (firstElement) {
            firstElement.remove();
        }
        let point : Points = extend({}, data.point) as Points;
        point.x = this.formatPointValue(data, data.series.xAxis , 'x', true, false);
        if ((data.series.seriesType === 'XY')) {
            point.y = this.formatPointValue(data, data.series.yAxis , 'y', false, true);
        } else {
            point.low = this.formatPointValue(data, data.series.yAxis, 'low', false, true);
            point.high = this.formatPointValue(data, data.series.yAxis, 'high', false, true);
        }
        if (!argsData.cancel) {
            let templateElement: HTMLCollection = this.templateFn(point);
            let elem: Element = createElement('div');
            while (templateElement.length > 0) {
                elem.appendChild(templateElement[0]);
            }
            parent.appendChild(elem);
            let rect: ClientRect = parent.getBoundingClientRect();
            this.padding = 0;
            this.elementSize = new Size(rect.width, rect.height);
            let tooltipRect: Rect = this.seriesTooltipLocation(data, new ChartLocation(0, 0), new ChartLocation(0, 0));
            if (chart.tooltip.enableAnimation && !chart.tooltip.shared && !isFirst && !this.isComplete) {
                this.animateTooltipDiv(parent, tooltipRect);
            } else {
                this.updateDiv(parent, tooltipRect.x, tooltipRect.y);
            }
            this.isComplete = false;
        } else {
            this.removeHighlight(chart);
            this.getElement(this.element.id + '_tooltip').remove();
        }
    }

    private findMouseValue(data: PointData, chart: Chart): void {
        if (!chart.requireInvertedAxis) {
            this.valueX = valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                + data.series.xAxis.rect.x;
            this.valueY = chart.mouseY;
        } else {
            this.valueY = (1 - valueToCoefficient(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                + data.series.xAxis.rect.y;
            this.valueX = chart.mouseX;
        }
    }

    private renderGroupedTooltip(chart: Chart, isFirst: boolean, tooltipDiv: Element): void {
        let data: PointData;
        let height: number = 0; let width: number = 0;
        this.stopAnimation();
        this.removeHighlight(chart);
        chart.storedPoints = [];
        if (isFirst) {
            document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
        }
        this.removeText();
        for (let series of chart.visibleSeries) {
            if (series.visible) {
               data = this.getClosestX(chart, series);
            }
            if (data &&  this.renderPoint(data, true, this.textStyle.color || data.point.color)) {
                this.highlightPoints(data);
                this.findMouseValue(data, chart);
                this.chart.storedPoints.push(data);
                height += (this.elementSize.height + this.padding);
                width = Math.max(width, this.elementSize.width);
                data = null;
            }
        }
        height -= this.padding;
        this.elementSize = new Size(width, height);
        if (chart.storedPoints.length > 0) {
            this.renderTooltip(chart, chart.storedPoints[0], isFirst);
        } else {
            this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
        }
    }

    private renderTooltip(chart: Chart, pointData: PointData, isFirst: boolean): void {
        let tooltipDiv: HTMLDivElement = <HTMLDivElement>this.getElement(this.element.id + '_tooltip');
        let arrowLocation: ChartLocation = new ChartLocation(0, 0);
        let tipLocation: ChartLocation = new ChartLocation(0, 0);
        let textHeights: number[];
        let svgObject: Element = this.getElement(this.element.id + '_tooltip_svg');
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        let pathElement: Element = this.getElement(this.element.id + '_tooltip_path');
        let rect: Rect;
        let inverted: boolean = chart.requireInvertedAxis;
        let isTop: boolean = false; let isLeft: boolean = false;
        let isBottom: boolean = false; let x: number = 0; let y: number = 0;

        if (chart.storedPoints.length > 1) {
            this.arrowPadding = 0;
            rect = this.sharedTooltipLocation(chart.chartAxisLayoutPanel.seriesClipRect, this.valueX, this.valueY);
            isTop = true;
        } else {
            let series: Series = pointData.series; let point: Points = pointData.point;
            this.arrowPadding = 10;
            rect = this.seriesTooltipLocation(pointData, arrowLocation, tipLocation);
            if (!inverted) {
                isTop = (rect.y < (pointData.point.symbolLocation.y + series.clipRect.y));
                isBottom = !isTop;
                y = (isTop ? 0 : this.arrowPadding);
            } else {
                isLeft = (rect.x < (pointData.point.symbolLocation.x + series.clipRect.x));
                x = (isLeft ? 0 : this.arrowPadding);
            }
        }

        let start: number = chart.tooltip.border.width / 2;
        let pointRect: Rect = new Rect(start + x, start + y, rect.width - start, rect.height - start);
        groupElement.setAttribute('opacity', '1');

        if (chart.tooltip.enableAnimation && !chart.tooltip.shared && !isFirst && !this.isComplete) {
            this.animateTooltipDiv(tooltipDiv, rect);
        } else {
            this.updateDiv(tooltipDiv, rect.x, rect.y);
        }
        this.isComplete = false;
        svgObject.setAttribute('height', (rect.height + chart.tooltip.border.width + (inverted ? 0 : this.arrowPadding)).toString());
        svgObject.setAttribute('width', (rect.width + chart.tooltip.border.width + (!inverted ? 0 : this.arrowPadding)).toString());

        pathElement.setAttribute('d', findDirection(
            this.rx, this.ry, pointRect, arrowLocation,
            this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y
        ));

        pathElement.setAttribute('stroke', chart.tooltip.border.color ||
                                           (chart.tooltip.shared ? 'black' : pointData.point.color || pointData.series.interior));

        this.changeText(new ChartLocation(x, y));

    }


    private sharedTooltipLocation(bounds: Rect, x: number, y: number): Rect {
        let width: number = this.elementSize.width + (2 * this.padding);
        let height: number = this.elementSize.height + (2 * this.padding);
        let tooltipRect: Rect = new Rect(x + 2 * this.padding, y - height - this.padding, width, height);
        if (tooltipRect.y < bounds.y) {
            tooltipRect.y += (tooltipRect.height + 2 * this.padding);
        }
        if (tooltipRect.x + tooltipRect.width > bounds.x + bounds.width) {
            tooltipRect.x -= (tooltipRect.width + 4 * this.padding);
        }
        return tooltipRect;
    }

    private seriesTooltipLocation(pointData: PointData, arrowLocation: ChartLocation, tipLocation: ChartLocation): Rect {

        let symbolLocation: ChartLocation = pointData.point.symbolLocation;
        let location: ChartLocation = new ChartLocation(symbolLocation.x, symbolLocation.y);
        let width: number = this.elementSize.width + (2 * this.padding);
        let height: number = this.elementSize.height + (2 * this.padding);
        let bounds: Rect = this.chart.chartAxisLayoutPanel.seriesClipRect;

        let series: Series = pointData.series;
        let markerHeight: number = (series.isRectSeries || (!series.marker.visible && series.type !== 'Scatter')) ? 0 :
            ((series.marker.height + 2) / 2 + (2 * series.marker.border.width));
        let clipX: number = series.clipRect.x;
        let clipY: number = series.clipRect.y;
        let boundsX: number = bounds.x;
        let boundsY: number = bounds.y;

        if (!this.chart.requireInvertedAxis) {
            location = new ChartLocation(
                location.x + clipX - this.elementSize.width / 2 - this.padding,
                location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight
            );
            arrowLocation.x = tipLocation.x = width / 2;
            if (location.y < boundsY || (series.isRectSeries && pointData.point.y < 0)) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            if (location.y + height + this.arrowPadding > boundsY + bounds.height) {
                location.y = (symbolLocation.y > bounds.height ? bounds.height  : symbolLocation.y)
                             + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight;
            }
            tipLocation.x = width / 2;
            if (location.x < boundsX) {
                arrowLocation.x -= (boundsX - location.x);
                tipLocation.x -= (boundsX - location.x);
                location.x = boundsX;
            }
            if (location.x + width > boundsX + bounds.width) {
                arrowLocation.x += ((location.x + width) - (boundsX + bounds.width));
                tipLocation.x += ((location.x + width) - (boundsX + bounds.width));
                location.x -= ((location.x + width) - (boundsX + bounds.width));
            }
            if (arrowLocation.x + this.arrowPadding / 2 > width - this.rx) {
                arrowLocation.x = width - this.rx - this.arrowPadding / 2;
                tipLocation.x = width;
            }
            if (arrowLocation.x - this.arrowPadding / 2 < this.rx) {
                arrowLocation.x = this.rx + this.arrowPadding / 2;
                tipLocation.x = 0;
            }
        } else {
            location = new ChartLocation(
                location.x + clipX + markerHeight,
                location.y + clipY - this.elementSize.height / 2 - (this.padding)
            );
            arrowLocation.y = tipLocation.y = height / 2;
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (series.isRectSeries && pointData.point.y < 0)) {
                location.x = (symbolLocation.x > bounds.width ?  bounds.width  : symbolLocation.x)
                             + clipX - markerHeight - (width + this.arrowPadding);
            }
            if (location.x < boundsX) {
                location.x = (symbolLocation.x < 0 ? 0 : symbolLocation.x) + clipX + markerHeight;
            }
            if (location.y <= boundsY) {
                arrowLocation.y -= (boundsY - location.y);
                tipLocation.y -= (boundsY - location.y);
                location.y = boundsY;
            }
            if (location.y + height >= boundsY + bounds.height) {
                arrowLocation.y += ((location.y + height) - (boundsY + bounds.height));
                tipLocation.y += ((location.y + height) - (boundsY + bounds.height));
                location.y -= ((location.y + height) - (boundsY + bounds.height));
            }
            if (arrowLocation.y + this.arrowPadding / 2 > height - this.ry) {
                arrowLocation.y = height - this.ry - this.arrowPadding / 2;
                tipLocation.y = height;
            }
            if (arrowLocation.y - this.arrowPadding / 2 < this.ry) {
                arrowLocation.y = this.ry + this.arrowPadding / 2;
                tipLocation.y = 0;
            }
        }
        return new Rect(location.x, location.y, width, height);
    }

    private getClosestX(chart: Chart, series: Series): PointData {
        let value: number;
        let rect: Rect = series.clipRect;
        if (!this.chart.requireInvertedAxis) {
            value = getValueXByPoint(Math.abs(chart.mouseX - rect.x), rect.width, series.xAxis);
        } else {
            value = getValueYByPoint(Math.abs(chart.mouseY - rect.y), rect.height, series.xAxis);
        }
        let closest: number = this.getClosest(series, value);
        for (let point of series.points) {
            if (closest === point.xValue && point.visible) {
                return new PointData(point, series);
            }
        }
        return null;
    }

    private getClosest(series: Series, value: number): number {
        let xData: number[] = series.xData;
        let closest: number;
        if (value >= <number>series.xMin - 0.5 && value <= <number>series.xMax + 0.5) {
            for (let data of xData) {
                if (closest == null || Math.abs(data - value) < Math.abs(closest - value)) {
                    closest = data;
                }
            }
        }
        return closest;
    }

    private removeHighlight(chart: Chart, removeRect: boolean = false): void {
        for (let item of chart.storedPoints) {
            if (item.isRemove) {
                if (item.series.isRectSeries) {
                    this.highlightPoint(item.series, item.point.index, false);
                    continue;
                }
                removeElement(this.element.id + '_Series_' + item.series.index +
                    '_Point_' + item.point.index + '_Trackball');
                item.isRemove = false;
            }
        }
        chart.storedPoints = [];
    }

    private highlightPoints(item: PointData): void {
        if (item.series.isRectSeries) {
            this.highlightPoint(item.series, item.point.index, true);
            return null;
        }
        this.drawTrackBall(item);
    }

    private drawTrackBall(pointData: PointData): void {
        let series: Series = pointData.series;
        let height : number; let width : number = 0;
        let element: Element = (series.type === 'Scatter' || series.type === 'Bubble') ? series.seriesElement : series.symbolElement;
        if (!series.marker.visible && series.type !== 'Scatter' && series.type !== 'Bubble' && pointData.point.symbolLocation) {
            return null;
        }
        let point: Points = pointData.point;
        let marker: MarkerSettingsModel = series.marker;

        let shape: string = series.type === 'Bubble' ? 'Circle' : marker.shape;

        let symbolId: string = this.element.id + '_Series_' + series.index + '_Point_' + point.index + '_Trackball';
        width = (series.type !== 'Bubble') ?  marker.width : (point.region.width);
        height = (series.type !== 'Bubble') ?  marker.height  : (point.region.height);
        let size: Size = new Size(width + 5,  height + 5);

        let options: PathOption = new PathOption(
            symbolId, marker.fill ? marker.fill : point.color, marker.border.width,
            marker.border.color, marker.opacity / 4, null, null
        );
        let symbol: Element = drawSymbol(point.symbolLocation, shape, size, null, options, '');
        symbol.setAttribute('style', 'pointer-events:none');
        element.appendChild(symbol);
    }

    private highlightPoint(series: Series, pointIndex: number, highlight: boolean): void {

        let element: HTMLElement = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);

        element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());

    }

    private getTooltipText(pointData: PointData): string[] {
        let series: Series = pointData.series;
        let format: string = this.getFormat(this.chart, series);
        let separators: string[] = ['<br/>', '<br />', '<br>']; let labels: string[];
        return this.parseTemplate(pointData, format, series.xAxis, series.yAxis).split(new RegExp(separators.join('|'), 'g'));
    }

    private renderText(formatText: string[], style: FontModel, color: string, isRender: boolean): void {
        let height: number = 0;
        let width: number = 0;
        let size: Size;
        let options: TextOption;
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        for (let k: number = 0, pointsLength: number = formatText.length; k < pointsLength; k++) {
            size = measureText(formatText[k], style);
            height += size.height;
            width = Math.max(width, size.width);
            if (isRender) {
                options = new TextOption(
                    this.element.id + '_tooltip_text_series_' + k, this.padding, 0,
                    'start', formatText[k]
                );
                this.textElements.push(textElement(options, style, color, groupElement));
            }
            this.textCollection.push(new TextCollection(formatText[k], size.width, size.height));
            height += this.padding; // Padding for text
        }
        height -= this.padding;
        this.elementSize = new Size(width, height);
    }


    private changeText(point: ChartLocation): void {
        point.y += this.padding; // Top padding
        point.x += this.padding; // Left padding         
        for (let k: number = 0, length: number = this.textCollection.length; k < length; k++) {
            if (this.textElements[k]) {
                point.y += (k === 0 ? (3 * this.textCollection[k].height / 4) : this.textCollection[k].height);
                this.textElements[k].setAttribute('y', point.y.toString());
                this.textElements[k].setAttribute('x', point.x.toString());
                this.textElements[k].textContent = this.textCollection[k].text;
                point.y += this.padding; //TextPadding
            }
        }
    }

    private parseTemplate(pointData: PointData, format: string, xAxis: Axis, yAxis: Axis): string {
        let val: RegExp;
        let textValue: string;
        let xFormat: Function;
        let customLabelFormat: boolean;
        let chart: Chart = this.chart;
        for (let dataValue of Object.keys(pointData.point)) {
            val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(val.source, this.formatPointValue(pointData, val.source === '${point.x}' ? xAxis : yAxis , dataValue,
                                                                      val.source === '${point.x}', (val.source === '${point.high}' ||
                                                                      val.source === '${point.low}' ||  val.source === '${point.y}')));
        }

        for (let dataValue of Object.keys(Object.getPrototypeOf(pointData.series))) {
            val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = pointData.series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    }

    private formatPointValue(pointData : PointData, axis : Axis,  dataValue : string, isXPoint : boolean, isYPoint : boolean) : string {
        let textValue: string;
        let customLabelFormat: boolean;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(pointData.point[dataValue])) :
                axis.format(pointData.point[dataValue]);
        } else if (isYPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(pointData.point[dataValue])) :
                axis.format(pointData.point[dataValue]);
        } else {
            textValue = pointData.point[dataValue];
        }
        return textValue;
    }

    private getFormat(chart: Chart, series: Series): string {
        if (!chart.tooltip.format) {
            switch (series.seriesType) {
                case 'XY':
                   return (series.type  === 'Bubble') ? '${point.x} : ${point.y} : ${point.size}'  : '${point.x} : ${point.y}';
                case 'HighLow':
                    return '${point.x} : ${point.high} : ${point.low}';
            }
        }
        return chart.tooltip.format;
    }

    private stopAnimation(): void {
        stopTimer(this.toolTipInterval);
    }

    /**
     * Removes the tooltip on mouse leave.
     * @return {void}
     * @private
     */

    public removeTooltip(isRemove?: boolean): void {
        let chart: Chart = this.chart;
        let tooltipElement: HTMLElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && chart.storedPoints.length > 0) {
            this.toolTipInterval = setTimeout(
                (): void => {
                    if (chart.storedPoints.length > 0) {
                        let series: Series = chart.storedPoints[0].series;
                        let tooltipGroup: HTMLElement = this.getElement(chart.element.id + '_tooltip_group')
                                                        || tooltipElement.firstChild as HTMLElement;
                        let opacity: number = parseFloat(tooltipGroup.getAttribute('opacity')) || 1;
                        let element: HTMLElement = this.getElement(chart.element.id + '_Series_' + chart.storedPoints[0].series.index
                            + '_Point_' + chart.storedPoints[0].point.index);
                        let rectOpacity: number;
                        if (element && series.isRectSeries && !chart.tooltip.shared) {
                            rectOpacity = parseFloat(element.getAttribute('opacity'));
                        }
                        new Animation({}).animate(tooltipGroup, {
                            duration: 200,
                            progress: (args: AnimationOptions): void => {
                               //tooltipGroup.removeAttribute('e-animate');
                                tooltipGroup.style.animation = '';
                                tooltipGroup.setAttribute('opacity', (opacity - (args.timeStamp / args.duration)).toString());
                                if (element && series.isRectSeries && !chart.tooltip.shared) {
                                    element.setAttribute('opacity', (
                                        rectOpacity + (rectOpacity * (args.timeStamp / args.duration))
                                    ).toString());
                                }
                            },
                            end: (model: AnimationOptions) => {
                                this.valueX = null;
                                this.valueY = null;
                                if (element && series.isRectSeries && !chart.tooltip.shared) {
                                    element.setAttribute('opacity', series.opacity.toString());
                                }
                                this.removeHighlight(chart, chart.tooltip.shared);
                                if (isRemove) {
                                    tooltipElement.outerHTML = '';
                                    chart.storedPoints = [];
                                }
                                tooltipGroup.setAttribute('opacity', '0');
                                if (chart.tooltip.template && !chart.tooltip.shared) {
                                    tooltipGroup.style.display = 'none';
                                }
                                chart.trigger('animationComplete', {});
                                this.isComplete = true;
                            }
                        });
                    }
                },
                2000);
        }
    }

    private animateTooltipDiv(tooltipDiv: HTMLDivElement, rect: Rect): void {
        let x: number = parseFloat(tooltipDiv.style.left);
        let y: number = parseFloat(tooltipDiv.style.top);
        let currenDiff: number;
        new Animation({}).animate(tooltipDiv, {
            duration: 300,
            progress: (args: AnimationOptions): void => {
                currenDiff = (args.timeStamp / args.duration);
                tooltipDiv.style.left = (x + currenDiff * (rect.x - x)) + 'px';
                tooltipDiv.style.top = (y + currenDiff * (rect.y - y)) + 'px';
            },
            end: (model: AnimationOptions): void => {
                this.updateDiv(tooltipDiv, rect.x, rect.y);
            }
        });

    }

    private updateDiv(tooltipDiv: HTMLDivElement, x: number, y: number): void {
        tooltipDiv.style.left = x + 'px';
        tooltipDiv.style.top = y + 'px';
    }

    private getData(chart: Chart): PointData {
        let point: Points = null;
        let series: Series = null;
        let width: number; let height: number;
        for (let len: number = chart.visibleSeries.length, i: number = len - 1; i >= 0; i--) {
            series = chart.visibleSeries[i];
            width = (series.type === 'Scatter' || (!series.isRectSeries && series.marker.visible)) ? (series.marker.height + 5) / 2 : 0;
            height = (series.type === 'Scatter' || (!series.isRectSeries && series.marker.visible)) ? (series.marker.width + 5) / 2 : 0;
            if (series.visible && withInBounds(chart.mouseX, chart.mouseY, series.clipRect, width, height)) {
                point = this.getRectPoint(series, series.clipRect, chart.mouseX, chart.mouseY);
            }
            if (point) {
                return new PointData(point, series);
            }
        }
        return new PointData(point, series);
    }

    private getRectPoint(series: Series, rect: Rect, x: number, y: number): Points {
        let currentRect: Rect;
        for (let point of series.points) {
            if (!point.region) {
                continue;
            }
            currentRect = new Rect(rect.x + point.region.x, rect.y + point.region.y, point.region.width, point.region.height);
            if (withInBounds(x, y, currentRect)) {
                return point;
            }
        }
        return null;
    }
    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name
         */
        return 'Tooltip';
    }
    /**
     * To destroy the tooltip. 
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}