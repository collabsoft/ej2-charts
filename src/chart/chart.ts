import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration, L10n } from '@syncfusion/ej2-base';
import { TapEventArgs, EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, SvgRenderer, setCulture, Browser, Touch } from '@syncfusion/ej2-base';
import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';
import { findClipRect, measureText, TextOption, findPosition, textTrim, showTooltip, removeElement } from '../common/utils/helper';
import { textElement, RectOption, ChartLocation, createSvg, firstToLowerCase, titlePositionX } from '../common/utils/helper';
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
import { CandleSeries } from './series/candle-series';
import { ErrorBar } from './series/error-bar';
import { Logarithmic } from './axis/logarithmic-axis';
import { Size, Rect } from '../common/utils/helper';
import { SelectionMode, LineType, ZoomMode, ToolbarItems, ChartTheme } from './utils/enum';
import { Series, SeriesBase } from './series/chart-series';
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
import { RangeColumnSeries } from './series/range-column-series';
import { PolarSeries } from './series/polar-series';
import { RadarSeries } from './series/radar-series';
import { HiloSeries } from './series/hilo-series';
import { HiloOpenCloseSeries } from './series/hilo-open-close-series';
import { WaterfallSeries } from './series/waterfall-series';
import { BubbleSeries } from './series/bubble-series';
import { RangeAreaSeries } from './series/range-area-series';
import { Tooltip } from './user-interaction/tooltip';
import { Crosshair } from './user-interaction/crosshair';
import { Marker } from './series/marker';
import { LegendSettings } from '../common/legend/legend';
import { LegendSettingsModel } from '../common/legend/legend-model';
import { Legend } from './legend/legend';
import { Zoom } from './user-interaction/zooming';
import { Selection } from './user-interaction/selection';
import { DataLabel } from './series/data-label';
import { StripLine } from './axis/strip-line';
import { BoxAndWhiskerSeries } from './series/box-and-whisker-series';
import { PolarRadarPanel } from './axis/polar-radar-panel';
import { StripLineSettingsModel } from './model/chart-base-model';
import { Trendline } from './series/chart-series';
import { Trendlines } from './trend-lines/trend-line';
import { TechnicalIndicator } from './technical-indicators/technical-indicator';
import { SmaIndicator } from './technical-indicators/sma-indicator';
import { EmaIndicator } from './technical-indicators/ema-indicator';
import { TmaIndicator } from './technical-indicators/tma-indicator';
import { AccumulationDistributionIndicator } from './technical-indicators/ad-indicator';
import { AtrIndicator } from './technical-indicators/atr-indicator';
import { BollingerBands } from './technical-indicators/bollinger-bands';
import { MomentumIndicator } from './technical-indicators/momentum-indicator';
import { StochasticIndicator } from './technical-indicators/stochastic-indicator';
import { MacdIndicator } from './technical-indicators/macd-indicator';
import { RsiIndicator } from './technical-indicators/rsi-indicator';
import { TechnicalIndicatorModel } from './technical-indicators/technical-indicator-model';
import { ILegendRenderEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs } from '../common/model/interface';
import { IAnnotationRenderEventArgs } from '../common/model/interface';
import { IPointRenderEventArgs, ISeriesRenderEventArgs, IDragCompleteEventArgs, ITooltipRenderEventArgs } from '../common/model/interface';
import { IZoomCompleteEventArgs, ILoadedEventArgs, IAnimationCompleteEventArgs, IMouseEventArgs } from '../common/model/interface';
import { loaded, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from '../common/model/constants';
import { IPrintEventArgs } from '../common/model/interface';
import { ExportUtils } from '../common/utils/export';
import { ChartAnnotationSettingsModel } from './model/chart-base-model';
import { ChartAnnotationSettings } from './model/chart-base';
import { ChartAnnotation } from './annotation/annotation';
import { getElement } from '../common/utils/helper';
import { ExportType } from '../common/utils/enum';


/**
 * Configures the ToolTips in the chart.
 */

export class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enables / Disables the visibility of the tooltip.
     * @default false.
     */

    @Property(false)
    public enable: boolean;

    /**
     * If set to true, a single ToolTip will be displayed for every index.
     * @default false.
     */

    @Property(false)
    public shared: boolean;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    @Property('#000816')
    public fill: string;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    @Property(null)
    public header: string;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    @Property(0.75)
    public opacity: number;

    /**
     * Options to customize the ToolTip text.
     */

    @Complex<FontModel>(Theme.tooltipLabelFont, Font)
    public textStyle: FontModel;

    /**
     * Format the ToolTip content.
     * @default null.
     */

    @Property(null)
    public format: string;

    /**
     * Custom template to format the ToolTip content. Use ${x} and ${y} as the placeholder text to display the corresponding data point.
     * @default null.
     */

    @Property(null)
    public template: string;

    /**
     * If set to true, ToolTip will animate while moving from one point to another.
     * @default true.
     */
    @Property(true)
    public enableAnimation: boolean;

    /**
     * Options to customize tooltip borders.
     */
    @Complex<BorderModel>({ color: '#cccccc', width: 0.5 }, Border)
    public border: BorderModel;

}
/**
 * Configures the crosshair in the chart.
 */
export class CrosshairSettings extends ChildProperty<CrosshairSettings> {
    /**
     * If set to true, crosshair line becomes visible.
     * @default false.
     */
    @Property(false)
    public enable: boolean;

    /**
     * Options to customize the crosshair line.
     */
    @Complex<BorderModel>({ color: '#4f4f4f', width: 1 }, Border)
    public line: BorderModel;

