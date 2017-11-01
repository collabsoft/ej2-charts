import { ChildProperty, Property, Complex } from '@syncfusion/ej2-base';
import { ZIndex, Anchor } from '../utils/enum';
import { Theme } from '../../common/model/theme';
import { Font, Border } from '../../common/model/base';
import { BorderModel, FontModel } from '../../common/model/base-model';
import { Units, Alignment, Regions, Position } from '../../common/utils/enum';

/**
 * Configures the Annotation for chart.
 */
export class ChartAnnotationSettings extends ChildProperty<ChartAnnotationSettings> {
    /**
     * if set coordinateUnit as `Pixel` X specifies the axis value
     * else is specifies pixel or percentage of coordinate
     * @default 0
     */
    @Property('0')
    public x: string | Date | number;

    /**
     * if set coordinateUnit as `Pixel` Y specifies the axis value
     * else is specifies pixel or percentage of coordinate
     * @default 0
     */
    @Property('0')
    public y: string | number;

    /**
     * Content of the annotation, which accepts the id of the custom element.
     * @default null
     */
    @Property(null)
    public content: string;

    /**
     * Specifies the alignment of the annotation. They are
     * * Near - Align the annotation element as left side.
     * * Far - Align the annotation element as right side.
     * * Center - Align the annotation element as mid point.
     * @default 'Center'
     */

    @Property('Center')
    public horizontalAlignment: Alignment;

    /**
     * Specifies the coordinate units of the annotation. They are
     * * Pixel - Annotation renders based on x and y pixel value.
     * * Point - Annotation renders based on x and y axis value.
     * @default 'Pixel'
     */

    @Property('Pixel')
    public coordinateUnits: Units;

    /**
     * Specifies the regions of the annotation. They are
     * * Chart - Annotation renders based on chart coordinates.
     * * Series - Annotation renders based on series coordinates.
     * @default 'Chart'
     */

    @Property('Chart')
    public region: Regions;

    /**
     * Specifies the position of the annotation. They are
     * * Top - Align the annotation element as top side.
     * * Bottom - Align the annotation element as bottom side.
     * * Middle - Align the annotation element as mid point.
     * @default 'Middle'
     */

    @Property('Middle')
    public verticalAlignment: Position;

    /**
     * The name of horizontal axis associated with the annotation.
     * It requires `axes` of chart.
     * @default null
     */

    @Property(null)
    public xAxisName: string;

    /**
     * The name of vertical axis associated with the annotation.
     * It requires `axes` of chart.
     * @default null
     */

    @Property(null)
    public yAxisName: string;

    /**
     * Information about annotation for assistive technology.
     * @default null
     */
    @Property(null)
    public description: string;
}

/**
 * Strip line properties
 */
export class StripLineSettings extends ChildProperty<StripLineSettings> {

    /**
     * If set true, strip line for axis renders.
     * @default true.
     */
    @Property(true)
    public visible: boolean;

    /**
     *  If set true, strip line get render from axis origin.
     *  @default false.
     */
    @Property(false)
    public startFromAxis: boolean;

    /**
     * Start value of the strip line.
     * @default null.
     */
    @Property(null)
    public start: number | Date;

    /**
     * End value of the strip line.
     * @default null.
     */
    @Property(null)
    public end: number | Date;

    /**
     * Size of the strip line, when it starts from the origin.
     * @default null.
     */
    @Property(null)
    public size: number;

    /**
     * Color of the strip line.
     * @default '#808080'.
     */
    @Property('#808080')
    public color: string;

    /**
     * Border of the strip line.
     */
    @Complex<BorderModel>({ color: 'transparent', width: 1 }, Border)
    public border: BorderModel;

    /**
     * Strip line text.
     * @default ''.
     */
    @Property('')
    public text: string;

    /**
     * The angle to which the strip line text gets rotated.
     * @default null.
     */
    @Property(null)
    public rotation: number;

    /**
     * Defines the position of the strip line text horizontally. They are, 
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'.
     */
    @Property('Middle')
    public horizontalAlignment: Anchor;

    /**
     * Defines the position of the strip line text vertically. They are, 
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'.
     */
    @Property('Middle')
    public verticalAlignment: Anchor;

    /**
     * Options to customize the strip line text.
     */
    @Complex<FontModel>(Theme.stripLineLabelFont, Font)
    public textStyle: FontModel;

    /**
     * Specifies the order of the strip line. They are,
     * * Behind: Places the strip line behind the series elements.
     * * Over: Places the strip line over the series elements.
     */
    @Property('Behind')
    public zIndex: ZIndex;

    /**
     * Strip line Opacity
     */
    @Property(1)
    public opacity: number;
}    