import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';

/**
 * Interface for a class Font
 */
export interface FontModel {

    /**
     * Font size for text.
     */
    size?: string;

    /**
     * Color for text.
     */
    color?: string;

    /**
     * FontFamily for text.
     */
    fontFamily?: string;

    /**
     * FontWeight for text.
     */
    fontWeight?: string;

    /**
     * FontStyle for text.
     */
    fontStyle?: string;

    /**
     * Opacity for text.
     */
    opacity?: number;

}

/**
 * Interface for a class Border
 */
export interface BorderModel {

    /**
     * The color of the border, which accepts value in hex, rgba as a valid CSS color string.
     */
    color?: string;

    /**
     * The width of the border in pixels.
     */
    width?: number;

}

/**
 * Interface for a class ChartArea
 */
export interface ChartAreaModel {

    /**
     * Options to customize the border of chart area.
     */
    border?: BorderModel;

    /**
     * The background of chart area, which accepts value in hex, rgba as a valid CSS color string..
     * @default transparent
     */
    background?: string;

    /**
     * The opacity for background.
     * @default 1
     */
    opacity?: number;

}

/**
 * Interface for a class Margin
 */
export interface MarginModel {

    /**
     * Left margin in pixels.
     * @default 10
     */
    left?: number;

    /**
     * Right margin in pixels.
     * @default 10
     */
    right?: number;

    /**
     * Top margin in pixels.
     * @default 10
     */
    top?: number;

    /**
     * Bottom margin in pixels.
     * @default 10
     */
    bottom?: number;

}

/**
 * Interface for a class Animation
 */
export interface AnimationModel {

    /**
     * If set true, series gets animated on initial loading.
     * @default true
     */

    enable?: boolean;

    /**
     * The animation duration in milliseconds.
     * @default 1000
     */

    duration?: number;

    /**
     * The option to delay the animation of series.
     * @default 0
     */

    delay?: number;

}

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
 * Interface for a class Index
 * @private
 */
export interface IndexModel {

}