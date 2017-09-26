import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';import { TapEventArgs, EmitType, ChildProperty } from '@syncfusion/ej2-base';import { remove } from '@syncfusion/ej2-base';import { extend } from '@syncfusion/ej2-base';import { INotifyPropertyChanged, SvgRenderer, setCulture, Browser, Touch } from '@syncfusion/ej2-base';import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';import { findClipRect, measureText, TextOption, findPosition, textTrim, showTooltip, removeElement } from '../common/utils/helper';import { textElement, withInBounds, RectOption, ChartLocation, createSvg, PointData } from '../common/utils/helper';import { MarginModel, BorderModel, ChartAreaModel, FontModel } from '../common/model/base-model';import { getSeriesColor, Theme } from '../common/model/theme';import { IndexesModel } from '../common/model/base-model';import { Margin, Border, ChartArea, Font, Indexes } from '../common/model/base';import { AxisModel, RowModel, ColumnModel } from './axis/axis-model';import { Row, Column, Axis } from './axis/axis';import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';import { DateTime } from './axis/date-time-axis';import { Category } from './axis/category-axis';import { Logarithmic } from './axis/logarithmic-axis';import { Size, Rect } from '../common/utils/helper';import { SelectionMode, LineType, ZoomMode, ToolbarItems, ChartTheme } from './utils/enum';import { Series } from './series/chart-series';import { SeriesModel } from './series/chart-series-model';import { Data } from '../common/model/data';import { LineSeries } from './series/line-series';import { AreaSeries } from './series/area-series';import { BarSeries } from './series/bar-series';import { StepLineSeries } from './series/step-line-series';import { StepAreaSeries } from './series/step-area-series';import { ColumnSeries } from './series/column-series';import { StackingColumnSeries } from './series/stacking-column-series';import { StackingBarSeries } from './series/stacking-bar-series';import { StackingAreaSeries } from './series/stacking-area-series';import { ScatterSeries } from './series/scatter-series';import { SplineSeries } from './series/spline-series';import { RangeColumnSeries } from './series/range-column-series';import { BubbleSeries } from './series/bubble-series';import { Tooltip } from './user-interaction/tooltip';import { Crosshair } from './user-interaction/crosshair';import { Marker } from './series/marker';import { LegendSettings } from '../common/legend/legend';import { LegendSettingsModel } from '../common/legend/legend-model';import { Legend } from './legend/legend';import { Zoom } from './user-interaction/zooming';import { Selection } from './user-interaction/selection';import { DataLabel } from './series/data-label';import { ITouches, ILegendRenderEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs } from '../common/model/interface';import { IPointRenderEventArgs, ISeriesRenderEventArgs, IDragCompleteEventArgs, ITooltipRenderEventArgs } from '../common/model/interface';import { IZoomCompleteEventArgs, ILoadedEventArgs, IAnimationCompleteEventArgs, IMouseEventArgs } from '../common/model/interface';import { loaded, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from '../common/model/constants';import { IAnnotationRenderEventArgs } from '../common/model/interface';import { ChartAnnotationSettingsModel } from './annotation/chart-annotation-model';import { ChartAnnotationSettings } from './annotation/chart-annotation';import { ChartAnnotation } from './annotation/annotation';import { getElement } from '../common/utils/helper';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Enable / Disable the visibility of tooltip.
     * @default false
     */

    enable?: boolean;

    /**
     * If set true, a single tooltip will be displayed for every index.
     * @default false
     */

    shared?: boolean;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    fill?: string;

    /**
     * Options to customize the tooltip text.
     */

    textStyle?: FontModel;

    /**
     * Format of the tooltip content.
     * @default null
     */

    format?: string;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.
     * @default null
     */

    template?: string;

    /**
     * If set true, tooltip will animate, while moving from one point to another.
     * @default true
     */
    enableAnimation?: boolean;

    /**
     * Options to customize the border for tooltip.
     */
    border?: BorderModel;

}

/**
 * Interface for a class CrosshairSettings
 */
export interface CrosshairSettingsModel {

    /**
     * If set true, crosshair line will get visible.
     * @default false
     */
    enable?: boolean;

    /**
     * Options to customize the crosshair line.
     */
    line?: BorderModel;

    /**
     * Specifies the line type. Horizontal mode enables the horizontal line and Vertical mode enables the vertical line. They are
     * * none - Hides both vertical and horizontal crosshair line.
     * * both - Shows both vertical and horizontal crosshair line.
     * * vertical - Shows the vertical line.
     * * horizontal - Shows the horizontal line.
     * @default Both
     */
    lineType?: LineType;

}

