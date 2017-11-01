import { Property, ChildProperty, Complex, Collection, SvgRenderer, DateFormatOptions } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataLabelSettingsModel, MarkerSettingsModel, TrendLineModel } from '../series/chart-series-model';
import { StackValues, RectOption, ControlPoints, PolarArc } from '../../common/utils/helper';
import { ErrorBarSettingsModel, ErrorBarCapSettingsModel } from '../series/chart-series-model';
import { firstToLowerCase, ChartLocation, Rect, logBase, CircleOption } from '../../common/utils/helper';
import { ChartSeriesType, ChartShape, LegendShape, LabelPosition, SeriesValueType, EmptyPointMode, SplineType } from '../utils/enum';
import { BorderModel, FontModel, MarginModel, AnimationModel, EmptyPointSettingsModel } from '../../common/model/base-model';
import { ConnectorModel } from '../../common/model/base-model';
import { CornerRadiusModel } from '../../common/model/base-model';
import { ErrorBarType, ErrorBarDirection, ErrorBarMode, TrendLineTypes, SeriesCategories } from '../utils/enum';
import { Border, Font, Margin, Animation, EmptyPointSettings, CornerRadius, Connector } from '../../common/model/base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Chart } from '../chart';
import { Axis, Column, Row } from '../axis/axis';
import { Data } from '../../common/model/data';
import { ISeriesRenderEventArgs } from '../../common/model/interface';
import { seriesRender } from '../../common/model/constants';
import { Alignment } from '../../common/utils/enum';
import { BoxPlotMode } from '../utils/enum';

/**
 * Points model for the series.
 * @private
 */
export class Points {
    public x: Object;
    public y: Object;
    public visible: boolean;
    public text: string;
    public color: string;
    public open: Object;
    public close: Object;
    public symbolLocations: ChartLocation[] = null;
    public xValue: number;
    public yValue: number;
    public index: number;
    public regions: Rect[] = null;
    public percent: string;
    public high: Object;
    public low: Object;
    public volume: Object;
    public size: Object;
    public isEmpty: boolean;
    public regionData: PolarArc = null;
    public minimum: number;
    public maximum: number;
    public upperQuartile: number;
    public lowerQuartile: number;
    public median: number;
    public outliers: number[];
    public average: number;
    public error: number;
}

/**
 * Configures the data label in the series.
 */

export class DataLabelSettings extends ChildProperty<DataLabelSettings> {

    /**
     * If set true, data label for series renders.
     * @default false.
     */

    @Property(false)
    public visible: boolean;

    /**
     * The DataSource field that contains the data label value.
     * @default null.
     */

    @Property(null)
    public name: string;

    /**
     * The background color of the data label accepts value in hex and rgba as a valid CSS color string.
     * @default 'transparent'.
     */

    @Property('transparent')
    public fill: string;

    /**
     * The opacity for the background.
     * @default 1.
     */

    @Property(1)
    public opacity: number;

    /**
     * Specifies the position of the data label. They are,
     * * outer: Positions the label outside the point.
     * * top: Positions the label on top of the point.
     * * bottom: Positions the label at the bottom of the point.
     * * middle: Positions the label to the middle of the point.
     * * auto: Positions the label based on series.
     * @Default 'Auto'.
     */

    @Property('Auto')
    public position: LabelPosition;

    /**
     * The roundedCornerX for the data label. It requires `border` values not to be null.
     * @Default 5.
     */
    @Property(5)
    public rx: number;

    /**
     * The roundedCornerY for the data label. It requires `border` values not to be null.
     * @Default 5.
     */
    @Property(5)
    public ry: number;

    /**
     * Specifies the alignment for data Label. They are,
     * * near: Aligns the label to the left of the point.
     * * center: Aligns the label to the center of the point.
     * * far: Aligns the label to the right of the point.
     * @default 'Center'.
     */
    @Property('Center')
    public alignment: Alignment;

    /**
     * Option for customizing the border lines.
     */

    @Complex<BorderModel>({ width: null, color: null }, Border)
    public border: BorderModel;

    /**
     * Margin configuration for the data label.
     */