    /**
     * Specifies the line type. Horizontal mode enables the horizontal line and Vertical mode enables the vertical line. They are,
     * * none: Hides both vertical and horizontal crosshair lines.
     * * both: Shows both vertical and horizontal crosshair lines.
     * * vertical: Shows the vertical line.
     * * horizontal: Shows the horizontal line.
     * @default Both.
     */
    @Property('Both')
    public lineType: LineType;

}
/**
 * Configures the zooming behavior for the chart.
 */
export class ZoomSettings extends ChildProperty<ZoomSettings> {

    /**
     * If set to true, chart can be zoomed by a rectangular selecting region on the plot area.
     * @default false.
     */

    @Property(false)
    public enableSelectionZooming: boolean;

    /**
     * If  to true, chart can be pinched to zoom in / zoom out.
     * @default false.
     */

    @Property(false)
    public enablePinchZooming: boolean;

    /**
     * If set to true, chart can be zoomed by using mouse wheel.
     * @default false.
     */

    @Property(false)
    public enableMouseWheelZooming: boolean;

    /**
     * If set to true, zooming will be performed on mouse up. It requires `enableSelectionZooming` to be true.
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
     * @default true.
     */

    @Property(true)
    public enableDeferredZooming: boolean;

    /**
     * Specifies whether to allow zooming vertically or horizontally or in both ways.They are,
     * * x,y: Chart can be zoomed both vertically and horizontally.
     * * x: Chart can be zoomed horizontally.
     * * y: Chart can be zoomed  vertically.
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
     * @default 'XY'.
     */
    @Property('XY')
    public mode: ZoomMode;

    /**
     * Specifies the toolkit options for the zooming as follows:
     * * zoom
     * * zoomIn
     * * zoomOut
     * * pan
     * * reset
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


    //Module Declaration of Chart.
    /**
     * `lineSeriesModule` is used to add line series to the chart.
     */
    public lineSeriesModule: LineSeries;
    /**
     * `columnSeriesModule` is used to add column series to the chart.
     */
    public columnSeriesModule: ColumnSeries;
    /**
     * `areaSeriesModule` is used to add area series in the chart.
     */
    public areaSeriesModule: AreaSeries;
    /**
     * `barSeriesModule` is used to add bar series to the chart.
     */
    public barSeriesModule: BarSeries;
    /**
     * `stackingColumnSeriesModule` is used to add stacking column series in the chart.
     */
    public stackingColumnSeriesModule: StackingColumnSeries;
    /**
     * `stackingAreaSeriesModule` is used to add stacking area series to the chart.
     */
    public stackingAreaSeriesModule: StackingAreaSeries;
    /**
     * 'CandleSeriesModule' is used to add candle series in the chart.
     */
    public candleSeriesModule: CandleSeries;
    /**
     * `stackingBarSeriesModule` is used to add stacking bar series to the chart.
     */
    public stackingBarSeriesModule: StackingBarSeries;
    /**
     * `stepLineSeriesModule` is used to add step line series to the chart.
     */
    public stepLineSeriesModule: StepLineSeries;
    /**
     * `stepAreaSeriesModule` is used to add step area series to the chart.
     */
    public stepAreaSeriesModule: StepAreaSeries;
    /**
     * `polarSeriesModule` is used to add polar series in the chart.
     */
    public polarSeriesModule: PolarSeries;
    /**
     *  `radarSeriesModule` is used to add radar series in the chart.
     */
    public radarSeriesModule: RadarSeries;
    /**
     * `splineSeriesModule` is used to add spline series to the chart.
     */
    public splineSeriesModule: SplineSeries;
    /**
     * `scatterSeriesModule` is used to add scatter series to the chart.
     */
    public scatterSeriesModule: ScatterSeries;
    /**
     * `boxAndWhiskerSeriesModule` is used to add line series to the chart.
     */
    public boxAndWhiskerSeriesModule: BoxAndWhiskerSeries;
    /**
     * `rangeColumnSeriesModule` is used to add rangeColumn series to the chart.
     */
    public rangeColumnSeriesModule: RangeColumnSeries;
    /**
     * hiloSeriesModule is used to add hilo series in chart
     */
    public hiloSeriesModule: HiloSeries;
    /**
     * hiloOpenCloseSeriesModule is used to add hilo series in chart
     */
    public hiloOpenCloseSeriesModule: HiloOpenCloseSeries;
    /**
     * `waterfallSeries` is used to add waterfall series in chart.
     */
    public waterfallSeriesModule: WaterfallSeries;
    /**
     * `bubbleSeries` is used to add bubble series in chart.
     */
    public bubbleSeriesModule: BubbleSeries;
    /**
     * `rangeAreaSeriesModule` is used to add rangeArea series in chart.
     */
    public rangeAreaSeriesModule: RangeAreaSeries;
    /**
     * `tooltipModule` is used to manipulate and add tooltip to the series.
     */
    public tooltipModule: Tooltip;
    /**
     * `crosshairModule` is used to manipulate and add crosshair to the chart.
     */
    public crosshairModule: Crosshair;
    /**
     * `errorBarModule` is used to manipulate and add errorBar for series.
     */
    public errorBarModule: ErrorBar;
    /**
     * `dataLabelModule` is used to manipulate and add data label to the series.
     */
    public dataLabelModule: DataLabel;
    /**
     * `datetimeModule` is used to manipulate and add dateTime axis to the chart.
     */
    public dateTimeModule: DateTime;
    /**
     * `categoryModule` is used to manipulate and add category axis to the chart.
     */
    public categoryModule: Category;
    /**
     * `logarithmicModule` is used to manipulate and add log axis to the chart.
     */
    public logarithmicModule: Logarithmic;
    /**
     * `legendModule` is used to manipulate and add legend to the chart.
     */
    public legendModule: Legend;
    /**
     * `zoomModule` is used to manipulate and add zooming to the chart.
     */
    public zoomModule: Zoom;
    /**
     * `selectionModule` is used to manipulate and add selection to the chart.
     */
    public selectionModule: Selection;
    /**
     * `annotationModule` is used to manipulate and add annotation in chart.
     */
    public annotationModule: ChartAnnotation;
    /**
     * `stripLineModule` is used to manipulate and add stripLine in chart.
     */
    public stripLineModule: StripLine;

