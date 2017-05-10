import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { BorderModel, FontModel } from '../model/base-model';
import { LineType, ZoomMode, ToolbarItems } from '../utils/enum';
import { Theme } from './theme';


/**
 * Configures the fonts in chart.
 */

export class Font extends ChildProperty<Font> {

    /**
     * Font size for text.
     */
    @Property('16px')
    public size: string;

    /**
     * Color for text.
     */
    @Property('')
    public color: string;

    /**
     * FontFamily for text.
     */
    @Property('Segoe UI')
    public fontFamily: string;

    /**
     * FontWeight for text.
     */
    @Property('Regular')
    public fontWeight: string;

    /**
     * FontStyle for text.
     */
    @Property('Normal')
    public fontStyle: string;

    /**
     * Opacity for text.
     */
    @Property(1)
    public opacity: number;

}
/**
 * Configures the borders in chart.
 */
export class Border extends ChildProperty<Border> {

    /**
     * The color of the border, which accepts value in hex, rgba as a valid CSS color string.
     */
    @Property('')
    public color: string;

    /**
     * The width of the border in pixels.
     */
    @Property(1)
    public width: number;

}
/**
 * Configures the tooltip in chart.
 */

export class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enable / Disable the visibility of tooltip.
     * @default false
     */

    @Property(false)
    public enable: boolean;

    /**
     * If set true, a single tooltip will be displayed for every index.
     * @default false
     */

    @Property(false)
    public shared: boolean;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    @Property('#FFFFFF')
    public fill: string;

    /**
     * Options to customize the tooltip text.
     */

    @Complex<FontModel>(Theme.tooltipLabelFont, Font)
    public textStyle: FontModel;

    /**
     * Format of the tooltip content.
     * @default null
     */

    @Property(null)
    public format: string;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.
     * @default null
     */

    @Property(null)
    public template: string;

    /**
     * If set true, tooltip will animate, while moving from one point to another.
     * @default true
     */
    @Property(true)
    public enableAnimation: boolean;

    /**
     * Options to customize the border for tooltip.
     */
    @Complex<BorderModel>({color : null}, Border)
    public border: BorderModel;

}
/**
 * Configures the crosshair in chart.
 */
export class CrosshairSettings extends ChildProperty<CrosshairSettings> {
    /**
     * If set true, crosshair line will get visible.
     * @default false
     */
    @Property(false)
    public enable: boolean;

    /**
     * Options to customize the crosshair line.
     */
    @Complex<BorderModel>({ color: '#4f4f4f', width: 1 }, Border)
    public line: BorderModel;

    /**
     * Specifies the line type. Horizontal mode enables the horizontal line and Vertical mode enables the vertical line. They are
     * * none - Hides both vertical and horizontal crosshair line.
     * * both - Shows both vertical and horizontal crosshair line.
     * * vertical - Shows the vertical line.
     * * horizontal - Shows the horizontal line.
     * @default Both
     */
    @Property('Both')
    public lineType: LineType;

}
/**
 * Configures the chart area.
 */
export class ChartArea extends ChildProperty<ChartArea> {

    /**
     * Options to customize the border of chart area.
     */
    @Complex<BorderModel>({}, Border)
    public border: BorderModel;

    /**
     * The background of chart area, which accepts value in hex, rgba as a valid CSS color string..
     * @default transparent
     */
    @Property('transparent')
    public background: string;

    /**
     * The opacity for background.
     * @default 1
     */
    @Property(1)
    public opacity: number;

}
/**
 * Configure the margin of chart.
 */
export class Margin extends ChildProperty<Margin> {

    /**
     * Left margin in pixels.
     * @default 10
     */
    @Property(10)
    public left: number;

    /**
     * Right margin in pixels.
     * @default 10
     */
    @Property(10)
    public right: number;

    /**
     * Top margin in pixels.
     * @default 10
     */
    @Property(10)
    public top: number;

    /**
     * Bottom margin in pixels.
     * @default 10
     */
    @Property(10)
    public bottom: number;
}
/**
 * Configures the zooming behavior for chart.
 */
export class ZoomSettings extends ChildProperty<ZoomSettings> {

    /**
     * If set true, chart can be zoomed by a rectangular selecting region on a plot area.
     * @default false
     */

    @Property(false)
    public enableSelectionZooming: boolean;

    /**
     * If set true, chart can be pinched to zoom in / zoom out.
     * @default false
     */

    @Property(false)
    public enablePinchZooming: boolean;

    /**
     * If set true, chart can be zoomed by using mouse wheel.
     * @default false
     */

    @Property(false)
    public enableMouseWheelZooming: boolean;

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

    @Property(true)
    public enableDeferredZooming: boolean;

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
    @Property('XY')
    public mode: ZoomMode;

    /**
     * Specifies the toolkit options for the zooming. They are.
     * * zoom - Renders the zoom button.
     * * zoomIn - Renders the zoomIn button.
     * * zoomOut - Renders the zoomOut button.
     * * pan - Renders the pan button.
     * * reset - Renders the reset button.
     */

    @Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    public toolbarItems: ToolbarItems[];

}
