import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration, L10n } from '@syncfusion/ej2-base';import { TapEventArgs, EmitType, ChildProperty } from '@syncfusion/ej2-base';import { remove } from '@syncfusion/ej2-base';import { extend } from '@syncfusion/ej2-base';import { INotifyPropertyChanged, SvgRenderer, setCulture, Browser, Touch } from '@syncfusion/ej2-base';import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';import { findClipRect, measureText, TextOption, findPosition, textTrim, showTooltip, removeElement } from '../common/utils/helper';import { textElement, RectOption, ChartLocation, createSvg, firstToLowerCase, titlePositionX } from '../common/utils/helper';import { MarginModel, BorderModel, ChartAreaModel, FontModel } from '../common/model/base-model';import { getSeriesColor, Theme } from '../common/model/theme';import { IndexesModel } from '../common/model/base-model';import { Margin, Border, ChartArea, Font, Indexes } from '../common/model/base';import { AxisModel, RowModel, ColumnModel } from './axis/axis-model';import { Row, Column, Axis } from './axis/axis';import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';import { DateTime } from './axis/date-time-axis';import { Category } from './axis/category-axis';import { CandleSeries } from './series/candle-series';import { ErrorBar } from './series/error-bar';import { Logarithmic } from './axis/logarithmic-axis';import { Size, Rect } from '../common/utils/helper';import { SelectionMode, LineType, ZoomMode, ToolbarItems, ChartTheme } from './utils/enum';import { Series, SeriesBase } from './series/chart-series';import { SeriesModel } from './series/chart-series-model';import { Data } from '../common/model/data';import { LineSeries } from './series/line-series';import { AreaSeries } from './series/area-series';import { BarSeries } from './series/bar-series';import { StepLineSeries } from './series/step-line-series';import { StepAreaSeries } from './series/step-area-series';import { ColumnSeries } from './series/column-series';import { StackingColumnSeries } from './series/stacking-column-series';import { StackingBarSeries } from './series/stacking-bar-series';import { StackingAreaSeries } from './series/stacking-area-series';import { ScatterSeries } from './series/scatter-series';import { SplineSeries } from './series/spline-series';import { RangeColumnSeries } from './series/range-column-series';import { PolarSeries } from './series/polar-series';import { RadarSeries } from './series/radar-series';import { HiloSeries } from './series/hilo-series';import { HiloOpenCloseSeries } from './series/hilo-open-close-series';import { WaterfallSeries } from './series/waterfall-series';import { BubbleSeries } from './series/bubble-series';import { RangeAreaSeries } from './series/range-area-series';import { Tooltip } from './user-interaction/tooltip';import { Crosshair } from './user-interaction/crosshair';import { Marker } from './series/marker';import { LegendSettings } from '../common/legend/legend';import { LegendSettingsModel } from '../common/legend/legend-model';import { Legend } from './legend/legend';import { Zoom } from './user-interaction/zooming';import { Selection } from './user-interaction/selection';import { DataLabel } from './series/data-label';import { StripLine } from './axis/strip-line';import { BoxAndWhiskerSeries } from './series/box-and-whisker-series';import { PolarRadarPanel } from './axis/polar-radar-panel';import { StripLineSettingsModel } from './model/chart-base-model';import { Trendline } from './series/chart-series';import { Trendlines } from './trend-lines/trend-line';import { TechnicalIndicator } from './technical-indicators/technical-indicator';import { SmaIndicator } from './technical-indicators/sma-indicator';import { EmaIndicator } from './technical-indicators/ema-indicator';import { TmaIndicator } from './technical-indicators/tma-indicator';import { AccumulationDistributionIndicator } from './technical-indicators/ad-indicator';import { AtrIndicator } from './technical-indicators/atr-indicator';import { BollingerBands } from './technical-indicators/bollinger-bands';import { MomentumIndicator } from './technical-indicators/momentum-indicator';import { StochasticIndicator } from './technical-indicators/stochastic-indicator';import { MacdIndicator } from './technical-indicators/macd-indicator';import { RsiIndicator } from './technical-indicators/rsi-indicator';import { TechnicalIndicatorModel } from './technical-indicators/technical-indicator-model';import { ILegendRenderEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs } from '../common/model/interface';import { IAnnotationRenderEventArgs } from '../common/model/interface';import { IPointRenderEventArgs, ISeriesRenderEventArgs, IDragCompleteEventArgs, ITooltipRenderEventArgs } from '../common/model/interface';import { IZoomCompleteEventArgs, ILoadedEventArgs, IAnimationCompleteEventArgs, IMouseEventArgs } from '../common/model/interface';import { loaded, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from '../common/model/constants';import { IPrintEventArgs } from '../common/model/interface';import { ExportUtils } from '../common/utils/export';import { ChartAnnotationSettingsModel } from './model/chart-base-model';import { ChartAnnotationSettings } from './model/chart-base';import { ChartAnnotation } from './annotation/annotation';import { getElement } from '../common/utils/helper';import { ExportType } from '../common/utils/enum';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Enables / Disables the visibility of the tooltip.
     * @default false.
     */

    enable?: boolean;

    /**
     * If set to true, a single ToolTip will be displayed for every index.
     * @default false.
     */

    shared?: boolean;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    fill?: string;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    header?: string;

    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. 
     */

    opacity?: number;

    /**
     * Options to customize the ToolTip text.
     */

    textStyle?: FontModel;

    /**
     * Format the ToolTip content.
     * @default null.
     */

    format?: string;

    /**
     * Custom template to format the ToolTip content. Use ${x} and ${y} as the placeholder text to display the corresponding data point.
     * @default null.
     */

    template?: string;

    /**
     * If set to true, ToolTip will animate while moving from one point to another.
     * @default true.
     */
    enableAnimation?: boolean;

    /**
     * Options to customize tooltip borders.
     */
    border?: BorderModel;

}

