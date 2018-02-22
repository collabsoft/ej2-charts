import { createElement, extend, Browser } from '@syncfusion/ej2-base';
import { AnimationOptions, Animation, compile as templateComplier } from '@syncfusion/ej2-base';
import { Chart } from '../../chart';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccPoints, AccumulationSeries } from '../../accumulation-chart/model/acc-base';
import { measureText, TextOption, Size, Rect, PointData, ChartLocation, textElement } from '../../common/utils/helper';
import { findDirection, stopTimer, AccPointData, removeElement } from '../../common/utils/helper';
import { ChartData } from '../../chart/utils/get-data';
import { Series, Points } from '../../chart/series/chart-series';
import { FontModel } from '../../common/model/base-model';
import { ITooltipRenderEventArgs } from '../../common/model/interface';
import { tooltipRender } from '../../common/model/constants';
import { Theme } from '../../common/model/theme';


/**
 * Tooltip Module used to render the tooltip for series.
 */
export class BaseTooltip extends ChartData {
    //Internal variables
    public element: HTMLElement;
    public elementSize: Size;
    public textStyle: FontModel;
    public isRemove: boolean;
    public toolTipInterval: number;
    public padding: number = 5;
    public arrowPadding: number = 12;
    public textElements: Element[];
    public templateFn: Function;
    public rx: number = 2;
    public ry: number = 2;
    public isComplete: boolean;
    public inverted: boolean;
    public formattedText: string[];
    public header: string;
    public markerPoint: number[] = [];
    /** @private */
    public valueX: number;
    /** @private */
    public valueY: number;
    public tipRadius: number;
    public control: AccumulationChart | Chart;
    /**
     * Constructor for tooltip module.
     * @private.
     */
    constructor(chart: Chart | AccumulationChart) {
        super(chart as Chart);
        this.element = this.chart.element;
        this.textStyle = chart.tooltip.textStyle;
        this.control = chart;
    }



    public getElement(id: string): HTMLElement {
        return document.getElementById(id);
    }

    /**
     * Renders the tooltip.
     * @return {void}
     * @private
     */
    public getTooltipElement(isTooltip: HTMLElement): HTMLDivElement {
        this.inverted = this.chart.requireInvertedAxis;
        this.updateTemplateFn(this.control);
        this.formattedText = [];
        this.header = (this.control.tooltip.header === null) ?
                      ((this.control.tooltip.shared) ? '<b>${point.x}</b>' : '<b>${series.name}</b>')
                      : (this.control.tooltip.header);
        if (!isTooltip) {
            let elementCollection : HTMLCollectionOf<Element> = document.getElementsByClassName('ejSVGTooltip');
            for (let i : number = elementCollection.length - 1; i >= 0; i--) {
                if (!this.getElement(this.element.id).contains(elementCollection[i])) {
                    elementCollection[i].remove();
                }
             }
            return this.createElement(this.control);
        }
        return null;
    }

