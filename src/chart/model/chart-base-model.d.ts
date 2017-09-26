import { ChildProperty, Property } from '@syncfusion/ej2-base';import { Units, Alignment, Regions, Position } from '../../common/utils/enum';

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