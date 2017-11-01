import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { BorderModel } from './base-model';
import { EmptyPointMode} from '../../chart/utils/enum';
import { AccEmptyPointMode, ConnectorType} from '../../accumulation-chart/model/enum';
import { Alignment } from '../utils/enum';

/**
 * Defines the appearance of the connectors
 */
export class Connector extends ChildProperty<Connector> {
    /**
     * specifies the type of the connector line. They are
     * * Smooth
     * * Line
     */
    @Property('Line')
    public type: ConnectorType;

    /**
     * Color of the connector line.
     */
    @Property(null)
    public color: string;

    /**
     * Width of the connector line in pixels.
     */
    @Property(1)
    public width: number;

    /**
     * Length of the connector line in pixels.
     */
    @Property(null)
    public length: string;

    /**
     * dashArray of the connector line.
     */
    @Property('')
    public dashArray: string;


}
/**
 * Configures the fonts in charts.
 */

export class Font extends ChildProperty<Font> {

    /**
     * Font size for the text.
     */
    @Property('16px')
    public size: string;

    /**
     * Color for the text.
     */
    @Property('')
    public color: string;

    /**
     * FontFamily for the text.
     */
    @Property('Segoe UI')
    public fontFamily: string;

    /**
     * FontWeight for the text.
     */
    @Property('Normal')
    public fontWeight: string;

    /**
     * FontStyle for the text.
     */
    @Property('Normal')
    public fontStyle: string;

    /**
     * Opacity for the text.
     */
    @Property(1)
    public opacity: number;

    /**
     * text alignment
     */
    @Property('Center')
    public textAlignment: Alignment;

}
/**
 * Configures the borders in the chart.
 */
export class Border extends ChildProperty<Border> {

    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
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
     * Options to customize the border of the chart area.
     */
    @Complex<BorderModel>({}, Border)
    public border: BorderModel;

    /**
     * The background of the chart area that accepts value in hex and rgba as a valid CSS color string..
     * @default transparent.
     */
    @Property('transparent')
    public background: string;

    /**
     * The opacity for background.
     * @default 1.
     */
    @Property(1)
    public opacity: number;

}
/**
 * Configures the chart margins.
 */
export class Margin extends ChildProperty<Margin> {

    /**
     * Left margin in pixels.
     * @default 10.
     */
    @Property(10)
    public left: number;

    /**
     * Right margin in pixels.
     * @default 10.
     */
    @Property(10)
    public right: number;

    /**
     * Top margin in pixels.
     * @default 10.
     */
    @Property(10)
    public top: number;

    /**
     * Bottom margin in pixels.
     * @default 10.
     */
    @Property(10)
    public bottom: number;
}
/**
 * Configures the animation behavior for chart series.
 */

export class Animation extends ChildProperty<Animation> {

    /**
     * If set to true, series gets animated on initial loading.
     * @default true.
     */

    @Property(true)
    public enable: boolean;

    /**
     * The duration of animation in milliseconds.
     * @default 1000.
     */

    @Property(1000)
    public duration: number;

    /**
     * The option to delay animation of the series.
     * @default 0.
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
 * Column series rounded corner options
 */
export class CornerRadius extends ChildProperty<CornerRadius> {
    /**
     * Specifies the top left corner radius value
     */
    @Property(0)
    public topLeft: number;
    /**
     * Specifies the top right corner radius value
     */
    @Property(0)
    public topRight: number;
    /**
     * Specifies the bottom left corner radius value
     */
    @Property(0)
    public bottomLeft: number;
    /**
     * Specifies the bottom right corner radius value
     */
    @Property(0)
    public bottomRight: number;
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
/**
 * Configures the Empty Points of series
 */

export class EmptyPointSettings extends ChildProperty<EmptyPointSettings> {

    /**
     * To customize the fill color of empty points.
     */
    @Property(null)
    public fill: string;

    /**
     * Options to customize the border of empty points.
     */
    @Complex<BorderModel>({color: 'transparent', width: 0}, Border)
    public border: BorderModel;

    /**
     * To customize the mode of empty points.
     * @default Gap
     */
    @Property('Gap')
    public mode: EmptyPointMode | AccEmptyPointMode;
}
