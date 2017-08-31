import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2-base';
import { Chart } from '../../chart';
import { LegendSettingsModel, LocationModel } from './legend-model';
import { Font, Border } from '../model/base';
import { Theme } from '../model/theme';
import { FontModel, BorderModel } from '../model/base-model';
import { Size, Rect, subtractThickness, Thickness, drawSymbol, measureText, ChartLocation, PathOption } from '../utils/helper';
import { RectOption, TextOption, textElement, stringToNumber, removeElement } from '../utils/helper';
import { LegendPosition, Alignment, LegendShape, ChartSeriesType, ChartShape } from '../../chart/utils/enum';
import { Legend } from '../../chart/legend/legend';
import { AccumulationType } from '../../accumulation-chart/model/enum';
import { AccumulationChart } from '../../accumulation-chart/accumulation';
import { AccumulationLegend } from '../../accumulation-chart/renderer/legend';

/**
 * Configures the location for legend.
 */
export class Location extends ChildProperty<Location>  {
    /**
     * X co-ordinate of legend in pixels.
     * @default 0.
     */
    @Property(0)
    public x: number;

    /**
     * Y co-ordinate of legend in pixels.
     * @default 0.
     */
    @Property(0)
    public y: number;
}
/**
 * Configures the legend in chart.
 */
export class LegendSettings extends ChildProperty<LegendSettings> {

    /**
     * If set true, legend will get visible.
     * @default true
     */
    @Property(true)
    public visible: boolean;

    /**
     * The height of the legend, in pixels.
     * @default null
     */
    @Property(null)
    public height: string;

    /**
     * The width of the legend, in pixels.
     * @default null
     */
    @Property(null)
    public width: string;

    /**
     * Specifies the location of legend, relative the chart. If x is 20, legend will move by 20 pixels to the right of the chart.
     * It requires `position` to be `Custom`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     */
    @Complex<LocationModel>({ x: 0, y: 0 }, Location)
    public location: LocationModel;

    /**
     * Position of the legend in chart. They are
     * * auto - Places the legend based on area type.
     * * top - Displays the legend on the top of chart.
     * * left - Displays the legend on the left of chart.
     * * bottom - Displays the legend on the bottom of chart.
     * * right - Displays the legend on the right of chart.
     * * custom - Displays the legend  based on given x and y value.
     * @default 'Auto'
     */
    @Property('Auto')
    public position: LegendPosition;

    /**
     * Option to customize the padding between legend item.
     * @default 8
     */
    @Property(8)
    public padding: number;

    /**
     * Alignment of the legend in chart. They are
     * * near - Align the legend to the left of chart.
     * * center - Align the legend to the center of chart.
     * * far - Align the legend to the right of chart.
     * @default 'Center'
     */
    @Property('Center')
    public alignment: Alignment;

    /**
     * Options to customize the legend text.
     */
    @Complex<FontModel>(Theme.legendLabelFont, Font)
    public textStyle: FontModel;

    /**
     * Shape height of legend in pixels.
     * @default 10
     */
    @Property(10)
    public shapeHeight: number;

    /**
     * Shape width of legend in pixels.
     * @default 10
     */
    @Property(10)
    public shapeWidth: number;

    /**
     * Options to customize the border of the legend.
     */
    @Complex<BorderModel>({}, Border)
    public border: BorderModel;

    /**
     * Padding between legend shape and text.
     * @default 5
     */
    @Property(5)
    public shapePadding: number;

    /**
     * The background color of the legend, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'transparent'
     */
    @Property('transparent')
    public background: string;

    /**
     * Opacity of the Legend.
     * @default 1
     */
    @Property(1)
    public opacity: number;

    /**
     * If set true, series visibility will be collapsed based on legend visibility.
     * @default true
     */
    @Property(true)
    public toggleVisibility: boolean;

    /**
     * Description for legend.
     * @default null
     */
    @Property(null)
    public description: string;

    /**
     * TabIndex value for the legend.
     * @default 3
     */
    @Property(3)
    public tabIndex: number;
}

export class BaseLegend {

    // Internal variables 
    protected chart: Chart | AccumulationChart;
    protected legend: LegendSettingsModel;
    protected maxItemHeight: number;
    protected isPaging: boolean;
    private clipPathHeight: number;
    protected totalPages: number;
    protected isVertical: boolean;
    private rowCount: number = 0; // legend row counts per page 
    private columnCount: number = 0; // legend column counts per page 
    private pageButtonSize: number = 8;
    protected pageXCollections: number[] = []; // pages of x locations
    protected maxColumns: number = 0;
    private isTrimmed: boolean = false;
    public maxWidth: number = 0;
    protected legendID: string;
    private clipRect: Element;
    private legendTranslateGroup: Element;
    private currentPage: number = 1;
    private isChartControl: boolean;
    protected library: Legend | AccumulationLegend;
    /**  @private */
    public position: LegendPosition;
    /**
     * Gets the legend bounds in chart.
     * @private
     */
    public legendBounds: Rect;
    /** @private */
    public legendCollections: LegendOptions[];
    /** @private */
    public clearTooltip: number;