/**
 * Interface for a class CrosshairSettings
 */
export interface CrosshairSettingsModel {

    /**
     * If set to true, crosshair line becomes visible.
     * @default false.
     */
    enable?: boolean;

    /**
     * Options to customize the crosshair line.
     */
    line?: BorderModel;

    /**
     * Specifies the line type. Horizontal mode enables the horizontal line and Vertical mode enables the vertical line. They are,
     * * none: Hides both vertical and horizontal crosshair lines.
     * * both: Shows both vertical and horizontal crosshair lines.
     * * vertical: Shows the vertical line.
     * * horizontal: Shows the horizontal line.
     * @default Both.
     */
    lineType?: LineType;

}

/**
 * Interface for a class ZoomSettings
 */
export interface ZoomSettingsModel {

    /**
     * If set to true, chart can be zoomed by a rectangular selecting region on the plot area.
     * @default false.
     */

    enableSelectionZooming?: boolean;

    /**
     * If  to true, chart can be pinched to zoom in / zoom out.
     * @default false.
     */

    enablePinchZooming?: boolean;

    /**
     * If set to true, chart can be zoomed by using mouse wheel.
     * @default false.
     */

    enableMouseWheelZooming?: boolean;

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

    enableDeferredZooming?: boolean;

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
    mode?: ZoomMode;

    /**
     * Specifies the toolkit options for the zooming as follows:
     * * zoom
     * * zoomIn
     * * zoomOut
     * * pan
     * * reset
     */

    toolbarItems?: ToolbarItems[];

}

/**
 * Interface for a class Chart
 */
export interface ChartModel extends ComponentModel{

    /**
     * The width of the chart as a string accepts input as both like '100px' or '100%'.
     * If specified as '100%, chart renders to the full width of its parent element.
     * @default null.
     */

    width?: string;

    /**
     * The height of the chart as a string accepts input both as '100px' or '100%'.
     * If specified as '100%, chart renders to the full height of its parent element.
     * @default null.
     */

    height?: string;

    /**
     * Title of the chart
     * @default ''.
     */

    title?: string;

    /**
     * Options for customizing the title of the Chart.
     */

    titleStyle?: FontModel;

    /**
     *  Options to customize left, right, top and bottom margins of the chart.
     */

    margin?: MarginModel;

    /**
     * Options for customizing the color and width of the chart border.
     */

    border?: BorderModel;

    /**
     * The background color of the chart that accepts value in hex and rgba as a valid CSS color string.
     * @default 'transparent'.
     */
    background?: string;

    /**
     * Options for configuring the border and background of the chart area.
     */

    chartArea?: ChartAreaModel;

    /**
     * Options to configure horizontal axis.
     */

