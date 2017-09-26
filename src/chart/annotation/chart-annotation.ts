/**
 * chart annotation property
 */

import { Property, ChildProperty } from '@syncfusion/ej2-base';
import { Units, Alignment, Regions, Position } from '../../common/utils/enum';

/** @private */
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