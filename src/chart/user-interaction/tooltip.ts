import { Chart } from '../chart';
import { createElement, extend, Browser } from '@syncfusion/ej2-base';
import { AnimationOptions, Animation, compile as templateComplier } from '@syncfusion/ej2-base';
import { measureText, TextOption, Size, Rect, PointData, ChartLocation, textElement } from '../../common/utils/helper';
import {
    findDirection, stopTimer, drawSymbol, PathOption,
    valueToCoefficient, removeElement, valueToPolarCoefficient, withInBounds
} from '../../common/utils/helper';
import { Data } from '../../chart/utils/get-data';
import { Axis } from '../axis/axis';
import { Series, Points } from '../series/chart-series';
import { FontModel } from '../../common/model/base-model';
import { ITooltipRenderEventArgs } from '../../common/model/interface';
import { tooltipRender } from '../../common/model/constants';
import {Theme } from '../../common/model/theme';


/**
 * Tooltip Module used to render the tooltip for series.
 */
export class Tooltip extends Data {
    //Internal variables
    private element: HTMLElement;
    private elementSize: Size;
    private textStyle: FontModel;
    private isRemove: boolean;
    private toolTipInterval: number;
    private padding: number = 5;
    private arrowPadding: number = 12;
    private textElements: Element[];
    private templateFn: Function;
    private rx: number = 2;
    private ry: number = 2;
    private isComplete: boolean;
    private inverted: boolean;
    private formattedText: string[];
    private header: string;
    private markerPoint: number[] = [];
    /** @private */
    public valueX: number;
    /** @private */
    public valueY: number;
    private tipRadius: number;
    /**
     * Constructor for tooltip module.
     * @private.
     */
    constructor(chart: Chart) {
        super(chart);
        this.element = this.chart.element;
        this.addEventListener();
        this.textStyle = chart.tooltip.textStyle;
    }

    /**
     * @hidden
     */
    private addEventListener(): void {
        if (this.chart.isDestroyed) { return; }
        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }

