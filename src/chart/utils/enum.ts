/** 
 * Defines Orientation of axis. They are
 * * horizontal
 * * vertical
 * @private
 */
export type Orientation =
    /**  Horizontal Axis. */
    'Horizontal' |
    /**  Vertical Axis. */
    'Vertical';

/** 
 * Defines area type of chart. They are
 * * none
 * * cartesianAxes
 * * polarAxes
 * @private
 */
export type ChartAreaType =
    /**  Accumulation panel. */
    'None' |
    /**  Cartesian panel. */
    'CartesianAxes' |
    /**  Polar panel. */
    'PolarAxes';

/** 
 * Defines the range padding of axis. They are
 * * none - Padding cannot be applied to the axis.
 * * normal - Padding is applied to the axis based on the range calculation.
 * * additional - Interval of the axis is added as padding to the minimum and maximum values of the range.
 * * round - Axis range is rounded to the nearest possible value divided by the interval.
 */
export type ChartRangePadding =
    /**  Padding Normal is applied for orientation vertical axis and None is applied for orientation horizontal axis */
    'Auto' |
    /**  Padding wiil not be applied to the axis. */
    'None' |
    /**  Padding is applied to the axis based on the range calculation. */
    'Normal' |
    /**  Interval of the axis is added as padding to the minimum and maximum values of the range. */
    'Additional' |
    /**  Axis range is rounded to the nearest possible value divided by the interval. */
    'Round';


/** 
 * Defines the type series in chart. They are
 * * line - Renders the line series.
 * * column - Renders the column series.
 * * area - Renders the area series.
 * * pie - Renders the pie series.
 * * polar - Renders the polar series.
 * * bar - Renders the stacking column series
 * * stackingColumn - Renders the stacking column series.
 * * stackingArea - Renders the stacking area series
 * * stackingBar - Renders the stacking bar series.
 * * StackingColumn100 - Renders the stacking column series.
 * * StackingArea100 - Renders the stacking area 100 percent series
 * * StackingBar100 - Renders the stacking bar 100 percent series.
 * * stepLine -  Renders the step line series.
 * * scatter - Renders the scatter series.
 * * spline - Renders the spline series
 */
export type ChartSeriesType =
    /**  Define the line series. */
    'Line' |
    /**  Define the Column series. */
    'Column' |
    /**  Define the Area series. */
    'Area' |
    /**  Define the Bar series. */
    'Bar' |
    /**  Define the StackingColumn series. */
    'StackingColumn' |
    /**  Define the StackingArea series. */
    'StackingArea' |
    /**  Define the StackingBar series. */
    'StackingBar' |
    /**  Define the Stepline series. */
    'StepLine' |
    /**  Define the Scatter series. */
    'Scatter' |
    /**  Define the Spline series. */
    'Spline' |
    /** Define the StackingColumn100 series */
    'StackingColumn100' |
    /** Define the StackingBar100 series */
    'StackingBar100' |
    /** Define the StackingArea100 series */
    'StackingArea100';


/** 
 * Defines the Edge Label Placement for an axis. They are
 * * none - No action will be perform.
 * * hide - Edge label will be hidden.
 * * shift - Shift the edge labels.
 */

export type EdgeLabelPlacement =
    /**  Render the edge label in axis. */
    'None' |
    /**  Hides the edge label in axis. */
    'Hide' |
    /**  Shift the edge series in axis. */
    'Shift';

/** 
 * Defines the Label Placement for category axis. They are
 * * betweenTicks - Render the label between the ticks.
 * * onTicks - Render the label on the ticks.
 */
export type LabelPlacement =
    /**  Render the label between the ticks. */
    'BetweenTicks' |
    /**  Render the label on the ticks. */
    'OnTicks';
/** 
 * Defines the shape of marker. They are
 * * circle - Renders a circle.
 * * rectangle - Renders a rectangle.
 * * triangle - Renders a triangle.
 * * diamond - Renders a diamond.
 * * cross - Renders a cross.
 * * horizontalLine - Renders a horizontalLine.
 * * verticalLine - Renders a verticalLine.
 * * pentagon- Renders a pentagon.
 * * invertedTriangle - Renders a invertedTriangle.
 * * image - Renders a image.
 */
