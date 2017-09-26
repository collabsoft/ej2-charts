/** 
 * Defines Coordinate units of an annotation. They are
 * * Pixel
 * * Point
 * @private
 */
export type Units =
/**  Specifies the pixel value */
'Pixel' |
/**  Specifies the axis value. */
'Point';

/** 
 * Defines the Alignment. They are
 * * near - Align the element to the left.
 * * center - Align the element to the center.
 * * far - Align the element to the right.
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
 * Defines regions of an annotation. They are
 * * Chart
 * * Series
 * @private
 */
export type Regions =
/**  Specifies the chart coordinates */
'Chart' |
/**  Specifies the series coordinates */
'Series';

/** 
 * Defines the Position. They are
 * * top - Align the element to the top.
 * * middle - Align the element to the center.
 * * bottom - Align the element to the bottom.
 * * 
 */

export type Position =
/** Define the top position. */
'Top' |
/** Define the middle position. */
'Middle' |
/** Define the bottom position. */
'Bottom';