    private createElement(chart: Chart | AccumulationChart): HTMLDivElement {
        this.textElements = [];
        let tooltipDiv: HTMLDivElement = document.createElement('div');
        tooltipDiv.id = this.element.id + '_tooltip'; tooltipDiv.className = 'ejSVGTooltip';
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
                'fill': chart.tooltip.fill || chart.themeStyle.tooltipFill, 'opacity': chart.tooltip.opacity,
                'stroke': chart.tooltip.border.color
            });
            groupElement.appendChild(pathElement);
        }

        return tooltipDiv;
    }




    public pushData(data: PointData | AccPointData, isFirst: boolean, tooltipDiv: HTMLDivElement, isChart: boolean): boolean {
        if (data.series.enableTooltip) {
        if (isChart) {
            (<PointData[]>this.currentPoints).push(<PointData>data);
        } else {
            (<AccPointData[]>this.currentPoints).push(<AccPointData>data);
        }
        this.stopAnimation();
        if (isFirst) {
                document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
        }
        return true;
        }
        return false;
    }

    public renderTooltip(data: PointData | AccPointData, areaRect: Rect, location: ChartLocation,
                         textCollection: string, isFirst: boolean, cartesain: boolean): Side {
        if (this.triggerEvent(data, isFirst, textCollection)) {
            this.renderText(isFirst, this.control);
            this.removeHighlight(this.control);
            this.highlightPoints(data);
            return this.renderTooltipElement(this.control, data, areaRect, location, cartesain, isFirst);
        } else {
            this.removeHighlight(this.control);
            this.getElement(this.element.id + '_tooltip').remove();
            return null;
        }
    }

    public renderTemplate(data: PointData | AccPointData, rect: Rect, location: ChartLocation,
                          point: Points | AccPoints, isFirst: boolean): void {
        this.removeHighlight(this.control);
        this.createTemplate(point, data, rect, location, this.getElement(this.element.id + '_tooltip') as HTMLDivElement, isFirst);
    }


    public renderTooltipElement(chart: Chart | AccumulationChart, pointData: PointData | AccPointData,
                                areaRect: Rect, location: ChartLocation, cartesain: boolean,
                                isFirst: boolean): Side {
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
        this.tipRadius = 1;
        let series: Series | AccumulationSeries = pointData.series;
        if (this.header !== '') {
            this.elementSize.height += 5;
        }

        if (this.currentPoints.length > 1) {
            this.arrowPadding = 0;
            rect = this.sharedTooltipLocation(areaRect, this.valueX, this.valueY);
            isTop = true;
        } else {
            this.arrowPadding = 12;
            rect = this.seriesTooltipLocation(pointData, areaRect, location, arrowLocation, tipLocation);
            if (!this.inverted || !series.isRectSeries) {
                isTop = (rect.y < (location.y + (cartesain ? series.clipRect.y : 0)));
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
                'fill': null, 'opacity': 0.8, 'stroke': chart.themeStyle.tooltipHeaderLine, 'd': direction
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

        return new Side(isBottom, !isLeft && !isTop && !isBottom);

    }


    private changeText(point: ChartLocation, isBottom: boolean, isRight: boolean, rect: Rect): void {

        let element: HTMLElement = document.getElementById(this.element.id + '_tooltip_text');


        if (isBottom) {
            element.setAttribute('transform', 'translate(0,' + this.arrowPadding + ')');
        }
        if (isRight) {
            element.setAttribute('transform', 'translate(' + this.arrowPadding + ' 0)');
        }
    }

    public renderText(isRender: boolean, chart: Chart | AccumulationChart): void {
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
        let dy: number = (22 / parseFloat(Theme.tooltipLabelFont.size)) * (parseFloat(font.size));

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
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || chart.themeStyle.tooltipBoldLabel);
                        } else {
                            tspanStyle = '';
                            font.fontWeight = 'Normal';
                            (tspanElement).setAttribute('fill', chart.tooltip.textStyle.color || chart.themeStyle.tooltipLightLabel);
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

    private createTemplate(point: Points | AccPoints, data: PointData | AccPointData, areaRect: Rect, location: ChartLocation,
                           parent: HTMLDivElement, isFirst: boolean): void {
        let chart: Chart | AccumulationChart = this.control;
        this.highlightPoints(data);
        let argsData: ITooltipRenderEventArgs = { cancel: false, name: tooltipRender, point: data.point, series: data.series, };
        this.chart.trigger(tooltipRender, argsData);
        let firstElement: HTMLElement = this.getElement(this.element.id + '_tooltip').firstChild as HTMLElement;
        if (firstElement) {
            firstElement.remove();
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
            let tooltipRect: Rect = this.seriesTooltipLocation(data, areaRect, location, new ChartLocation(0, 0), new ChartLocation(0, 0));
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

    private seriesTooltipLocation(pointData: PointData | AccPointData, bounds: Rect, symbolLocation: ChartLocation,
                                  arrowLocation: ChartLocation, tipLocation: ChartLocation): Rect {
        let series: Series | AccumulationSeries = pointData.series;

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

        let markerHeight: number = 0;
        if (!series.isRectSeries) {
            let chartSeries: Series = <Series>pointData.series;
            markerHeight = (this.chart.tooltip.shared || chartSeries.marker.visible || series.type === 'Scatter'
                || chartSeries.drawType === 'Scatter') ? ((chartSeries.marker.height + 2) / 2 + (2 * chartSeries.marker.border.width)) : 0;
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

    /*
   * @hidden
   */
    public progressAnimation(element: HTMLElement, tooltipGroup: HTMLElement, series: Series | AccumulationSeries,
                             opacity: number, rectOpacity: number, timeStamp: number, isRect: boolean, shared: boolean): void {
        tooltipGroup.style.animation = '';
        tooltipGroup.setAttribute('opacity', (opacity - timeStamp).toString());
        if (element && isRect && !shared) {
            element.setAttribute('opacity', (
                rectOpacity + (rectOpacity * timeStamp)
            ).toString());
        }
    }


    /*
     * @hidden
     */
    public endAnimation(element: HTMLElement, tooltipGroup: HTMLElement, series: Series | AccumulationSeries, shared: boolean): void {
        this.currentPoints = [];
        if (element && series.isRectSeries) {
            element.setAttribute('opacity', series.opacity.toString());
        }
        this.removeHighlight(this.control);
        tooltipGroup.setAttribute('opacity', '0');
        if (this.control.tooltip.template && !shared) {
            tooltipGroup.style.display = 'none';
        }
        this.isComplete = true;
        this.control.trigger('animationComplete', {});
    }



    public removeHighlight(chart: Chart | AccumulationChart): void {
        let item: PointData | AccPointData;
        let series: Series;
        for (let i: number = 0, len: number = this.previousPoints.length; i < len; i++) {
            item = this.previousPoints[i];
            if (item.series.isRectSeries) {
                if (item.series.visible) {
                    this.highlightPoint(item.series, item.point.index, false);
                }
                continue;
            }
            series = item.series as Series;
            if (!series.marker.visible && item.series.type !== 'Scatter' && item.series.type !== 'Bubble') {
                this.previousPoints.shift();
                len -= 1;
            }
        }
    }

    public highlightPoint(series: Series | AccumulationSeries, pointIndex: number, highlight: boolean): void {

        let element: HTMLElement = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
        if (element) {
            element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
        }

    }

    public highlightPoints(item: PointData | AccPointData): void {
        if (item.series.isRectSeries) {
            this.highlightPoint(item.series, item.point.index, true);
            return null;
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


    public triggerEvent(point: PointData | AccPointData, isFirst: boolean, textCollection: string, firstText: boolean = true): boolean {
        let argsData: ITooltipRenderEventArgs = {
            cancel: false, name: tooltipRender, text: textCollection,
            point: point.point, series: point.series, textStyle: this.textStyle
        };
        this.chart.trigger(tooltipRender, argsData);
        if (!argsData.cancel) {
            if (point.series.type === 'BoxAndWhisker') {
                this.removeText();
                isFirst = true;
            }
            this.formattedText = this.formattedText.concat(argsData.text);
        }
        return !argsData.cancel;
    }

    public removeText(): void {
        this.textElements = [];
        let element: Element = this.getElement(this.element.id + '_tooltip_group');
        if (element.childNodes.length > 0) {
            while (element.lastChild && element.childNodes.length !== 1) {
                element.removeChild(element.lastChild);
            }
        }
    }


    private updateTemplateFn(chart: Chart | AccumulationChart): void {
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


    public stopAnimation(): void {
        stopTimer(this.toolTipInterval);
    }
}
export class Side {
    public isRight: boolean;
    public isBottom: boolean;
    constructor(bottom: boolean, right: boolean) {
        this.isRight = right;
        this.isBottom = bottom;
    }
}