    /**
     * 'TrendlineModule' is used to predict the market trend using trendlines
     */
    public trendLineModule: Trendlines;

    /**
     * `sMAIndicatorModule` is used to predict the market trend using SMA approach
     */
    public sMAIndicatorModule: SmaIndicator;

    /**
     * `eMAIndicatorModule` is used to predict the market trend using EMA approach
     */
    public eMAIndicatorModule: EmaIndicator;

    /**
     * `tMAIndicatorModule` is used to predict the market trend using TMA approach
     */
    public tMAIndicatorModule: TmaIndicator;

    /**
     * `accumulationDistributionIndicatorModule` is used to predict the market trend using Accumulation Distribution approach
     */
    public accumulationDistributionIndicatorModule: AccumulationDistributionIndicator;

    /**
     * `atrIndicatorModule` is used to predict the market trend using ATR approach
     */
    public atrIndicatorModule: AtrIndicator;

    /**
     * `rSIIndicatorModule` is used to predict the market trend using RSI approach
     */
    public rsiIndicatorModule: RsiIndicator;

    /**
     * `macdIndicatorModule` is used to predict the market trend using Macd approach
     */
    public macdIndicatorModule: MacdIndicator;

    /**
     * `stochasticIndicatorModule` is used to predict the market trend using Stochastic approach
     */
    public stochasticIndicatorModule: StochasticIndicator;

    /**
     * `momentumIndicatorModule` is used to predict the market trend using Momentum approach
     */
    public momentumIndicatorModule: MomentumIndicator;

    /**
     * `bollingerBandsModule` is used to predict the market trend using Bollinger approach
     */
    public bollingerBandsModule: BollingerBands;

    /**
     * The width of the chart as a string accepts input as both like '100px' or '100%'.
     * If specified as '100%, chart renders to the full width of its parent element.
     * @default null.
     */

    @Property(null)
    public width: string;

    /**
     * The height of the chart as a string accepts input both as '100px' or '100%'.
     * If specified as '100%, chart renders to the full height of its parent element.
     * @default null.
     */

    @Property(null)
    public height: string;

    /**
     * Title of the chart
     * @default ''.
     */

    @Property('')
    public title: string;

    /**
     * Options for customizing the title of the Chart.
     */

    @Complex<FontModel>(Theme.chartTitleFont, Font)
    public titleStyle: FontModel;

    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */

    @Complex<MarginModel>({}, Margin)
    public margin: MarginModel;

    /**
     * Options for customizing the color and width of the chart border.
     */

    @Complex<BorderModel>({ color: '#DDDDDD', width: 0 }, Border)
    public border: BorderModel;

    /**
     * The background color of the chart that accepts value in hex and rgba as a valid CSS color string.
     * @default 'transparent'.
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
     * Options to split Chart into multiple plotting areas horizontally.
     * Each object in the collection represents a plotting area in the Chart.
     */

    @Collection<RowModel>([{}], Row)
    public rows: RowModel[];


    /**
     * Options to split chart into multiple plotting areas vertically.
     * Each object in the collection represents a plotting area in the chart.
     */

    @Collection<ColumnModel>([{}], Column)
    public columns: ColumnModel[];

    /**
     * Secondary axis collection for the chart.
     */

    @Collection<AxisModel>([{}], Axis)
    public axes: AxisModel[];

    /**
     * The configuration for series in the chart.
     */

    @Collection<SeriesModel>([{}], Series)
    public series: SeriesModel[];

    /**
     * The configuration for annotation in chart.
     */

    @Collection<ChartAnnotationSettingsModel>([{}], ChartAnnotationSettings)
    public annotations: ChartAnnotationSettingsModel[];

    /**
     * Palette for the chart series.
     * @default [].
     */
    @Property([])
    public palettes: string[];

    /**
     * Specifies the theme for the chart.
     */
    @Property('Material')
    public theme: ChartTheme;

    /**
     * Options for customizing the tooltip of the chart.
     */

    @Complex<TooltipSettingsModel>({}, TooltipSettings)
    public tooltip: TooltipSettingsModel;


    /**
     * Options for customizing the crosshair of the chart.
     */
    @Complex<CrosshairSettingsModel>({}, CrosshairSettings)
    public crosshair: CrosshairSettingsModel;

    /**
     * Options for customizing the legend of the chart.
     */
    @Complex<LegendSettingsModel>({}, LegendSettings)
    public legendSettings: LegendSettingsModel;

    /**
     * Options to enable the zooming feature in the chart.
     */
    @Complex<ZoomSettingsModel>({}, ZoomSettings)
    public zoomSettings: ZoomSettingsModel;

