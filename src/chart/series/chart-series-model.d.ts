import { Property, ChildProperty, Complex, SvgRenderer, DateFormatOptions } from '@syncfusion/ej2-base';import { isNullOrUndefined } from '@syncfusion/ej2-base';import { firstToLowerCase, ChartLocation, Rect, logBase, StackValues, RectOption, ControlPoints } from '../../common/utils/helper';import { ChartSeriesType, ChartShape, LegendShape, LabelPosition, SeriesValueType } from '../utils/enum';import { BorderModel, FontModel, MarginModel, AnimationModel } from '../../common/model/base-model';import { Border, Font, Margin, Animation } from '../../common/model/base';import { DataManager, Query } from '@syncfusion/ej2-data';import { Chart } from '../chart';import { Axis, Column, Row } from '../axis/axis';import { Data } from '../../common/model/data';import { ISeriesRenderEventArgs } from '../../common/model/interface';import { seriesRender } from '../../common/model/constants';import { Alignment } from '../../common/utils/enum';

/**
 * Interface for a class Points
 * @private
 */
export interface PointsModel {

}

/**
 * Interface for a class DataLabelSettings
 */
export interface DataLabelSettingsModel {

    /**
     * If set true, data label for series gets render.
     * @default false
     */

    visible?: boolean;

    /**
     * The DataSource field which contains the data label value.
     * @default null
     */

    name?: string;

    /**
     * The background color of the data label, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'transparent'
     */

    fill?: string;

    /**
     * The opacity for the background.
     * @default 1
     */

    opacity?: number;

    /**
     * Specifies the position of data label. They are.
     * * outer - Position the label outside the point.
     * * top - Position the label on top of the point.
     * * bottom - Position the label on bottom of the point.
     * * middle - Position the label to middle of the point.
     * * auto - Position the label based on series.
     * @Default 'Auto'
     */

    position?: LabelPosition;

    /**
     * The roundedCornerX for the data label. It requires `border` values not to be null.
     * @Default 5
     */
    rx?: number;

    /**
     * The roundedCornerY for the data label. It requires `border` values not to be null.
     * @Default 5
     */
    ry?: number;

    /**
     * Specifies the alignment for data Label. They are
     * * near - Align the label to the left of point.
     * * center - Align the label to the center of point.
     * * far - Align the label to the right of point.
     * @default 'Center'
     */
    alignment?: Alignment;

    /**
     * Option for customizing the border lines.
     */

    border?: BorderModel;

    /**
     * Margin configuration for the data label.
     */

    margin?: MarginModel;

    /**
     * Option for customizing the data label text.
     */

    font?: FontModel;

    /**
     * Custom template to show the data label. Use ${point.x} and ${point.y} as a placeholder
     * text to display the corresponding data point.
     * @default null
     */

    template?: string;

}

/**
 * Interface for a class MarkerSettings
 */
export interface MarkerSettingsModel {

    /**
     * If set true, marker for series gets rendered. This is applicable for only for line and area type series.
     * @default false
     */

    visible?: boolean;

    /**
     * The shape of the marker. They are
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
     * @default 'Circle'
     */

    shape?: ChartShape;

    /**
     * The URL for the Image that is to be displayed as marker.  It requires marker `shape` value to be `Image`.
     * @default ''
     */

    imageUrl?: string;

    /**
     * The height of the marker in pixels.
     * @default 5
     */

    height?: number;

    /**
     * The width of the marker in pixels.
     * @default 5
     */

    width?: number;

    /**
     * Options for customizing the border of the marker shape.
     */

    border?: BorderModel;

    /**
     *  The fill color of the marker, which accepts value in hex, rgba as a valid CSS color string. By default it will take series color.
     * @default ''
     */

    fill?: string;

    /**
     * The opacity of the marker.
     * @default 1
     */

    opacity?: number;

    /**
     * The data label for the series.
     */

    dataLabel?: DataLabelSettingsModel;

}

/**
 * Interface for a class Series
 */
export interface SeriesModel {

    /**
     * The name of the series which is visible in legend.
     * @default ''
     */

    name?: string;

