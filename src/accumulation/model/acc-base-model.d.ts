import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';import { isNullOrUndefined} from '@syncfusion/ej2-base';import { DataManager, Query } from '@syncfusion/ej2-data';import { Border, Font, Animation, Index } from '../../common/model/base';import { Rect, ChartLocation, stringToNumber, PathOption} from '../../common/utils/helper';import { AccumulationType, AccumulationLabelPosition, ConnectorType } from '../model/enum';import { IPieSeriesRenderEventArgs, IPiePointRenderEventArgs } from '../model/pie-interface';import { LegendShape } from '../../chart/utils/enum';import { Data} from '../../common/model/data';import { seriesRender, pointRender} from '../../common/model/constants';import { Theme, getSeriesColor } from '../../common/model/theme';import { FontModel, BorderModel, AnimationModel } from '../../common/model/base-model';import { AccumulationChart} from '../accumulation';

/**
 * Interface for a class Connector
 */
export interface ConnectorModel {

    /**
     * specifies the type of the connector line. They are
     * * Smooth
     * * Line
     */
    type?: ConnectorType;

    /**
     * Color of the connector line.
     */
    color?: string;

    /**
     * Width of the connector line in pixels.
     */
    width?: number;

    /**
     * Length of the connector line in pixels.
     */
    length?: string;

}

/**
 * Interface for a class PieDataLabelSettings
 */
export interface PieDataLabelSettingsModel {

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
     * Specifies the position of data label. They are.
     * * outside - Places label outside the point.
     * * inside - Places label inside the point.
     * @default 'Inside'
     */

    position?: AccumulationLabelPosition;

    /**
     * The roundedCornerX for the data label. It requires `border` values not to be null.
     * @default 5
     */
    rx?: number;

    /**
     * The roundedCornerY for the data label. It requires `border` values not to be null.
     * @default 5
     */
    ry?: number;

    /**
     * Option for customizing the border lines.
     */

    border?: BorderModel;

    /**
     * Option for customizing the data label text.
     */

    font?: FontModel;

    /**
     * Options for customize the connector line in series. 
     */
    connectorStyle?: ConnectorModel;

}

/**
 * Interface for a class PieTooltipSettings
 */
export interface PieTooltipSettingsModel {

    /**
     * Enable or disable tooltip for the accumulation chart.
     * @default false
     */

    enable?: boolean;

    /**
     * If set true, tooltip will animate, while moving from one point to another.
     * @default true
     */
    enableAnimation?: boolean;

    /**
     * Format of the tooltip content.
     * @default null
     */

    format?: string;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    fill?: string;

    /**
     * Options to customize the border for tooltip.
     */
    border?: BorderModel;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.
     * @default null
     */

    template?: string;

    /**
     * Options to customize the tooltip text.
     */

    textStyle?: FontModel;

}

/**
 * Interface for a class PiePoints
 * @private
 */
export interface PiePointsModel {

}

/**
 * Interface for a class AccumulationSeries
 */
export interface AccumulationSeriesModel {

    /**
     * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     * ```html
     * <div id='Pie'></div> 
     * ```
     * ```typescript
     * let dataManager: DataManager = new DataManager({
     *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
     * });
     * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
     * let pie: Pie = new Pie({
     * ...
     *     series: [{
     *        dataSource: dataManager,
     *        xName: 'Id',
     *        yName: 'Estimate',
     *        query: query
     *    }],
     * ...
     * });
     * pie.appendTo('#Pie');
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
     * Specifies the series name
     * @default ''
     */

    name?: string;

    /**
     * The DataSource field which contains the y value.
     * @default ''
     */

    yName?: string;

    /**
     * Specifies the series visibility.
     * @default true
     */

    visible?: boolean;

    /**
     * Options for customizing the border of the series.
     */

    border?: BorderModel;

    /**
     * Options for customizing the animation for series.
     */

    animation?: AnimationModel;

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
     * AccumulationSeries y values less than clubbingValue are combined into single slice named others
     * @default null
     */
    clubbingValue?: string;

    /**
     * The data label for the series.
     */
    dataLabel?: PieDataLabelSettingsModel;

    /**
     * Palette for series points.
     * @default []
     */
    palettes?: string[];

    /**
     * Start angle for a series.
     * @default 0
     */
    startAngle?: number;

    /**
     * End angle for a series.
     * @default 360
     */
    endAngle?: number;

    /**
     * Radius of the pie series and its values in percentage.
     * @default '80%'
     */
    radius?: string;

    /**
     * When the innerRadius value is greater than 0 percentage, a donut will appear in pie series. It takes values only in percentage.
     * @default '0'
     */
    innerRadius?: string;

    /**
     * Specify the type of the series in accumulation chart. 
     * @default 'Pie'
     */
    type?: AccumulationType;

    /**
     * To enable or disable tooltip for a series.
     */
    enableTooltip?: boolean;

    /**
     * If set true, series points will be exploded on mouse click or touch.
     * @default false
     */
    explode?: boolean;

    /**
     * Distance of the point from the center, which takes values in both pixels and percentage. 
     * @default '30%'
     */
    explodeOffset?: string;

    /**
     * If set true, all the points in the series will get exploded on load.
     * @default false
     */
    explodeAll?: boolean;

    /**
     * Index of the point, to be exploded on load. 
     * @default null
     */
    explodeIndex?: number;

}