    /**
     * Constructor for the dateTime module.
     * @private
     */
    constructor(chart?: Chart | AccumulationChart) {
        this.chart = chart;
        this.legend = chart.legendSettings;
        this.legendID = chart.element.id + '_chart_legend';
        this.isChartControl = (chart.getModuleName () === 'chart');
    }

    /**
     * Calculate the bounds for the legends.
     * @return {void}
     * @private
     */
    public calculateLegendBounds(rect: Rect, availableSize: Size): void {
        let legend: LegendSettingsModel = this.legend;
        this.getPosition(legend.position, availableSize);
        this.legendBounds = new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (this.position === 'Left' || this.position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height) || rect.height;
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        } else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.library.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(this.position, legend.alignment, this.legendBounds, rect, availableSize);
    }
    private getPosition(position: LegendPosition, availableSize: Size): void {
        if (this.isChartControl) {
            this.position = (position !== 'Auto') ? position : 'Bottom';
        } else {
            this.position = (position !== 'Auto') ? position :
            (availableSize.width > availableSize.height ? 'Right' : 'Bottom');
        }
    }
    protected setBounds(computedWidth: number, computedHeight: number, legend: LegendSettingsModel, legendBounds: Rect): void {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxItemHeight + legend.padding)));
    }
    private getLocation(position: LegendPosition, alignment: Alignment, legendBounds: Rect, rect: Rect, availableSize: Size): void {
        let padding: number = this.legend.border.width / 2;
        let legendHeight: number = legendBounds.height + padding;
        let legendWidth: number = legendBounds.width + padding;
        let marginTop: number = this.chart.margin.top;
        if (position === 'Bottom') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + (rect.height - legendHeight) + padding;
            subtractThickness(rect, new Thickness(0, 0, 0, legendHeight));
        } else if (position === 'Top') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y;
            subtractThickness(rect, new Thickness(0, 0, legendHeight, 0));
        } else if (position === 'Right') {
            legendBounds.x = rect.x + (rect.width - legendBounds.width);
            legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(0, legendWidth, 0, 0));
        } else if (position === 'Left') {
            legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(legendWidth, 0, 0, 0));
        } else {
            legendBounds.x = this.legend.location.x;
            legendBounds.y = this.legend.location.y;
            subtractThickness(rect, new Thickness(0, 0, 0, 0));
        }
    }
    private alignLegend(start: number, size: number, legendSize: number, alignment: Alignment): number {
        switch (alignment) {
            case 'Far':
                start = (size - legendSize) - start;
                break;
            case 'Center':
                start = ((size - legendSize) / 2);
                break;
        }
        return start;
    }

    /**
     * Renders the legend.
     * @return {void}
     * @private
     */
    public renderLegend(chart: Chart | AccumulationChart, legend: LegendSettingsModel, legendBounds: Rect): void {
        let firstLegend: number = this.findFirstLegendPosition(this.legendCollections);
        let padding: number = legend.padding;
        this.maxItemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
        let legendGroup: Element = chart.renderer.createGroup({ id: this.legendID + '_g' });
        let legendTranslateGroup: Element = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollections.length) {
            let legendSeriesGroup: Element; // legendItem group for each series group element
            let start: ChartLocation; // starting shape center x,y position && to resolve lint error used new line for declaration
            start = new ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2),
                                      legendBounds.y + padding + this.maxItemHeight / 2);
            let textOptions: TextOption = new TextOption('', start.x, start.y, 'start');
            //  initialization for totalPages legend click totalpage again calculate
            this.totalPages = this.isChartControl ? this.totalPages : 0;
            let textPadding: number = legend.shapePadding + padding + legend.shapeWidth;
            let count: number = 0;
            this.pageXCollections = [];
            this.legendCollections[firstLegend].location = start;
            let previousLegend: LegendOptions = this.legendCollections[firstLegend];
            for (let legendOption of this.legendCollections) {
                if (legendOption.render && legendOption.text !== '') {
                    legendSeriesGroup = chart.renderer.createGroup({
                        id: this.legendID + this.generateId(legendOption, '_g_', count)});
                    legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                    legendSeriesGroup.setAttribute('aria-label',
                                                   legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                    this.library.getRenderPoint(legendOption, start, textPadding, previousLegend, legendBounds, count, firstLegend);

                    this.renderSymbol(legendOption, legendSeriesGroup, count);

                    this.renderText(chart, legendOption, legendSeriesGroup, textOptions, count);

                    legendSeriesGroup.setAttribute('style', 'cursor: pointer');
                    legendTranslateGroup.appendChild(legendSeriesGroup);
                    previousLegend = legendOption;
                }
                count++;
            }
            if (this.isPaging) { this.renderPagingElements(chart, legendBounds, textOptions, legendGroup); }
        }
        chart.svgObject.appendChild(legendGroup);
    }
    private findFirstLegendPosition(legendCollection: LegendOptions[]): number {
        let count: number = 0;
        for ( let legend of legendCollection) {
            if (legend.render && legend.text !== '') {
                break;
            }
            count++;
        }
        return count;
    }
    private createLegendElements(chart: Chart | AccumulationChart, legendBounds: Rect, legendGroup: Element, legend: LegendSettingsModel,
                                 id: string): Element {
        let padding: number = legend.padding;
        let options: RectOption = new RectOption(id + '_element', legend.background, legend.border, legend.opacity, legendBounds);
        legendGroup.appendChild(chart.renderer.drawRectangle(options));
        let legendItemsGroup: Element = chart.renderer.createGroup({ id: id + '_collections' });
        legendGroup.appendChild(legendItemsGroup);
        this.legendTranslateGroup = chart.renderer.createGroup({ id: id + '_translate_g' });
        legendItemsGroup.appendChild(this.legendTranslateGroup);
        let clippath: Element = chart.renderer.createClipPath({ id: id + '_clipPath' });
        options.y += padding;
        options.id += '_clipPath_rect';
        options.width = (!this.isChartControl && this.isVertical) ? this.maxWidth - padding : legendBounds.width;
        this.clipRect = chart.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        chart.svgObject.appendChild(clippath);
        legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
        return this.legendTranslateGroup;
    }
    private renderSymbol(legendOption: LegendOptions, group: Element, i: number): void {
        let symbolColor: string = legendOption.visible ? legendOption.fill : '#D3D3D3';
        let shape: string = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
        shape = shape === 'Scatter' ? legendOption.markerShape : shape;
        let symbolOption: PathOption = new PathOption(
            this.legendID + this.generateId(legendOption, '_shape_', i), symbolColor, 1, symbolColor, 1, '', '');
        group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth, this.legend.shapeHeight), '',
                                     symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image' ||
        legendOption.type === <AccumulationType>'Doughnut') {
            symbolOption.id = this.legendID + this.generateId(legendOption, '_shape_marker_', i);
            shape = legendOption.type === <AccumulationType>'Doughnut' ? 'Circle' : legendOption.markerShape;
            symbolOption.fill = legendOption.type === <AccumulationType>'Doughnut' ? '#FFFFFF' : symbolOption.fill;
            group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth / 2, this.legend.shapeHeight / 2),
                                         '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        }
    }
    private renderText(chart: Chart | AccumulationChart, legendOption: LegendOptions, group: Element, textOptions: TextOption,
                       i: number): void {
        let legend: LegendSettingsModel = chart.legendSettings;
        let hiddenColor: string = '#D3D3D3';
        textOptions.id = this.legendID + this.generateId(legendOption, '_text_', i);
        let fontcolor: string = legendOption.visible ? legend.textStyle.color : hiddenColor;
        textOptions.text = legendOption.text;
        textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
        textOptions.y = legendOption.location.y + this.maxItemHeight / 4;
        let element : Element = textElement(textOptions, legend.textStyle, fontcolor, group);
        element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
    }
    private renderPagingElements(chart: Chart | AccumulationChart, bounds: Rect, textOption: TextOption, legendGroup: Element): void {
        let paginggroup: Element = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
        legendGroup.appendChild(paginggroup);
        let grayColor: string = '#545454';
        let legend: LegendSettingsModel = chart.legendSettings; // to solve parameter lint error, legend declaration is here
        let padding: number = legend.padding;
        if (this.isChartControl || !this.isVertical) {
            this.totalPages = Math.ceil(this.totalPages / Math.max(1, this.rowCount - 1));
        } else {
            this.totalPages = Math.ceil(this.totalPages / this.maxColumns);
        }
        let symbolOption: PathOption = new PathOption(this.legendID + '_pageup', 'transparent', 2, grayColor, 1, '', '');
        let iconSize: number = this.pageButtonSize;
        paginggroup.setAttribute('style', 'cursor: pointer');
        // Page left arrow drawing calculation started here
        this.clipPathHeight = (this.rowCount - 1) * (this.maxItemHeight + padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        let x: number = bounds.x + iconSize / 2;
        let y: number = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
        // Page numbering rendering calculation started here
        textOption.x = x + (iconSize / 2) + legend.padding;
        let size: Size = measureText(this.totalPages + '/' + this.totalPages, legend.textStyle);
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = '1/' + this.totalPages;
        let pageTextElement: Element = textElement(textOption, legend.textStyle, legend.textStyle.color, paginggroup);
        // Page right arrow rendering calculation started here
        x = (textOption.x + legend.padding + (iconSize / 2) + size.width);
        symbolOption.id = this.legendID + '_pagedown';
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'RightArrow', new Size(iconSize, iconSize), '', symbolOption,
                                           'RightArrow'));
        // placing the navigation buttons and page numbering in legend right corner
        paginggroup.setAttribute('transform', 'translate(' + (bounds.width - (2 * (iconSize + legend.padding) +
            legend.padding + size.width)) + ', ' + 0 + ')');
        this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
    }
    protected translatePage(pagingText: Element, page: number, pageNumber: number): void {
        let size: number = (this.clipPathHeight) * page;
        let translate: string = 'translate(0,-' + size + ')';
        if (!this.isChartControl && this.isVertical) {
            let pageLength: number = page * this.maxColumns;
            size = this.pageXCollections[page * this.maxColumns] - this.legendBounds.x;
            size = size < 0 ? 0 : size; // to avoid small pixel variation
            translate = 'translate(-' + size + ',0)';
        }
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = (pageNumber) + '/' + this.totalPages;
        this.currentPage = pageNumber;
    }
    protected changePage(event: Event, pageUp: boolean): void {
        let pageText: Element = document.getElementById(this.legendID + '_pagenumber');
        let page: number = parseInt(pageText.textContent.split('/')[0], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        } else if (!pageUp && page < this.totalPages) {
            this.translatePage(pageText, page, (page + 1));
        }
    }
    /** @private */
    public generateId(option: LegendOptions, prefix: string, count: number, ): string {
        if (this.isChartControl) {
           return prefix + count;
        } else {
           return prefix + option.pointIndex;
        }
    }
    /** @private */
    public showText(text: string, x: number, y: number): void {
        let id: string = 'EJ2_legend_tooltip';
        let tooltip: HTMLElement = document.getElementById(id);
        if (!tooltip) {
            tooltip = createElement('div', {
                innerHTML: text,
                id: id,
                styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background-color: rgb(255, 255, 255);' +
                'position:fixed;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
                'padding-bottom : 2px; font-size:12px; font-family: "Segoe UI"'
            });
            document.body.appendChild(tooltip);
        }
    }
    /** @private */
    public fadeOutTooltip(): void {
        clearTimeout(this.clearTooltip);
        this.clearTooltip = setTimeout(this.removeTooltip, 1500);
    }
    /** @private */
    public removeTooltip(): void {
        removeElement('EJ2_legend_tooltip');
    }
    /**
     * To change the pages of the legend. 
     * @return {void}
     * @private
     */
    public move(event: Event, x: number, y: number): void {
        if ((<HTMLElement>event.target).textContent.indexOf('...') > -1) {
            let targetId: string[] = (<HTMLElement>event.target).id.split(this.legendID + '_text_');
            if (targetId.length === 2) {
                let index: number = parseInt(targetId[1], 10);
                if (!isNaN(index)) {
                    if (this.isChartControl) {
                        this.showText((<Chart>this.chart).series[index].name, x, y);
                    } else {
                        this.showText((<AccumulationChart>this.chart).visibleSeries[0].points[index].x.toString(), x, y);
                    }
                }
            }
        } else {
            removeElement('EJ2_legend_tooltip');
        }
    }
}
 /** @private */
export class LegendOptions {
    public render: boolean;
    public text: string;
    public fill: string;
    public shape: LegendShape;
    public visible: boolean;
    public type: ChartSeriesType | AccumulationType;
    public textSize: Size;
    public location: ChartLocation = { x: 0, y: 0 };
    public pointIndex?: number;
    public seriesIndex?: number;
    public markerShape?: ChartShape;
    public markerVisibility?: boolean;
    constructor(
        text: string, fill: string, shape: LegendShape, visible: boolean, type: ChartSeriesType | AccumulationType,
        markerShape?: ChartShape, markerVisibility?: boolean, pointIndex?: number, seriesIndex?: number
        ) {
        this.text =  text;
        this.fill = fill;
        this.shape = shape;
        this.visible =  visible;
        this.type = type;
        this.markerVisibility = markerVisibility;
        this.markerShape = markerShape;
        this.pointIndex = pointIndex;
        this.seriesIndex = seriesIndex;
    }
}