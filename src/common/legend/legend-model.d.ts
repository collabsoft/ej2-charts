import { Property, Complex, ChildProperty} from '@syncfusion/ej2-base';import { Chart } from '../../chart';import { Font, Border } from '../model/base';import { Theme } from '../model/theme';import { FontModel, BorderModel } from '../model/base-model';import { Size, Rect, subtractThickness, Thickness, drawSymbol, measureText, ChartLocation, PathOption } from '../utils/helper';import { RectOption, TextOption, textElement, stringToNumber, removeElement, showTooltip, getElement } from '../utils/helper';import { LegendPosition, LegendShape, ChartSeriesType, ChartShape } from '../../chart/utils/enum';import { Legend } from '../../chart/legend/legend';import { AccumulationType } from '../../accumulation-chart/model/enum';import { AccumulationChart } from '../../accumulation-chart/accumulation';import { AccumulationLegend } from '../../accumulation-chart/renderer/legend';import { Alignment } from '../utils/enum';

/**
 * Interface for a class Location
 */
export interface LocationModel {

    /**
     * X coordinate of the legend in pixels.
     * @default 0
     */
    x?: number;

    /**
     * Y coordinate of the legend in pixels.
     * @default 0
     */
    y?: number;

}

/**
 * Interface for a class LegendSettings
 */
export interface LegendSettingsModel {

    /**
     * If set to true, legend will be visible.
     * @default true
     */
    visible?: boolean;

    /**
     * The height of the legend in pixels.
     * @default null
     */
    height?: string;

    /**
     * The width of the legend in pixels.
     * @default null
     */
    width?: string;

    /**
     * Specifies the location of the legend, relative to the chart.
     * If x is 20, legend moves by 20 pixels to the right of the chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     */
    location?: LocationModel;

    /**
     * Position of the legend in the chart are,
     * * Auto: Places the legend based on area type.
     * * Top: Displays the legend at the top of the chart.
     * * Left: Displays the legend at the left of the chart.
     * * Bottom: Displays the legend at the bottom of the chart.
     * * Right: Displays the legend at the right of the chart.
     * * Custom: Displays the legend  based on the given x and y values.
     * @default 'Auto'
     */
    position?: LegendPosition;

    /**
     * Option to customize the padding between legend items.
     * @default 8
     */
    padding?: number;

    /**
     * Legend in chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the chart.
     * * Center: Aligns the legend to the center of the chart.
     * * Far: Aligns the legend to the right of the chart.
     * @default 'Center'
     */
    alignment?: Alignment;

    /**
     * Options to customize the legend text.
     */
    textStyle?: FontModel;

    /**
     * Shape height of the legend in pixels.
     * @default 10
     */
    shapeHeight?: number;

    /**
     * Shape width of the legend in pixels.
     * @default 10
     */
    shapeWidth?: number;

    /**
     * Options to customize the border of the legend.
     */
    border?: BorderModel;

    /**
     * Padding between the legend shape and text.
     * @default 5
     */
    shapePadding?: number;

    /**
     * The background color of the legend that accepts value in hex and rgba as a valid CSS color string.
     * @default 'transparent'
     */
    background?: string;

    /**
     * Opacity of the legend.
     * @default 1
     */
    opacity?: number;

    /**
     * If set to true, series' visibility collapses based on the legend visibility.
     * @default true
     */
    toggleVisibility?: boolean;

    /**
     * Description for legends.
     * @default null
     */
    description?: string;

    /**
     * TabIndex value for the legend.
     * @default 3
     */
    tabIndex?: number;

}

/**
 * Interface for a class BaseLegend
 * @private
 */
export interface BaseLegendModel {

}

/**
 * Interface for a class LegendOptions
 * @private
 */
export interface LegendOptionsModel {

}