    /**
     * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='Chart'></div> 
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let chart: Chart = new Chart({
     * ...
     *     series: [{
     *        dataSource: dataManager,
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default ''
     */

    dataSource?: Object | DataManager;

    /**
     * Specifies Query to select data from dataSource. This property is applicable only when the dataSource is `ej.DataManager`.
     * @default null
     */
    query?: Query;

    /**
     * The DataSource field which contains the x value.
     * @default ''
     */

    xName?: string;

    /**
     * The DataSource field which contains the y value.
     * @default ''
     */

    yName?: string;

    /**
     * The DataSource field which contains the high value of y
     * @default ''
     */

    high?: string;

    /**
     * The DataSource field which contains the low value of y
     * @default ''
     */

    low?: string;

    /**
     * The DataSource field which contains the size value of y
     * @default ''
     */

    size?: string;

    /**
     * The name of horizontal axis associated with the series. It requires `axes` of chart.
     * ```html
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *     columns: [{ width: '50%' },
     *               { width: '50%' }],
     *     axes: [{
     *                name: 'xAxis 1',
     *                columnIndex: 1,
     *            }],
     *     series: [{
     *                dataSource: data,
     *                xName: 'x', yName: 'y',
     *                xAxisName: 'xAxis 1',
     *     }],
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default null
     */

    xAxisName?: string;

    /**
     * The name of vertical axis associated with the series. It requires `axes` of chart.
     * ```html 
     * <div id='Chart'></div>
     * ```
     * ```typescript
     * let chart: Chart = new Chart({
     * ...
     *     rows: [{ height: '50%' },
     *            { height: '50%' }],
     *     axes: [{
     *                name: 'yAxis 1',
     *                rowIndex: 1,
     *            }],
     *     series: [{
     *                dataSource: data,
     *                xName: 'x', yName: 'y',
     *                yAxisName: 'yAxis 1'
     *     }],
     * });
     * chart.appendTo('#Chart');
     * ```
     * @default null
     */

    yAxisName?: string;

    /**
     * The fill color for the series, which accepts value in hex, rgba as a valid CSS color string.
     * @default null
     */

    fill?: string;

    /**
     * The stroke width for the series, which is applicable only for `Line` type series.
     * @default 1
     */

    width?: number;

    /**
     * This property allows grouping series in a `stacked column / bar` charts.
     * Any string value can be provided to the stackingGroup property.
     * If any two or above series has the same value, those series will be grouped together.
     * @default ''
     */

    stackingGroup?: string;

    /**
     * Specifies the series visibility.
     * @default true
     */

    visible?: boolean;

    /**
     * Options for customizing the border of the series. Applicable only for `Column`, `Bar` type series.
     */

    border?: BorderModel;

    /**
     * The opacity of the series.
     * @default 1
     */
    opacity?: number;

    /**
     * The dashArray of the series.
     * @default '0'
     */

    dashArray?: string;

    /**
     * The type of the series. They are
     * * line - Renders the line series.
     * * column - Renders the column series.
     * * area - Renders the area series.
     * * pie - Renders the pie series.
     * * polar - Renders the polar series.
     * * bar - Renders the stacking column series
     * * stackingColumn - Renders the stacking column series.
     * * stackingArea - Renders the stacking area series
     * * stackingBar - Renders the stacking bar series.
     * * stepLine -  Renders the step line series.
     * * scatter - Renders the scatter series.
     * * spline - Renders the spline series
     * @default 'Line'
     */

    type?: ChartSeriesType;

    /**
     * Options for displaying and customizing marker for individual point in a series.
     */
    marker?: MarkerSettingsModel;

    /**
     * Options for customizing the animation for series.
     */

    animation?: AnimationModel;

    /**
     * If set true, the tooltip for series will be visible.
     * @default true
     */
    enableTooltip?: boolean;

    /**
     * The shape of the legend. Each series has its own legend shape. They are
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
     * @default 'SeriesType'
     */

    legendShape?: LegendShape;

    /**
     * Custom style for the selected series or points.
     * @default null
     */
    selectionStyle?: string;

    /**
     * minimum radius
     */
    minRadius?: number;

    /**
     * maximum radius
     */
    maxRadius?: number;

}