    @Complex<MarginModel>({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
    public margin: MarginModel;

    /**
     * Option for customizing the data label text.
     */

    @Complex<FontModel>({ size: '11px', color: null }, Font)
    public font: FontModel;

    /**
     * Custom template to show the data label. Use ${point.x} and ${point.y} as a placeholder
     * text to display the corresponding data point.
     * @default null
     */

    @Property(null)
    public template: string;

}


/**
 *  Configures the marker in the series.
 */

export class MarkerSettings extends ChildProperty<MarkerSettings> {

    /**
     * If set to true the marker for series is rendered. This is applicable only for line and area type series.
     * @default false.
     */

    @Property(false)
    public visible: boolean;

    /**
     * The different shape of a marker:
     * * circle
     * * rectangle
     * * triangle
     * * diamond
     * * horizontalLine
     * * verticalLine
     * * pentagon- Renders
     * * invertedTriangle
     * * image
     * @default 'Circle'.
     */

    @Property('Circle')
    public shape: ChartShape;


    /**
     * The URL for the Image that is to be displayed as a marker.  It requires marker `shape` value to be an `Image`.
     * @default ''.
     */

    @Property('')
    public imageUrl: string;

    /**
     * The height of the marker in pixels.
     * @default 5.
     */

    @Property(5)
    public height: number;

    /**
     * The width of the marker in pixels.
     * @default 5.
     */

    @Property(5)
    public width: number;

    /**
     * Options for customizing the border of a marker.
     */

    @Complex<BorderModel>({ width: 2, color: null }, Border)
    public border: BorderModel;

    /**
     *  The fill color of the marker that accepts value in hex and rgba as a valid CSS color string. By default, it will take series' color.
     * @default null.
     */

    @Property(null)
    public fill: string;

    /**
     * The opacity of the marker.
     * @default 1.
     */

    @Property(1)
    public opacity: number;

    /**
     * The data label for the series.
     */

    @Complex<DataLabelSettingsModel>({}, DataLabelSettings)
    public dataLabel: DataLabelSettingsModel;

}

/**
 * Defines the behavior of the Trendlines
 */
export class TrendLine extends ChildProperty<TrendLine> {
    /**
     * Defines the type of the trendline
     */
    @Property('Linear')
    public type: TrendLineTypes;

    /**
     * Defines the period, the price changes over which will be considered to predict moving average trend line
     */
    @Property(2)
    public period: number;

    /**
     * Defines the polynomial order of the polynomial trendline
     */
    @Property(2)
    public polynomialOrder: number;

    /**
     * Defines the period, by which the trend has to backward forecast
     */
    @Property(0)
    public backwardForecast: number;

    /**
     * Defines the period, by which the trend has to forward forecast
     */
    @Property(0)
    public forwardForecast: number;

    /**
     * Defines the slope of the trendlines
     */
    @Property(null)
    public slope: number;

    /**
     * Options to customize the animation for trendlines
     */
    @Complex<AnimationModel>({}, Animation)
    public animation: AnimationModel;

    /**
     * Options to customize the marker for trendlines
     */
    @Complex<MarkerSettingsModel>({}, MarkerSettings)
    public marker: MarkerSettingsModel;

    /**
     * Enables/disables tooltip for trendlines
     */
    @Property(true)
    public enableTooltip: boolean;


    /**
     * Defines the intercept of the trendline
     */
    @Property(null)
    public intercept: number;

    /**
     * Defines the fill color of trendline
     */
    @Property('')
    public fill: string;

    /**
     * Defines the width of the trendline
     */
    @Property(1)
    public width: number;

    /**
     * Sets the legend shape of the trendline
     */
    @Property('SeriesType')
    public legendShape: LegendShape;


    /** @private */
    public targetSeries: Series;

    /** @private */
    public trendLineElement: Element;

    /** @private */
    public points: Points[];

    /** @private */
    public clipRectElement: Element;

    /** @private */
    public clipRect: Rect = new Rect(0, 0, 0, 0);

    /** @private */
    public polynomialSlopes: number[];

    /** @private */
    public sourceIndex: number;

    /** @private */
    public index: number;

    /** @private */
    public setDataSource(series: Series, chart: Chart): void {
        if (series) {
            this.points = (series as Series).points;
        }
        let type: string = firstToLowerCase(this.type);
        chart.trendLineModule.initDataSource(this, chart);

        chart.visibleSeriesCount++;
    }
}

export class ErrorBarCapSettings extends ChildProperty<ErrorBarCapSettings> {

    /**
     * The width of the error bar in pixels.
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * The length of the error bar in pixels.
     * @default 10
     */

    @Property(10)
    public length: number;

    /**
     *  The stroke color of the cap, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'black'
     */

    @Property('black')
    public color: string;

    /**
     * The opacity of the cap.
     * @default 1
     */

    @Property(1)
    public opacity: number;

}


export class ErrorBarSettings extends ChildProperty<ErrorBarSettings> {

    /**
     * If set true, error bar for data gets rendered.
     * @default false
     */

    @Property(false)
    public visible: boolean;

    /**
     * The type of the error bar . They are
     * * fixed -  Renders a fixed type error bar.
     * * percentage - Renders a percentage type error bar.
     * * standardDeviation - Renders a standard deviation type error bar.
     * * standardError -Renders a standard error type error bar.
     * * custom -Renders a custom type error bar.
     * @default 'Fixed'
     */

    @Property('Fixed')
    public type: ErrorBarType;

    /**
     * The direction of the error bar . They are
     * * both -  Renders both direction of error bar.
     * * minus - Renders minus direction of error bar.
     * * plus - Renders plus direction error bar.
     * @default 'Both'
     */

    @Property('Both')
    public direction: ErrorBarDirection;

    /**
     * The mode of the error bar . They are
     * * vertical -  Renders a vertical error bar.
     * * horizontal - Renders a horizontal error bar.
     * * both - Renders both side error bar.
     * @default 'Vertical'
     */

    @Property('Vertical')
    public mode: ErrorBarMode;

    /**
     *  The color for stroke of the error bar, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'black'
     */

    @Property('black')
    public color: string;

    /**
     * The vertical error of the error bar.
     * @default 1
     */

    @Property(1)
    public verticalError: number;

    /**
     * The stroke width of the error bar..
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * The horizontal error of the error bar.
     * @default 1
     */

    @Property(1)
    public horizontalError: number;

    /**
     * The vertical positive error of the error bar.
     * @default 3
     */

    @Property(3)
    public verticalPositiveError: number;

    /**
     * The vertical negative error of the error bar.
     * @default 3
     */

    @Property(3)
    public verticalNegativeError: number;

    /**
     * The horizontal positive error of the error bar.
     * @default 1
     */

    @Property(1)
    public horizontalPositiveError: number;

    /**
     * The horizontal negative error of the error bar.
     * @default 1
     */

    @Property(1)
    public horizontalNegativeError: number;

    /**
     * Options for customizing the cap of the error bar.
     */
    @Complex<ErrorBarCapSettingsModel>(null, ErrorBarCapSettings)
    public errorBarCap: ErrorBarCapSettingsModel;

}

/**
 * Defines the common behavior of Series and Technical Indicators
 */
export class SeriesBase extends ChildProperty<SeriesBase> {
    /**
     * The DataSource field that contains the x value.
     * It is applicable for series and technical indicators
     * @default ''.
     */

    @Property('')
    public xName: string;

    /**
     * The DataSource field that contains the high value of y
     * It is applicable for series and technical indicators
     * @default ''.
     */

    @Property('')
    public high: string;

    /**
     * The DataSource field that contains the low value of y
     * It is applicable for series and technical indicators
     * @default ''.
     */

    @Property('')
    public low: string;

    /**
     * The DataSource field that contains the open value of y
     * It is applicable for series and technical indicators
     * @default ''.
     */

    @Property('')
    public open: string;

    /**
     * The DataSource field that contains the close value of y
     * It is applicable for series and technical indicators
     * @default ''.
     */

    @Property('')
    public close: string;

    /**
     * Defines the data source field that contains the volume value in candle charts
     * It is applicable for financial series and technical indicators
     * @default ''
     */

    @Property('')
    public volume: string;

    /**
     * The name of the horizontal axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators
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
     * @default null.
     */

    @Property(null)
    public xAxisName: string;

    /**
     * The name of the vertical axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators
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
     * @default null.
     */

    @Property(null)
    public yAxisName: string;

    /**
     * Options to customizing animation for the series.
     */

    @Complex<AnimationModel>(null, Animation)
    public animation: AnimationModel;

    /**
     * The fill color for the series that accepts value in hex and rgba as a valid CSS color string.
     * It also represents the color of the signal lines in technical indicators.
     * For technical indicators, the default value is 'blue' and for series, it has null.
     * @default null.
     */

    @Property(null)
    public fill: string;

    /**
     * The stroke width for the series that is applicable only for `Line` type series.
     * It also represents the stroke width of the signal lines in technical indicators.
     * @default 1.
     */

    @Property(1)
    public width: number;

    /**
     * Defines the pattern of dashes and gaps to stroke the lines in `Line` type series.
     * @default '0'.
     */

    @Property('0')
    public dashArray: string;

    /**
     * Specifies the DataSource for the series. It can be an array of JSON objects or an instance of DataManager.
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

    @Property('')
    public dataSource: Object | DataManager;

    /**
     * Specifies query to select data from DataSource. This property is applicable only when the DataSource is `ej.DataManager`.
     * @default null.
     */
    @Property()
    public query: Query;

    /**
     * Process data for the series.
     * @hidden
     */
    public processJsonData(): void {
        let i: number = 0; let len: number = Object.keys(this.currentViewData).length;
        let point: Points = new Points();
        let textMappingName: string = this instanceof Series ? this.marker.dataLabel.name : '';
        if (this instanceof Series && this.type === 'Waterfall') {
            this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                processWaterfallData(this.currentViewData, this);
        }

        this.points = [];
        this.xMin = Infinity; this.xMax = -Infinity;
        this.yMin = Infinity; this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        this.getSeriesType();
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                this.pushCategoryData(point, i);
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        } else if (this.xAxis.valueType === 'DateTime') {
            let option: DateFormatOptions = {
                skeleton: 'full',
                type: 'dateTime'
            };
            let dateParser: Function = this.chart.intl.getDateParser(option);
            let dateFormatter: Function = this.chart.intl.getDateFormat(option);
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        } else {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                point.xValue = <number>point.x;
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        if (this instanceof Series) {
            if (this.type === 'Spline' || this.drawType === 'Spline') {
                this.chart.splineSeriesModule.findSplinePoint(this);
            }
        }
    }

    private pushData(point: Points, i: number): void {
        point.index = i;
        point.yValue = <number>point.y;
        // To find the min, max for the axis range.
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    }
    /** @private */
    protected dataPoint(i: number, textMappingName: string): Points {
        let point: Points;
        this.points[i] = new Points();
        point = <Points>this.points[i];
        let currentViewData: object = this.currentViewData;
        point.x = currentViewData[i][this.xName];
        point.high = currentViewData[i][this.high];
        point.low = currentViewData[i][this.low];
        point.open = currentViewData[i][this.open];
        point.close = currentViewData[i][this.close];
        point.volume = currentViewData[i][this.volume];
        if (this instanceof Series) {
            point.y = currentViewData[i][this.yName];
            point.size = currentViewData[i][this.size];
            point.text = currentViewData[i][textMappingName];
        }
        return point;
    }

    /**
     * To set empty point value based on empty point mode
     * @private
     */
    public setEmptyPoint(point: Points, i: number): void {
        if (!this.findVisibility(point)) {
            point.visible = true;
            return null;
        }
        point.isEmpty = true;
        let mode: EmptyPointMode = this instanceof Series ? this.emptyPointSettings.mode : 'Drop';
        switch (mode) {
            case 'Zero':
                point.visible = true;
                if (this instanceof Series && this.seriesType.indexOf('HighLow') > -1) {
                    point.high = point.low = 0;
                    if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                        point.open = point.close = 0;
                    }
                } else {
                    point.y = point.yValue = this.yData[i] = 0;
                }
                break;
            case 'Average':
                if (this instanceof Series) {
                    if (this.seriesType.indexOf('HighLow') > -1) {
                        point.high = isNullOrUndefined(point.high) ? this.getAverage(this.high, i) : point.high;
                        point.low = isNullOrUndefined(point.low) ? this.getAverage(this.low, i) : point.low;
                        if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                            point.open = isNullOrUndefined(point.open) ? this.getAverage(this.open, i) : point.open;
                            point.close = isNullOrUndefined(point.close) ? this.getAverage(this.close, i) : point.close;
                        }
                    } else {
                        point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                    }
                }
                point.visible = true;
                break;
            case 'Drop':
            case 'Gap':
                this.yData[i] = null;
                point.visible = false;
                break;
        }
    }