    primaryXAxis?: AxisModel;

    /**
     * Options to configure vertical axis.
     */

    primaryYAxis?: AxisModel;

    /**
     * Options to split Chart into multiple plotting areas horizontally.
     * Each object in the collection represents a plotting area in the Chart.
     */

    rows?: RowModel[];

    /**
     * Options to split chart into multiple plotting areas vertically.
     * Each object in the collection represents a plotting area in the chart.
     */

    columns?: ColumnModel[];

    /**
     * Secondary axis collection for the chart.
     */

    axes?: AxisModel[];

    /**
     * The configuration for series in the chart.
     */

    series?: SeriesModel[];

    /**
     * The configuration for annotation in chart.
     */

    annotations?: ChartAnnotationSettingsModel[];

    /**
     * Palette for the chart series.
     * @default [].
     */
    palettes?: string[];

    /**
     * Specifies the theme for the chart.
     */
    theme?: ChartTheme;

    /**
     * Options for customizing the tooltip of the chart.
     */

    tooltip?: TooltipSettingsModel;

    /**
     * Options for customizing the crosshair of the chart.
     */
    crosshair?: CrosshairSettingsModel;

    /**
     * Options for customizing the legend of the chart.
     */
    legendSettings?: LegendSettingsModel;

    /**
     * Options to enable the zooming feature in the chart.
     */
    zoomSettings?: ZoomSettingsModel;

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
    selectionMode?: SelectionMode;

    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | or `Cluster`.
     * @default false.
     */
    isMultiSelect?: boolean;

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
    selectedDataIndexes?: IndexesModel[];

    /**
     * Specifies whether a grouping separator should be used for a number.
     * @default false.
     */
    useGroupingSeparator?: boolean;

    /**
     * It specifies whether the chart should be render in transposed manner or not.
     * @default false
     */
    isTransposed?: boolean;

    /**
     * Defines the collection of technical indicators, that are used in financial markets
     */
    indicators?: TechnicalIndicatorModel[];

    /**
     * Description for chart.
     * @default null
     */
    description?: string;

    /**
     * TabIndex value for the chart.
     * @default 1.
     */
    tabIndex?: number;

    /**
     * To enable the side by side placing the points for column type series.
     */
    enableSideBySidePlacement?: boolean;

    /**
     * Triggers before the annotation gets rendered.
     * @event
     */

    annotationRender?: EmitType<IAnnotationRenderEventArgs>;

    /**
     * Triggers before the prints gets started.
     * @event
     */

    beforePrint?: EmitType<IPrintEventArgs>;

    /**
     * Triggers after chart load.
     * @event
     */
    loaded?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers before chart load.
     * @event
     */
    load?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers after animation is completed for the series.
     * @event
     */
    animationComplete?: EmitType<IAnimationCompleteEventArgs>;

    /**
     * Triggers before the legend is rendered.
     * @event
     */
    legendRender?: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series is rendered.
     * @event
     */

    textRender?: EmitType<ITextRenderEventArgs>;

    /**
     * Triggers before each points for the series is rendered.
     * @event
     */

    pointRender?: EmitType<IPointRenderEventArgs>;

    /**
     * Triggers before the series is rendered.
     * @event
     */

    seriesRender?: EmitType<ISeriesRenderEventArgs>;

    /**
     * Triggers before each axis label is rendered.
     * @event
     */
    axisLabelRender?: EmitType<IAxisLabelRenderEventArgs>;

    /**
     * Triggers before the tooltip for series is rendered.
     * @event
     */

    tooltipRender?: EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers on hovering the chart.
     * @event
     */

    chartMouseMove?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the chart.
     * @event
     */

    chartMouseClick?: EmitType<IMouseEventArgs>;

    /**
     * Triggers when cursor leaves the chart.
     * @event
     */

    chartMouseLeave?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse down.
     * @event
     */

    chartMouseDown?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.
     * @event
     */

    chartMouseUp?: EmitType<IMouseEventArgs>;

    /**
     * Triggers after the drag selection is completed.
     * @event
     */

    dragComplete?: EmitType<IDragCompleteEventArgs>;

    /**
     * Triggers after the zoom selection is completed.
     * @event
     */

    zoomComplete?: EmitType<IZoomCompleteEventArgs>;

}