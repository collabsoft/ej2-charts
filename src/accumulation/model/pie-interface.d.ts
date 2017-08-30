/**
 * Interface for Accumulation chart
 */
import { AccumulationSeries, PiePoints } from './acc-base';
import { AccumulationSeriesModel } from './acc-base-model';
import { IChartEventArgs } from '../../common/model/interface';
import { BorderModel, FontModel } from '../../common/model/base-model';
import { AccumulationChart } from '../accumulation';
export interface IPieSeriesRenderEventArgs {
    series: AccumulationSeries;
    data: Object;
    name: string;
}
export interface IPieTextRenderEventArgs extends IChartEventArgs {
    series: AccumulationSeriesModel;
    point: PiePoints;
    text: string;
    color: string;
    border: BorderModel;
}
export interface IPieTooltipRenderEventArgs extends IChartEventArgs {
    content?: string | HTMLElement;
    textStyle?: FontModel;
    series: AccumulationSeries;
    point: PiePoints;
}
export interface IPieAnimationCompleteEventArgs extends IChartEventArgs {
    series: AccumulationSeries;
    pie: AccumulationChart;
}
export interface IPiePointRenderEventArgs extends IChartEventArgs {
    series: AccumulationSeries;
    point: PiePoints;
    fill: string;
    border: BorderModel;
    height?: number;
    width?: number;
}
export interface IPieLoadedEventArgs extends IChartEventArgs {
    pie: AccumulationChart;
}