    private findVisibility(point: Points): boolean {
        let type: SeriesValueType = this instanceof Series ? this.seriesType : 'HighLowOpenClose';
        let yValues: number[];
        switch (type) {
            case 'XY':
                this.setXYMinMax(point.yValue);
                this.yData.push(point.yValue);
                if (this instanceof Series && this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, <number>point.size);
                }
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.y);
            case 'HighLow':
                this.setHiloMinMax(<number>point.high, <number>point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) || isNullOrUndefined(point.high);
            case 'HighLowOpenClose':
                this.setHiloMinMax(<number>point.high, <number>point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) ||
                    isNullOrUndefined(point.open) || isNullOrUndefined(point.close)
                    || isNullOrUndefined(point.high);
            case 'BoxPlot':
                yValues = (point.y as number[]).filter((value: number) => {
                    return !isNullOrUndefined(value);
                }).sort((a: number, b: number) => {
                    return a - b;
                });
                point.y = yValues;
                this.yMin = Math.min(this.yMin, Math.min(...yValues));
                this.yMax = Math.max(this.yMax, Math.max(...yValues));
                return false;
        }
    }
    /**
     * To get Y min max for the provided point seriesType XY
     */
    private setXYMinMax(yValue: number): void {
        this.yMin = Math.min(this.yMin, isNullOrUndefined(yValue) ? this.yMin : yValue);
        this.yMax = Math.max(this.yMax, isNullOrUndefined(yValue) ? this.yMax : yValue);
    }
    /**
     * To get Y min max for the provided point seriesType XY
     */
    private setHiloMinMax(high: number, low: number): void {
        this.yMin = Math.min(this.yMin, Math.min(isNullOrUndefined(low) ? this.yMin : low, isNullOrUndefined(high) ? this.yMin : high));
        this.yMax = Math.max(this.yMax, Math.max(isNullOrUndefined(low) ? this.yMax : low, isNullOrUndefined(high) ? this.yMax : high));
    }
    /**
     * Finds the type of the series
     * @private
     */
    private getSeriesType(): void {
        let type: SeriesValueType;
        if (this instanceof Series) {
            let seriesType: string = this.chart.chartAreaType === 'PolarRadar' ? this.drawType : this.type;
            if (seriesType) {
                switch (seriesType) {
                    case 'RangeColumn':
                    case 'RangeArea':
                    case 'Hilo':
                        type = 'HighLow';
                        break;
                    case 'HiloOpenClose':
                    case 'Candle':
                        type = 'HighLowOpenClose';
                        break;
                    case 'BoxAndWhisker':
                        type = 'BoxPlot';
                        break;
                    default:
                        type = 'XY';
                }
            }
        }
        this.seriesType = type;
    }
    /** @private */
    protected pushCategoryData(point: Points, index: number): void {
        if (!this.xAxis.isIndexed) {
            if (this.xAxis.labels.indexOf(<string>point.x) < 0) {
                this.xAxis.labels.push(<string>point.x);
            }
            point.xValue = this.xAxis.labels.indexOf(<string>point.x);
        } else {
            this.xAxis.labels[index] ? this.xAxis.labels[index] += ', ' + point.x :
                this.xAxis.labels.push(<string>point.x);
            point.xValue = index;
        }
    }

    /**
     * To find average of given property
     */
    private getAverage(member: string, i: number, data: Object = this.currentViewData): number {
        let previous: number = data[i - 1] ? (data[i - 1][member] || 0) : 0;
        let next: number = data[i + 1] ? (data[i + 1][member] || 0) : 0;
        return (previous + next) / 2;
    }

    /**
     * To find the control points for spline.
     * @return {void}
     * @private
     */
    public refreshDataManager(chart: Chart): void {
        this.chart = chart;
        if (isNullOrUndefined(this.query) && !isNullOrUndefined(this.dataSource)) {
            this.dataManagerSuccess({ result: this.dataSource, count: (this.dataSource as Object[]).length }, chart, false);
            return;
        }
        let dataManager: Promise<Object> = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then((e: { result: Object, count: number }) => this.dataManagerSuccess(e, chart));
    }

    private dataManagerSuccess(e: { result: Object, count: number }, chart: Chart, isRemoteData: boolean = true): void {
        this.currentViewData = e.result;
        this.processJsonData();
        this.recordsCount = e.count;
        if (this instanceof Series) {
            let argsData: ISeriesRenderEventArgs = {
                name: seriesRender, series: this, data: this.currentViewData
            };
            this.chart.trigger(seriesRender, argsData);
        }
        this.refreshChart(isRemoteData);
    }

    private refreshChart(isRemoteData: boolean): void {
        let chart: Chart = this.chart;
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 1 : 0;
        }
        chart.refreshTechnicalIndicator(this);
        if (this instanceof Series && this.category !== 'TrendLine') {
            for (let trendline of this.trendlines) {
                (trendline as TrendLine).setDataSource(this, chart);
            }
        }
        //if (chart.visibleSeries.length === (chart.visibleSeriesCount - chart.indicators.length)) {
        if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
            chart.refreshBound();
        }
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 0 : 1;
        }
    }

    /** @private */
    public xMin: number;
    /** @private */
    public xMax: number;
    /** @private */
    public yMin: number;
    /** @private */
    public yMax: number;
    /** @private */
    public xAxis: Axis;
    /** @private */
    public yAxis: Axis;
    /** @private */
    public chart: Chart;
    /** @private */
    public currentViewData: Object = [];
    /** @private */
    public clipRect: Rect = new Rect(0, 0, 0, 0);
    /** @private */
    public xData: number[];
    /** @private */
    public yData: number[];
    /** @private */
    public index: number;
    /** @private */
    public dataModule: Data;
    /** @private */
    public points: Points[];
    /** @private */
    public seriesType: SeriesValueType = 'XY';
    /** @private */
    public sizeMax: number;
    /** @private */
    private recordsCount: number;
}