export type ChartShape =
    /** Render a circle. */
    'Circle' |
    /** Render a Rectangle. */
    'Rectangle' |
    /** Render a Triangle. */
    'Triangle' |
    /** Render a Diamond. */
    'Diamond' |
    /** Render a Cross. */
    'Cross' |
    /** Render a HorizontalLine. */
    'HorizontalLine' |
    /** Render a VerticalLine. */
    'VerticalLine' |
    /** Render a Pentagon. */
    'Pentagon' |
    /** Render a InvertedTriangle. */
    'InvertedTriangle' |
    /** Render a Image. */
    'Image';

/** 
 * Defines the type of axis. They are
 * * double -  Renders a numeric axis.
 * * dateTime - Renders a dateTime axis.
 * * category - Renders a category axis.
 * * logarithmic - Renders a log axis.
 */
export type ValueType =
    /** Define the numeric axis. */
    'Double' |
    /** Define the DateTime axis. */
    'DateTime' |
    /** Define the Category axis . */
    'Category' |
    /** Define the Logarithmic axis . */
    'Logarithmic';

/** 
 * Defines the interval type of datetime axis. They are
 * * auto - Define the interval of the axis based on data.
 * * years - Define the interval of the axis in years.
 * * months - Define the interval of the axis in months.
 * * days - Define the interval of the axis in days.
 * * hours - Define the interval of the axis in hours.
 * * minutes - Define the interval of the axis in minutes.
 */
export type IntervalType =
    /** Define the interval of the axis based on data. */
    'Auto' |
    /** Define the interval of the axis in years. */
    'Years' |
    /** Define the interval of the axis in months. */
    'Months' |
    /** Define the interval of the axis in days. */
    'Days' |
    /** Define the interval of the axis in hours. */
    'Hours' |
    /** Define the interval of the axis in minutes. */
    'Minutes' |
    /** Define the interval of the axis in seconds. */
    'Seconds';

/** 
 * Defines the mode of line in crosshair. They are
 * * none - Hides both vertical and horizontal crosshair line.
 * * both - Shows both vertical and horizontal crosshair line.
 * * vertical - Shows the vertical line.
 * * horizontal - Shows the horizontal line.
 */

export type LineType =
    /** Hides both vertical and horizontal crosshair line. */
    'None' |
    /** Shows both vertical and horizontal crosshair line. */
    'Both' |
    /** Shows the vertical line. */
    'Vertical' |
    /** Shows the horizontal line. */
    'Horizontal';

/** 
 * Defines the position of the legend. They are
 * * auto - Places the legend based on area type.
 * * top - Displays the legend on the top of chart.
 * * left - Displays the legend on the left of chart.
 * * bottom - Displays the legend on the bottom of chart.
 * * right - Displays the legend on the right of chart.
 * * custom - Displays the legend  based on given x and y value.
 */

export type LegendPosition =
    /** Places the legend based on area type. */
    'Auto' |
    /** Places the legend on the top of chart. */
    'Top' |
    /** Places the legend on the left of chart. */
    'Left' |
    /** Places the legend on the bottom of chart. */
    'Bottom' |
    /** Places the legend on the right of chart. */
    'Right' |
    /** Places the legend based on given x and y. */
    'Custom';

/** 
 * Defines the Alignment. They are
 * * near - Align the legend to the left of chart.
 * * center - Align the legend to the center of chart.
 * * far - Align the legend to the right of chart.
 * * 
 */

export type Alignment =
    /** Define the left alignment. */
    'Near' |
    /** Define the center alignment. */
    'Center' |
    /** Define the right alignment. */
    'Far';

/** 
 * Defines the shape of legend. They are
 * * circle - Renders a circle.
 * * rectangle - Renders a rectangle.
 * * triangle - Renders a triangle.
 * * diamond - Renders a diamond.
 * * cross - Renders a cross.
 * * horizontalLine - Renders a horizontalLine.
 * * verticalLine - Renders a verticalLine.
 * * pentagon - Renders a pentagon.
 * * invertedTriangle - Renders a invertedTriangle.
 * * SeriesType -Render a legend shape based on series type. 
 */
