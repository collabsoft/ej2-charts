import { Chart } from '../../chart';
import { AxisModel } from '../../chart/axis/axis-model';
import { Axis } from '../../chart/axis/axis';
import { SeriesModel } from '../../chart/series/chart-series-model';
import { Series, Points } from '../../chart/series/chart-series';
import { LegendShape, ChartShape } from '../../chart/utils/enum';
import { BorderModel, FontModel } from './base-model';
import { ChartLocation } from '../utils/helper';


/**
 * Specifies Chart Events
 * @private
 */
export interface IChartEventArgs {
    /** Defines the name of the event */
    name: string;
    /** Defines the event cancel status */
    cancel: boolean;
}
/**
 * Specifies the LegendRender Event arguments.
 */
export interface ILegendRenderEventArgs extends IChartEventArgs {
    /** Defines the current legend text */
    text: string;
    /** Defines the current legend fill color */
    fill: string;
    /** Defines the current legend shape */
    shape: LegendShape;
    /** Defines the current legend marker shape */
    markerShape?: ChartShape;
}
/**
 * Specifies the LegendRender Event arguments for accumulation chart.
 */
export interface IAccLegendRenderEventArgs extends IChartEventArgs {
    /** Defines the current legend shape */
    shape: LegendShape;
    /** Defines the current legend fill color */
    fill: string;
    /** Defines the current legend text */
    text: string;
}
/**
 * Specifies the TextRender Event arguments.
 */
export interface ITextRenderEventArgs extends IChartEventArgs {
    /** Defines the current series of the label */
    series: SeriesModel;
    /** Defines the current point of the label */
    point: Points;
    /** Defines the current text */
    text: string;
    /** Defines the current label fill color */
    color: string;
    /** Defines the current label border */
    border: BorderModel;
    /** Defines the current label template */
    template: string;
}
/**
 * Specifies the AnnotationRender Event arguments.
 */
export interface IAnnotationRenderEventArgs extends IChartEventArgs {
    /** Defines the current annotation content */
    content: HTMLElement;
    /** Defines the current annotation location */
    location: ChartLocation;
}
/**
 * Specifies the ZoomComplete Event arguments.
 */
export interface IZoomCompleteEventArgs extends IChartEventArgs {
    /** Defines the zoomed axis */
    axis: AxisModel;
    /** Defines the previous zoom factor */
    previousZoomFactor: number;
    /** Defines the previous zoom position */
    previousZoomPosition: number;
    /** Defines the current zoom factor */
    currentZoomFactor: number;
    /** Defines the current zoom position */
    currentZoomPosition: number;
}
/**
 * Specifies the PointRender Event arguments.
 */
export interface IPointRenderEventArgs extends IChartEventArgs {
    /** Defines the current series of the point */
    series: Series;
    /** Defines the current point */
    point: Points;
    /** Defines the current point fill color */
    fill: string;
    /** Defines the current point border */
    border: BorderModel;
    /** Defines the current point height */
    height? : number;
    /** Defines the current point width */
    width?: number;
}
/**
 * Specifies the SeriesRender Event arguments.
 */
export interface ISeriesRenderEventArgs {
    /** Defines the current series */
    series: Series;
    /** Defines the current series data object */
    data : Object;
    /** Defines name of the event */
    name: string;
    /** Defines the current series fill */
    fill: string;
}
/**
 * Specifies the AxisLabelRender Event arguments.
 */
export interface IAxisLabelRenderEventArgs extends IChartEventArgs {
    /** Defines the current axis */
    axis: Axis;
    /** Defines axis current label text */
    text: string;
    /** Defines axis current label value */
    value : number;
}
/**
 * Specifies the TooltipRender Event arguments.
 */
export interface ITooltipRenderEventArgs extends IChartEventArgs {
    /** Defines tooltip text collections */
    textCollections?: string;
    /** Defines tooltip text style */
    textStyle? : FontModel;
    /** Defines current tooltip series */
    series : Series;
    /** Defines current tooltip point */
    point : Points;
}
/**
 * Specifies the Chart Mouse Event arguments.
 */
export interface IMouseEventArgs extends IChartEventArgs {
    /** Defines current mouse event target id */
    target: string;
    /** Defines current mouse x location */
    x : number;
    /** Defines current mouse y location */
    y : number;
}
/** @private */
export interface IFontMapping {
    size?: string;
    color?: string;
    fontWeight?: string;
    fontStyle?: string;
    fontFamily?: string;
}
/** @private */
export interface ITouches {
    pageX?: number;
    pageY?: number;
    pointerId?: number;
}
/** @private */
export interface IShapes {
    renderOption?: Object;
    functionName?: string;
}

/** @private */
export interface IZoomAxisRange {
    actualMin?: number;
    actualDelta?: number;
    min?: number;
    delta?: number;
}
/**
 * Specifies the DragComplete Event arguments.
 */
export interface IDragCompleteEventArgs extends IChartEventArgs {
    /** Defines current selected Data X, Y values */
    selectedDataValues: {x: string, y: number}[][];
}
/**
 * Specifies the Load or Loaded Event arguments.
 */
export interface ILoadedEventArgs extends IChartEventArgs {
    /** Defines the current chart instance */
    chart: Chart;
}
/**
 * Specifies the AnimationComplete Event arguments.
 */
export interface IAnimationCompleteEventArgs extends IChartEventArgs {
    /** Defines the current animation series */
    series: Series;
}
/**
 * Specifies the Print Event arguments.
 */
export interface IPrintEventArgs extends IChartEventArgs {
    htmlContent: Element;
}
/** @private */
export interface IBoxPlotQuartile {
    minimum: number;
    maximum: number;
    outliers: number[];
    upperQuartile: number;
    lowerQuartile: number;
    average: number;
    median: number;
}