    /**
     * Specifies whether series or data point has to be selected. They are,
     * * none: Disables the selection.
     * * series: selects a series.
     * * point: selects a point.
     * * cluster: selects a cluster of point
     * * dragXY: selects points by dragging with respect to both horizontal and vertical axes
     * * dragX: selects points by dragging with respect to horizontal axis.
     * * dragY: selects points by dragging with respect to vertical axis.
     * @default None.
     */
    @Property('None')
    public selectionMode: SelectionMode;

    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
     * @default false.
     */
    @Property(false)
    public isMultiSelect: boolean;

    /**
     * Specifies the point indexes to be selected while loading a chart.
     * It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
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
     * @default [].
     */
    @Collection<IndexesModel>([], Indexes)
    public selectedDataIndexes: IndexesModel[];

    /**
     * Specifies whether a grouping separator should be used for a number.
     * @default false.
     */
    @Property(false)
    public useGroupingSeparator: boolean;

    /**
     * It specifies whether the chart should be render in transposed manner or not.
     * @default false
     */
    @Property(false)
    public isTransposed: boolean;

    /**
     * Defines the collection of technical indicators, that are used in financial markets
     */
    @Collection<TechnicalIndicatorModel>([], TechnicalIndicator)
    public indicators: TechnicalIndicatorModel[];


    /**
     * Description for chart.
     * @default null
     */
    @Property(null)
    public description: string;

    /**
     * TabIndex value for the chart.
     * @default 1.
     */
    @Property(1)
    public tabIndex: number;

    /**
     * To enable the side by side placing the points for column type series.
     */
    @Property(true)
    public enableSideBySidePlacement: boolean;

    /**
     * Triggers before the annotation gets rendered.
     * @event
     */

    @Event()
    public annotationRender: EmitType<IAnnotationRenderEventArgs>;

    /**
     * Triggers before the prints gets started.
     * @event
     */

    @Event()
    public beforePrint: EmitType<IPrintEventArgs>;

    /**
     * Triggers after chart load.
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
     * Triggers after animation is completed for the series.
     * @event
     */
    @Event()
    public animationComplete: EmitType<IAnimationCompleteEventArgs>;

    /**
     * Triggers before the legend is rendered.
     * @event
     */
    @Event()
    public legendRender: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series is rendered.
     * @event
     */

    @Event()
    public textRender: EmitType<ITextRenderEventArgs>;

    /**
     * Triggers before each points for the series is rendered.
     * @event
     */

    @Event()
    public pointRender: EmitType<IPointRenderEventArgs>;

    /**
     * Triggers before the series is rendered.
     * @event
     */

    @Event()
    public seriesRender: EmitType<ISeriesRenderEventArgs>;
    /**
     * Triggers before each axis label is rendered.
     * @event
     */
    @Event()
    public axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the tooltip for series is rendered.
     * @event
     */

    @Event()
    public tooltipRender: EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers on hovering the chart.
     * @event
     */

    @Event()
    public chartMouseMove: EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the chart.
     * @event
     */

    @Event()
    public chartMouseClick: EmitType<IMouseEventArgs>;


    /**
     * Triggers when cursor leaves the chart.
     * @event
     */

    @Event()
    public chartMouseLeave: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse down.
     * @event
     */

    @Event()
    public chartMouseDown: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.
     * @event
     */

