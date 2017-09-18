import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { TapEventArgs, EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, SvgRenderer, setCulture, Browser, Touch } from '@syncfusion/ej2-base';
import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';
import { findClipRect, measureText, TextOption, findPosition, textTrim, showTooltip, removeElement} from '../common/utils/helper';
import { textElement, withInBounds, RectOption, ChartLocation, createSvg, PointData } from '../common/utils/helper';
import { ChartModel, CrosshairSettingsModel, TooltipSettingsModel, ZoomSettingsModel } from './chart-model';
import { MarginModel, BorderModel, ChartAreaModel, FontModel } from '../common/model/base-model';
import { getSeriesColor, Theme } from '../common/model/theme';
import { IndexesModel } from '../common/model/base-model';
import { Margin, Border, ChartArea, Font, Indexes } from '../common/model/base';
import { AxisModel, RowModel, ColumnModel } from './axis/axis-model';
import { Row, Column, Axis } from './axis/axis';
import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';
import { DateTime } from './axis/date-time-axis';
import { Category } from './axis/category-axis';
import { Logarithmic } from './axis/logarithmic-axis';
import { Size, Rect } from '../common/utils/helper';
import { SelectionMode, LineType, ZoomMode, ToolbarItems, ChartTheme  } from './utils/enum';
import { Series } from './series/chart-series';
import { SeriesModel } from './series/chart-series-model';
import { Data } from '../common/model/data';
import { LineSeries } from './series/line-series';
import { AreaSeries } from './series/area-series';
import { BarSeries } from './series/bar-series';
import { StepLineSeries } from './series/step-line-series';
import { StepAreaSeries } from './series/step-area-series';
import { ColumnSeries } from './series/column-series';
import { StackingColumnSeries } from './series/stacking-column-series';
import { StackingBarSeries } from './series/stacking-bar-series';
import { StackingAreaSeries } from './series/stacking-area-series';
import { ScatterSeries } from './series/scatter-series';
import { SplineSeries } from './series/spline-series';
import { RangeColumnSeries } from'./series/range-column-series';
import { BubbleSeries } from './series/bubble-series';
import { Tooltip } from './user-interaction/tooltip';
import { Crosshair } from './user-interaction/crosshair';
import { Marker } from './series/marker';
import { LegendSettings } from '../common/legend/legend';
import { LegendSettingsModel } from '../common/legend/legend-model';
import { Legend } from './legend/legend';
import { Zoom } from './user-interaction/zooming';
import { Selection } from './user-interaction/selection';
import { DataLabel } from './series/data-label';
import { ITouches, ILegendRenderEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs } from '../common/model/interface';
import { IPointRenderEventArgs, ISeriesRenderEventArgs, IDragCompleteEventArgs, ITooltipRenderEventArgs } from '../common/model/interface';
import { IZoomCompleteEventArgs, ILoadedEventArgs, IAnimationCompleteEventArgs, IMouseEventArgs } from '../common/model/interface';
import { loaded, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from '../common/model/constants';



/**
 * Configures the tooltip in chart.
 */

export class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enable / Disable the visibility of tooltip.
     * @default false
     */

    @Property(false)
    public enable: boolean;

    /**
     * If set true, a single tooltip will be displayed for every index.
     * @default false
     */

    @Property(false)
    public shared: boolean;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    @Property('#FFFFFF')
    public fill: string;

    /**
     * Options to customize the tooltip text.
     */

    @Complex<FontModel>(Theme.tooltipLabelFont, Font)
    public textStyle: FontModel;

    /**
     * Format of the tooltip content.
     * @default null
     */

    @Property(null)
    public format: string;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.
     * @default null
     */

    @Property(null)
    public template: string;

    /**
     * If set true, tooltip will animate, while moving from one point to another.
     * @default true
     */
    @Property(true)
    public enableAnimation: boolean;

    /**
     * Options to customize the border for tooltip.
     */
    @Complex<BorderModel>({color : null, width: 1}, Border)
    public border: BorderModel;

}
/**
 * Configures the crosshair in chart.
 */
export class CrosshairSettings extends ChildProperty<CrosshairSettings> {
    /**
     * If set true, crosshair line will get visible.
     * @default false
     */
    @Property(false)
    public enable: boolean;

    /**
     * Options to customize the crosshair line.
     */
    @Complex<BorderModel>({ color: '#4f4f4f', width: 1 }, Border)
    public line: BorderModel;

    /**
     * Specifies the line type. Horizontal mode enables the horizontal line and Vertical mode enables the vertical line. They are
     * * none - Hides both vertical and horizontal crosshair line.
     * * both - Shows both vertical and horizontal crosshair line.
     * * vertical - Shows the vertical line.
     * * horizontal - Shows the horizontal line.
     * @default Both
     */
    @Property('Both')
    public lineType: LineType;

}
/**
 * Configures the zooming behavior for chart.
 */
export class ZoomSettings extends ChildProperty<ZoomSettings> {

    /**
     * If set true, chart can be zoomed by a rectangular selecting region on a plot area.
     * @default false
     */

    @Property(false)
    public enableSelectionZooming: boolean;

    /**
     * If set true, chart can be pinched to zoom in / zoom out.
     * @default false
     */

    @Property(false)
    public enablePinchZooming: boolean;

    /**
     * If set true, chart can be zoomed by using mouse wheel.
     * @default false
     */

    @Property(false)
    public enableMouseWheelZooming: boolean;

    /**
     * If set true, zooming will be performed on mouse up. It requires `enableSelectionZooming` to be true.
     * ```html 
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *    zoomSettings: {
     *      enableSelectionZooming: true,
     *      enableDeferredZooming: false
     *    }
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default true
     */

    @Property(true)
    public enableDeferredZooming: boolean;

