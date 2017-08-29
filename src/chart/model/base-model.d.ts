import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';import { LineType, ZoomMode, ToolbarItems } from '../utils/enum';import { Theme } from './theme';

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