    @Event()
    public chartMouseUp: EmitType<IMouseEventArgs>;

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
     * localization object 
     * @private
     */
    public localeObject: L10n;
    /**
     * It contains default values of localization values
     */
    private defaultLocalConstants: Object;

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
    public chartAxisLayoutPanel: CartesianAxisLayoutPanel | PolarRadarPanel;
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
    public indicatorElements: Element;
    /** @private */
    public trendLineElements: Element;
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
    public startMove: boolean;
    /** @private */
    public yAxisElements: Element;
    /** @private */
    public radius: number;
    /** @private */
    public chartAreaType: string = 'Cartesian';
    /**
     * `markerModule` is used to manipulate and add marker to the series.
     * @private
     */
    public markerRender: Marker;

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
        if (this.tooltipModule) {
            this.tooltipModule.previousPoints = [];
        }

    }

    /**
     * To Initialize the control rendering.
     */

    protected render(): void {

        this.trigger(load, { chart: this });

        this.markerRender = new Marker(this);

        this.calculateAreaType();

        this.calculateVisibleSeries();

        this.initTechnicalIndicators();

        this.initTrendLines();

        this.calculateVisibleAxis();

        this.processData();

    }

    /** 
     * Gets the localized label by locale keyword. 
     * @param  {string} key  
     * @return {string}  
     */
    public getLocalizedLabel(key: string): string {
        return this.localeObject.getConstant(key);
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
            series.position = series.rectCount = undefined;
            if (((series.type.indexOf('Stacking') !== -1) || (series.drawType.indexOf('Stacking') !== -1
                && this.chartAreaType === 'PolarRadar')) && !isCalculateStacking) {
                series.calculateStackedValue(series.type.indexOf('100') > -1);
                isCalculateStacking = true;
            }
        }
        this.calculateBounds();

        this.renderElements();
    }

    private renderElements(): void {

        this.renderBorder();

        this.renderTitle();

        this.renderAreaBorder();

        this.renderSeriesElements();

        this.applyZoomkit();

        this.performSelection();

        this.setSecondaryElementPosition();
        this.renderAnnotation();
    }
    /**
     * To set the left and top position for data label template for center aligned chart
     */
    private setSecondaryElementPosition(): void {
        let element: HTMLDivElement = getElement(this.element.id + '_Secondary_Element') as HTMLDivElement;
        if (!element) {
            return;
        }
        let rect: ClientRect = this.element.getBoundingClientRect();
        let svgRect: ClientRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    }
    private initializeModuleElements(): void {
        this.dataLabelCollections = [];
        this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
        this.yAxisElements = this.renderer.createGroup({ id: this.element.id + 'yAxisCollection' });
        if (this.indicators.length) {
            this.indicatorElements = this.renderer.createGroup({ id: this.element.id + 'IndicatorCollection' });
        }
        if (this.hasTrendlines()) {
            this.trendLineElements = this.renderer.createGroup({ id: this.element.id + 'TrendLineCollection' });
        }
        this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });
    }

    private hasTrendlines(): boolean {
        let isTrendline: boolean;
        for (let series of this.series) {
            isTrendline = series.trendlines.length ? true : false;
            if (isTrendline) {
                break;
            }
        }
        return isTrendline;
    }
    private renderSeriesElements(): void {
        // Initialize the series elements values
        this.initializeModuleElements();
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.renderAxes();
            let tooltipDiv: Element = document.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.setAttribute('style', 'position: relative');
            this.element.appendChild(tooltipDiv);
            // For userInteraction
            if (this.tooltip.enable) {
                this.svgObject.appendChild(this.renderer.createGroup(
                    { id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }
                ));
            }
            for (let indicator of this.indicators) {
                if (this[firstToLowerCase(indicator.type) + 'IndicatorModule']) {
                    this[firstToLowerCase(indicator.type) + 'IndicatorModule'].createIndicatorElements(
                        this, indicator as TechnicalIndicator, (indicator as TechnicalIndicator).index);
                }
            }

            for (let series of this.visibleSeries) {
                if (series.trendlines.length) {
                    this.trendLineModule.getTrendLineElements(series, this);
                }
            }

            for (let item of this.visibleSeries) {
                if (item.visible) {
                    findClipRect(item);
                    item.renderSeries(this, item.index);
                }
            }
        }
        //Append the series elements method calling here
        this.appendSeriesElements();
    }

    private appendSeriesElements(): void {
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
        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Behind', this.axisCollections);
        }

        this.svgObject.appendChild(this.seriesElements);
        if (this.chartAreaType === 'PolarRadar') {
            this.svgObject.appendChild(this.yAxisElements);
        }
        if (this.indicatorElements) {
            this.svgObject.appendChild(this.indicatorElements);
        }

        if (this.trendLineElements) {
            this.svgObject.appendChild(this.trendLineElements);
        }

        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Over', this.axisCollections);
        }

        if (this.legendModule) {
            this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
        }
        if (!this.tooltip.enable) {
            this.svgObject.appendChild(this.renderer.createGroup(
                { id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }
            ));
        }
        this.element.appendChild(this.svgObject);
    }
    private applyZoomkit(): void {
        if (this.zoomModule && this.zoomModule.isZoomed) {
            this.zoomModule.applyZoomToolkit(this, this.axisCollections);
        }
    }
    private renderAnnotation(): void {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(
                getElement(this.element.id + '_Secondary_Element')
            );
        }
    }
    private performSelection(): void {
        let selectedDataIndexes: Indexes[] = [];
        if (this.selectionModule) {
            selectedDataIndexes = <Indexes[]>extend([], this.selectionModule.selectedDataIndexes, null, true);
            this.selectionModule.invokeSelection(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.selectionModule.selectedDataIndexes = selectedDataIndexes;
            this.selectionModule.redrawSelection(this, this.selectionMode);
        }
    }
    private processData(): void {
        let series: Series;
        this.visibleSeriesCount = 0;
        let check: boolean = true;
        for (let series of this.visibleSeries) {
            if (!series.visible) {
                this.visibleSeriesCount++;
                continue;
            }
            if (series.category !== 'Indicator' && series.category !== 'TrendLine') {
                this.initializeDataModule(series);
            }
        }
        for (let indicator of this.indicators) {
            if (!indicator.seriesName && indicator.dataSource) {
                let techIndicator: TechnicalIndicator = indicator as TechnicalIndicator;
                this.initializeDataModule(techIndicator);
                check = false;
            }
        }
        if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length && check) {
            this.refreshBound();
            this.trigger('loaded', { chart: this });
        }
    }

    private initializeDataModule(series: SeriesBase): void {
        series.xData = []; series.yData = [];
        series.dataModule = new Data(series.dataSource, series.query);
        series.points = [];
        (series as TechnicalIndicator).refreshDataManager(this);
    }

    private calculateBounds(): void {
        let padding: number = 15;
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

    /**
     * Handles the print method for chart control.
     */
    public print(id?: string[] | string | Element): void {
        let exportChart: ExportUtils = new ExportUtils(this);
        exportChart.print(id);
    }
    /**
     * Handles the export method for chart control.
     * @param type 
     * @param fileName 
     */
    public export(type: ExportType, fileName: string): void {
        let exportChart: ExportUtils = new ExportUtils(this);
        exportChart.export(type, fileName);
    }

    /**
     * Defines the trendline initialization
     */
    private initTrendLines(): void {
        for (let series of this.visibleSeries) {
            let trendIndex: number = 0;
            for (let trendline of series.trendlines) {
                let trendLine: Trendline = trendline as Trendline;
                let type: string = firstToLowerCase(trendLine.type);
                if (this.trendLineModule) {
                    trendLine.index = trendIndex;
                    trendLine.sourceIndex = series.index;
                    this.trendLineModule.initSeriesCollection(trendLine, this);
                    if (trendLine.targetSeries) {
                        this.visibleSeries.push(trendLine.targetSeries);
                    }
                }
                trendIndex++;
            }
        }
    }

    private calculateAreaType(): void {
        let series: SeriesModel = this.series[0];
        if (series) {
            this.requireInvertedAxis = ((series.type.indexOf('Bar') !== -1) && !this.isTransposed) ||
                ((series.type.indexOf('Bar') === -1) && this.isTransposed && this.chartAreaType !== 'PolarRadar');
        }
        this.chartAxisLayoutPanel = this.chartAreaType === 'PolarRadar' ? (this.polarSeriesModule || this.radarSeriesModule)
            : new CartesianAxisLayoutPanel(this);
    }

    private calculateVisibleAxis(): void {
        let axis: Axis; let series: Series;
        let axes: AxisModel[] = [this.primaryXAxis, this.primaryYAxis];
        axes = this.chartAreaType === 'Cartesian' ? axes.concat(this.axes) : axes;
        this.axisCollections = [];
        for (let i: number = 0, len: number = axes.length; i < len; i++) {
            axis = <Axis>axes[i]; axis.series = []; axis.labels = [];
            for (let series of this.visibleSeries) {
                this.initAxis(series, axis);
            }
            for (let indicator of this.indicators) {
                this.initAxis(indicator as SeriesBase, axis);
            }
            if (axis.orientation != null) {
                this.axisCollections.push(axis);
            }
        }
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.measure();
        }
    }

    private initAxis(series: SeriesBase, axis: Axis): void {
        if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
            series.xAxis = axis;
            if (series instanceof Series) { axis.series.push(series); }
        } else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
            series.yAxis = axis;
            if (series instanceof Series) { axis.series.push(series); }
        }
    }

    private initTechnicalIndicators(): void {
        let i: number = 0;
        for (let indicator of this.indicators) {
            let techIndicator: TechnicalIndicator = indicator as TechnicalIndicator;
            let type: string = firstToLowerCase(techIndicator.type);
            if (this[type + 'IndicatorModule']) {
                techIndicator.index = i;
                this[type + 'IndicatorModule'].initSeriesCollection(techIndicator, this);
                for (let targetSeries of techIndicator.targetSeries) {
                    if (indicator.seriesName || indicator.dataSource) {
                        this.visibleSeries.push(targetSeries);
                    }
                }
            }
            i++;
        }
    }

    /** @private */
    public refreshTechnicalIndicator(series: SeriesBase): void {
        if (this.indicators.length) {
            let targetIndicator: TechnicalIndicator = null;
            if (series instanceof Series && series.category !== 'Indicator') {
                for (let indicator of this.indicators) {
                    if (indicator.seriesName === series.name && !indicator.dataSource) {
                        targetIndicator = indicator as TechnicalIndicator;
                        targetIndicator.setDataSource(series, this);
                    }
                }
            } else if (series instanceof TechnicalIndicator) {
                targetIndicator = series as TechnicalIndicator;
                targetIndicator.setDataSource(series instanceof Series ? series : null, this);
            }
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
            switch (series.type) {
                case 'Bar':
                case 'StackingBar':
                case 'StackingBar100':
                    if (this.series[0].type.indexOf('Bar') === -1) {
                        continue;
                    } break;
                case 'Polar':
                case 'Radar':
                    if (this.chartAreaType !== 'PolarRadar') {
                        continue;
                    }
                    if (this.chartAreaType === 'PolarRadar' && ((series.xAxisName === null && series.yAxisName !== null) ||
                        (series.xAxisName !== null && series.yAxisName === null) ||
                        (series.xAxisName !== null && series.yAxisName !== null))) {
                        continue;
                    }
                    break;
                default:
                    if (this.chartAreaType === 'PolarRadar' || this.series[0].type.indexOf('Bar') > -1) {
                        continue;
                    }
                    break;
            }
            this.visibleSeries.push(series);

            this.series[i] = series;
        }
    }


    private renderTitle(): void {
        if (this.title) {
            let maxTitleSize: number = this.availableSize.width - this.margin.left - this.margin.right;
            let trimmedTitle: string = textTrim(maxTitleSize, this.title, this.titleStyle);
            this.elementSize = measureText(trimmedTitle, this.titleStyle);

            let options: TextOption = new TextOption(
                this.element.id + '_ChartTitle',
                titlePositionX(this.availableSize, this.margin.left, this.margin.right, this.titleStyle, this.elementSize),
                this.margin.top + 3 * (this.elementSize.height / 4),
                'start', trimmedTitle
            );

            let element: Element = textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    }

    private renderBorder(): void {
        let width: number = this.border.width;
        let rect: RectOption = new RectOption(
            this.element.id + '_ChartBorder', this.background, this.border, 1,
            new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));

        this.htmlObject = this.renderer.drawRectangle(rect) as HTMLElement;

        this.svgObject.appendChild(this.htmlObject);

    }

    private renderAreaBorder(): void {

        if (this.chartAreaType === 'PolarRadar') {
            return null;
        } else {
            let rect: RectOption = new RectOption(
                this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border,
                this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);

            this.htmlObject = this.renderer.drawRectangle(rect) as HTMLElement;

            this.svgObject.appendChild(this.htmlObject);
        }
    }

    /**
     * To add series for the chart
     * @param {SeriesModel[]} seriesCollection - Defines the series collection to be added in chart.
     * @return {void}.
     */

    public addSeries(seriesCollection: SeriesModel[]): void {
        for (let series of seriesCollection) {
            series = new Series(this, 'series', series);
            this.series.push(series);
        }
        this.refresh();
    }

    /**
     * To destroy the widget
     * @method destroy
     * @return {void}.
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
        let startEvent: string = Browser.touchStartEvent;
        let moveEvent: string = Browser.touchMoveEvent;
        let stopEvent: string = Browser.touchEndEvent;
        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */

        EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);

        if (this.isOrientation() && Browser.isTouch) {
            EventHandler.remove(<HTMLElement & Window>window, 'orientationchange', this.chartResize);
        } else {
            EventHandler.remove(<HTMLElement & Window>window, 'resize', this.chartResize);
        }

    }


    private wireEvents(): void {
        /*! Find the Events type */

        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';

        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.chartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);

        if (Browser.isTouch && this.isOrientation()) {
            EventHandler.add(<HTMLElement & Window>window, 'orientationchange', this.chartResize, this);
        } else {
            EventHandler.add(<HTMLElement & Window>window, 'resize', this.chartResize, this);
        }
        this.longPress = this.longPress.bind(this);
        new Touch(this.element, { tapHold: this.longPress, tapHoldThreshold: 500 });

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
    public longPress(e?: TapEventArgs): boolean {
        this.mouseX = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientX - this.offset.x) : 0;
        this.mouseY = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientY - this.offset.y) : 0;
        this.startMove = true;
        this.setMouseXY(this.mouseX, this.mouseY);
        this.notify('tapHold', e);
        return false;
    }
    /**
     * To find mouse x, y for aligned chart element svg position
     */
    private setMouseXY(pageX: number, pageY: number): void {
        let rect: ClientRect = this.element.getBoundingClientRect();
        let svgRect: ClientRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
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
                this.trigger('loaded', { chart: this });
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
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        } else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseMove(e);
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseLeave(e);
        return false;
    }
    /**
     * Handles the mouse leave on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseLeave(e: PointerEvent | TouchEvent): boolean {
        let element: Element = <Element>e.target;
        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.trigger(chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.notify(cancelEvent, e);
        return false;
    }
    /**
     * Handles the mouse click on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseClick(e: PointerEvent | TouchEvent): boolean {
        let element: Element = <Element>e.target;
        this.trigger(chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.notify('click', e);
        return false;
    }
    /**
     * Handles the mouse move on chart. 
     * @return {boolean}
     * @private
     */
    public chartOnMouseMove(e: PointerEvent | TouchEvent): boolean {
        let element: Element = <Element>e.target;
        this.trigger(chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
        // Tooltip for chart series.
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            this.axisTooltip(e, this.mouseX, this.mouseY);
        }
        this.notify(Browser.touchMoveEvent, e);
        this.isTouch = false;
        return false;
    }
    private titleTooltip(event: Event, x: number, y: number, isTouch?: boolean): void {
        let targetId: string = (<HTMLElement>event.target).id;
        if ((targetId === (this.element.id + '_ChartTitle')) && ((<HTMLElement>event.target).textContent.indexOf('...') > -1)) {
            showTooltip(
                this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip',
                getElement(this.element.id + '_Secondary_Element'), isTouch
            );
        } else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    }
    private axisTooltip(event: Event, x: number, y: number, isTouch?: boolean): void {
        let targetId: string = (<HTMLElement>event.target).id;
        if ((targetId.indexOf('AxisLabel') > -1) && ((<HTMLElement>event.target).textContent.indexOf('...') > -1)) {
            showTooltip(
                this.findAxisLabel(targetId), x, y, this.element.offsetWidth, this.element.id + '_EJ2_AxisLabel_Tooltip',
                getElement(this.element.id + '_Secondary_Element'), isTouch
            );
        } else {
            removeElement(this.element.id + '_EJ2_AxisLabel_Tooltip');
        }
    }

    private findAxisLabel(text: string): string {
        let texts: string[] = ((text.replace(this.element.id, '')).replace('AxisLabel_', '')).split('_');
        return this.axisCollections[parseInt(texts[0], 10)].visibleLabels[parseInt(texts[1], 10)].originalText;
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
        let offset: number = Browser.isDevice ? 20 : 30;
        let rect: ClientRect = this.element.getBoundingClientRect();
        let element: Element = <Element>e.target;
        this.trigger(chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = <TouchEvent & PointerEvent>e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            target = <Element>touchArg.target;
        } else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = <Element>e.target;
        }
        let svgRect: ClientRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);

        if (this.isTouch) {
            this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
        }
        this.notify(Browser.touchStartEvent, e);
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseUp(e);
        return false;
    }

    /**
     * Handles the mouse up. 
     * @return {boolean}
     * @private
     */

    public chartOnMouseUp(e: PointerEvent | TouchEvent): boolean {
        let element: Element = <Element>e.target;
        this.trigger(chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.axisTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.threshold = new Date().getTime() + 300;
        }
        this.seriesElements.removeAttribute('clip-path');
        this.notify(Browser.touchEndEvent, e);
        return false;
    }
    /**
     * Method to set culture for chart
     */

    private setCulture(): void {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    }

    /**
     * Method to set locale constants
     */
    private setLocaleConstants(): void {
        this.defaultLocalConstants = {
            ZoomIn: 'ZoomIn',
            Zoom: 'Zoom',
            ZoomOut: 'ZoomOut',
            Pan: 'Pan',
            Reset: 'Reset',
            ResetZoom: 'Reset Zoom'
        };
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
        let enableAnnotation: boolean = false;
        let moduleName: string;
        let errorBarVisible: boolean = false;
        let dataLabelEnable: boolean = false;
        let zooming: ZoomSettingsModel = this.zoomSettings;
        this.chartAreaType = (series.length > 0 && (series[0].type === 'Polar' || series[0].type === 'Radar')) ? 'PolarRadar' : 'Cartesian';

        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this]
            });
        }
        series.map((value: Series) => {
            this.isLegend = (this.legendSettings.visible && ((value.name !== '') || !!this.isLegend));
            moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series' : value.type + 'Series';
            errorBarVisible = value.errorBar.visible || errorBarVisible;
            dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
            modules.push({
                member: moduleName,
                args: [this, series]
            });
            if (this.chartAreaType === 'PolarRadar') {
                modules.push({
                    member: value.drawType + 'Series',
                    args: [this, series]
                });
            }
        });
        this.findIndicatorModules(modules);
        this.findTrendLineModules(modules);
        modules = this.findAxisModule(modules);
        enableAnnotation = this.annotations.some((value: ChartAnnotationSettings) => {
            return (value.content !== null);
        });
        if (errorBarVisible) {
            modules.push({
                member: 'ErrorBar',
                args: [this, series]
            });
        }
        if (this.isLegend) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }

        if (this.chartAreaType !== 'PolarRadar' && (zooming.enableSelectionZooming
            || zooming.enableMouseWheelZooming || zooming.enablePinchZooming)) {
            modules.push({
                member: 'Zoom',
                args: [this, this.zoomSettings]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' || (this.chartAreaType === 'PolarRadar' &&
            (!(this.selectionMode.indexOf('DragX') > -1 || this.selectionMode.indexOf('DragXY') > -1 ||
                this.selectionMode.indexOf('DragY') > -1)))) {
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
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this, this.annotations]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' && this.crosshair.enable) {
            modules.push({
                member: 'Crosshair',
                args: [this]
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
        let striplineEnabled: boolean = false;
        for (let axis of axisCollections) {
            datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
            categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
            logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            striplineEnabled = this.findStriplineVisibility(axis.stripLines) || striplineEnabled;
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
        if (striplineEnabled) {
            modules.push({
                member: 'StripLine',
                args: [this]
            });
        }
        return modules;

    }

    private findIndicatorModules(modules: ModuleDeclaration[]): void {
        let macdEnable: boolean;
        let bandEnable: boolean;
        let indicators: TechnicalIndicatorModel[] = this.indicators;
        if (this.indicators.length) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
            indicators.map((indicator: TechnicalIndicator) => {
                macdEnable = macdEnable || indicator.type === 'Macd';
                bandEnable = bandEnable || indicator.type === 'BollingerBands';
            });
            if (macdEnable) {
                modules.push({
                    member: 'ColumnSeries',
                    args: [this]
                });
            }
            if (bandEnable) {
                modules.push({
                    member: 'RangeAreaSeries',
                    args: [this]
                });
            }
            for (let indicator of this.indicators) {
                modules.push({
                    member: indicator.type + 'Indicator',
                    args: [this]
                });
            }
        }
    }

    private findTrendLineModules(modules: ModuleDeclaration[]): void {
        let isLine: boolean;
        let isSpline: boolean;
        for (let series of this.series) {
            let markerEnable: boolean;
            series.trendlines.map((trendline: Trendline) => {
                markerEnable = markerEnable || trendline.marker.visible;
                isLine = isLine || (trendline.type === 'Linear' || trendline.type === 'MovingAverage') ? true : false;
                isSpline = isSpline || !isLine ? true : false;
            });
            if (markerEnable) {
                modules.push({
                    member: 'Marker',
                    args: [this, series]
                });
            }
        }

        if (isLine || isSpline) {
            modules.push({
                member: 'TrendLine',
                args: [this]
            });
        }

        if (isLine) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
        }
        if (isSpline) {
            modules.push({
                member: 'SplineSeries',
                args: [this]
            });
        }
    }

    private findStriplineVisibility(striplines: StripLineSettingsModel[]): boolean {
        let visible: boolean = false;
        for (let stripline of striplines) {
            if (stripline.visible) {
                visible = true;
                break;
            }
        }
        return visible;
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
        axis.isStack100 = false;
        axis.rect = new Rect(undefined, undefined, 0, 0, );
        for (let item of this.axes) {
            axis = <Axis>item;
            axis.rect = new Rect(undefined, undefined, 0, 0, );
            axis.isStack100 = false;
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
    // tslint:disable-next-line:max-func-body-length
    public onPropertyChanged(newProp: ChartModel, oldProp: ChartModel): void {
        let renderer: boolean = false;
        let refreshBounds: boolean = false;
        if (Object.keys(newProp).length === 1 && Object.keys(newProp)[0] === 'indicators') {
            //add valid check, it should happen only when property change is triggered for target series
            return;
        }
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
                    case 'zoomSettings':
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
                        renderer = true; break;
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
                        this.animateSeries = true; break;
                    case 'locale':
                        this.setCulture();
                        renderer = true; break;
                    case 'tooltip':
                        this.tooltipModule.previousPoints = []; break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.renderElements();
                this.trigger('loaded', { chart: this });
            }
            if (refreshBounds) {
                this.removeSvg();
                this.refreshAxis();
                this.refreshBound();
                this.trigger('loaded', { chart: this });
            }
        }
    }
}
