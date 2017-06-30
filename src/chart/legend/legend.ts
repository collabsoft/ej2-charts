import { Property, Complex, ChildProperty, Event } from '@syncfusion/ej2-base';
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { extend} from '@syncfusion/ej2-base/util';
import { Chart } from '../chart';
import { ILegendRenderEventArgs } from '../model/interface';
import { legendRender } from '../model/constants';
import { LegendSettingsModel, LocationModel } from './legend-model';
import { Font, Border } from '../model/base';
import { Theme } from '../model/theme';
import { SeriesModel } from '../series/chart-series-model';
import { Series } from '../series/chart-series';
import { FontModel, BorderModel } from '../model/base-model';
import { Size, Rect, subtractThickness, Thickness, drawSymbol, measureText, ChartLocation, PathOption } from '../utils/helper';
import { RectOption, TextOption, textElement, textTrim, stringToNumber } from '../utils/helper';
import { LegendPosition, Alignment, LegendShape, ChartSeriesType, ChartShape } from '../utils/enum';
import { Indexes } from '../user-interaction/selection';

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

export class Legend {

    // Internal variables
    private chart: Chart;
    private legend: LegendSettingsModel;
    private maxitemHeight: number;
    private isPaging: boolean;
    private clipPathHeight: number;
    private totalpages: number;
    private isVertical: boolean;
    private rowCount: number = 0; // legend row counts per page
    private columnCount: number = 0; // legend column counts per page
    private pageButtonSize: number = 8;
    private pageXCollection: number[] = []; // pages of x locations
    private isTrimmed: boolean = false;
    private maxWidth: number = 0;
    private legendID: string;
    private maxsize: number;
    private clipRect: Element;
    private legendTranslateGroup: Element;
    private currentPage: number = 1;
    /**
     * Gets the legend bounds in chart.
     * @private
     */
    public legendBounds: Rect;
    /** @private */
    public legendCollections: LegendOptions[];

    /**
     * Constructor for the dateTime module.
     * @private
     */
    constructor(chart?: Chart) {
        this.chart = chart;
        this.legend = chart.legendSettings;
        this.legendID = chart.element.id + '_chart_legend';
    }
    /**
     * Get the legend options.
     * @return {void}
     * @private
     */
    public getLegendOptions(visibleSeriesCollection: Series[]): void {
        this.legendCollections = [];
        for (let series of visibleSeriesCollection) {
            this.legendCollections.push(new LegendOptions(series));
        }
    }

