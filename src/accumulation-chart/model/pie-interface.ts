/**
 * Interface for Accumulation chart
 */
import { AccumulationSeries, AccPoints } from './acc-base';
import { AccumulationSeriesModel } from './acc-base-model';
import { IChartEventArgs } from '../../common/model/interface';
import { Size } from '../../common/utils/helper';
import { BorderModel, FontModel } from '../../common/model/base-model';
import { AccumulationChart} from '../accumulation';
export interface IAccSeriesRenderEventArgs {
    series: AccumulationSeries;
    data : Object;
    name: string;
}
export interface IAccTextRenderEventArgs extends IChartEventArgs {
    series: AccumulationSeriesModel;
    point: AccPoints;
    text: string;
    color: string;
    border: BorderModel;
    template: string;
}
export interface IAccTooltipRenderEventArgs extends IChartEventArgs {
    content?: string | HTMLElement;
    textStyle? : FontModel;
    series : AccumulationSeries;
    point : AccPoints;
}
export interface IAccAnimationCompleteEventArgs extends IChartEventArgs {
    series: AccumulationSeries;
    accumulation: AccumulationChart;
}
export interface IAccPointRenderEventArgs extends IChartEventArgs {
    series: AccumulationSeries;
    point: AccPoints;
    fill: string;
    border: BorderModel;
    height? : number;
    width?: number;
}
export interface IAccLoadedEventArgs extends IChartEventArgs {
    accumulation: AccumulationChart;
}
export interface IAccResizeEventArgs {
    name: string;
    previousSize: Size;
    currentSize: Size;
    accumulation: AccumulationChart;
}