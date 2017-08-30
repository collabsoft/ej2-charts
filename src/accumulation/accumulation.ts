/**
 * AccumulationChart file
 */
import {Property, Component, Complex, Collection, NotifyPropertyChanges, INotifyPropertyChanged, SvgRenderer} from '@syncfusion/ej2-base';
import {ModuleDeclaration, Internationalization, Event, EmitType, Browser, EventHandler, Touch} from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { AccumulationChartModel } from './accumulation-model';
import { Font, Margin, Border, Indexes } from '../common/model/base';
import { AccumulationSeries, PiePoints, PieTooltipSettings } from './model/acc-base';
import { AccumulationType, AccumulationSelectionMode } from './model/enum';
import { IPieSeriesRenderEventArgs, IPieTextRenderEventArgs, IPieTooltipRenderEventArgs} from './model/pie-interface';
import { IPieAnimationCompleteEventArgs, IPiePointRenderEventArgs, IPieLoadedEventArgs} from './model/pie-interface';
import { Theme } from '../common/model/theme';
import { ILegendRenderEventArgs, IMouseEventArgs} from '../common/model/interface';
import { load, seriesRender, legendRender, textRender, tooltipRender, chartMouseClick, chartMouseDown} from '../common/model/constants';
import { chartMouseLeave, chartMouseMove, chartMouseUp} from '../common/model/constants';
import { FontModel, MarginModel, BorderModel, IndexesModel} from '../common/model/base-model';
import { AccumulationSeriesModel, PieTooltipSettingsModel } from './model/acc-base-model';
import { LegendSettings} from '../common/legend/legend';
import { AccumulationLegend} from './renderer/legend';
import { LegendSettingsModel} from '../common/legend/legend-model';
import { Rect, ChartLocation, Size, subtractRect, measureText, RectOption} from '../common/utils/helper';
import { textElement, TextOption, removeElement, createSvg, calculateSize } from '../common/utils/helper';
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
     * Options for customizing the legend of chart.
     */
    @Complex<LegendSettingsModel>({}, LegendSettings)
    public legendSettings: LegendSettingsModel;

    /**
     * Options for customizing the tooltip of chart.
     */

    @Complex<PieTooltipSettingsModel>({}, PieTooltipSettings)
    public tooltip: PieTooltipSettingsModel;

    /**
     * Specifies whether point has to get selected or not. Takes value either 'None 'or 'Point'
     * @default None
     */
    @Property('None')
    public selectionMode: AccumulationSelectionMode;

    /**
     * If set true, enables the multi selection in pie. It requires `selectionMode` to be `Point`.
     * @default false
     */
    @Property(false)
    public isMultiSelect: boolean;

    /**
     * Specifies the point indexes to be selected while loading a pie.
     * It requires `selectionMode` to be `Point`.
     * ```html
     * <div id='Pie'></div>
     * ```
     * ```typescript
     * let pie: Pie = new Pie({
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
     *  Options to customize the left, right, top and bottom margins of chart.
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
     * The configuration for series in chart.
     */

    @Collection<AccumulationSeriesModel>([{}], AccumulationSeries)
    public series: AccumulationSeriesModel[];

    /**
     * Specifies the theme for chart.
     */
    @Property('Material')
    public theme: AccumulationTheme;

    /**
     * Triggers after accumulation chart loaded.
     * @event
     */
    @Event()
    public loaded: EmitType<IPieLoadedEventArgs>;

    /**
     * Triggers before accumulation chart load.
     * @event
     */
    @Event()
    public load: EmitType<IPieLoadedEventArgs>;

    /**
     * Triggers before the series gets rendered.
     * @event
     */
    @Event()
    public seriesRender: EmitType<IPieSeriesRenderEventArgs>;

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
    public textRender: EmitType<IPieTextRenderEventArgs>;

    /**
     * Triggers before the tooltip for series gets rendered.
     * @event
     */
    @Event()
    public tooltipRender: EmitType<IPieTooltipRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.
     * @event
     */

    @Event()
    public pointRender: EmitType<IPiePointRenderEventArgs>;

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
    public animationComplete: EmitType<IPieAnimationCompleteEventArgs>;

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
// constructor for Pie charts
    constructor(options?: AccumulationChartModel, element?: string | HTMLElement) {
        super(options, element);
    }