/**
 *  Configures the series in charts.
 */

export class Series extends SeriesBase {

    /**
     * The name of the series visible in legend.
     * @default ''.
     */

    @Property('')
    public name: string;

    /**
     * The DataSource field that contains the y value.
     * @default ''.
     */

    @Property('')
    public yName: string;

    /**
     * Type of series to be drawn in radar or polar series. They are
     *  'Line'
     *  'Column'
     *  'Area'
     * @default 'Line'
     */
    @Property('Line')
    public drawType: string;

    /**
     * Specifies whether to join start and end point of a line/area series used in polar/radar chart to form a closed path.
     * @default true
     */
    @Property(true)
    public isClosed: boolean;

    /**
     * This property is used in financial charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is less than the closing price.
     */

    @Property('#2ecd71')
    public bearFillColor: string;

    /**
     * This property is used in financial charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is higher than the closing price.
     */

    @Property('#e74c3d')
    public bullFillColor: string;

    /**
     * This property is applicable for candle series.
     * It enables/disables to visually compare the current values with the previous values in stock.
     * @default false
     */
    @Property(false)
    public enableSolidCandles: boolean;

    /**
     * The DataSource field that contains the size value of y
     * @default ''.
     */

    @Property('')
    public size: string;

    /**
     * This property allows grouping series in `stacked column / bar` charts.
     * Any string value can be provided to the stackingGroup property.
     * If any two or above series have the same value, those series will be grouped together.
     * @default ''.
     */

