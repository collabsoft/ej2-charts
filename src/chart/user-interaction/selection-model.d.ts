import { SvgRenderer, ChildProperty, Property } from '@syncfusion/ej2-base';import { createElement, remove } from '@syncfusion/ej2-base';import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';import { ChartLocation, Rect, RectOption, CircleOption, withInBounds, getDraggedRectLocation } from '../utils/helper';import { SelectionMode } from '../utils/enum';import { Chart } from '../chart';import { Series, Points } from '../series/chart-series';import { SeriesModel } from '../series/chart-series-model';import { Theme } from '../model/theme';import { IDragCompleteEventArgs } from '../model/interface';import { dragComplete } from '../model/constants';

/**
 * Interface for a class Indexes
 * @private
 */
export interface IndexesModel {

    /**
     * Specifies the series index
     */
    series?: number;

    /**
     * Specifies the point index
     */
    point?: number;

}

/**
 * Interface for a class Selection
 * @private
 */
export interface SelectionModel {

}

/**
 * Interface for a class Index
 */
export interface IndexModel {

}