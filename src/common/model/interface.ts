import { Chart } from '../../chart';
import { AxisModel } from '../../chart/axis/axis-model';
import { Axis } from '../../chart/axis/axis';
import { SeriesModel } from '../../chart/series/chart-series-model';
import { Series, Points } from '../../chart/series/chart-series';
import { LegendShape, ChartShape } from '../../chart/utils/enum';
import { BorderModel, FontModel } from './base-model';


/**
 * Specifies Chart Events
 */
 /** @private */
export interface IChartEventArgs {
    name: string;
    cancel: boolean;
}

export interface ILegendRenderEventArgs extends IChartEventArgs {
    text: string;
    fill: string;
    shape: LegendShape;
    markerShape?: ChartShape;
}

export interface ITextRenderEventArgs extends IChartEventArgs {
    series: SeriesModel;
    point: Points;
    text: string;
    color: string;
    border: BorderModel;
}

export interface IZoomCompleteEventArgs extends IChartEventArgs {
    axis: AxisModel;
    previousZoomFactor: number;
    previousZoomPosition: number;
    currentZoomFactor: number;
    currentZoomPosition: number;
}

export interface IPointRenderEventArgs extends IChartEventArgs {
    series: Series;
    point: Points;
    fill: string;
    border: BorderModel;
    height? : number;
    width?: number;
}
export interface ISeriesRenderEventArgs {
    series: Series;
    data : Object;
    name: string;
}
export interface IAxisLabelRenderEventArgs extends IChartEventArgs {
    axis: Axis;
    text: string;
    value : number;
}
export interface ITooltipRenderEventArgs extends IChartEventArgs {
    textCollections?: string[];
    textStyle? : FontModel;
    series : Series;
    point : Points;
}
export interface IMouseEventArgs extends IChartEventArgs {
    target: string;
    x : number;
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

export interface IDragCompleteEventArgs extends IChartEventArgs {
    selectedDataValues: {x: string, y: number}[][];
}
export interface ILoadedEventArgs extends IChartEventArgs {
    chart: Chart;
}
export interface IAnimationCompleteEventArgs extends IChartEventArgs {
    series: Series;
}