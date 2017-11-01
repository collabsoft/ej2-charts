import { ChildProperty, Property, Complex } from '@syncfusion/ej2-base';import { ZIndex, Anchor } from '../utils/enum';import { Theme } from '../../common/model/theme';import { Font, Border } from '../../common/model/base';import { BorderModel, FontModel } from '../../common/model/base-model';import { Units, Alignment, Regions, Position } from '../../common/utils/enum';

/**
 * Interface for a class ChartAnnotationSettings
 */
export interface ChartAnnotationSettingsModel {

    /**
     * if set coordinateUnit as `Pixel` X specifies the axis value
     * else is specifies pixel or percentage of coordinate
     * @default 0
     */
    x?: string | Date | number;

    /**
     * if set coordinateUnit as `Pixel` Y specifies the axis value
     * else is specifies pixel or percentage of coordinate
     * @default 0
     */
    y?: string | number;

    /**
     * Content of the annotation, which accepts the id of the custom element.
     * @default null
     */
    content?: string;

    /**
     * Specifies the alignment of the annotation. They are
     * * Near - Align the annotation element as left side.
     * * Far - Align the annotation element as right side.
     * * Center - Align the annotation element as mid point.
     * @default 'Center'
     */

    horizontalAlignment?: Alignment;

    /**
     * Specifies the coordinate units of the annotation. They are
     * * Pixel - Annotation renders based on x and y pixel value.
     * * Point - Annotation renders based on x and y axis value.
     * @default 'Pixel'
     */

    coordinateUnits?: Units;

    /**
     * Specifies the regions of the annotation. They are
     * * Chart - Annotation renders based on chart coordinates.
     * * Series - Annotation renders based on series coordinates.
     * @default 'Chart'
     */

    region?: Regions;

    /**
     * Specifies the position of the annotation. They are
     * * Top - Align the annotation element as top side.
     * * Bottom - Align the annotation element as bottom side.
     * * Middle - Align the annotation element as mid point.
     * @default 'Middle'
     */

    verticalAlignment?: Position;

    /**
     * The name of horizontal axis associated with the annotation.
     * It requires `axes` of chart.
     * @default null
     */

    xAxisName?: string;

    /**
     * The name of vertical axis associated with the annotation.
     * It requires `axes` of chart.
     * @default null
     */

    yAxisName?: string;

    /**
     * Information about annotation for assistive technology.
     * @default null
     */
    description?: string;

}

/**
 * Interface for a class StripLineSettings
 */
export interface StripLineSettingsModel {

    /**
     * If set true, strip line for axis renders.
     * @default true.
     */
    visible?: boolean;

    /**
     *  If set true, strip line get render from axis origin.
     *  @default false.
     */
    startFromAxis?: boolean;

    /**
     * Start value of the strip line.
     * @default null.
     */
    start?: number | Date;

    /**
     * End value of the strip line.
     * @default null.
     */
    end?: number | Date;

    /**
     * Size of the strip line, when it starts from the origin.
     * @default null.
     */
    size?: number;

    /**
     * Color of the strip line.
     * @default '#808080'.
     */
    color?: string;

    /**
     * Border of the strip line.
     */
    border?: BorderModel;

    /**
     * Strip line text.
     * @default ''.
     */
    text?: string;

    /**
     * The angle to which the strip line text gets rotated.
     * @default null.
     */
    rotation?: number;

    /**
     * Defines the position of the strip line text horizontally. They are, 
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'.
     */
    horizontalAlignment?: Anchor;

    /**
     * Defines the position of the strip line text vertically. They are, 
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.
     * @default 'Middle'.
     */
    verticalAlignment?: Anchor;

    /**
     * Options to customize the strip line text.
     */
    textStyle?: FontModel;

    /**
     * Specifies the order of the strip line. They are,
     * * Behind: Places the strip line behind the series elements.
     * * Over: Places the strip line over the series elements.
     */
    zIndex?: ZIndex;

    /**
     * Strip line Opacity
     */
    opacity?: number;

}