    @Property('')
    public stackingGroup: string;

    /**
     * Specifies the visibility of series.
     * @default true.
     */

    @Property(true)
    public visible: boolean;

    /**
     * Options to customizing the border of the series. This is applicable only for `Column` and `Bar` type series.
     */

    @Complex<BorderModel>({ color: 'transparent', width: 0 }, Border)
    public border: BorderModel;

    /**
     * The opacity of the series.
     * @default 1.
     */
    @Property(1)
    public opacity: number;

    /**
     * The type of the series are
     * * Line
     * * Column
     * * Area
     * * Bar
     * * StackingColumn
     * * StackingArea
     * * StackingBar
     * * StepLine
     * * StepArea
     * * Scatter
     * * Spline
     * * StackingColumn100
     * * StackingBar100
     * * StackingArea100
     * * RangeColumn
     * * Hilo
     * * HiloOpenClose
     * * Waterfall
     * * RangeArea 
     * * Bubble
     * * Candle 
     * * Polar 
     * * Radar 
     * * BoxAndWhisker
     * @default 'Line'.
     */

    @Property('Line')
    public type: ChartSeriesType;

    /**
     * Options for displaying and customizing error bar for individual point in a series.
     */
    @Complex<ErrorBarSettingsModel>(null, ErrorBarSettings)
    public errorBar: ErrorBarSettingsModel;