    /**
     * Specifies whether to allow zooming, vertically or horizontally or in both ways.They are.
     * * x,y - Chart will be zoomed with respect to both vertical and horizontal axis.
     * * x - Chart will be zoomed with respect to horizontal axis.
     * * y - Chart will be zoomed with respect to vertical axis.
     *  It requires `enableSelectionZooming` to be true.
     * ```html 
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *    zoomSettings: {
     *      enableSelectionZooming: true,
     *      mode: 'XY'
     *    }
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default 'XY'
     */
    @Property('XY')
    public mode: ZoomMode;

    /**
     * Specifies the toolkit options for the zooming. They are.
     * * zoom - Renders the zoom button.
     * * zoomIn - Renders the zoomIn button.
     * * zoomOut - Renders the zoomOut button.
     * * pan - Renders the pan button.
     * * reset - Renders the reset button.
     */

    @Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    public toolbarItems: ToolbarItems[];

}

/**
 * Represents the Chart control.
 * ```html
 * <div id="chart"/>
 * <script>
 *   var chartObj = new Chart({ isResponsive : true });
 *   chartObj.appendTo("#chart");
 * </script>
 * ```
 */
@NotifyPropertyChanges
export class Chart extends Component<HTMLElement> implements INotifyPropertyChanged {


    //Module Declaration of Chart

    /**
     * `lineSeriesModule` is used to add line series in the chart.
     */
    public lineSeriesModule: LineSeries;
    /**
     * `columnSeriesModule` is used to add column series in the chart.
     */
    public columnSeriesModule: ColumnSeries;
    /**
     * `areaSeriesModule` is used to add area series in the chart.
     */
    public areaSeriesModule: AreaSeries;
    /**
     * `barSeriesModule` is used to add bar series in the chart.
     */
    public barSeriesModule: BarSeries;
    /**
     * `stackingColumnSeriesModule` is used to add stacking column series in the chart.
     */
    public stackingColumnSeriesModule: StackingColumnSeries;
    /**
     * `stackingAreaSeriesModule` is used to add stacking area series in the chart.
     */
    public stackingAreaSeriesModule: StackingAreaSeries;
    /**
     * `stackingBarSeriesModule` is used to add stacking bar series in the chart.
     */
    public stackingBarSeriesModule: StackingBarSeries;
    /**
     * `stepLineSeriesModule` is used to add step line series in the chart.
     */
    public stepLineSeriesModule: StepLineSeries;
    /**
     * `stepAreaSeriesModule` is used to add step area series in the chart.
     */
    public stepAreaSeriesModule: StepAreaSeries;
    /**
     * `splineSeriesModule` is used to add spline series in the chart.
     */
    public splineSeriesModule: SplineSeries;
    /**
     * `scatterSeriesModule` is used to add scatter series in the chart.
     */
    public scatterSeriesModule: ScatterSeries;
    /**
     * `rangeColumnSeriesModule` is used to add rangeColumn series in chart.
     */
    public rangeColumnSeriesModule: RangeColumnSeries;
    /**
     * `bubbleSeries` is used to add bubble series in chart.
     */
    public bubbleSeriesModule: BubbleSeries;
    /**
     * `tooltipModule` is used to manipulate and add tooltip for series.
     */
    public tooltipModule: Tooltip;
    /**
     * `crosshairModule` is used to manipulate and add crosshair for chart.
     */
    public crosshairModule: Crosshair;
    /**
     * `markerModule` is used to manipulate and add marker for series.
     */
    public markerModule: Marker;
    /**
     * `dataLabelModule` is used to manipulate and add data label for series.
     */
    public dataLabelModule: DataLabel;
    /**
     * `datetimeModule` is used to manipulate and add dateTime axis in chart.
     */
    public dateTimeModule: DateTime;
    /**
     * `categoryModule` is used to manipulate and add category axis in chart.
     */
    public categoryModule: Category;
    /**
     * `logarithmicModule` is used to manipulate and add log axis in chart.
     */
    public logarithmicModule: Logarithmic;
    /**
     * `legendModule` is used to manipulate and add legend in chart.
     */
    public legendModule: Legend;
    /**
     * `zoomModule` is used to manipulate and add zooming in chart.
     */
    public zoomModule: Zoom;
    /**
     * `selectionModule` is used to manipulate and add selection in chart.
     */
    public selectionModule: Selection;

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
     * Title for chart
     * @default ''
     */

    @Property('')
    public title: string;

    /**
     * Options for customizing the title of Chart.
     */

    @Complex<FontModel>(Theme.chartTitleFont, Font)
    public titleStyle: FontModel;

    /**
     *  Options to customize the left, right, top and bottom margins of chart.
     */

    @Complex<MarginModel>({}, Margin)
    public margin: MarginModel;

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
     * Options for configuring the border and background of the chart area.
     */

    @Complex<ChartAreaModel>({ border: { color: 'Gray', width: 0.5 }, background: 'transparent' }, ChartArea)
    public chartArea: ChartAreaModel;

    /**
     * Options to configure horizontal axis.
     */

    @Complex<AxisModel>({ name: 'primaryXAxis' }, Axis)
    public primaryXAxis: AxisModel;

    /**
     * Options to configure vertical axis.
     */

    @Complex<AxisModel>({ name: 'primaryYAxis' }, Axis)
    public primaryYAxis: AxisModel;


    /**
     * Options to split Chart into multiple plotting areas horizontally. Each object in the collection represents a plotting area in Chart.
     */

    @Collection<RowModel>([{}], Row)
    public rows: RowModel[];


    /**
     * Options to split Chart into multiple plotting areas vertically. Each object in the collection represents a plotting area in Chart.
     */

    @Collection<ColumnModel>([{}], Column)
    public columns: ColumnModel[];

    /**
     * Secondary axis collection for chart.
     */

    @Collection<AxisModel>([{}], Axis)
    public axes: AxisModel[];

