import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';import { EmptyPointMode} from '../../chart/utils/enum';import { AccEmptyPointMode, ConnectorType} from '../../accumulation-chart/model/enum';import { Alignment } from '../utils/enum';

/**
 * Interface for a class Connector
 */
export interface ConnectorModel {

    /**
     * specifies the type of the connector line. They are
     * * Smooth
     * * Line
     */
    type?: ConnectorType;

    /**
     * Color of the connector line.
     */
    color?: string;

    /**
     * Width of the connector line in pixels.
     */
    width?: number;

    /**
     * Length of the connector line in pixels.
     */
    length?: string;

    /**
     * dashArray of the connector line.
     */
    dashArray?: string;

}

/**
 * Interface for a class Font
 */
export interface FontModel {

    /**
     * Font size for the text.
     */
    size?: string;

    /**
     * Color for the text.
     */
    color?: string;

    /**
     * FontFamily for the text.
     */
    fontFamily?: string;

    /**
     * FontWeight for the text.
     */
    fontWeight?: string;

    /**
     * FontStyle for the text.
     */
    fontStyle?: string;

    /**
     * Opacity for the text.
     */
    opacity?: number;

    /**
     * text alignment
     */
    textAlignment?: Alignment;

}

/**
 * Interface for a class Border
 */
export interface BorderModel {

    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
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
     * Options to customize the border of the chart area.
     */
    border?: BorderModel;

    /**
     * The background of the chart area that accepts value in hex and rgba as a valid CSS color string..
     * @default transparent.
     */
    background?: string;

    /**
     * The opacity for background.
     * @default 1.
     */
    opacity?: number;

}

/**
 * Interface for a class Margin
 */
export interface MarginModel {

    /**
     * Left margin in pixels.
     * @default 10.
     */
    left?: number;

    /**
     * Right margin in pixels.
     * @default 10.
     */
    right?: number;

    /**
     * Top margin in pixels.
     * @default 10.
     */
    top?: number;

    /**
     * Bottom margin in pixels.
     * @default 10.
     */
    bottom?: number;

}

/**
 * Interface for a class Animation
 */
export interface AnimationModel {

    /**
     * If set to true, series gets animated on initial loading.
     * @default true.
     */

    enable?: boolean;

    /**
     * The duration of animation in milliseconds.
     * @default 1000.
     */

    duration?: number;

    /**
     * The option to delay animation of the series.
     * @default 0.
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
 * Interface for a class CornerRadius
 */
export interface CornerRadiusModel {

    /**
     * Specifies the top left corner radius value
     */
    topLeft?: number;

    /**
     * Specifies the top right corner radius value
     */
    topRight?: number;

    /**
     * Specifies the bottom left corner radius value
     */
    bottomLeft?: number;

    /**
     * Specifies the bottom right corner radius value
     */
    bottomRight?: number;

}

/**
 * Interface for a class Index
 * @private
 */
export interface IndexModel {

}

/**
 * Interface for a class EmptyPointSettings
 */
export interface EmptyPointSettingsModel {

    /**
     * To customize the fill color of empty points.
     */
    fill?: string;

    /**
     * Options to customize the border of empty points.
     */
    border?: BorderModel;

    /**
     * To customize the mode of empty points.
     * @default Gap
     */
    mode?: EmptyPointMode | AccEmptyPointMode;

}