    /**
     * Options for displaying and customizing markers for individual points in a series.
     */
    @Complex<MarkerSettingsModel>(null, MarkerSettings)
    public marker: MarkerSettingsModel;

    /**
     * Defines the collection of trendlines that are used to predict the trend
     */
    @Collection<TrendLineModel>([], TrendLine)
    public trendlines: TrendLineModel[];

    /**
     * If set true, the Tooltip for series will be visible.
     * @default true.
     */
    @Property(true)
    public enableTooltip: boolean;

    /**
     * The shape of the legend. Each series has its own legend shape. They are,
     * * Circle
     * * Rectangle
     * * Triangle
     * * Diamond
     * * Cross
     * * HorizontalLine
     * * VerticalLine
     * * Pentagon
     * * InvertedTriangle
     * * SeriesType
     * @default 'SeriesType'.
     */

    @Property('SeriesType')
    public legendShape: LegendShape;

    /**
     * Custom style for the selected series or points.
     * @default null
     */
    @Property(null)
    public selectionStyle: string;

    /**
     * Minimum radius
     */
    @Property(1)
    public minRadius: number;

    /**
     * Maximum radius
     */
    @Property(3)
    public maxRadius: number;

    /**
     * Defines type of spline to be rendered.
     */
    @Property('Natural')
    public splineType: SplineType;
    /**
     * It defines tension of cardinal spline types
     */
    @Property(0.5)
    public cardinalSplineTension: number;

    /**
     * options to customize the empty points in series
     */
    @Complex<EmptyPointSettingsModel>(null, EmptyPointSettings)
    public emptyPointSettings: EmptyPointSettingsModel;

    /**
     * If set true, the mean value for box and whisker will be visible.
     * @default true.
     */
    @Property(true)
    public showMean: boolean;

    /**
     * The mode of the box and whisker char series. They are,
     * Exclusive
     * Inclusive
     * Normal
     */
    @Property('Normal')
    public boxPlotMode: BoxPlotMode;

    /**
     * To render the column series points with particular column width.
     */
    @Property(0.7)
    public columnWidth: number;

    /**
     * To render the column series points with particular column spacing. It takes value from 0 - 1.
     */
    @Property(0)
    public columnSpacing: number;


    /**
     * Defines the visual representation of the negative changes in waterfall charts.
     */
    @Property('#C64E4A')
    public negativeFillColor: string;

    /**
     * Defines the visual representation of the summaries in waterfall charts.
     */
    @Property('#4E81BC')
    public summaryFillColor: string;

    /**
     * Defines the collection of indexes of the intermediate summary columns in waterfall charts.
     */
    @Property()
    public intermediateSumIndexes: number[];

    /**
     * Defines the collection of indexes of the overall summary columns in waterfall charts.
     */
    @Property()
    public sumIndexes: number[];

    /**
     * Defines the appearance of line connecting adjacent points in waterfall charts.
     */

    @Complex<ConnectorModel>({ color: 'black', width: 2 }, Connector)
    public connector: ConnectorModel;


    /**
     * To render the column series points with particular rounded corner.
     */
    @Complex<CornerRadiusModel>(null, CornerRadius)
    public cornerRadius: CornerRadiusModel;

    public visibleSeriesCount: number = 0;
    /** @private */
    public position: number;
    /** @private */
    public rectCount: number;
    /** @private */
    public seriesElement: Element;
    /** @private */
    public errorBarElement: Element;
    /** @private */
    public symbolElement: Element;
    /** @private */
    public shapeElement: Element;
    /** @private */
    public textElement: Element;
    /** @private */
    public pathElement: Element;
    /** @private */
    public sourceIndex: number;
    /** @private */
    public category: SeriesCategories = 'Series';
    /** @private */
    public isRectSeries: boolean = false;
    /** @private */
    public clipRectElement: Element;
    /** @private */
    public stackedValues: StackValues;
    /** @private */
    public interior: string;
    /** @private */
    public drawPoints: ControlPoints[] = [];
    /** @private */
    public delayedAnimation: boolean = false;
    // tslint:disable-next-line:no-any
    constructor(parent: any, propName: string, defaultValue: object, isArray?: boolean) {
        super(parent, propName, defaultValue, isArray);
    }