export type LegendShape =
    /** Render a circle. */
    'Circle' |
    /** Render a Rectangle. */
    'Rectangle' |
    /** Render a Triangle. */
    'Triangle' |
    /** Render a Diamond. */
    'Diamond' |
    /** Render a Cross. */
    'Cross' |
    /** Render a HorizontalLine. */
    'HorizontalLine' |
    /** Render a VerticalLine. */
    'VerticalLine' |
    /** Render a Pentagon. */
    'Pentagon' |
    /** Render a InvertedTriangle. */
    'InvertedTriangle' |
    /** Render a legend shape based on series type. */
    'SeriesType';

/** 
 * Defines the zooming mode, They are.
 * * x,y - Chart will be zoomed with respect to both vertical and horizontal axis.
 * * x - Chart will be zoomed with respect to horizontal axis.
 * * y - Chart will be zoomed with respect to vertical axis.
 */
export type ZoomMode =
    /** Chart will be zoomed with respect to both vertical and horizontal axis. */
    'XY' |
    /** Chart will be zoomed with respect to horizontal axis. */
    'X' |
    /** Chart will be zoomed with respect to vertical axis. */
    'Y';

/** 
 * Defines the ZoomingToolkit, They are.
 * * zoom - Renders the zoom button.
 * * zoomIn - Renders the zoomIn button.
 * * zoomOut - Renders the zoomOut button.
 * * pan - Renders the pan button.
 * * reset - Renders the reset button.
 */

export type ToolbarItems =
    /** Renders the zoom button. */
    'Zoom' |
    /** Renders the zoomIn button. */
    'ZoomIn' |
    /** Renders the zoomOut button. */
    'ZoomOut' |
    /** Renders the pan button. */
    'Pan' |
    /** Renders the reset button. */
    'Reset';

/** 
 * Defines the SelectionMode, They are.
 * * none - Disable the selection.
 * * series - To select a series.
 * * point - To select a point.
 * * cluster - To select a cluster of point
 * * dragXY - To select points, by dragging with respect to both horizontal and vertical axis
 * * dragX - To select points, by dragging with respect to horizontal axis.
 * * dragY - To select points, by dragging with respect to vertical axis.
 */
export type SelectionMode =
    /** Disable the selection. */
    'None' |
    /** To select a series. */
    'Series' |
    /** To select a point. */
    'Point' |
    /** To select a cluster of point. */
    'Cluster' |
    /** To select points, by dragging with respect to both horizontal and vertical axis. */
    'DragXY' |
    /** To select points, by dragging with respect to vertical axis. */
    'DragY' |
    /** To select points, by dragging with respect to horizontal axis. */
    'DragX';

/** 
 * Defines the LabelPosition, They are.
 * * outer - Position the label outside the point.
 * * top - Position the label on top of the point.
 * * bottom - Position the label on bottom of the point.
 * * middle - Position the label to middle of the point.
 * * auto - Position the label based on series.
 */
export type LabelPosition =
    /** Position the label outside the point. */
    'Outer' |
    /** Position the label on top of the point. */
    'Top' |
    /** Position the label on bottom of the point. */
    'Bottom' |
    /** Position the label to middle of the point. */
    'Middle' |
    /** Position the label based on series. */
    'Auto';
/** 
 * Defines the Alignment. They are
 * * near - Align the label to the left of point.
 * * center - Align the label to the center of point.
 * * far - Align the label to the right of point.
 * * 
 */
export type LabelAlignment =
    /** Define the label to the left of point. */
    'Near' |
    /** Define the label to the center of point. */
    'Center' |
    /** Define the label to the right of point. */
    'Far';

/** 
 * Defines the Alignment. They are
 * * none - Shows all the labels.
 * * hide - Hide the label when it intersect.
 * * rotate45 - Rotate the label to 45 degree when it intersect.
 * * rotate90 - Rotate the label to 90 degree when it intersect.
 * * 
 */
export type LabelIntersectAction =
    /** Shows all the labels. */
    'None' |
    /** Hide the label when it intersect. */
    'Hide' |
    /** Rotate the label to 45 degree when it intersect. */
    'Rotate45' |
     /** Rotate the label to 90 degree when it intersect. */
    'Rotate90';