    /**
     * Calculate the bounds for the legends.
     * @return {void}
     * @private
     */
    public calculateLegendBounds(rect: Rect, availableSize: Size): void {
        let legend: LegendSettingsModel = this.legend;
        let position: LegendPosition = (legend.position !== 'Auto') ? legend.position : 'Bottom';
        this.legendBounds = new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (position === 'Left' || position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height) ||
                (rect.height + rect.y - this.chart.margin.top);
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        } else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(position, legend.alignment, this.legendBounds, rect, availableSize);
    }
    private getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void {
        let padding: number = legend.padding;
        let extraHeight: number = 0;
        let extraWidth: number = 0;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        } else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.height += extraHeight;
        legendBounds.width += extraWidth;
        let shapeHeight: number = legend.shapeHeight;
        let shapeWidth: number = legend.shapeWidth;
        let shapePadding: number = legend.shapePadding;
        let maximumWidth: number = 0;
        let rowWidth: number = 0;
        let legendWidth: number = 0;
        let columnHeight: number = 0;
        let rowCount: number = 0;
        let legendEventArgs: ILegendRenderEventArgs;
        this.maxitemHeight = Math.max(measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
        let render: boolean = false;
        for (let legendOption of this.legendCollections) {
            legendEventArgs = { fill: legendOption.fill, text : legendOption.text, shape : legendOption.shape,
                                markerShape: legendOption.markerShape, name: legendRender, cancel: false };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.markerShape = legendEventArgs.markerShape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + legendOption.textSize.width + padding;
                rowWidth = rowWidth + legendWidth;
                if (legendBounds.width < (padding + rowWidth) || this.isVertical) {
                    maximumWidth = Math.max(maximumWidth, (rowWidth + padding - (this.isVertical ? 0 : legendWidth)));
                    if (rowCount === 0 && (legendWidth !== rowWidth)) {
                        rowCount = 1;
                    }
                    rowWidth = this.isVertical ? 0 : legendWidth;
                    rowCount++;
                    columnHeight = (rowCount * (this.maxitemHeight + padding)) + padding;
                }
            }
        }
        columnHeight = Math.max(columnHeight, (this.maxitemHeight + padding) + padding);
        this.isPaging = legendBounds.height < columnHeight;
        this.totalpages = rowCount;
        if (render) {
            this.setbounds(Math.max((rowWidth + padding), maximumWidth), legend, columnHeight, legendBounds);
        } else {
            this.setbounds(0, legend, 0, legendBounds);
        }
    }
    private setbounds(computedWidth: number, legend: LegendSettingsModel, computedHeight: number, legendBounds: Rect): void {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxitemHeight + legend.padding)));
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
    public renderLegend(chart: Chart, legend: LegendSettingsModel, legendBounds: Rect): void {
        let firstLegend: number = this.findFirstLegendPosition(this.legendCollections);
        let padding: number = legend.padding;
        this.maxitemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
        let legendGroup: Element = chart.renderer.createGroup({ id: this.legendID + '_g' });
        let legendTranslateGroup: Element = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollections.length) {
            let legendSeriesGroup: Element; // legendItem group for each series group element
            let start: ChartLocation; // starting shape center x,y position && to resolve lint error used new line for declaration
            start = new ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2),
                                      legendBounds.y + padding + this.maxitemHeight / 2);
            let textOptions: TextOption = new TextOption('', start.x, start.y, 'start');
            this.maxsize = 0;
            let textPadding: number = legend.shapePadding + padding + legend.shapeWidth;
            let count: number = 0;
            this.pageXCollection[0] = 0;
            this.legendCollections[firstLegend].location = start;
            let previousLegend: LegendOptions = this.legendCollections[firstLegend];
            for (let legendOption of this.legendCollections) {
                if (legendOption.render && legendOption.text !== '') {
                    legendSeriesGroup = chart.renderer.createGroup({ id: this.legendID + '_series_' + count });
                    legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                    legendSeriesGroup.setAttribute('aria-label',
                                                   legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                    this.getRenderPoint(legendOption, start.x, textPadding, previousLegend, legendBounds, count, firstLegend);

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
    private createLegendElements(chart: Chart, legendBounds: Rect, legendGroup: Element, legend: LegendSettingsModel, id: string): Element {
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
        this.clipRect = chart.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        chart.svgObject.appendChild(clippath);
        legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
        return this.legendTranslateGroup;
    }
    private getRenderPoint(legendOption: LegendOptions, x: number, textPadding: number, prevLegend: LegendOptions, rect: Rect,
                           count: number, firstLegend: number): void {
        let padding: number = this.legend.padding;
        let previousBound: number = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
        if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
            this.isVertical) {
            legendOption.location.x = x;
            legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + this.maxitemHeight + padding;
        } else {
            legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            legendOption.location.y = prevLegend.location.y;
        }
        let availwidth: number = (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
            textPadding - this.legend.shapeWidth / 2);
        legendOption.text = textTrim(availwidth, legendOption.text, this.legend.textStyle);
    }
    private renderSymbol(legendOption: LegendOptions, group: Element, i: number): void {
        let symbolColor: string = legendOption.visible ? legendOption.fill : '#D3D3D3';
        let shape: string = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
        shape = shape === 'Scatter' ? legendOption.markerShape : shape;
        let symbolOption: PathOption = new PathOption(this.legendID + '_shape_series_' + i, symbolColor, 1, symbolColor, 1, '', '');
        group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth, this.legend.shapeHeight), '',
                                     symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image') {
            symbolOption.id = this.legendID + '_shape_series_marker' + i;
            shape = legendOption.markerShape;
            group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth / 3, this.legend.shapeHeight / 2),
                                         '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        }
    }
    private renderText(chart: Chart, legendOption: LegendOptions, group: Element, textOptions: TextOption, i: number): void {
        let legend: LegendSettingsModel = chart.legendSettings;
        let hiddenColor: string = '#D3D3D3';
        textOptions.id = this.legendID + '_text_series_' + i;
        let fontcolor: string = legendOption.visible ? legend.textStyle.color : hiddenColor;
        textOptions.text = legendOption.text;
        textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
        textOptions.y = legendOption.location.y + this.maxitemHeight / 4;
        let element : Element = textElement(textOptions, legend.textStyle, fontcolor, group);
        element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
    }
    private renderPagingElements(chart: Chart, bounds: Rect, textOption: TextOption, legendGroup: Element): void {
        let paginggroup: Element = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
        legendGroup.appendChild(paginggroup);
        let grayColor: string = '#545454';
        let legend: LegendSettingsModel = chart.legendSettings; // to solve parameter lint error, legend declaration is here
        let padding: number = legend.padding;
        this.totalpages = Math.ceil(this.totalpages / Math.max(1, this.rowCount - 1));
        let symbolOption: PathOption = new PathOption(this.legendID + '_pageup', 'transparent', 2, grayColor, 1, '', '');
        let iconSize: number = this.pageButtonSize;
        paginggroup.setAttribute('style', 'cursor: pointer');
        // Page left arrow drawing calculation started here
        this.clipPathHeight = (this.rowCount - 1) * (this.maxitemHeight + padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        let x: number = bounds.x + iconSize / 2;
        let y: number = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
        // Page numbering rendering calculation started here
        textOption.x = x + (iconSize / 2) + legend.padding;
        let size: Size = measureText(this.totalpages + '/' + this.totalpages, legend.textStyle);
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = '1/' + this.totalpages;
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

    private showText(event: MouseEvent, seriesIndex: number, x: number, y: number): void {
        let series: SeriesModel = this.chart.series[seriesIndex];
        let id: string = 'EJ2_legend_tooltip';
        let tooltip: HTMLElement = document.getElementById(id);
        if (!tooltip) {
            tooltip = createElement('div', {
                id: id,
                innerHTML: series.name,
                styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background:white;' +
                'position:fixed;border:1px solid ' + (<Series>series).interior + ';',
            });
            document.body.appendChild(tooltip);
        }
    }
    private removeText(): void { // need to create commoon function
        let tooltip: Element = document.getElementById('EJ2_legend_tooltip');
        if (tooltip) {
            document.body.removeChild(tooltip);
        }
    }
    private changePage(event: Event, pageUp: boolean): void {
        let pageText: Element = document.getElementById(this.legendID + '_pagenumber');
        let page: number = parseInt(pageText.textContent.split('/')[0], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        } else if (!pageUp && page < this.totalpages) {
            this.translatePage(pageText, page, (page + 1));
        }
    }
    private translatePage(pagingText: Element, page: number, pagenumber: number): void {
        let height: number = (this.clipPathHeight) * page;
        let translate: string = 'translate(0,-' + height + ')';
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = (pagenumber) + '/' + this.totalpages;
        this.currentPage = pagenumber;
    }
    private LegendClick(seriesIndex: number): void {
        let chart: Chart = this.chart;
        let series: Series = chart.visibleSeries[seriesIndex];
        let legend: LegendOptions = this.legendCollections[seriesIndex];
        let selectedDataIndexes: Indexes[] = [];
        if (chart.selectionModule) {
            selectedDataIndexes = <Indexes[]>extend([], chart.selectionModule.selectedDataIndexes, null, true);
        }
        if (chart.legendSettings.toggleVisibility) {
            if (!series.visible) {
                series.visible = true;
            } else {
                series.visible = false;
            }
            legend.visible = (series.visible);
            chart.loaded = null;
            if (chart.svgObject.childNodes.length > 0) {
                while (chart.svgObject.lastChild) {
                    chart.svgObject.removeChild(chart.svgObject.lastChild);
                }
                remove(chart.svgObject);
            }
            chart.animateSeries = false;
            chart.removeSvg();
            chart.refreshAxis();
            series.refreshAxisLabel();
            this.refreshSeries(chart.visibleSeries);
            chart.refreshBound();
            if (selectedDataIndexes.length > 0) {
                chart.selectionModule.selectedDataIndexes = selectedDataIndexes;
                chart.selectionModule.redrawSelection(chart, chart.selectionMode);
            }
        } else if (chart.selectionModule) {
            chart.selectionModule.legendSelection(chart, seriesIndex);
        }
    }
    private refreshSeries(seriesCollection: Series[]): void {
        for (let series of seriesCollection) {
            series.position = undefined;
        }
    }
    /**
     * To show the tooltip for the trimmed text in legend.
     * @return {void}
     * @private
     */
    public click(event: Event): void {
        let targetId: string = (<HTMLElement>event.target).id;
        let legendItemsId: string[] = [this.legendID + '_text_series_', this.legendID + '_shape_series_marker',
        this.legendID + '_shape_series_'];
        let seriesIndex: number;
        for (let id of legendItemsId) {
            if (targetId.indexOf(id) > -1) {
                seriesIndex = parseInt(targetId.split(id)[1], 10);
                this.LegendClick(seriesIndex);
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        } else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
    }
    /**
     * To change the pages of the legend.
     * @return {void}
     * @private
     */
    public move(event: Event, x: number, y: number): void {
        if ((<HTMLElement>event.target).textContent.indexOf('...') > -1) {
            let targetId: string = (<HTMLElement>event.target).id;
            let seriesIndex: number = parseInt(targetId.split(this.legendID + '_text_series_')[1], 10);
            if (!isNaN(seriesIndex)) {
                this.showText(<MouseEvent>event, seriesIndex, x, y);
            }
        } else {
            this.removeText();
        }
    }

    /**
     * Get module name
     */
    protected getModuleName(): string {
        return 'Legend';
    }

    /**
     * To destroy the Legend.
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method calling here
         */
    }

}
 /** @private */
export class LegendOptions {
    public render: boolean;
    public text: string;
    public fill: string;
    public shape: LegendShape;
    public visible: boolean;
    public markerVisibility: boolean;
    public type: ChartSeriesType;
    public markerShape: ChartShape;
    public textSize: Size;
    public location: ChartLocation = { x: 0, y: 0 };
    constructor(series: Series) {
        this.text = series.name;
        this.fill = series.interior;
        this.shape = series.legendShape;
        this.visible = (series.visible);
        this.markerVisibility = series.marker.visible;
        this.type = series.type;
        this.markerShape = series.marker.shape;
    }
}