    /**
     * Refresh the axis label.
     * @return {boolean}
     * @private
     */
    public refreshAxisLabel(): void {
        if (this.xAxis.valueType !== 'Category') {
            return null;
        }
        this.xAxis.labels = [];
        for (let item of this.xAxis.series) {
            if (item.visible) {
                item.xMin = Infinity; item.xMax = -Infinity;
                for (let point of item.points) {
                    item.pushCategoryData(point, point.index);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
    }
    /**
     * To get the series collection.
     * @return {void}
     * @private
     */

    public findSeriesCollection(column: Column, row: Row, isStack: boolean): Series[] {
        let seriesCollection: Series[] = [];
        for (let rowAxis of row.axes) {
            for (let rowSeries of rowAxis.series) {
                for (let axis of column.axes) {
                    for (let series of axis.series) {
                        if (series === rowSeries && series.visible && this.rectSeriesInChart(series, isStack)) {
                            seriesCollection.push(series);
                        }
                    }
                }
            }
        }
        return seriesCollection;
    }
    /**
     * To get the column type series.
     * @return {void}
     * @private
     */
    private rectSeriesInChart(series: Series, isStack: boolean): Boolean {
        let type: String = (series.type).toLowerCase();
        return (
            type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 ||
            type.indexOf('hiloopenclose') !== -1 || type.indexOf('candle') !== -1 ||
            type.indexOf('hilo') !== -1 || series.drawType.indexOf('Column') !== -1 ||
            type.indexOf('waterfall') !== -1 || type.indexOf('boxandwhisker') !== -1 || isStack
        );
    }
    /**
     * To calculate the stacked values.
     * @return {void}
     * @private
     */
    public calculateStackedValue(isStacking100: boolean): void {
        let axisSeries: Series[];
        for (let columnItem of this.chart.columns) {
            for (let item of this.chart.rows) {
                this.calculateStackingValues(this.findSeriesCollection(<Column>columnItem, <Row>item, true), isStacking100);
            }
        }
    }



    private calculateStackingValues(seriesCollection: Series[], isStacking100: boolean): void {
        let startValues: number[];
        let endValues: number[];
        let yValues: number[] = [];
        let lastPositive: number[] = [];
        let lastNegative: number[] = [];
        let stackingGroup: string;
        let lastValue: number;
        let value: number;
        let frequencies: number[] = [];
        if (isStacking100) {
            frequencies = <number[]>this.findFrequencies(seriesCollection);
        }
        for (let series of seriesCollection) {
            if (series.type.indexOf('Stacking') !== -1 || (series.drawType.indexOf('Stacking') !== -1 &&
                (series.chart.chartAreaType === 'PolarRadar'))) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!lastPositive[stackingGroup]) {
                    lastPositive[stackingGroup] = [];
                    lastNegative[stackingGroup] = [];
                }
                yValues = series.yData;
                startValues = [];
                endValues = [];
                for (let j: number = 0, pointsLength: number = series.points.length; j < pointsLength; j++) {
                    lastValue = 0;
                    value = yValues[j];
                    if (lastPositive[stackingGroup][series.points[j].xValue] === undefined) {
                        lastPositive[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (lastNegative[stackingGroup][series.points[j].xValue] === undefined) {
                        lastNegative[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (isStacking100) {
                        value = value / frequencies[stackingGroup][series.points[j].xValue] * 100;
                        value = !isNaN(value) ? value : 0;
                        series.points[j].percent = value.toFixed(2);
                    }
                    if (value >= 0) {
                        lastValue = lastPositive[stackingGroup][series.points[j].xValue];
                        lastPositive[stackingGroup][series.points[j].xValue] += value;
                    } else {
                        lastValue = lastNegative[stackingGroup][series.points[j].xValue];
                        lastNegative[stackingGroup][series.points[j].xValue] += value;
                    }
                    startValues.push(lastValue);
                    endValues.push(value + lastValue);
                    if (isStacking100 && (endValues[j] > 100)) {
                        endValues[j] = 100;
                    }
                }
                series.stackedValues = new StackValues(startValues, endValues);
                series.yMin = Math.min.apply(0, startValues);
                series.yMax = Math.max.apply(0, endValues);
                if (series.yMin > Math.min.apply(0, endValues)) {
                    series.yMin = (isStacking100) ? -100 : Math.min.apply(0, endValues);
                }
                if (series.yMax < Math.max.apply(0, startValues)) {
                    series.yMax = 0;
                }
            }
        }
    }
    private findFrequencies(seriesCollection: Series[]): number[] {
        let frequencies: number[] = [];
        let stackingGroup: string;
        for (let series of seriesCollection) {
            series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!frequencies[stackingGroup]) {
                    frequencies[stackingGroup] = [];
                }
                for (let j: number = 0, pointsLength: number = series.points.length; j < pointsLength; j++) {
                    if (frequencies[stackingGroup][series.points[j].xValue] === undefined) {
                        frequencies[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (series.yData[j] > 0) {
                        frequencies[stackingGroup][series.points[j].xValue] += series.yData[j];
                    } else {
                        frequencies[stackingGroup][series.points[j].xValue] -= series.yData[j];
                    }
                }
            }
        }
        return frequencies;
    }
    /**
     * To find the log values.
     * @return {void}
     * @private
     */
    public logWithIn(value: number, axis: Axis): number {
        if (axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
        } else {
            value = value;
        }
        return value;
    }

    /* private dataManagerFailure(e: { result: Object[] }): void {
         this.currentViewData = [];
         this.refreshChart();
     }*/

    /** @private */
    public renderSeries(chart: Chart, index: number): void {
        let seriesType: string = firstToLowerCase(this.type);
        if (seriesType.indexOf('100') !== -1) {
            seriesType = seriesType.replace('100', '');
        }
        if (chart[seriesType + 'SeriesModule']) {
            if (this.category !== 'Indicator' && this.category !== 'TrendLine') {
                this.createSeriesElements(chart);
            }
            chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
            if (this.category !== 'Indicator') {
                if (this.errorBar.visible) {
                    this.chart.errorBarModule.render(this);
                }
                if (this.marker.dataLabel.visible) {
                    chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                }
                this.appendSeriesElement(chart.seriesElements, chart);
            }
            this.performAnimation(chart, seriesType, this.errorBar, this.marker, this.marker.dataLabel);
        }
    }

    /**
     * To create seris element.
     * @return {void}
     * @private
     */
    public createSeriesElements(chart: Chart): void {
        if (this.category !== 'Indicator') {
            let elementId: string = chart.element.id;
            let xAxisRect: Rect = this.xAxis.rect;
            // 8 for extend border value 5 for extend size value
            let explodeValue: number = this.marker.border.width + 8 + 5;
            let yAxisRect: Rect = this.yAxis.rect;
            let marker: MarkerSettingsModel = this.marker;
            let render: SvgRenderer = chart.renderer;
            let index: number = this.index;
            let markerHeight: number = (this.type === 'Scatter') ? (this.marker.height + explodeValue) / 2 : 0;
            let markerWidth: number = (this.type === 'Scatter') ? (this.marker.width + explodeValue) / 2 : 0;
            if (chart.chartAreaType === 'PolarRadar') {
                this.clipRectElement = render.drawCircularClipPath(new CircleOption(
                    elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1,
                    this.clipRect.width / 2 + this.clipRect.x, this.clipRect.height / 2 + this.clipRect.y, chart.radius
                ));
            } else {
                this.clipRectElement = render.drawClipPath(new RectOption(
                    elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1,
                    {
                        x: -markerWidth, y: -markerHeight,
                        width: this.clipRect.width + markerWidth * 2,
                        height: this.clipRect.height + markerHeight * 2
                    }));
            }
            let transform: string;
            transform = chart.chartAreaType === 'Cartesian' ? 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')' : '';
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.seriesElement.appendChild(this.clipRectElement);
        }
    }
    /**
     * To append the series.
     * @return {void}
     * @private
     */
    public appendSeriesElement(element: Element, chart: Chart): void {
        let marker: MarkerSettingsModel = this.marker;
        let dataLabel: DataLabelSettingsModel = marker.dataLabel;
        if (this.category !== 'TrendLine') {
            chart.seriesElements.appendChild(this.seriesElement);
            let errorBar: ErrorBarSettingsModel = this.errorBar;
            if (errorBar.visible) {
                if (chart.chartAreaType === 'PolarRadar') {
                    chart.seriesElements.appendChild(this.seriesElement);
                } else {
                    chart.seriesElements.appendChild(this.errorBarElement);
                }
            }
            if (this.type === 'Scatter' || this.type === 'Bubble') {
                chart.seriesElements.appendChild(this.seriesElement);
            }
        }
        if (
            marker.visible && ((chart.chartAreaType === 'Cartesian' && (!this.isRectSeries || this.type === 'BoxAndWhisker'))
            || ((this.drawType !== 'Scatter' && !this.isRectSeries) && chart.chartAreaType === 'PolarRadar')) &&
            this.type !== 'Scatter' && this.type !== 'Bubble'
        ) {
            chart.seriesElements.appendChild(this.symbolElement);
        }
        if (dataLabel.visible) {
            chart.dataLabelElements.appendChild(this.shapeElement);
            chart.dataLabelElements.appendChild(this.textElement);
        }
    }
    /**
     * To perform animation for chart series.
     * @return {void}
     * @private
     */
    public performAnimation(chart: Chart, type: string, errorBar: ErrorBarSettingsModel,
                            marker: MarkerSettingsModel, dataLabel: DataLabelSettingsModel): void {
        if (this.animation.enable && chart.animateSeries) {
            chart[type + 'SeriesModule'].doAnimation(this);
            if (errorBar.visible) {
                chart.errorBarModule.doErrorBarAnimation(this);
            }
            if (marker.visible) {
                chart.markerModule.doMarkerAnimation(this);
            }
            if (dataLabel.visible) {
                chart.dataLabelModule.doDataLabelAnimation(this);
            }
        }
    }

    /**
     * To set border color for empty point
     * @private
     */
    public setPointColor(point: Points, color: string): string {
        return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
    }
    /**
     * To set border color for empty point
     * @private
     */
    public setBorderColor(point: Points, border: BorderModel): BorderModel {
        border.width = point.isEmpty ? (this.emptyPointSettings.border.width || border.width) : border.width;
        border.color = point.isEmpty ? (this.emptyPointSettings.border.color || border.color) : border.color;
        return border;
    }
}