    /**
     * The configuration for series in chart.
     */

    @Collection<SeriesModel>([{}], Series)
    public series: SeriesModel[];

    /**
     * The palette for chart series.
     * @default []
     */
    @Property([])
    public palettes: string[];

    /**
     * Specifies the theme for chart.
     */
    @Property('Material')
    public theme: ChartTheme;

    /**
     * Options for customizing the tooltip of chart.
     */

    @Complex<TooltipSettingsModel>({}, TooltipSettings)
    public tooltip: TooltipSettingsModel;


    /**
     * Options for customizing the crosshair of chart.
     */
    @Complex<CrosshairSettingsModel>({}, CrosshairSettings)
    public crosshair: CrosshairSettingsModel;

    /**
     * Options for customizing the legend of chart.
     */
    @Complex<LegendSettingsModel>({}, LegendSettings)
    public legendSettings: LegendSettingsModel;

    /**
     * Options to enable the zooming feature in chart.
     */
    @Complex<ZoomSettingsModel>({}, ZoomSettings)
    public zoomSettings: ZoomSettingsModel;

    /**
     * Specifies whether series or data point has to be selected. They are.
     * * none - Disable the selection.
     * * series - To select a series.
     * * point - To select a point.
     * * cluster - To select a cluster of point
     * * dragXY - To select points, by dragging with respect to both horizontal and vertical axis
     * * dragX - To select points, by dragging with respect to horizontal axis.
     * * dragY - To select points, by dragging with respect to vertical axis.
     * @default None
     */
    @Property('None')
    public selectionMode: SelectionMode;

    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | `Cluster`.
     * @default false
     */
    @Property(false)
    public isMultiSelect: boolean;

    /**
     * Specifies the point indexes to be selected while loading a chart.
     * It requires `selectionMode` to be `Point` | `Series` | `Cluster`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   selectionMode: 'Point',
     *   selectedDataIndexes: [ { series: 0, point: 1},
     *                          { series: 2, point: 3} ],
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default []
     */
    @Collection<IndexesModel>([], Indexes)
    public selectedDataIndexes: IndexesModel[];

    /**
     * Specifies whether a grouping separator should be used for a number.
     * @default false
     */
    @Property(false)
    public useGroupingSeparator: boolean;

    /**
     * Description for chart.
     * @default null
     */
    @Property(null)
    public description: string;

    /**
     * TabIndex value for the chart.
     * @default 1
     */
    @Property(1)
    public tabIndex: number;

    /**
     * Triggers after chart loaded.
     * @event
     */
    @Event()
    public loaded: EmitType<ILoadedEventArgs>;

    /**
     * Triggers before chart load.
     * @event
     */
    @Event()
    public load: EmitType<ILoadedEventArgs>;

    /**
     * Triggers after animation gets completed for series.
     * @event
     */
    @Event()
    public animationComplete: EmitType<IAnimationCompleteEventArgs>;

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
    public textRender: EmitType<ITextRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.
     * @event
     */

    @Event()
    public pointRender: EmitType<IPointRenderEventArgs>;

    /**
     * Triggers before the series gets rendered.
     * @event
     */

    @Event()
    public seriesRender: EmitType<ISeriesRenderEventArgs>;
    /**
     * Triggers before each axis label gets rendered.
     * @event
     */
    @Event()
    public axisLabelRender : EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the tooltip for series gets rendered.
     * @event
     */

    @Event()
    public tooltipRender : EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers on hovering the chart.
     * @event
     */

    @Event()
    public chartMouseMove : EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the chart.
     * @event
     */

    @Event()
    public chartMouseClick : EmitType<IMouseEventArgs>;


    /**
     * Triggers while cursor leaves the chart.
     * @event
     */

    @Event()
    public chartMouseLeave : EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse down.
     * @event
     */

    @Event()
    public chartMouseDown : EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.
     * @event
     */

    @Event()
    public chartMouseUp : EmitType<IMouseEventArgs>;

    /**
     * Triggers after the drag selection is completed.
     * @event
     */

    @Event()
    public dragComplete: EmitType<IDragCompleteEventArgs>;

    /**
     * Triggers after the zoom selection is completed.
     * @event
     */

    @Event()
    public zoomComplete: EmitType<IZoomCompleteEventArgs>;

    // Internal variables 
    private htmlObject: HTMLElement;
    private getElement: MethodDecorator;
    private elementSize: Size;
    private isLegend: boolean;
    private offset: ChartLocation;


    /**
     * Gets the current visible axis of the Chart.
     * @hidden
     */
    public axisCollections: Axis[];
    /**
     * Gets the current visible series of the Chart.
     * @hidden
     */
    public visibleSeries: Series[];
    /**
     * Render panel for chart.
     * @hidden
     */
    public chartAxisLayoutPanel: CartesianAxisLayoutPanel;
    /**
     * Gets all the horizontal axis of the Chart.
     * @hidden
     */
    public horizontalAxes: Axis[];
    /**
     * Gets all the vertical axis of the Chart.
     * @hidden
     */
    public verticalAxes: Axis[];
    /**
     * Gets the inverted chart.
     * @hidden
     */
    public requireInvertedAxis: boolean;
    /** @private */
    public svgObject: Element;
    /** @private */
    public isTouch: boolean;
    /** @private */
    public renderer: SvgRenderer;
    /** @private */
    public initialClipRect: Rect;
    /** @private */
    public seriesElements: Element;
    /** @private */
    public visibleSeriesCount: number;
    /** @private */
    public intl: Internationalization;
    /** @private */
    public dataLabelCollections: Rect[];
    /** @private */
    public dataLabelElements: Element;
    /** @private */
    public mouseX: number;
    /** @private */
    public mouseY: number;
    /** @private */
    public animateSeries: boolean;
    /** @private */
    public availableSize: Size;
    /** @private */
    public delayRedraw: boolean;
    /** @private */
    public isDoubleTap: boolean;
    /** @private */
    public mouseDownX: number;
    /** @private */
    public mouseDownY: number;
    /** @private */
    public previousMouseMoveX: number;
    /** @private */
    public previousMouseMoveY: number;
    /** @private */
    private threshold: number;
    /** @private */
    public isChartDrag: boolean;
    private resizeTo: number;
    /** @private */
    public disableTrackTooltip: boolean;
    /** @private */
    public storedPoints: PointData[];
    /** @private */
    public startMove: boolean;

