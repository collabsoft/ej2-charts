import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { BorderModel } from './base-model';


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
 * Configures the animation behavior for series.
 */

export class Animation extends ChildProperty<Animation> {

    /**
     * If set true, series gets animated on initial loading.
     * @default true
     */

    @Property(true)
    public enable: boolean;

    /**
     * The animation duration in milliseconds.
     * @default 1000
     */

    @Property(1000)
    public duration: number;

    /**
     * The option to delay the animation of series.
     * @default 0
     */

    @Property(0)
    public delay: number;
}
/** @private */
export class Indexes extends ChildProperty<Indexes> {
    /**
     * Specifies the series index
     */
    @Property(0)
    public series: number;

    /**
     * Specifies the point index
     */
    @Property(0)
    public point: number;

}

 /**
  * @private
  */
export class Index {
    public series: number;
    public point: number;
    constructor(seriesIndex: number, pointIndex?: number) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
}