/**
 * Interface for a class ZoomSettings
 */
export interface ZoomSettingsModel {

    /**
     * If set true, chart can be zoomed by a rectangular selecting region on a plot area.
     * @default false
     */

    enableSelectionZooming?: boolean;

    /**
     * If set true, chart can be pinched to zoom in / zoom out.
     * @default false
     */

    enablePinchZooming?: boolean;

    /**
     * If set true, chart can be zoomed by using mouse wheel.
     * @default false
     */

    enableMouseWheelZooming?: boolean;

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

    enableDeferredZooming?: boolean;

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
    mode?: ZoomMode;

    /**
     * Specifies the toolkit options for the zooming. They are.
     * * zoom - Renders the zoom button.
     * * zoomIn - Renders the zoomIn button.
     * * zoomOut - Renders the zoomOut button.
     * * pan - Renders the pan button.
     * * reset - Renders the reset button.
     */

    toolbarItems?: ToolbarItems[];

}

/**
 * Interface for a class Chart
 */
export interface ChartModel extends ComponentModel{

    /**
     * The width of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full width of its parent element.
     * @default null
     */

    width?: string;

    /**
     * The height of the chart as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, chart will render to the full height of its parent element.
     * @default null
     */

    height?: string;

    /**
     * Title for chart
     * @default ''
     */

    title?: string;

    /**
     * Options for customizing the title of Chart.
     */

    titleStyle?: FontModel;

    /**
     *  Options to customize the left, right, top and bottom margins of chart.
     */

    margin?: MarginModel;

    /**
     * Options for customizing the color and width of the chart border.
     */

    border?: BorderModel;

    /**
     * The background color of the chart, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'transparent'
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
     * Options to split Chart into multiple plotting areas horizontally. Each object in the collection represents a plotting area in Chart.
     */

    rows?: RowModel[];

    /**
     * Options to split Chart into multiple plotting areas vertically. Each object in the collection represents a plotting area in Chart.
     */

    columns?: ColumnModel[];

    /**
     * Secondary axis collection for chart.
     */

    axes?: AxisModel[];

    /**
     * The configuration for series in chart.
     */

    series?: SeriesModel[];

    /**
     * The configuration for annotation in chart.
     */

    annotations?: ChartAnnotationSettingsModel[];

    /**
     * The palette for chart series.
     * @default []
     */
    palettes?: string[];

    /**
     * Specifies the theme for chart.
     */
    theme?: ChartTheme;

    /**
     * Options for customizing the tooltip of chart.
     */

    tooltip?: TooltipSettingsModel;

    /**
     * Options for customizing the crosshair of chart.
     */
    crosshair?: CrosshairSettingsModel;

    /**
     * Options for customizing the legend of chart.
     */
    legendSettings?: LegendSettingsModel;

    /**
     * Options to enable the zooming feature in chart.
     */
    zoomSettings?: ZoomSettingsModel;

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
    selectionMode?: SelectionMode;

    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | `Cluster`.
     * @default false
     */
    isMultiSelect?: boolean;

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
    selectedDataIndexes?: IndexesModel[];

    /**
     * Specifies whether a grouping separator should be used for a number.
     * @default false
     */
    useGroupingSeparator?: boolean;

    /**
     * Description for chart.
     * @default null
     */
    description?: string;

    /**
     * TabIndex value for the chart.
     * @default 1
     */
    tabIndex?: number;

    /**
     * Triggers before the annotation gets rendered.
     * @event
     */

    annotationRender?: EmitType<IAnnotationRenderEventArgs>;

    /**
     * Triggers after chart loaded.
     * @event
     */
    loaded?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers before chart load.
     * @event
     */
    load?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers after animation gets completed for series.
     * @event
     */
    animationComplete?: EmitType<IAnimationCompleteEventArgs>;

    /**
     * Triggers before the legend gets rendered.
     * @event
     */
    legendRender?: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series gets rendered.
     * @event
     */

    textRender?: EmitType<ITextRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.
     * @event
     */

    pointRender?: EmitType<IPointRenderEventArgs>;

    /**
     * Triggers before the series gets rendered.
     * @event
     */

    seriesRender?: EmitType<ISeriesRenderEventArgs>;

    /**
     * Triggers before each axis label gets rendered.
     * @event
     */
    axisLabelRender?: EmitType<IAxisLabelRenderEventArgs>;

    /**
     * Triggers before the tooltip for series gets rendered.
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
     * Triggers while cursor leaves the chart.
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