// Pie charts methods

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
     * Method to bind events for chart
     */

    private unWireEvents(): void {
        /*! Find the Events type */
        let isIE11Pointer: Boolean = Browser.isPointer;

        let start: string = Browser.touchStartEvent;
        let move: string = Browser.touchMoveEvent;
        let stop: string = Browser.touchEndEvent;
        let cancel: string = 'mouseleave';
        /*! UnBind the Event handler */

        EventHandler.remove(this.element, move, this.pieMouseMove);
        EventHandler.remove(this.element, stop, this.pieMouseEnd);
        EventHandler.remove(this.element, start, this.pieMouseStart);
        EventHandler.remove(this.element, 'click', this.pieOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.pieRightClick);
        EventHandler.remove(this.element, cancel, this.pieMouseLeave);
        EventHandler.remove(
            <HTMLElement & Window>window, 'resize', this.pieResize
        );

    }

    private wireEvents(): void {
        /*! Find the Events type */

        let isIE11Pointer: Boolean = Browser.isPointer;
        let start: string = Browser.touchStartEvent;
        let stop: string = Browser.touchEndEvent;
        let move: string = Browser.touchMoveEvent;
        let cancel: string = 'mouseleave';

        /*! Bind the Event handler */
        EventHandler.add(this.element, move, this.pieMouseMove, this);
        EventHandler.add(this.element, stop, this.pieMouseEnd, this);
        EventHandler.add(this.element, start, this.pieMouseStart, this);
        EventHandler.add(this.element, 'click', this.pieOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.pieRightClick, this);
        EventHandler.add(this.element, cancel, this.pieMouseLeave, this);

        EventHandler.add(
            <HTMLElement & Window>window, 'resize',
            this.pieResize, this);
        new Touch(this.element); // To avoid geasture blocking for browser
        /*! Apply the style for chart */
        this.setStyle(<HTMLElement>this.element);
    }
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
     * Handles the mouse up. 
     * @return {boolean}
     * @private
     */
    public pieMouseEnd(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseUp , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        if (this.accumulationTooltipModule && this.accumulationTooltipModule.tooltip && this.isTouch) {
            this.pieSeriesModule.getTooltipPoint(e, this, this.mouseX, this.mouseY);
            this.accumulationTooltipModule.fadeOutTooltip();
        }
        if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible && this.isTouch) {
            this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
            this.accumulationDataLabelModule.fadeOutTooltip();
        }
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.move(e, this.mouseX, this.mouseY);
            this.accumulationLegendModule.fadeOutTooltip();
        }
        return false;
    }
    /**
     * Handles the mouse down. 
     * @return {boolean}
     * @private
     */
    public pieMouseStart(e: PointerEvent): boolean {
        this.setMouseXY(e);
        this.trigger(chartMouseDown, {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        return false;
    }
    /**
     * Handles the chart resize. 
     * @return {boolean}
     * @private
     */
    public pieResize(e: Event): boolean {
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(
            (): void => {
                this.refreshSeries();
                this.refreshChart();
            },
            500);
        return false;
    }
    private setStyle(element: HTMLElement): void {
        element.style.touchAction = 'element';
        element.style.msTouchAction = 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
    }

    /**
     * Handles the mouse down on Pie. 
     * @return {boolean}
     * @private
     */
    public pieMouseMove(e: PointerEvent): boolean {
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
        return false;
    }

    /**
     * Handles the mouse down on chart. 
     * @return {boolean}
     * @private
     */
    public pieOnMouseClick(e: PointerEvent): boolean {
        this.setMouseXY(e);
        if (this.accumulationLegendModule && this.legendSettings.visible) {
            this.accumulationLegendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
            this.accumulationSelectionModule.calculateSelectedElements(this, e);
        }
        if (this.visibleSeries[0].explode) {
            this.pieSeriesModule.processExplode(this, e);
        }
        this.trigger(chartMouseClick , {target : (<Element>e.target).id, x : this.mouseX, y : this.mouseY});
        return false;
    }

    /**
     * Handles the mouse down on chart. 
     * @return {boolean}
     * @private
     */
    public pieRightClick(event: MouseEvent | PointerEvent): boolean {
        if (event.buttons === 2 || (<PointerEvent>event).pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    }

    /**
     * Handles the mouse down on chart. 
     * @return {boolean}
     * @private
     */
    public pieMouseLeave(e: PointerEvent): boolean {
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
     * Method to create SVG element.
     */

    private createPieSvg(): void {
        this.removeSvg();
        createSvg(this);
    }
    /**
     * To Remove the SVG. 
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
     * To render the accumulation chart elements
     */
    protected render(): void {

        this.trigger(load, { pie: this });

        this.calculateAreaType();

        this.calculateVisibleSeries();

        this.processData();
    }

    private calculateAreaType(): void {
        let series: AccumulationSeriesModel = this.series[0];
        if (series) {
            this.type = series.type;
        }
        this.pieSeriesModule = new PieSeries();
    }

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

    public refreshChart(): void {
        this.doClubbingProcess();
        this.createPieSvg();
        this.calculateBounds();
        this.renderElements();
    }
    public doClubbingProcess(): void {
        let series: AccumulationSeries = this.visibleSeries[0];
        if (!isNullOrUndefined(series.resultData) && ((!isNullOrUndefined(series.lastClubvalue) &&
            series.lastClubvalue !== series.clubbingValue))) {
            series.getPoints(series.resultData, this);
        }
    }
    private calculateBounds(): void {
        this.initialClipRect = new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
        subtractRect(this.initialClipRect, new Rect(0, measureText(this.title, this.titleStyle).height,
                                                    this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
        this.calculateLegendBounds();

    }
    private calculateLegendBounds(): void {
        if (!this.accumulationLegendModule || !this.legendSettings.visible) {
            return null;
        }
        this.accumulationLegendModule.getLegendOptions(this, <AccumulationSeries[]>this.visibleSeries);
        this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
    }
    public renderElements(): void {

        this.renderBorder();

        this.renderTitle();

        this.renderSeries();

        this.renderLegend();

        this.element.appendChild(this.svgObject);

        this.processSelection();

        this.processExplode();

        this.trigger('loaded', {pie: this});

        this.animateSeries = false;
    }
    private processExplode(): void {
        if (!this.visibleSeries[0].explode) {
            return null;
        }
        this.pieSeriesModule.invokeExplode();
    }
    private renderSeries(): void {
        this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection'}));
        for (let i: number = 0, length: number = this.visibleSeries.length; i < length; i++) {
            if (this.visibleSeries[i].visible) {
                this.pieSeriesModule.initProperties(this, this.visibleSeries[i]);
                this.visibleSeries[i].renderSeries(this);
            }
        }
    }
    private renderBorder(): void {
        let padding: number = this.border.width;
        this.svgObject.appendChild(this.renderer.drawRectangle(new RectOption(
            this.element.id + '_border', this.background, this.border, 1,
            new Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding)
        )));
    }
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

    public renderTitle(): void {
        if (!this.title) {
            return null;
        }
        let height: number = measureText(this.title, this.titleStyle).height;
        textElement(
            new TextOption(
                this.element.id + '_title', this.availableSize.width / 2, this.margin.top + (height * 3 / 4),
                'middle', this.title, '', 'auto'
            ),
            this.titleStyle, this.titleStyle.color, this.svgObject
        );
    }
    /** @private to get the series parent element */
    public getSeriesElement(): Element {
        return this.svgObject.getElementsByTagName('g')[0];
    }
    public refreshSeries(): void {
        for (let series of this.visibleSeries) {
            this.refreshPoints(series.points);
        }
    }
    /** @private */
    public refreshPoints(points: PiePoints[]): void {
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
        return 'pie';
    }
    /**
     * To destriy the accumulationcharts
     * @private
     */
    public destroy(): void {
        // need to implement
    }
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
    private findDatalabelVisibility(): boolean {
        for (let series of this.series) {
            if (series.dataLabel.visible) {
                return true;
            }
        }
        return false;
    }
    /**
     * Need to analyze
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