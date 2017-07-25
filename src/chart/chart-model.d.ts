import { Component, Property, NotifyPropertyChanges, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';import { TapEventArgs, EmitType } from '@syncfusion/ej2-base';import { remove } from '@syncfusion/ej2-base/dom';import { extend } from '@syncfusion/ej2-base/util';import { INotifyPropertyChanged, SvgRenderer, setCulture, Browser, Touch } from '@syncfusion/ej2-base';import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';import { findClipRect, measureText, TextOption } from './utils/helper';import { textElement, withInBounds, RectOption, ChartLocation, stringToNumber, PointData } from './utils/helper';import { MarginModel, BorderModel, ChartAreaModel, FontModel } from './model/base-model';import { getSeriesColor, Theme } from './model/theme';import { CrosshairSettingsModel, TooltipSettingsModel, ZoomSettingsModel } from './model/base-model';import { Margin, Border, ChartArea, Font, CrosshairSettings, TooltipSettings, ZoomSettings } from './model/base';import { AxisModel, RowModel, ColumnModel } from './axis/axis-model';import { Row, Column, Axis } from './axis/axis';import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';import { DateTime } from './axis/date-time-axis';import { Category } from './axis/category-axis';import { Logarithmic } from './axis/logarithmic-axis';import { Size, Rect } from './utils/helper';import { SelectionMode } from './utils/enum';import { Series } from './series/chart-series';import { SeriesModel } from './series/chart-series-model';import { Data } from './model/data';import { LineSeries } from './series/line-series';import { AreaSeries } from './series/area-series';import { BarSeries } from './series/bar-series';import { StepLineSeries } from './series/step-line-series';import { ColumnSeries } from './series/column-series';import { StackingColumnSeries } from './series/stacking-column-series';import { StackingBarSeries } from './series/stacking-bar-series';import { StackingAreaSeries } from './series/stacking-area-series';import { ScatterSeries } from './series/scatter-series';import { SplineSeries } from './series/spline-series';import { RangeColumnSeries } from'./series/range-column-series';import { BubbleSeries } from './series/bubble-series';import { Tooltip } from './user-interaction/tooltip';import { Crosshair } from './user-interaction/crosshair';import { Marker } from './series/marker';import { Legend, LegendSettings } from './legend/legend';import { LegendSettingsModel } from './legend/legend-model';import { Zoom } from './user-interaction/zooming';import { Selection, Indexes } from './user-interaction/selection';import { IndexesModel } from './user-interaction/selection-model';import { DataLabel } from './series/data-label';import { ITouches, ILegendRenderEventArgs, IMouseEventArgs, IAxisLabelRenderEventArgs, ITextRenderEventArgs } from './model/interface';import { IPointRenderEventArgs, ISeriesRenderEventArgs, IDragCompleteEventArgs, ITooltipRenderEventArgs } from './model/interface';import { IZoomCompleteEventArgs, ILoadedEventArgs, IAnimationCompleteEventArgs } from './model/interface';import { loaded, chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from './model/constants';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class Chart
 */
export interface ChartModel extends ComponentModel{

    /**
     * The width of the chart as a string in order to provide input as both like '100px' or '100%'.     * If specified as '100%, chart will render to the full width of its parent element.     * @default null     */    width?: string;

    /**
     * The height of the chart as a string in order to provide input as both like '100px' or '100%'.     * If specified as '100%, chart will render to the full height of its parent element.     * @default null     */    height?: string;

    /**
     * Title for chart     * @default ''     */    title?: string;

    /**
     * Options for customizing the title of Chart.     */    titleStyle?: FontModel;

    /**
     *  Options to customize the left, right, top and bottom margins of chart.     */    margin?: MarginModel;

    /**
     * Options for customizing the color and width of the chart border.     */    border?: BorderModel;

    /**
     * The background color of the chart, which accepts value in hex, rgba as a valid CSS color string.     * @default 'transparent'     */    background?: string;

    /**
     * Options for configuring the border and background of the chart area.     */    chartArea?: ChartAreaModel;

    /**
     * Options to configure horizontal axis.     */    primaryXAxis?: AxisModel;

    /**
     * Options to configure vertical axis.     */    primaryYAxis?: AxisModel;

    /**
     * Options to split Chart into multiple plotting areas horizontally. Each object in the collection represents a plotting area in Chart.     */    rows?: RowModel[];

    /**
     * Options to split Chart into multiple plotting areas vertically. Each object in the collection represents a plotting area in Chart.     */    columns?: ColumnModel[];

    /**
     * Secondary axis collection for chart.     */    axes?: AxisModel[];

    /**
     * The configuration for series in chart.     */    series?: SeriesModel[];

    /**
     * The palette for chart series.     * @default []     */    palettes?: string[];

    /**
     * Specifies the theme for chart.     */    theme?: string;

    /**
     * Options for customizing the tooltip of chart.     */    tooltip?: TooltipSettingsModel;

    /**
     * Options for customizing the crosshair of chart.     */    crosshair?: CrosshairSettingsModel;

    /**
     * Options for customizing the legend of chart.     */    legendSettings?: LegendSettingsModel;

    /**
     * Options to enable the zooming feature in chart.     */    zoomSettings?: ZoomSettingsModel;

    /**
     * Specifies whether series or data point has to be selected. They are.     * * none - Disable the selection.     * * series - To select a series.     * * point - To select a point.     * * cluster - To select a cluster of point     * * dragXY - To select points, by dragging with respect to both horizontal and vertical axis     * * dragX - To select points, by dragging with respect to horizontal axis.     * * dragY - To select points, by dragging with respect to vertical axis.     * @default None     */    selectionMode?: SelectionMode;

    /**
     * If set true, enables the multi selection in chart. It requires `selectionMode` to be `Point` | `Series` | `Cluster`.     * @default false     */    isMultiSelect?: boolean;

    /**
     * Specifies the point indexes to be selected while loading a chart.     * It requires `selectionMode` to be `Point` | `Series` | `Cluster`.     * ```html     * <div id='Chart'></div>     * ```     * ```typescript     * let chart: Chart = new Chart({     * ...     *   selectionMode: 'Point',     *   selectedDataIndexes: [ { series: 0, point: 1},     *                          { series: 2, point: 3} ],     * ...     * });     * chart.appendTo('#Chart');     * ```     * @default []     */    selectedDataIndexes?: IndexesModel[];

    /**
     * Specifies whether a grouping separator should be used for a number.     * @default false     */    useGroupingSeparator?: boolean;

    /**
     * Description for chart.     * @default null     */    description?: string;

    /**
     * TabIndex value for the chart.     * @default 1     */    tabIndex?: number;

    /**
     * Triggers after chart loaded.     * @event     */    loaded?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers before chart load.     * @event     */    load?: EmitType<ILoadedEventArgs>;

    /**
     * Triggers after animation gets completed for series.     * @event     */    animationComplete?: EmitType<IAnimationCompleteEventArgs>;

    /**
     * Triggers before the legend gets rendered.     * @event     */    legendRender?: EmitType<ILegendRenderEventArgs>;

    /**
     * Triggers before the data label for series gets rendered.     * @event     */    textRender?: EmitType<ITextRenderEventArgs>;

    /**
     * Triggers before each points for series gets rendered.     * @event     */    pointRender?: EmitType<IPointRenderEventArgs>;

    /**
     * Triggers before the series gets rendered.     * @event     */    seriesRender?: EmitType<ISeriesRenderEventArgs>;

    /**
     * Triggers before each axis label gets rendered.     * @event     */    axisLabelRender?: EmitType<IAxisLabelRenderEventArgs>;

    /**
     * Triggers before the tooltip for series gets rendered.     * @event     */    tooltipRender?: EmitType<ITooltipRenderEventArgs>;

    /**
     * Triggers on hovering the chart.     * @event     */    chartMouseMove?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on clicking the chart.     * @event     */    chartMouseClick?: EmitType<IMouseEventArgs>;

    /**
     * Triggers while cursor leaves the chart.     * @event     */    chartMouseLeave?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse down.     * @event     */    chartMouseDown?: EmitType<IMouseEventArgs>;

    /**
     * Triggers on mouse up.     * @event     */    chartMouseUp?: EmitType<IMouseEventArgs>;

    /**
     * Triggers after the drag selection is completed.     * @event     */    dragComplete?: EmitType<IDragCompleteEventArgs>;

    /**
     * Triggers after the zoom selection is completed.     * @event     */    zoomComplete?: EmitType<IZoomCompleteEventArgs>;

}