    /**
     * Constructor for creating the widget
     * @hidden
     */
    constructor(options?: ChartModel, element?: string | HTMLElement) {
        super(options, <HTMLElement | string>element);
    }

    /**
     * Initialize the event handler.
     */

    protected preRender(): void {
        this.unWireEvents();
        this.initPrivateVariable();
        this.setCulture();
        this.setTheme();
        this.createChartSvg();
        this.wireEvents();
    }

    private initPrivateVariable(): void {
        this.animateSeries = true;
        this.horizontalAxes = [];
        this.verticalAxes = [];
        this.refreshAxis();
        this.refreshDefinition(<Row[]>this.rows);
        this.refreshDefinition(<Column[]>this.columns);
        this.storedPoints = [];
    }

    /**
     * To Initialize the control rendering.
     */

    protected render(): void {

        this.trigger(load, { chart: this });

        this.calculateAreaType();

        this.calculateVisibleSeries();

        this.calculateVisibleAxis();

        this.processData();

    }

    /**
     * Refresh the chart bounds.
     * @private
     */

    public refreshBound(): void {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.visibleSeries);
        }
        let isCalculateStacking: boolean = false;
        let series: Series;
        for (let i: number = 0, len: number = this.visibleSeries.length; i < len; i++) {
            series = <Series>this.visibleSeries[i];
            if ((series.type.indexOf('Stacking') !== -1) && !isCalculateStacking) {
                 series.calculateStackedValue(series.type.indexOf('100') > -1);
                 isCalculateStacking = true;
            }
        }
        this.calculateBounds();

        this.renderElements();
    }

    private renderElements(): void {

        this.dataLabelCollections = [];

        this.renderBorder();

        this.renderTitle();

        this.renderAreaBorder();

        this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
        this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });

        if (this.rows.length > 0 && this.columns.length > 0) {

            this.chartAxisLayoutPanel.renderAxes();

            let tooltipDiv: Element = document.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.setAttribute('style', 'position: relative');
            this.element.appendChild(tooltipDiv);

             // For userInteraction
            if (this.tooltip.enable) {
                 this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
             }

            for (let item of this.visibleSeries) {
                if (item.visible) {
                    findClipRect(item);
                    item.renderSeries(this, item.index);
                }
            }
        }
        let clipRect: Element = this.renderer.drawClipPath({
            'id': this.element.id + '_ChartAreaClipRect_',
            'x': this.chartAxisLayoutPanel.seriesClipRect.x,
            'y': this.chartAxisLayoutPanel.seriesClipRect.y,
            'width': this.chartAxisLayoutPanel.seriesClipRect.width,
            'height': this.chartAxisLayoutPanel.seriesClipRect.height,
            'fill': 'transparent',
            'stroke-width': 1,
            'stroke': 'Gray'
        });
        this.seriesElements.appendChild(clipRect);
        if (this.dataLabelElements.hasChildNodes()) {
            this.seriesElements.appendChild(this.dataLabelElements);
        }
        this.svgObject.appendChild(this.seriesElements);
        if (this.legendModule) {
            this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
        }
        if (!this.tooltip.enable) {
            this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
        }
        this.element.appendChild(this.svgObject);

        if (this.zoomModule && this.zoomModule.isZoomed) {
            this.zoomModule.applyZoomToolkit(this, this.axisCollections);
        }
        let selectedDataIndexes: Indexes[] = [];
        if (this.selectionModule) {
            selectedDataIndexes = <Indexes[]>extend([], this.selectionModule.selectedDataIndexes, null, true);
            this.selectionModule.invokeSelection(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.selectionModule.selectedDataIndexes = selectedDataIndexes;
            this.selectionModule.redrawSelection(this, this.selectionMode);
        }

        this.trigger('loaded', { chart: this });
    }

    private processData(): void {
        let series: Series;
        this.visibleSeriesCount = 0;
        for (let series of this.visibleSeries) {
            if (!series.visible) {
                this.visibleSeriesCount++;
                continue;
            }
            series.xData = []; series.yData = [];
            series.dataModule = new Data(series.dataSource, series.query);
            series.points = [];
            series.refreshDataManager(this);
        }
        if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length) {
            this.refreshBound();
        }
    }

    private calculateBounds(): void {
        let padding: number = 5;
        let margin: MarginModel = this.margin;
        // Title Height;
        let titleHeight: number = 0;
        if (this.title) {
            titleHeight = measureText(this.title, this.titleStyle).height + padding;
        }
        let top: number = margin.top + titleHeight + this.chartArea.border.width / 2;
        let left: number = margin.left;
        let width: number = this.availableSize.width - left - margin.right - this.border.width;
        let height: number = this.availableSize.height - top - this.border.width - margin.bottom;
        this.initialClipRect = new Rect(left, top, width, height);
        if (this.legendModule) {
            this.legendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
        }
        this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);

    }

    private calculateAreaType(): void {
        let series: SeriesModel = this.series[0];
        if (series) {
            this.requireInvertedAxis = (series.type.indexOf('Bar') !== -1);
        }
        this.chartAxisLayoutPanel = new CartesianAxisLayoutPanel(this);
    }

    private calculateVisibleAxis(): void {
        let axis: Axis; let series: Series;
        let axes: AxisModel[] = [this.primaryXAxis, this.primaryYAxis];
        axes = axes.concat(this.axes);
        this.axisCollections = [];
        for (let i: number = 0, len: number = axes.length; i < len; i++) {
            axis = <Axis>axes[i]; axis.series = []; axis.labels = [];
            for (let series of this.visibleSeries) {
                if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
                    axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
                    series.xAxis = axis;
                    axis.series.push(series);
                } else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
                    axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
                    series.yAxis = axis;
                    axis.series.push(series);
                }
            }
            if (axis.orientation != null) {
                this.axisCollections.push(axis);
            }
        }
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.measure();
        }
    }


    private calculateVisibleSeries(): void {
        let series: Series;
        this.visibleSeries = [];
        let colors: string[] = this.palettes.length ? this.palettes : getSeriesColor(this.theme);
        let count: number = colors.length;
        for (let i: number = 0, len: number = this.series.length; i < len; i++) {
            series = <Series>this.series[i];
            series.index = i;
            series.interior = series.fill || colors[i % count];
            if (this.requireInvertedAxis && series.type.indexOf('Bar') === -1) {
                continue;
            }
            if (!this.requireInvertedAxis && (series.type.indexOf('Bar') !== -1)) {
                continue;
            }
            this.visibleSeries.push(series);

            this.series[i] = series;
        }
    }


    private renderTitle(): void {
        if (this.title) {
            let areaBounds: Rect = this.chartAxisLayoutPanel.seriesClipRect;
            this.elementSize = measureText(this.title, this.titleStyle);

            let options: TextOption = new TextOption(
                this.element.id + '_ChartTitle',
                this.availableSize.width / 2,
                this.margin.top + 3 * (this.elementSize.height / 4),
                'middle',  textTrim(this.availableSize.width, this.title, this.titleStyle)
            );

            let element : Element = textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    }

    private renderBorder(): void {
        let width: number = this.border.width;
        let rect: RectOption = new RectOption(this.element.id + '_ChartBorder', this.background, this.border, 1,
                                              new Rect(width / 2, width / 2,
                                                       this.availableSize.width - width, this.availableSize.height - width));

        this.htmlObject = this.renderer.drawRectangle(rect) as HTMLElement;

        this.svgObject.appendChild(this.htmlObject);

    }

    private renderAreaBorder(): void {

        let rect: RectOption = new RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border,
                                              this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);

        this.htmlObject = this.renderer.drawRectangle(rect) as HTMLElement;

        this.svgObject.appendChild(this.htmlObject);
    }




    /**
     * To destroy the widget
     * @method destroy
     * @return {void}
     * @member of Chart
     */

    public destroy(): void {
        this.unWireEvents();
        super.destroy();
        this.element.classList.remove('e-chart');
    }

    /**
     * Get component name
     */

    public getModuleName(): string {
        return 'chart';
    }

    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    public getPersistData(): string {
        let keyEntity: string[] = ['loaded', 'animationComplete'];
        return this.addOnPersist(keyEntity);
    }

    /**
     * Method to create SVG element.
     */

    private createChartSvg(): void {
        this.removeSvg();
        this.offset = findPosition(this.element);
        createSvg(this);
    }

    /**
     * Method to bind events for chart
     */

    private unWireEvents(): void {
        /*! Find the Events type */
        let isIE11Pointer: Boolean = Browser.isPointer;

        let startEvent: string = Browser.touchStartEvent;
        let moveEvent: string = Browser.touchMoveEvent;
        let stopEvent: string = Browser.touchEndEvent;
        let wheelEvent: string = Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        let cancelEvent: string = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */

        EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        EventHandler.remove(this.element, wheelEvent, this.chartMouseWheel);

        if (this.isOrientation() && Browser.isTouch) {
            EventHandler.remove(<HTMLElement & Window>window, 'orientationchange', this.chartResize);
        } else {
            EventHandler.remove(<HTMLElement & Window>window, 'resize', this.chartResize);
        }

    }


    private wireEvents(): void {
        /*! Find the Events type */

        let isIE11Pointer: Boolean = Browser.isPointer;
        let wheelEvent: string = Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        let startEvent: string = Browser.touchStartEvent;
        let stopEvent: string = Browser.touchEndEvent;
        let moveEvent: string = Browser.touchMoveEvent;
        let cancelEvent: string = isIE11Pointer ? 'pointerleave' : 'mouseleave';

        /*! Bind the Event handler */
        EventHandler.add(this.element, startEvent, this.chartOnMouseDown, this);
        EventHandler.add(this.element, moveEvent, this.mouseMove, this);
        EventHandler.add(this.element, stopEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        EventHandler.add(this.element, wheelEvent, this.chartMouseWheel, this);

        if (Browser.isTouch && this.isOrientation()) {
            EventHandler.add(<HTMLElement & Window>window, 'orientationchange', this.chartResize, this);
        } else {
            EventHandler.add(<HTMLElement & Window>window, 'resize', this.chartResize, this);
        }
        this.longPress = this.longPress.bind(this);
        new Touch(this.element, { tapHold: this.longPress, tapHoldThreshold: 500  });

        /*! Apply the style for chart */
        this.setStyle(<HTMLElement>this.element);
    }

    private chartRightClick(event: MouseEvent | PointerEvent): boolean {
        if (event.buttons === 2 || (<PointerEvent>event).pointerType === 'touch') {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    }

    private setStyle(element: HTMLElement): void {
        let zooming: ZoomSettingsModel = this.zoomSettings;
        let disableScroll: boolean = zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming ||
            this.selectionMode !== 'None' || this.crosshair.enable;
        element.style.touchAction = disableScroll ? 'none' : 'element';
        element.style.msTouchAction = disableScroll ? 'none' : 'element';
        element.style.msContentZooming = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
    }
    /**
     * Finds the orientation. 
     * @return {boolean}
     * @private
     */
    public isOrientation(): boolean {
        return ('orientation' in window && 'onorientationchange' in window);
    }

    /**
     * Handles the long press on chart. 
     * @return {boolean}
     * @private
     */
    public longPress(e? : TapEventArgs): boolean {
        this.mouseX = e ? ( e.originalEvent.changedTouches[0].clientX - this.offset.x) : 0;
        this.mouseY = e ? ( e.originalEvent.changedTouches[0].clientY - this.offset.y) : 0;
        this.startMove = true;
        if (this.crosshairModule && withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
            if (this.tooltipModule) {
                this.tooltipModule.tooltip();
            }
            this.crosshairModule.crosshair();
        }

        return false;
    }

    /**
     * Handles the chart resize. 
     * @return {boolean}
     * @private
     */
    public chartResize(e: Event): boolean {
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(
            (): void => {
                this.createChartSvg();
                this.refreshAxis();
                this.refreshBound();
            },
            500);
        return false;

    }
    /**
     * Handles the mouse move. 
     * @return {boolean}
     * @private
     */
    public mouseMove(e: PointerEvent): boolean {
        let pageX: number;
        let pageY: number;
        let touchArg: TouchEvent;
        let touches: TouchList = null;
        let rect: ClientRect = this.element.getBoundingClientRect();
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            touches = touchArg.touches;
        } else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.mouseX = pageX - rect.left;
        this.mouseY = pageY - rect.top;
        this.chartOnMouseMove(e, touches);
        return false;
    }
    /**
     * Handles the mouse leave. 
     * @return {boolean}
     * @private
     */
    public mouseLeave(e: PointerEvent): boolean {
        let pageX: number;
        let pageY: number;
        let touchArg: TouchEvent;
        let rect: ClientRect = this.element.getBoundingClientRect();
        if (e.type === 'touchleave') {
            this.isTouch = true;
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        } else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            pageX = e.clientX;
            pageY = e.clientY;

        }
        this.mouseX = pageX - rect.left;
        this.mouseY = pageY - rect.top;
        this.chartOnMouseLeave(e);
        return false;
    }
    /**
     * Handles the mouse leave on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseLeave(e: PointerEvent | TouchEvent): boolean {
        let element : Element = <Element>e.target;
        this.trigger(chartMouseLeave , {target : element.id, x : this.mouseX, y : this.mouseY});
        if (this.zoomModule) {
            if (this.zoomModule.isZoomed) {
                this.zoomModule.performZoomRedraw(this);
            }
            this.zoomModule.pinchTarget = null;
            this.zoomModule.touchStartList = [];
            this.zoomModule.touchMoveList = [];
        }
        if (this.tooltip.enable && this.tooltipModule) {
           this.tooltipModule.removeTooltip(true);
        }
        if (this.crosshair.enable && this.crosshairModule) {
            this.crosshairModule.removeCrosshair();
        }
        if (this.selectionMode !== 'None' && this.selectionModule) {
            this.selectionModule.completeSelection(this, e);
        }
        this.isChartDrag = false;
        return false;
    }
    /**
     * Handles the mouse click on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseClick(e: PointerEvent | TouchEvent): boolean {
        let element : Element = <Element>e.target;
        this.trigger(chartMouseClick , {target : element.id, x : this.mouseX, y : this.mouseY});
        if (this.legendSettings.visible && this.legendModule) {
            this.legendModule.click(e);
        }
        if (this.selectionMode !== 'None' && this.selectionModule) {
            this.selectionModule.calculateSelectedElements(this, e);
        }
        return false;
    }
    /**
     * Handles the mouse move on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseMove(e: PointerEvent | TouchEvent, touches: TouchList): boolean {
        let element : Element = <Element>e.target;
        this.trigger(chartMouseMove , {target : element.id, x : this.mouseX, y : this.mouseY});

        //Zooming for chart
        let zooming: Zoom = this.zoomModule;
        if (this.isChartDrag && zooming) {
            if (this.isTouch) {
                zooming.touchMoveList = this.addTouchPointer(<ITouches[]>zooming.touchMoveList, (<PointerEvent>e), touches);
                if (this.zoomSettings.enablePinchZooming && zooming.touchMoveList.length > 1
                    && zooming.touchStartList.length > 1) {
                    this.zoomModule.performPinchZooming(<TouchEvent>e, this);
                }
            }
            zooming.renderZooming(e, this, this.isTouch);
        }

        // Tooltip for chart series.
        if (!this.disableTrackTooltip) {
            if (this.tooltip.enable && this.tooltipModule && !this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                this.tooltipModule.tooltip();
            }
            if (withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                  this.tooltipModule.tooltip();
                }
                if (this.crosshair.enable && this.crosshairModule && (!this.isTouch || this.startMove)) {
                    this.crosshairModule.crosshair();
                }
            } else {
                if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared) {
                    this.tooltipModule.removeTooltip();
                }
                if (this.crosshair.enable && this.crosshairModule) {
                    this.crosshairModule.removeCrosshair();
                }
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.mouseMove(this, e);
            }
        }
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.move(e, this.mouseX, this.mouseY);
            }
        }

        this.isTouch = false;
        return false;
    }
    public titleTooltip(event: Event, x: number, y: number, isTouch?: boolean): void {
        let targetId: string = (<HTMLElement>event.target).id;
        if ((targetId === (this.element.id + '_ChartTitle')) && ((<HTMLElement>event.target).textContent.indexOf('...') > -1)) {
            showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', isTouch);
        } else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    }

    /**
     * Handles the mouse down on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseDown(e: PointerEvent): boolean {
        let pageX: number;
        let pageY: number;
        let target: Element;
        let touchArg: TouchEvent;
        let touches: TouchList = null;
        let offset: number = Browser.isDevice ? 20 : 30;
        let rect: ClientRect = this.element.getBoundingClientRect();
        let element : Element = <Element>e.target;
        this.trigger(chartMouseDown , {target : element.id, x : this.mouseX, y : this.mouseY});
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            target = <Element>touchArg.target;
            touches = touchArg.touches;
        } else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = <Element>e.target;
        }
        this.mouseDownX = this.previousMouseMoveX = pageX - rect.left;
        this.mouseDownY = this.previousMouseMoveY = pageY - rect.top;
        if (target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
            withInBounds(this.previousMouseMoveX, this.previousMouseMoveY, this.chartAxisLayoutPanel.seriesClipRect)) {
            this.isChartDrag = true;
        }
        if (this.isTouch) {
            if (this.zoomModule) {
                this.zoomModule.touchStartList = this.addTouchPointer(<ITouches[]>this.zoomModule.touchStartList, e, touches);
            }
            this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                    (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                    (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                    (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                    (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
        }
        if (this.selectionMode !== 'None' && this.selectionModule) {
            if (this.isDoubleTap || !this.isTouch || this.selectionModule.rectPoints) {
                this.selectionModule.dragStart(this, this.chartAxisLayoutPanel.seriesClipRect, this.mouseDownX, this.mouseDownY, e);
            }
        }
        return false;
    }
    /**
     * Handles the mouse up. 
     * @return {boolean}
     * @private
     */
    public mouseEnd(e: PointerEvent): boolean {
        let pageY: number;
        let pageX: number;
        let touchArg: TouchEvent;
        let rect: ClientRect = this.element.getBoundingClientRect();
        if (e.type === 'touchend') {
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            this.isTouch = true;
            pageY = touchArg.changedTouches[0].clientY;
        } else {
            pageY = e.clientY;
            pageX = e.clientX;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        this.mouseX = pageX - rect.left;
        this.mouseY = pageY - rect.top;
        this.chartOnMouseUp(e);
        return false;
    }

    /**
     * Handles the mouse up. 
     * @return {boolean}
     * @private
     */

    public chartOnMouseUp(e: PointerEvent | TouchEvent): boolean {
        let element : Element = <Element>e.target;
        this.trigger(chartMouseUp , {target : element.id, x : this.mouseX, y : this.mouseY});
        if (this.tooltip.enable && this.isTouch && (!this.crosshair.enable)) {
            this.tooltipModule.tooltip();
            this.tooltipModule.removeTooltip();
        }
        if (this.startMove && this.crosshair.enable && this.isTouch) {
            this.crosshairModule.removeCrosshair();
            if (this.tooltip.enable) {
                this.tooltipModule.removeTooltip();
            }
        }
        let performZoomRedraw: boolean = (<Element>e.target).id.indexOf(this.element.id + '_ZoomOut_') === -1 ||
            (<Element>e.target).id.indexOf(this.element.id + '_ZoomIn_') === -1;
        if (this.zoomModule && (this.isChartDrag || performZoomRedraw)) {
            this.zoomModule.performZoomRedraw(this);
        }
        this.isChartDrag = false;
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            if (this.legendSettings.visible && this.legendModule) {
               this.legendModule.move(e, this.mouseX, this.mouseY, this.isTouch);
             }
            this.threshold = new Date().getTime() + 300;
            if (this.isDoubleTap && withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)
                && this.zoomModule && this.zoomModule.touchStartList.length === 1 && this.zoomModule.isZoomed) {
                this.zoomModule.toolkit.reset();
            }
            this.isDoubleTap = false;
        }
        if (this.selectionMode !== 'None' && this.selectionModule) {
            this.selectionModule.completeSelection(this, e);
        }
        this.seriesElements.removeAttribute('clip-path');
        return false;
    }
    /**
     * Handles the mouse wheel on chart. 
     * @return {boolean}
     * @private
     */
    public chartMouseWheel(e: WheelEvent): boolean {
        let offset: ClientRect = this.element.getBoundingClientRect();
        let mouseX: number = e.clientX - offset.left;
        let mouseY: number = e.clientY - offset.top;

        if (this.zoomModule && this.zoomSettings.enableMouseWheelZooming &&
            withInBounds(mouseX, mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
            e.preventDefault();
            this.zoomModule.performMouseWheelZooming(e, mouseX, mouseY, this, this.axisCollections);
        }
        return false;
    }
    /**
     * Handles the touch pointer. 
     * @return {boolean}
     * @private
     */
    public addTouchPointer(touchList: ITouches[], e: PointerEvent, touches: TouchList): ITouches[] {
        if (touches) {
            touchList = [];
            for (let i: number = 0, length: number = touches.length; i < length; i++) {
                touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
            }
        } else {
            touchList = touchList ? touchList : [];
            if (touchList.length === 0) {
                touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
            } else {
                for (let i: number = 0, length: number = touchList.length; i < length; i++) {
                    if (touchList[i].pointerId === e.pointerId) {
                        touchList[i] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
                    } else {
                        touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                    }
                }
            }
        }
        return touchList;
    }

    /**
     * Method to set culture for chart
     */

    private setCulture(): void {
        this.intl = new Internationalization();
    }

    /**
     * Themeing for chart goes here
     */

    private setTheme(): void {
        /*! Set theme */
    }

    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private 
     */
    public requiredModules(): ModuleDeclaration[] {
        let modules: ModuleDeclaration[] = [];
        let series: SeriesModel[] = this.series;
        let moduleName: string;
        let markerEnable: boolean = false;
        let dataLabelEnable: boolean = false;
        let zooming: ZoomSettingsModel = this.zoomSettings;
        series.map((value: Series) => {
            this.isLegend = (this.legendSettings.visible && ((value.name !== '') || !!this.isLegend));
            moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series' : value.type + 'Series';
            markerEnable = value.marker.visible || markerEnable;
            dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
            modules.push({
                member: moduleName,
                args: [this, series]
            });
        });

        modules = this.findAxisModule(modules);

        if (markerEnable) {
            modules.push({
                member: 'Marker',
                args: [this, series]
            });
        }
        if (this.crosshair.enable) {
            modules.push({
                member: 'Crosshair',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this]
            });
        }
        if (this.isLegend) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }

        if (zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming) {
            modules.push({
                member: 'Zoom',
                args: [this, this.zoomSettings]
            });
        }
        if (this.selectionMode !== 'None') {
            modules.push({
                member: 'Selection',
                args: [this]
            });
        }

        if (dataLabelEnable) {
            modules.push({
                member: 'DataLabel',
                args: [this, series]
            });
        }


        return modules;
    }

    private findAxisModule(modules: ModuleDeclaration[]): ModuleDeclaration[] {
        let axisCollections: AxisModel[] = [];
        axisCollections.push(this.primaryXAxis);
        axisCollections.push(this.primaryYAxis);
        axisCollections = axisCollections.concat(this.axes);
        let datetimeEnabled: boolean = false;
        let categoryEnabled: boolean = false;
        let logarithmicEnabled: boolean = false;
        for (let axis of axisCollections) {
            datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
            categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
            logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
        }

        if (datetimeEnabled) {
            modules.push({
                member: 'DateTime',
                args: [this]
            });
        }

        if (categoryEnabled) {
            modules.push({
                member: 'Category',
                args: [this]
            });
        }
        if (logarithmicEnabled) {
            modules.push({
                member: 'Logarithmic',
                args: [this]
            });
        }
        return modules;

    }
    /**
     * To Remove the SVG. 
     * @return {boolean}
     * @private
     */
    public removeSvg(): void {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
             remove(document.getElementById(this.element.id + '_Secondary_Element'));
        }
        let removeLength: number = 0;
        if (this.zoomModule && this.zoomModule.pinchTarget) {
            this.zoomModule.pinchTarget.id = '';
            this.zoomModule.pinchTarget.setAttribute('opacity', '0');
            this.svgObject.appendChild(this.zoomModule.pinchTarget);
            removeLength = 1;
        }
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > removeLength) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    }

    private refreshDefinition(definitions: Row[] | Column[]): void {
        for (let item of definitions) {
            item.axes = [];
        }
    }
    /**
     * Refresh the axis default value. 
     * @return {boolean}
     * @private
     */
    public refreshAxis(): void {
        let axis: Axis = <Axis>this.primaryXAxis;
        axis.rect = new Rect(undefined, undefined, 0, 0, );
        axis = <Axis>this.primaryYAxis;
        axis.rect = new Rect(undefined, undefined, 0, 0, );
        for (let item of this.axes) {
            axis = <Axis>item;
            axis.rect = new Rect(undefined, undefined, 0, 0, );
        }
    }

    private axisChange(axis: Axis): boolean {
        if (!axis.name && !axis.valueType) {
            return false;
        }
        this.refreshDefinition(<Column[]>this.columns);
        this.refreshDefinition(<Row[]>this.rows);
        this.calculateVisibleAxis();
        this.processData();
        return true;
    }
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    public onPropertyChanged(newProp: ChartModel, oldProp: ChartModel): void {
        let renderer: boolean = false;
        let refreshBounds: boolean = false;
        this.animateSeries = false;
        if (!this.delayRedraw) {
            for (let prop of Object.keys(newProp)) {
                switch (prop) {
                    case 'primaryXAxis':
                        refreshBounds = this.axisChange(<Axis>newProp.primaryXAxis);
                        if (newProp.primaryXAxis.edgeLabelPlacement) {
                            renderer = true;
                        }
                        if (!newProp.primaryXAxis.crosshairTooltip) {
                            refreshBounds = true;
                        }
                        break;
                    case 'primaryYAxis':
                        refreshBounds = this.axisChange(<Axis>newProp.primaryYAxis);
                        if (newProp.primaryYAxis.edgeLabelPlacement) {
                            renderer = true;
                        }
                        if (!newProp.primaryYAxis.crosshairTooltip) {
                            refreshBounds = true;
                        }
                        break;
                    case 'height':
                    case 'width':
                        this.createChartSvg();
                        refreshBounds = true;
                        break;
                    case 'title':
                        if (newProp.title === '' || oldProp.title === '') {
                            refreshBounds = true;
                        } else {
                            renderer = true;
                        }
                        break;
                    case 'titleStyle':
                        if (newProp.titleStyle && newProp.titleStyle.size) {
                            refreshBounds = true;
                        } else {
                            renderer = true;
                        }
                        break;
                    case 'border':
                        renderer = true;
                        break;
                    case 'background':
                        renderer = true;
                        break;
                    case 'chartArea':
                        if (newProp.chartArea.border && newProp.chartArea.border.width) {
                            refreshBounds = true;
                        }
                        renderer = true;
                        break;
                    case 'legendSettings':
                        if (!newProp.legendSettings.background || !newProp.legendSettings.opacity) {
                            refreshBounds = true;
                        }
                        renderer = true;
                        break;
                    case 'palettes':
                        this.calculateVisibleSeries();
                        renderer = true;
                        break;
                    case 'selectedDataIndexes':
                    case 'selectionMode':
                        if (this.selectionModule && newProp.selectionMode && newProp.selectionMode.indexOf('Drag') === -1) {
                            this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                        }
                        break;
                    case 'isMultiSelect':
                        if (this.selectionModule && !newProp.isMultiSelect && this.selectionModule.selectedDataIndexes.length > 1) {
                            this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                        }
                        break;
                    case 'theme':
                      this.animateSeries = true;
                      break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.renderElements();
            }
            if (refreshBounds) {
                this.removeSvg();
                this.refreshAxis();
                this.refreshBound();
            }
        }
    }
}