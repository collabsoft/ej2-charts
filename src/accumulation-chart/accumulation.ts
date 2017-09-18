/**
 * AccumulationChart file
 */
import {Property, Component, Complex, Collection, NotifyPropertyChanges, INotifyPropertyChanged, SvgRenderer} from '@syncfusion/ej2-base';
import {ModuleDeclaration, Internationalization, Event, EmitType, Browser, EventHandler, Touch} from '@syncfusion/ej2-base';
import { remove, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { AccumulationChartModel } from './accumulation-model';
import { Font, Margin, Border, Indexes } from '../common/model/base';
import { AccumulationSeries, AccPoints, AccumulationTooltipSettings } from './model/acc-base';
import { AccumulationType, AccumulationSelectionMode } from './model/enum';
import { IAccSeriesRenderEventArgs, IAccTextRenderEventArgs, IAccTooltipRenderEventArgs} from './model/pie-interface';
import { IAccAnimationCompleteEventArgs, IAccPointRenderEventArgs, IAccLoadedEventArgs, IAccResizeEventArgs} from './model/pie-interface';
import { Theme } from '../common/model/theme';
import { ILegendRenderEventArgs, IMouseEventArgs} from '../common/model/interface';
import { load, seriesRender, legendRender, textRender, tooltipRender, chartMouseClick, chartMouseDown} from '../common/model/constants';
import { chartMouseLeave, chartMouseMove, chartMouseUp, resized} from '../common/model/constants';
import { FontModel, MarginModel, BorderModel, IndexesModel} from '../common/model/base-model';
import { AccumulationSeriesModel, AccumulationTooltipSettingsModel } from './model/acc-base-model';
import { LegendSettings} from '../common/legend/legend';
import { AccumulationLegend} from './renderer/legend';
import { LegendSettingsModel} from '../common/legend/legend-model';
import { Rect, ChartLocation, Size, subtractRect, measureText, RectOption, textTrim, showTooltip} from '../common/utils/helper';
import { textElement, TextOption, createSvg, calculateSize, removeElement } from '../common/utils/helper';
import { Data} from '../common/model/data';
import { AccumulationTooltip} from './user-interaction/tooltip';
import { PieSeries } from './renderer/pie-series';
import { AccumulationDataLabel} from './renderer/dataLabel';
import { AccumulationSelection } from './user-interaction/selection';
import { AccumulationTheme } from './model/enum';

@NotifyPropertyChanges
export class AccumulationChart extends Component<HTMLElement> implements INotifyPropertyChanged {

// Module declarations
    /**
     * `pieSeriesModule` is used to render pie series.
     * @private
     */
    public pieSeriesModule: PieSeries;

    /**
     * `accumulationLegendModule` is used to manipulate and add legend in accumulation chart.
     */
    public accumulationLegendModule: AccumulationLegend;

    /**
     * `accumulationDataLabelModule` is used to manipulate and add dataLabel in accumulation chart.
     */
    public accumulationDataLabelModule: AccumulationDataLabel;

    /**
     * `accumulationTooltipModule` is used to manipulate and add tooltip in accumulation chart.
     */
    public accumulationTooltipModule: AccumulationTooltip;
    /**
     * `accumulationSelectionModule` is used to manipulate and add selection in accumulation chart.
     */
    public accumulationSelectionModule: AccumulationSelection;

// Property declarations goes here

    /**
     * The width of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full width of its parent element.
     * @default null
     */

    @Property(null)
    public width: string;

    /**
     * The height of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full height of its parent element.
     * @default null
     */

    @Property(null)
    public height: string;

    /**
     * Title for accumulation chart
     * @default null
     */
    @Property(null)
    public title: string;

    /**
     * Options for customizing the `title` of accumulation chart.
     */

    @Complex<FontModel>(Theme.chartTitleFont, Font)
    public titleStyle: FontModel;

    /**
     * Options for customizing the legend of accumulation chart.
     */
    @Complex<LegendSettingsModel>({}, LegendSettings)
    public legendSettings: LegendSettingsModel;

    /**
     * Options for customizing the tooltip of accumulation chart.
     */

    @Complex<AccumulationTooltipSettingsModel>({}, AccumulationTooltipSettings)
    public tooltip: AccumulationTooltipSettingsModel;

    /**
     * Specifies whether point has to get selected or not. Takes value either 'None 'or 'Point'
     * @default None
     */
    @Property('None')
    public selectionMode: AccumulationSelectionMode;

    /**
     * If set true, enables the multi selection in accumulation chart. It requires `selectionMode` to be `Point`.
     * @default false
     */
    @Property(false)
    public isMultiSelect: boolean;

    /**
     * Specifies the point indexes to be selected while loading a accumulation chart.
     * It requires `selectionMode` to be `Point`.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let pie: AccumulationChart = new AccumulationChart({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * pie.appendTo('#Pie');
     * ```
     * @default []
     */
    @Collection<IndexesModel>([], Indexes)
    public selectedDataIndexes: IndexesModel[];

    /**
     *  Options to customize the left, right, top and bottom margins of accumulation chart.
     */

    @Complex<MarginModel>({}, Margin)
    public margin: MarginModel;

    /**
     * If set true, labels for the point will be placed smartly without overlapping.
     * @default 'true'
     */
    @Property(true)
    public enableSmartLabels: boolean;

    /**
     * Options for customizing the color and width of the chart border.
     */

    @Complex<BorderModel>({ color: '#DDDDDD', width: 0 }, Border)
    public border: BorderModel;

    /**
     * The background color of the chart, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'transparent'
     */
    @Property(Theme.chartBackgroundColor)
    public background: string;

    /**
     * The configuration for series in accumulation chart.
     */

    @Collection<AccumulationSeriesModel>([{}], AccumulationSeries)
    public series: AccumulationSeriesModel[];

    /**
     * Specifies the theme for accumulation chart.
     */
    @Property('Material')
    public theme: AccumulationTheme;

    /**
     * Triggers after accumulation chart loaded.
     * @event
     */
    @Event()
    public loaded: EmitType<IAccLoadedEventArgs>;

    /**
     * Triggers before accumulation chart load.
     * @event
     */
    @Event()
    public load: EmitType<IAccLoadedEventArgs>;

    /**
     * Triggers before the series gets rendered.
     * @event
     */
    @Event()
    public seriesRender: EmitType<IAccSeriesRenderEventArgs>;

    /**
     * Triggers before the legend gets rendered.
     * @event
     */
    @Event()
    public legendRender: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series gets rendered.
     * @event
     */
    @Event()
    public textRender: EmitType<IAccTextRenderEventArgs>;

    /**
     * Triggers before the tooltip for series gets rendered.
     * @event
     */
    @Event()
    public tooltipRender: EmitType<IAccTooltipRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.
     * @event
     */

    @Event()
    public pointRender: EmitType<IAccPointRenderEventArgs>;

    /**
     * Triggers on hovering the accumulation chart.
     * @event
     */

    @Event()
    public chartMouseMove : EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the accumulation chart.
     * @event
     */

    @Event()
    public chartMouseClick : EmitType<IMouseEventArgs>;

    /**
     * Triggers after animation gets completed for series.
     * @event
     */
    @Event()
    public animationComplete: EmitType<IAccAnimationCompleteEventArgs>;

    /**
     * Triggers on mouse down.
     * @event
     */

    @Event()
    public chartMouseDown : EmitType<IMouseEventArgs>;

    /**
     * Triggers while cursor leaves the accumulation chart.
     * @event
     */

    @Event()
    public chartMouseLeave : EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.
     * @event
     */

    @Event()
    public chartMouseUp : EmitType<IMouseEventArgs>;

    /**
     * Triggers after window resize.
     * @event
     */

    @Event()
    public resized: EmitType<IAccResizeEventArgs>;


// internal properties for Accumulation charts
    /** @private */
    public svgObject: Element;
    /** @private */
    public initialClipRect: Rect;
    /** @private */
    public availableSize: Size;
    /** @private */
    public renderer: SvgRenderer;
    /** @private */
    public intl: Internationalization;
    /** @private */
    public visibleSeries: AccumulationSeries[];
    /** @private */
    public seriesCounts: number;
    /** @private explode radius internal property */
    public explodeDistance: number = 0;
    private mouseX: number;
    private mouseY: number;
    private resizeTo: number;
    /** @private */
    public center: ChartLocation;
    /** @private */
    public type: AccumulationType = 'Pie';
    /** @private */
    public isTouch: boolean;
    /** @private */
    public animateSeries: boolean;
// constructor for accumulation chart
    constructor(options?: AccumulationChartModel, element?: string | HTMLElement) {
        super(options, element);
    }

// accumulation chart methods

    /**
     *  To create svg object, renderer and binding events for the container.
     */
    protected preRender(): void {
        this.unWireEvents();
        this.setCulture();
        this.animateSeries = true;
        calculateSize(this);
        this.wireEvents();
    }
    /**
     * To render the accumulation chart elements
     */
    protected render(): void {

        this.trigger(load, { accumulation: this });

        this.calculateAreaType();

        this.calculateVisibleSeries();

        this.processData();
    }
    /**
     * Method to unbind events for accumulation chart
     */

    private unWireEvents(): void {
        /*! Find the Events type */
        let isIE11Pointer: Boolean = Browser.isPointer;

        let start: string = Browser.touchStartEvent;
        let move: string = Browser.touchMoveEvent;
        let stop: string = Browser.touchEndEvent;
        let cancel: string = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */

        EventHandler.remove(this.element, move, this.accumulationMouseMove);
        EventHandler.remove(this.element, stop, this.accumulationMouseEnd);
        EventHandler.remove(this.element, start, this.accumulationMouseStart);
        EventHandler.remove(this.element, 'click', this.accumulationOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.accumulationRightClick);
        EventHandler.remove(this.element, cancel, this.accumulationMouseLeave);
        EventHandler.remove(
            <HTMLElement & Window>window,
            (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize',
            this.accumulationResize
        );

    }
    /**
     * Method to bind events for the accumulation chart
     */
    private wireEvents(): void {
        /*! Find the Events type */

        let isIE11Pointer: Boolean = Browser.isPointer;
        let start: string = Browser.touchStartEvent;
        let stop: string = Browser.touchEndEvent;
        let move: string = Browser.touchMoveEvent;
        let cancel: string = isIE11Pointer ? 'pointerleave' : 'mouseleave';

        /*! Bind the Event handler */
        EventHandler.add(this.element, move, this.accumulationMouseMove, this);
        EventHandler.add(this.element, stop, this.accumulationMouseEnd, this);
        EventHandler.add(this.element, start, this.accumulationMouseStart, this);
        EventHandler.add(this.element, 'click', this.accumulationOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.accumulationRightClick, this);
        EventHandler.add(this.element, cancel, this.accumulationMouseLeave, this);

        EventHandler.add(
            <HTMLElement & Window>window,
            (Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize',
            this.accumulationResize, this
        );
        new Touch(this.element); // To avoid geasture blocking for browser
        /*! Apply the style for chart */
        this.setStyle(<HTMLElement>this.element);
    }
    /**
     * Method to set mouse x, y from events
     */
    private setMouseXY(e: PointerEvent): void {
        let pageX: number;
        let pageY: number;
        if (e.type.indexOf('touch') > -1) {
            this.isTouch = true;
            let touchArg: TouchEvent = <TouchEvent & PointerEvent>e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        } else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseY = pageY;
        this.mouseX = pageX;
    }
    /**
     * Handles the mouse end. 
     * @return {boolean}
     * @private
     */
    public accumulationMouseEnd(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseUp , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            if (this.accumulationTooltipModule && this.accumulationTooltipModule.tooltip) {
                this.pieSeriesModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
                this.accumulationTooltipModule.fadeOutTooltip();
            }
            if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible) {
                this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.move(e, this.mouseX, this.mouseY, this.isTouch);
            }
        }
        return false;
    }
    /**
     * Handles the mouse start. 
     * @return {boolean}
     * @private
     */
    public accumulationMouseStart(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseDown, {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        return false;
    }
    /**
     * Handles the accumulation chart resize. 
     * @return {boolean}
     * @private
     */
    public accumulationResize(e: Event): boolean {
        let args: IAccResizeEventArgs = {
            accumulation: this,
            previousSize: new Size(
                this.availableSize.width,
                this.availableSize.height
            ),
            name: resized,
            currentSize: new Size(0, 0)
        };

        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(
            (): void => {
                args.currentSize = this.availableSize;
                this.trigger(resized, args);
                this.refreshSeries();
                this.refreshChart();
            },
            500);
        return false;
    }
    /**
     * Applying styles for accumulation chart element
     */
    private setStyle(element: HTMLElement): void {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    }

    /**
     * Handles the mouse move on accumulation chart. 
     * @return {boolean}
     * @private
     */
    public accumulationMouseMove(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseMove , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.accumulationDataLabelModule && this.visibleSeries[0] && this.visibleSeries[0].dataLabel.visible) {
            this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
        }
        if (this.accumulationTooltipModule && this.pieSeriesModule && this.tooltip.enable && !this.isTouch) {
            this.pieSeriesModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
        }

        return false;
    }
    public titleTooltip(event: Event, x: number, y: number, isTouch? : boolean): void {
        let targetId: string = (<HTMLElement>event.target).id;
        if (((<HTMLElement>event.target).textContent.indexOf('...') > -1) && (targetId === (this.element.id + '_title'))) {
                showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', isTouch);
        } else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    }

    /**
     * Handles the mouse click on accumulation chart. 
     * @return {boolean}
     * @private
     */
    public accumulationOnMouseClick(e: PointerEvent): boolean {
        this.setMouseXY(e);
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
            this.accumulationSelectionModule.calculateSelectedElements(this, e);
        }
        if (this.visibleSeries[0].explode) {
            this.pieSeriesModule.processExplode(e);
        }
        this.trigger(chartMouseClick , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        return false;
    }

    /**
     * Handles the mouse right click on accumulation chart. 
     * @return {boolean}
     * @private
     */
    public accumulationRightClick(event: MouseEvent | PointerEvent): boolean {
        if (event.buttons === 2 || (<PointerEvent>event).pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    }

    /**
     * Handles the mouse leave on accumulation chart. 
     * @return {boolean}
     * @private
     */
    public accumulationMouseLeave(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseLeave , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        if (this.accumulationTooltipModule && this.tooltip.enable) {
            this.accumulationTooltipModule.tooltip.close();
        }
        return false;
    }
    /**
     * Method to set culture for chart
     */

    private setCulture(): void {
        this.intl = new Internationalization();
    }
    /**
     * Method to create SVG element for accumulation chart.
     */

    private createPieSvg(): void {
        this.removeSvg();
        createSvg(this);
    }
    /**
     * To Remove the SVG from accumulation chart. 
     * @return {boolean}
     * @private
     */
    public removeSvg(): void {
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        removeElement('EJ2_legend_tooltip');
        removeElement('EJ2_datalabel_tooltip');
    }
    /**
     * Method to calculate area type based on series
     */
    private calculateAreaType(): void {
        let series: AccumulationSeriesModel = this.series[0];
        if (series) {
            this.type = series.type;
        }
        this.pieSeriesModule = new PieSeries();
    }
    /**
     * Method to find visible series based on series types
     */
    private calculateVisibleSeries(): void {
        this.visibleSeries = [];
        for (let i: number = 0, length: number = this.series.length; i < length; i++) {
            (this.series[i] as AccumulationSeries).index = i;
            if (this.series[i].type === this.type && this.visibleSeries.length === 0) {
                this.visibleSeries.push(this.series[i] as AccumulationSeries);
                break;
            }
        }
    }
    /**
     * To find points from dataSource
     */
    private processData(): void {
        this.seriesCounts = 0;
        for (let series of this.visibleSeries) {
            series.dataModule = new Data(series.dataSource, series.query);
            series.refreshDataManager(this);
        }
    }
    /**
     * To refresh the accumulation chart
     * @private
     */
    public refreshChart(): void {
        this.doGrouppingProcess();
        this.createPieSvg();
        this.calculateBounds();
        this.renderElements();
    }
    /**
     * Method to find groupped points
     */
    private doGrouppingProcess(): void {
        let series: AccumulationSeries = this.visibleSeries[0];
        if (!isNullOrUndefined(series.resultData) && ((!isNullOrUndefined(series.lastGroupTo) &&
            series.lastGroupTo !== series.groupTo))) {
            series.getPoints(series.resultData, this);
        }
    }
    /**
     * Method to calculate bounds for accumulation chart
     */
    private calculateBounds(): void {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        subtractRect(this.initialClipRect, new Rect(0, measureText(this.title, this.titleStyle).height,
                                                    this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
        this.calculateLegendBounds();

    }
    /*
     * Method to calculate legend bounds for accumulation chart
     */
    private calculateLegendBounds(): void {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        this.accumulationLegendModule.getLegendOptions(this, <AccumulationSeries[]>this.visibleSeries);
        this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
    }
    /**
     * To render elements for accumulation chart
     * @private
     */
    public renderElements(): void {

        this.renderBorder();

        this.renderTitle();

        this.renderSeries();

        this.renderLegend();

        this.element.appendChild(this.svgObject);

        this.processSelection();

        this.processExplode();

        this.trigger('loaded', {accumulation: this});

        this.animateSeries = false;
    }
    /**
     * Method to process the explode in accumulation chart
     */
    private processExplode(): void {
        if (!this.visibleSeries[0].explode) {
            return null;
        }
        this.pieSeriesModule.invokeExplode();
    }
    /**
     * Method to render series for accumulation chart
     */
    private renderSeries(): void {
        this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection'}));
        for (let i: number = 0, length: number = this.visibleSeries.length; i < length; i++) {
            if (this.visibleSeries[i].visible) {
                this.pieSeriesModule.initProperties(this, this.visibleSeries[i]);
                this.visibleSeries[i].renderSeries(this);
            }
        }
    }
    /**
     * Method to render border for accumulation chart
     */
    private renderBorder(): void {
        let padding: number = this.border.width;
        this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(
            this.element.id + '_border', this.background, this.border, 1,
            new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding)
        )));
    }
    /**
     * Method to render legend for accumulation chart
     */
    private renderLegend(): void {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        if (this.accumulationLegendModule.legendCollections.length) {
            this.accumulationLegendModule.getSmartLegendLocation(
                this.visibleSeries[0].labelBound, this.accumulationLegendModule.legendBounds, this.margin);
            this.accumulationLegendModule.renderLegend(this, this.legendSettings, this.accumulationLegendModule.legendBounds);
        }
    }
    /**
     * To process the selection in accumulation chart
     */
    private processSelection(): void {
        if (!this.accumulationSelectionModule || this.selectionMode === 'None') {
            return null;
        }
        let selectedDataIndexes: Indexes[] = <Indexes[]>extend([], this.accumulationSelectionModule.selectedDataIndexes, null, true);
        this.accumulationSelectionModule.invokeSelection(this);
        if (selectedDataIndexes.length > 0) {
            this.accumulationSelectionModule.selectedDataIndexes = selectedDataIndexes;
            this.accumulationSelectionModule.redrawSelection(this, this.selectionMode);
        }
    }
    /**
     * To render title for accumulation chart
     */
    private renderTitle(): void {
        if (!this.title) {
            return null;
        }
        let height: number = measureText(this.title, this.titleStyle).height;
        textElement(
            new TextOption(
                this.element.id + '_title', this.availableSize.width / 2, this.margin.top + (height * 3 / 4),
                'middle', textTrim(this.availableSize.width, this.title, this.titleStyle), '', 'auto'
            ),
            this.titleStyle, this.titleStyle.color, this.svgObject
        );
    }
    /**
     * To get the series parent element
     * @private
     */
    public getSeriesElement(): Element {
        return this.svgObject.getElementsByTagName('g')[0];
    }
    /**
     * To refresh the all visible series points
     * @private
     */
    public refreshSeries(): void {
        for (let series of this.visibleSeries) {
            this.refreshPoints(series.points);
        }
    }
    /**
     * To refresh points label region and visible
     * @private
     */
    public refreshPoints(points: AccPoints[]): void {
        for (let point of points) {
            point.labelRegion = null;
            point.labelVisible = true;
        }
    }
    /**
     * To get Module name
     *  @private
     */
    public getModuleName(): string {
        return 'accumulationchart';
    }
    /**
     * To destroy the accumulationcharts
     * @private
     */
    public destroy(): void {
        this.unWireEvents();
        super.destroy();
        this.element.classList.remove('e-accumulationchart');
    }
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private 
     */
    public requiredModules(): ModuleDeclaration[] {
        let modules: ModuleDeclaration[] = [];
        modules.push({
            member: this.type + 'Series',
            args: [this]
        });

        if (this.legendSettings.visible) {
            modules.push({
                member: 'AccumulationLegend',
                args: [this]
            });
        }
        if (this.findDatalabelVisibility()) {
            modules.push({
                member: 'AccumulationDataLabel',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'AccumulationTooltip',
                args: [this]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'AccumulationSelection',
                args: [this]
            });
        }
        return modules;
    }
    /**
     * To find datalabel visibility in series
     */
    private findDatalabelVisibility(): boolean {
        for (let series of this.series) {
            if (series.dataLabel.visible) {
                return true;
            }
        }
        return false;
    }
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    public getPersistData(): string {
        return '';
    }
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    public onPropertyChanged(newProp: AccumulationChartModel, oldProp: AccumulationChartModel): void {
        for (let prop of Object.keys(newProp)) {
            switch (prop) {
                case 'theme':
                    this.animateSeries = true;
                    break;
            }
        }
        this.refreshSeries();
        this.refreshChart();
    }
}