    private mouseUpHandler(): void {
        let chart: Chart = this.chart;
        if (chart.isTouch &&
            ((withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect) && chart.tooltip.shared)
             || !chart.tooltip.shared)) {
            if (!chart.crosshair.enable) {
                this.tooltip();
                this.removeTooltip(2000);
            } else if (chart.startMove) {
                this.removeTooltip(2000);
            }
        }
    }

    private mouseLeaveHandler(): void {
        this.removeTooltip(1000);
    }

    private mouseMoveHandler(): void {
        let chart: Chart = this.chart;
        // Tooltip for chart series.      
        if (!chart.disableTrackTooltip) {
            if (!chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                this.tooltip();
            }
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                    this.tooltip();
                }
            } else {
                if (chart.tooltip.shared) {
                    this.removeTooltip(1000);
                }
            }
        }
    }

    /**
     * Handles the long press on chart. 
     * @return {boolean}
     * @private
     */
    private longPress(): boolean {
        let chart: Chart = this.chart;
        if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.tooltip();
        }
        return false;
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
        this.inverted = this.chart.requireInvertedAxis;
        this.updateTemplateFn(chart);
        this.formattedText = [];
        this.header = (chart.tooltip.header === null) ? ((chart.tooltip.shared) ? '<b>${point.x}</b>' : '<b>${series.name}</b>')
            : (chart.tooltip.header);
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
                'id': this.element.id + '_tooltip_path', 'stroke-width': chart.tooltip.border.width,
                'fill': chart.tooltip.fill, 'opacity': chart.tooltip.opacity, 'stroke': chart.tooltip.border.color
            });
            groupElement.appendChild(pathElement);
        }

        return tooltipDiv;
    }

    private getElement(id: string): HTMLElement {
        return document.getElementById(id);
    }
    private renderPoint(point: PointData, isFirst: boolean, fill: string, firstText: boolean = true): boolean {
        let argsData: ITooltipRenderEventArgs = {
            cancel: false, name: tooltipRender, textCollections: this.getTooltipText(point, firstText),
            point: point.point, series: point.series, textStyle: this.textStyle
        };
        this.chart.trigger(tooltipRender, argsData);
        if (!argsData.cancel) {
            if (point.series.type === 'BoxAndWhisker') {
                this.removeText();
                isFirst = true;
            }
            this.formattedText = this.formattedText.concat(argsData.textCollections);
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
        let data: PointData = this.getData();
        data.lierIndex = this.lierIndex;
        this.currentPoints = [];
        if (
            data.point && ((!this.previousPoints[0] || (this.previousPoints[0].point !== data.point)) ||
                (this.previousPoints[0] && this.previousPoints[0].lierIndex > 3 && this.previousPoints[0].lierIndex !== this.lierIndex))
        ) {
            this.currentPoints.push(data);
            if (data.series.enableTooltip) {
                this.stopAnimation();
                if (isFirst) {
                    document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                }
                if (!chart.tooltip.template) {
                    if (this.header !== '') {
                        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
                        this.formattedText = this.formattedText.concat(this.header);
                    }
                    if (this.renderPoint(data, isFirst, this.textStyle.color || '#212121')) {
                        this.renderText(isFirst, chart);
                        this.removeHighlight(chart);
                        this.highlightPoints(data);
                        this.renderTooltip(chart, data, isFirst);
                    } else {
                        this.removeHighlight(chart);
                        this.getElement(this.element.id + '_tooltip').remove();
                    }
                } else {
                    this.removeHighlight(chart);
                    this.createTemplate(chart, data, this.getElement(this.element.id + '_tooltip') as HTMLDivElement, isFirst);
                }
                this.isRemove = true;
            }
            this.previousPoints = <PointData[]>extend([], this.currentPoints, null, true);
        } else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(1000);
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
        let point: Points = extend({}, data.point) as Points;
        point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
        if ((data.series.seriesType === 'XY')) {
            point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
        } else {
            point.low = this.formatPointValue(data.point, data.series.yAxis, 'low', false, true);
            point.high = this.formatPointValue(data.point, data.series.yAxis, 'high', false, true);
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
            if (chart.chartAreaType === 'PolarRadar') {
                this.valueX = valueToPolarCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            } else {
                this.valueX = valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            }
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
        let pointData: PointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
        this.stopAnimation();
        this.removeHighlight(chart);
        this.currentPoints = [];
        let extraPoints: PointData[] = [];
        if (isFirst) {
            document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
        }
        this.removeText();
        for (let series of chart.visibleSeries) {
            if (!series.enableTooltip) {
                continue;
            }
            if (chart.chartAreaType === 'Cartesian' && series.visible) {
                data = this.getClosestX(chart, series);
            } else if (chart.chartAreaType === 'PolarRadar' && series.visible && pointData.point !== null) {
                data = new PointData(series.points[pointData.point.index], series);
            }
            if (data && this.header !== '' && this.currentPoints.length === 0) {
                this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
                this.formattedText = this.formattedText.concat(this.header);
            }
            if (
                data && this.renderPoint(
                    data, true,
                    this.textStyle.color || data.point.color,
                    this.currentPoints.length === 0
                )
            ) {
                if (series.category === 'Series') {
                    this.highlightPoints(data);
                }
                this.findMouseValue(data, chart);
                this.currentPoints.push(data);
                data = null;
            } else if (data) {
                extraPoints.push(data);
            }
        }
        this.renderText(isFirst, chart);
        if (this.currentPoints.length > 0) {
            this.renderTooltip(chart, this.currentPoints[0], isFirst);
        } else {
            this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
        }
        this.currentPoints = this.currentPoints.concat(extraPoints);
        this.previousPoints = <PointData[]>extend([], this.currentPoints, null, true);
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
        let isTop: boolean = false; let isLeft: boolean = false;
        let isBottom: boolean = false; let x: number = 0; let y: number = 0;
        let location: ChartLocation = pointData.series.type === 'BoxAndWhisker' ?
            this.getBoxLocation(pointData) : pointData.point.symbolLocations[0];
        this.tipRadius = 1;
        let series: Series = pointData.series; let point: Points = pointData.point;
        if (this.header !== '') {
            this.elementSize.height += 5;
        }

        if (this.currentPoints.length > 1) {
            this.arrowPadding = 0;
            rect = this.sharedTooltipLocation(chart.chartAxisLayoutPanel.seriesClipRect, this.valueX, this.valueY);
            isTop = true;
        } else {
            this.arrowPadding = 12;
            rect = this.seriesTooltipLocation(pointData, arrowLocation, tipLocation);
            if (!this.inverted || !series.isRectSeries) {
                isTop = (rect.y < (location.y + (chart.chartAreaType === 'Cartesian' ? series.clipRect.y : 0)));
                isBottom = !isTop;
                y = (isTop ? 0 : this.arrowPadding);
            } else {
                isLeft = (rect.x < (location.x + series.clipRect.x));
                x = (isLeft ? 0 : this.arrowPadding);
            }
        }
        if (this.header !== '') {
            let headerSize: number = measureText(this.header, chart.tooltip.textStyle).height + (this.padding * 2) +
                (isBottom ? this.arrowPadding : 0); //header padding;
            let xLength: number = (this.padding * 3) + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0);
            let direction: string = 'M ' + xLength + ' ' + headerSize +
                'L ' + (rect.width + (!isLeft && !isTop && !isBottom ? this.arrowPadding : 0) - (this.padding * 2)) +
                ' ' + headerSize;
            let pathElement: Element = this.chart.renderer.drawPath({
                'id': this.element.id + '_header_path', 'stroke-width': 1,
                'fill': null, 'opacity': 0.8, 'stroke': '#ffffff', 'd': direction
            });
            groupElement.appendChild(pathElement);
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
        svgObject.setAttribute('height', (rect.height + chart.tooltip.border.width + (!((!this.inverted) ||
            (!pointData.series.isRectSeries)) ? 0 : this.arrowPadding)).toString());
        svgObject.setAttribute('width', (rect.width + chart.tooltip.border.width + (((!this.inverted) ||
            (!pointData.series.isRectSeries)) ? 0 : this.arrowPadding)).toString());
        svgObject.setAttribute('opacity', '1');

        pathElement.setAttribute('d', findDirection(
            this.rx, this.ry, pointRect, arrowLocation,
            this.arrowPadding, isTop, isBottom, isLeft, tipLocation.x, tipLocation.y, this.tipRadius
        ));
        pathElement.setAttribute('filter', Browser.isIE ? '' : 'url(#chart_shadow_tooltip)');
        let shadowElement: string = '<filter id="chart_shadow_tooltip" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
        shadowElement += '<feOffset dx="3" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/>';
        shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';

        let defElement: Element = chart.renderer.createDefs();
        defElement.setAttribute('id', 'chart_tooltip_definition');
        groupElement.appendChild(defElement);

        defElement.innerHTML = shadowElement;


        pathElement.setAttribute('stroke', chart.tooltip.border.color);


        this.changeText(new ChartLocation(x, y), isBottom, !isLeft && !isTop && !isBottom, rect);

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

    private getBoxLocation(data: PointData): ChartLocation {
        let location: ChartLocation;
        location = this.lierIndex > 3 ? data.point.symbolLocations[this.lierIndex - 4] :
            {
                x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                y: data.point.regions[0].y + (data.point.regions[0].height / 2)
            };
        return location;
    }

    private seriesTooltipLocation(pointData: PointData, arrowLocation: ChartLocation, tipLocation: ChartLocation): Rect {
        let series: Series = pointData.series;
        let isBoxPlot: boolean = series.type === 'BoxAndWhisker';
        let symbolLocation: ChartLocation = isBoxPlot ? this.getBoxLocation(pointData) : pointData.point.symbolLocations[0];
        let location: ChartLocation = new ChartLocation(symbolLocation.x, symbolLocation.y);
        if (series.type === 'RangeArea' && pointData.point.regions[0]) {
            if (!series.chart.requireInvertedAxis) {
                location.y = pointData.point.regions[0].y + pointData.point.regions[0].height / 2;
            } else {
                location.x = pointData.point.regions[0].x + pointData.point.regions[0].width / 2;
            }
        }
        let width: number = this.elementSize.width + (2 * this.padding);
        let height: number = this.elementSize.height + (2 * this.padding);
        let bounds: Rect = this.chart.chartAxisLayoutPanel.seriesClipRect;

        let markerHeight: number = 0;
        if (!series.isRectSeries) {
            markerHeight = (this.chart.tooltip.shared || series.marker.visible || series.type === 'Scatter'
            || series.drawType === 'Scatter') ? ((series.marker.height + 2) / 2 + (2 * series.marker.border.width)) : 0;
        }
        let clipX: number = this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.x;
        let clipY: number = this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.y;
        let boundsX: number = bounds.x;
        let boundsY: number = bounds.y;

        if (!this.inverted || !series.isRectSeries) {
            location.y = (series.type === 'Waterfall' && pointData.point.y < 0) ?
                location.y - pointData.point.regions[0].height : location.y;
            location = new ChartLocation(
                location.x + clipX - this.elementSize.width / 2 - this.padding,
                location.y + clipY - this.elementSize.height - (2 * this.padding) - this.arrowPadding - markerHeight
            );
            arrowLocation.x = tipLocation.x = width / 2;
            if (location.y < boundsY || (series.isRectSeries && pointData.point.y < 0 && series.type !== 'Waterfall')) {
                location.y = (symbolLocation.y < 0 ? 0 : symbolLocation.y) + clipY + markerHeight;
            }
            if (location.y + height + this.arrowPadding > boundsY + bounds.height) {
                location.y = (symbolLocation.y > bounds.height ? bounds.height : symbolLocation.y)
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
                this.tipRadius = 0;
            }
            if (arrowLocation.x - this.arrowPadding / 2 < this.rx) {
                arrowLocation.x = this.rx + this.arrowPadding / 2;
                tipLocation.x = 0;
                this.tipRadius = 0;
            }
        } else {
            location.x = (series.type === 'Waterfall' && pointData.point.y < 0) ?
                location.x + pointData.point.regions[0].width : location.x;
            location = new ChartLocation(
                location.x + clipX + markerHeight,
                location.y + clipY - this.elementSize.height / 2 - (this.padding)
            );
            arrowLocation.y = tipLocation.y = height / 2;
            if ((location.x + width + this.arrowPadding > boundsX + bounds.width) || (series.isRectSeries &&
                pointData.point.y < 0 && series.type !== 'Waterfall')) {
                location.x = (symbolLocation.x > bounds.width ? bounds.width : symbolLocation.x)
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
                this.tipRadius = 0;
            }
            if (arrowLocation.y - this.arrowPadding / 2 < this.ry) {
                arrowLocation.y = this.ry + this.arrowPadding / 2;
                tipLocation.y = 0;
                this.tipRadius = 0;
            }
        }
        return new Rect(location.x, location.y, width, height);
    }



    private removeHighlight(chart: Chart, removeRect: boolean = false): void {
        let item: PointData;
        for (let i: number = 0, len: number = this.previousPoints.length; i < len; i++) {
            item = this.previousPoints[i];
            if (item.series.isRectSeries && item.series.visible) {
                this.highlightPoint(item.series, item.point.index, false);
                continue;
            }
            if (!item.series.marker.visible && item.series.type !== 'Scatter' && item.series.type !== 'Bubble') {
                this.previousPoints.shift();
                len -= 1;
            }
        }
    }

    private highlightPoints(item: PointData): void {
        if (item.series.isRectSeries) {
            this.highlightPoint(item.series, item.point.index, true);
            return null;
        }
    }

    private highlightPoint(series: Series, pointIndex: number, highlight: boolean): void {

        let element: HTMLElement = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
        if (element) {
            element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
        }

    }

    private getTooltipText(pointData: PointData, isFirst: boolean = true): string {
        let series: Series = pointData.series;
        let text: string;
        return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
    }
    private renderText(isRender: boolean, chart: Chart): void {
        let height: number = 0;
        let width: number = 0; // Padding for text;
        let subWidth: number = 0;
        let size: Size;
        let lines: string[];
        let key: string = 'properties';
        let font: FontModel = <FontModel>extend({}, this.chart.tooltip.textStyle, null, true)[key];
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        let tspanElement: HTMLElement;
        let tspanStyle: string = '';
        let line: string;
        let tspanOption: object;
        this.header = this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
        let headerSpace: number = (this.header !== '' && this.formattedText[0] !== '') ? 5 : 0;
        let isRow: boolean = true;
        let isColumn: boolean = true;
        this.markerPoint = [];
        let markerSize: number = 10;
        let spaceWidth: number = 4;
        let dy : number = (22 / parseFloat(Theme.tooltipLabelFont.size)) * (parseFloat(font.size));

        if (!isRender) {
            removeElement(this.element.id + '_tooltip_text');
            removeElement(this.element.id + '_header_path');
            removeElement(this.element.id + '_tooltip_trackball_group');
            removeElement('chart_tooltip_definition');
        }

        let options: TextOption = new TextOption(
            this.element.id + '_tooltip_text', this.padding * 2, this.padding * 4,
            'start', ''
        );
        let parentElement: Element = textElement(options, font, null, groupElement, false);

        for (let k: number = 0, pointsLength: number = this.formattedText.length; k < pointsLength; k++) {
            let textCollection: string[] = this.formattedText[k].replace(/<(b|strong)>/g, '<b>')
                .replace(/<\/(b|strong)>/g, '</b>')
                .split(/<br.*?>/g);
            size = measureText(this.formattedText[k], font);
            if ((k !== 0) || (this.header === '')) {
                this.markerPoint.push((this.header !== '' ? (this.padding) : 0) + options.y + height);
            }
            for (let i: number = 0, len: number = textCollection.length; i < len; i++) {
                lines = textCollection[i].replace(/<b>/g, '<br><b>').replace(/<\/b>/g, '</b><br>').split('<br>');
                subWidth = 0;
                isColumn = true;
                height += dy;
                for (let k: number = 0, len: number = lines.length; k < len; k++) {
                    line = lines[k];
                    if (line.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
                        subWidth += spaceWidth;
                        if (isColumn && !isRow) {
                            tspanOption = { x: (this.padding * 2) + (markerSize + 5), dy: dy + ((isColumn) ? headerSpace : 0), fill: '' };
                            headerSpace = null;
                        } else {
                            if (isRow && isColumn) {
                                tspanOption = { x: (this.header === '') ? ((this.padding * 2) + (markerSize + 5)) : (this.padding * 2) };
                            } else {
                                tspanOption = {};
                            }
                        }
                        isColumn = false;
                        tspanElement = <HTMLElement>chart.renderer.createTSpan(tspanOption, '');
                        parentElement.appendChild(tspanElement);
                        if (line.indexOf('<b>') > -1) {
                            tspanStyle = 'font-weight:bold';
                            font.fontWeight = 'bold';
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || '#ffffff');
                        } else {
                            tspanStyle = '';
                            font.fontWeight = 'Normal';
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || '#dbdbdb');
                        }
                        (tspanElement).textContent = line = line.replace(/<[a-zA-Z\/](.|\n)*?>/g, '');
                        subWidth += measureText(line, font).width;
                        if (tspanStyle !== '') {
                            tspanElement.setAttribute('style', tspanStyle);
                        }
                        isRow = false;
                    }
                }
                subWidth -= spaceWidth;
                width = Math.max(width, subWidth);
            }
        }
        height -= (this.header ? this.padding : 0);
        this.elementSize = new Size(width + (width > 0 ? (2 * this.padding) : 0), height + (this.header !== '' ? this.padding : 0));
        this.elementSize.width += (markerSize + 5); // marker size + marker Spacing
        let element: HTMLElement = <HTMLElement>(parentElement.childNodes[0]);
        if (this.header !== '' && element) {
            font.fontWeight = 'bold';
            let width: number = (this.elementSize.width + (2 * this.padding)) / 2 - measureText(this.header, font).width / 2;
            element.setAttribute('x', width.toString());
        }
    }


    private changeText(point: ChartLocation, isBottom: boolean, isRight: boolean, rect: Rect): void {

        let element: HTMLElement = document.getElementById(this.element.id + '_tooltip_text');


        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }

        this.drawMarker(isBottom, isRight, 10);

    }

    private drawMarker(isBottom: boolean, isRight: boolean, size: number): void {
        let count: number = 0;
        let shapeOption: PathOption;
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        let markerGroup: HTMLElement = <HTMLElement>this.chart.renderer.createGroup({ id: this.element.id + '_tooltip_trackball_group' });
        let x: number = (this.padding * 2) + (size / 2) + (isRight ? this.arrowPadding : 0);
        let series: Series;
        for (let data of this.currentPoints) {
            series = data.series;
            if (series.visible && series.enableTooltip && data.point.visible) {
                shapeOption = new PathOption(
                    this.element.id + '_Tooltip_Trackball_' + series.index,
                    series.marker.fill ||
                    ((data.point && data.point.color && data.point.color !== '#ffffff') ? data.point.color : series.interior),
                    1, '#cccccc', series.opacity, null);
                markerGroup.appendChild(drawSymbol(
                    new ChartLocation(x, this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : 0)),
                    series.marker.shape, new Size(size, size), series.marker.imageUrl, shapeOption, null));
                count++;
            }
        }
        groupElement.appendChild(markerGroup);
    }

    private parseTemplate(point: Points, series: Series, format: string, xAxis: Axis, yAxis: Axis): string {
        let val: RegExp;
        let textValue: string;
        let xFormat: Function;
        let customLabelFormat: boolean;
        let chart: Chart = this.chart;
        for (let dataValue of Object.keys(point)) {
            val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(
                val.source, this.formatPointValue(
                    point, val.source === '${point.x}' ? xAxis : yAxis,
                    dataValue, val.source === '${point.x}',
                    (
                        val.source === '${point.high}' ||
                        val.source === '${point.open}' ||
                        val.source === '${point.close}' ||
                        val.source === '${point.low}' ||
                        val.source === '${point.y}' ||
                        val.source === '${point.minimum}' ||
                        val.source === '${point.maximum}' ||
                        val.source === '${point.outliers}' ||
                        val.source === '${point.upperQuartile}' ||
                        val.source === '${point.lowerQuartile}' ||
                        val.source === '${point.median}'
                    )
                )
            );
        }

        for (let dataValue of Object.keys(Object.getPrototypeOf(series))) {
            val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    }

    private formatPointValue(point: Points, axis: Axis, dataValue: string, isXPoint: boolean, isYPoint: boolean): string {
        let textValue: string;
        let customLabelFormat: boolean;
        let value: string;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(point[dataValue])) :
                axis.format(point[dataValue]);
        } else if (isYPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            value = dataValue === 'outliers' ? axis.format(point[dataValue][this.lierIndex - 4]) :
                axis.format(point[dataValue]);
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;

        } else {
            textValue = point[dataValue];
        }
        return textValue;
    }

    private getFormat(chart: Chart, series: Series): string {
        if (chart.tooltip.format) {
            if (series.seriesType === 'XY' && series.category === 'Indicator') {
                return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
            }
            return chart.tooltip.format;
        }
        let format: string = !chart.tooltip.shared ? '${point.x}' : '${series.name}';
        switch (series.seriesType) {
            case 'XY':
                if (series.category === 'Indicator') {
                    this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return format + ' : ' + ((series.type === 'Bubble') ? '<b>${point.y}</b>  Size : <b>${point.size}</b>'
                    : '<b>${point.y}</b>');
            case 'HighLow':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b>');
            case 'HighLowOpenClose':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                    'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>');
            case 'BoxPlot': {
                return format + '<br/>' + (this.lierIndex > 3 ? 'Outliers : <b>${point.outliers}</b>' :
                    'Maximum : <b>${point.maximum}</b><br/>Q1 : <b>${point.upperQuartile}</b><br/>' +
                    'Median : <b>${point.median}</b><br/>Q3 : <b>${point.lowerQuartile}</b><br/>Minimum : <b>${point.minimum}</b>');
            }
        }
        return '';
    }

    private getIndicatorTooltipFormat(series: Series, chart: Chart, format: string): string {
        let toolTip: string;
        let points: Points[] = [];
        if (series.seriesType === 'XY') {
            toolTip = series.name + ' : ${point.y}';
        } else {
            toolTip = format;
        }
        return toolTip;
    }

    private stopAnimation(): void {
        stopTimer(this.toolTipInterval);
    }

    /**
     * Removes the tooltip on mouse leave.
     * @return {void}
     * @private
     */

    public removeTooltip(duration: number): void {
        let chart: Chart = this.chart;
        let tooltipElement: HTMLElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            let data: PointData[] = this.previousPoints;
            this.toolTipInterval = setTimeout(
                (): void => {
                    let series: Series = data[0].series;
                    let tooltipGroup: HTMLElement = tooltipElement.firstChild as HTMLElement;
                    let opacity: number = parseFloat(tooltipGroup.getAttribute('opacity')) || 1;
                    let element: HTMLElement = this.getElement(chart.element.id + '_Series_' + data[0].series.index
                        + '_Point_' + data[0].point.index);
                    let rectOpacity: number;
                    if (element && series.isRectSeries && !chart.tooltip.shared) {
                        rectOpacity = parseFloat(element.getAttribute('opacity'));
                    }
                    new Animation({}).animate(tooltipGroup, {
                        duration: 200,
                        progress: (args: AnimationOptions): void => {
                          //  tooltipGroup.removeAttribute('e-animate');
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
                            this.currentPoints = [];
                            if (element && series.isRectSeries && !chart.tooltip.shared) {
                                element.setAttribute('opacity', series.opacity.toString());
                            }
                            this.removeHighlight(chart, chart.tooltip.shared);
                            this.removeHighlightedMarker(data);
                            tooltipGroup.setAttribute('opacity', '0');
                            if (chart.tooltip.template && !chart.tooltip.shared) {
                                tooltipGroup.style.display = 'none';
                            }
                            chart.trigger('animationComplete', {});
                            this.isComplete = true;
                        }
                    });
                },
                duration);
        }
    }
    /**
     * @hidden
     */
    private removeHighlightedMarker(data: PointData[]): void {
        for (let item of data) {
            removeElement(this.element.id + '_Series_' + item.series.index +
                '_Point_' + item.point.index + '_Trackball');
        }
        if (this.chart.markerRender) {
            this.chart.markerRender.removeHighlightedMarker();
        }
        this.previousPoints = [];
    }

    private animateTooltipDiv(tooltipDiv: HTMLDivElement, rect: Rect): void {
        let x: number = parseFloat(tooltipDiv.style.left);
        let y: number = parseFloat(tooltipDiv.style.top);
        let currenDiff: number;
        new Animation({}).animate(tooltipDiv, {
            duration: 300,
            progress: (args: AnimationOptions): void => {
                currenDiff = (args.timeStamp / args.duration);
                tooltipDiv.style.animation = null;
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