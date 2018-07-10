import { Property, ChildProperty} from '@syncfusion/ej2-base';

/**
 * Interface for a class SmithchartFont
 */
export interface SmithchartFontModel {

    /**
 * font family for text.
 */
    fontFamily?: string;

    /**
 * font style for text.
 * @default Normal
 */
    fontStyle?: string;

    /**
     * font weight for text.
     * @default Regular
     */
    fontWeight?: string;

    /**
 * font size for text.
 * @default 12px
 */
    size?: string;

    /**
 * font opacity for text.
 * @default 1
 */
    opacity?: number;

}

/**
 * Interface for a class SmithchartMargin
 */
export interface SmithchartMarginModel {

    /**
 * top margin of chartArea.
 * @default 10
 */
    top?: number;

    /**
 * bottom margin of chartArea.
 * @default 10
 */
    bottom?: number;

    /**
  * right margin of chartArea.
  * @default 10
  */

    right?: number;

    /**
     * left margin of chartArea.
     * @default 10
     */

    left?: number;

}

/**
 * Interface for a class SmithchartBorder
 */
export interface SmithchartBorderModel {

    /**
 * width for smithchart border.
 * @default 0
 */

    width?: number;

    /**
 * opacity for smithchart border.
 * @default 1
 */
    opacity?: number;

    /**
 * color for smithchart border .
 * @default transparent
 */

    color?: string;

}

/**
 * Interface for a class SmithchartRect
 * @private
 */
export interface SmithchartRectModel {

}

/**
 * Interface for a class LabelCollection
 * @private
 */
export interface LabelCollectionModel {

}

/**
 * Interface for a class LegendSeries
 * @private
 */
export interface LegendSeriesModel {

}

/**
 * Interface for a class LabelRegion
 * @private
 */
export interface LabelRegionModel {

}

/**
 * Interface for a class HorizontalLabelCollection
 * @private
 */
export interface HorizontalLabelCollectionModel extends LabelCollectionModel{

}

/**
 * Interface for a class RadialLabelCollections
 * @private
 */
export interface RadialLabelCollectionsModel extends HorizontalLabelCollectionModel{

}

/**
 * Interface for a class LineSegment
 * @private
 */
export interface LineSegmentModel {

}

/**
 * Interface for a class PointRegion
 * @private
 */
export interface PointRegionModel {

}

/**
 * Interface for a class Point
 */
export interface PointModel {

}

/**
 * Interface for a class ClosestPoint
 */
export interface ClosestPointModel {

}

/**
 * Interface for a class MarkerOptions
 */
export interface MarkerOptionsModel {

}

/**
 * Interface for a class SmithchartLabelPosition
 */
export interface SmithchartLabelPositionModel {

}

/**
 * Interface for a class Direction
 */
export interface DirectionModel {

}

/**
 * Interface for a class DataLabelTextOptions
 */
export interface DataLabelTextOptionsModel {

}

/**
 * Interface for a class LabelOption
 */
export interface LabelOptionModel {

}

/**
 * Interface for a class SmithchartSize
 * @private
 */
export interface SmithchartSizeModel {

}

/**
 * Interface for a class GridArcPoints
 * @private
 */
export interface GridArcPointsModel {

}