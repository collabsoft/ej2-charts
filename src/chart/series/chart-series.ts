import { Property, ChildProperty, Complex, SvgRenderer, DateFormatOptions } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { AnimationModel, DataLabelSettingsModel, MarkerSettingsModel } from '../series/chart-series-model';
import { firstToLowerCase, ChartLocation, Rect, logBase, StackValues, RectOption, ControlPoints } from '../utils/helper';
import { ChartSeriesType, ChartShape, LegendShape, LabelAlignment, LabelPosition, SeriesValueType } from '../utils/enum';
import { BorderModel, FontModel, MarginModel } from '../model/base-model';
import { Border, Font, Margin } from '../model/base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Chart } from '../chart';
import { Axis, Column, Row } from '../axis/axis';
import { Data } from '../model/data';
import { ISeriesRenderEventArgs } from '../model/interface';
import { seriesRender } from '../model/constants';

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
    public symbolLocation: ChartLocation = null;
    public xValue: number;
    public yValue: number;
    public index: number;
    public region: Rect = null;
    public percent: string;
    public high: Object;
    public low: Object;
    public size: Object;

}


/**
 * Configures the animation behavior for series.
 */

export class Animation extends ChildProperty<Animation> {

    /**
     * If set true, series gets animated on initial loading.
     * @default true
     */

    @Property(true)
    public enable: boolean;

    /**
     * The animation duration in milliseconds.
     * @default 1000
     */

    @Property(1000)
    public duration: number;

    /**
     * The option to delay the animation of series.
     * @default 0
     */

    @Property(0)
    public delay: number;
}

/**
 * Configures the data label in series. 
 */

export class DataLabelSettings extends ChildProperty<DataLabelSettings> {

    /**
     * If set true, data label for series gets render.
     * @default false
     */

    @Property(false)
    public visible: boolean;

    /**
     * The DataSource field which contains the data label value.
     * @default null
     */

    @Property(null)
    public name: string;

    /**
     * The background color of the data label, which accepts value in hex, rgba as a valid CSS color string.
     * @default 'transparent'
     */

    @Property('transparent')
    public fill: string;

    /**
     * The opacity for the background.
     * @default 1
     */

    @Property(1)
    public opacity: number;

    /**
     * Specifies the position of data label. They are.
     * * outer - Position the label outside the point.
     * * top - Position the label on top of the point.
     * * bottom - Position the label on bottom of the point.
     * * middle - Position the label to middle of the point.
     * * auto - Position the label based on series.
     * @Default 'Auto'
     */

    @Property('Auto')
    public position: LabelPosition;

    /**
     * The roundedCornerX for the data label. It requires `border` values not to be null.
     * @Default 5
     */
    @Property(5)
    public rx: number;

    /**
     * The roundedCornerY for the data label. It requires `border` values not to be null.
     * @Default 5
     */
    @Property(5)
    public ry: number;

    /**
     * Specifies the alignment for data Label. They are
     * * near - Align the label to the left of point.
     * * center - Align the label to the center of point.
     * * far - Align the label to the right of point.
     * @default 'Center'
     */
    @Property('Center')
    public alignment: LabelAlignment;

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

}


/**
 *  Configures the marker in series.
 */

export class MarkerSettings extends ChildProperty<MarkerSettings> {

    /**
     * If set true, marker for series gets rendered. This is applicable for only for line and area type series.
     * @default false
     */

    @Property(false)
    public visible: boolean;

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

    @Property('Circle')
    public shape: ChartShape;


    /**
     * The URL for the Image that is to be displayed as marker.  It requires marker `shape` value to be `Image`.
     * @default ''
     */

    @Property('')
    public imageUrl: string;

    /**
     * The height of the marker in pixels.
     * @default 5
     */

    @Property(5)
    public height: number;

    /**
     * The width of the marker in pixels.
     * @default 5
     */

    @Property(5)
    public width: number;

    /**
     * Options for customizing the border of the marker shape.
     */

    @Complex<BorderModel>({ width: 1, color: null }, Border)
    public border: BorderModel;

    /**
     *  The fill color of the marker, which accepts value in hex, rgba as a valid CSS color string. By default it will take series color.
     * @default ''
     */

    @Property('')
    public fill: string;

    /**
     * The opacity of the marker.
     * @default 1
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
 *  Configures the series in chart.
 */

export class Series extends ChildProperty<Series> {

    /**
     * The name of the series which is visible in legend.
     * @default ''
     */

    @Property('')
    public name: string;

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

    @Property('')
    public dataSource: Object | DataManager;

    /**
     * Specifies Query to select data from dataSource. This property is applicable only when the dataSource is `ej.DataManager`.
     * @default null
     */
    @Property()
    public query: Query;


    /**
     * The DataSource field which contains the x value.
     * @default ''
     */

    @Property('')
    public xName: string;

    /**
     * The DataSource field which contains the y value.
     * @default ''
     */

    @Property('')
    public yName: string;

    /**
     * The DataSource field which contains the high value of y
     * @default ''
     */

    @Property('')
    public high: string;
    /**
     * The DataSource field which contains the low value of y
     * @default ''
     */

    @Property('')
    public low: string;

    /**
     * The DataSource field which contains the size value for bubble series
     * @default ''
     */

    @Property('')
    public size: string;


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

    @Property(null)
    public xAxisName: string;

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

    @Property(null)
    public yAxisName: string;

    /**
     * The fill color for the series, which accepts value in hex, rgba as a valid CSS color string.
     * @default null
     */

    @Property(null)
    public fill: string;

    /**
     * The stroke width for the series, which is applicable only for `Line` type series.
     * @default 1
     */

    @Property(1)
    public width: number;

    /**
     * This property allows grouping series in a `stacked column / bar` charts.
     * Any string value can be provided to the stackingGroup property.
     * If any two or above series has the same value, those series will be grouped together.
     * @default ''
     */

    @Property('')
    public stackingGroup: string;

    /**
     * Specifies the series visibility.
     * @default true
     */

    @Property(true)
    public visible: boolean;

    /**
     * Options for customizing the border of the series. Applicable only for `Column`, `Bar` type series.
     */

    @Complex<BorderModel>({ color: 'transparent', width: 0 }, Border)
    public border: BorderModel;


    /**
     * The opacity of the series.
     * @default 1
     */
    @Property(1)
    public opacity: number;

    /**
     * The dashArray of the series.
     * @default '0'
     */

    @Property('0')
    public dashArray: string;

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

    @Property('Line')
    public type: ChartSeriesType;

    /**
     * Options for displaying and customizing marker for individual point in a series.
     */
    @Complex<MarkerSettingsModel>(null, MarkerSettings)
    public marker: MarkerSettingsModel;

    /**
     * Options for customizing the animation for series.
     */

    @Complex<AnimationModel>(null, Animation)
    public animation: AnimationModel;

    /**
     * If set true, the tooltip for series will be visible.
     * @default true
     */
    @Property(true)
    public enableTooltip: boolean;

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

    @Property('SeriesType')
    public legendShape: LegendShape;

    /**
     * Custom style for the selected series or points.
     * @default null
     */
    @Property(null)
    public selectionStyle: string;

    /**
     * minimum radius
     */
    @Property(1)
    public minRadius: number;

    /**
     * maximum radius
     */
    @Property(3)
    public maxRadius: number;



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
    private currentViewData: Object = [];
    /** @private */
    private recordsCount: number;
    /** @private */
    public dataModule: Data;
    /** @private */
    public visibleSeriesCount: number = 0;
    /** @private */
    public clipRect: Rect = new Rect(0, 0, 0, 0);
    /** @private */
    public position: number;
    /** @private */
    public rectCount: number;
    /** @private */
    public xData: number[];
    /** @private */
    public yData: number[];
    /** @private */
    public index: number;
    /** @private */
    public seriesElement: Element;
    /** @private */
    public symbolElement: Element;
    /** @private */
    public shapeElement: Element;
    /** @private */
    public textElement: Element;
    /** @private */
    public pathElement: Element;
    /** @private */
    public isRectSeries: boolean = false;
    /** @private */
    public clipRectElement: Element;
    /** @private */
    public points: Points[];
    /** @private */
    public stackedValues: StackValues;
    /** @private */
    public interior: string;
    /** @private */
    public drawPoints: ControlPoints[] = [];
    /** @private */
    public seriesType : SeriesValueType = 'XY';
     /** @private */
    public sizeMax: number;


    /**
     * Process data for the series.
     * @hidden
     */
    public processJsonData(): void {
        let i: number = 0; let len: number = Object.keys(this.currentViewData).length;
        let point: Points = new Points();
        let textMappingName: string = this.marker.dataLabel.name;
        this.points = [];
        this.xMin = Infinity; this.xMax = -Infinity;
        this.yMin = Infinity; this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        this.seriesType = (this.type === 'RangeColumn') ? 'HighLow' : 'XY';
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                this.pushCategoryData(point);
                this.pushData(point, i);
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
                i++;
            }
        } else {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                point.xValue = <number>point.x;
                this.pushData(point, i);
                i++;
            }
        }
        if (this.type === 'Spline') {
            this.chart.splineSeriesModule.findSplinePoint(this);
        }
    }

    private pushCategoryData(point: Points): void {
        if (this.xAxis.labels.indexOf(<string>point.x) < 0) {
            this.xAxis.labels.push(<string>point.x);
        }
        point.xValue = this.xAxis.labels.indexOf(<string>point.x);
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
                    item.pushCategoryData(point);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
    }
    private dataPoint(i: number, textMappingName: string): Points {
        let point: Points;
        this.points[i] = new Points();
        point = <Points>this.points[i];
        point.x = this.currentViewData[i][this.xName];
        point.y = this.currentViewData[i][this.yName];
        point.high = this.currentViewData[i][this.high];
        point.low = this.currentViewData[i][this.low];
        point.size = this.currentViewData[i][this.size];
        point.text = this.currentViewData[i][textMappingName];
        return point;
    }
    private findVisibility(point: Points) : boolean {
        switch (this.seriesType) {
            case 'XY':
                this.yMin = Math.min(this.yMin, point.yValue);
                this.yMax = Math.max(this.yMax, point.yValue);
                this.yData.push(point.yValue);
                if (this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, <number>point.size);
                }
                return  isNullOrUndefined(point.x) || isNullOrUndefined(point.y);
            case 'HighLow':
                this.yMin = Math.min(this.yMin, Math.min(<number>(point.low), <number>(point.high)));
                this.yMax = Math.max(this.yMax, Math.max(<number>(point.low), <number>(point.high)));
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) || isNullOrUndefined(point.high);
        }
    }

    private pushData(point: Points, i: number): void {
        point.index = i;
        point.yValue = <number>point.y;
        point.visible = !this.findVisibility(point);
        // To find the min, max for the axis range.
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    }
    /**
     * To get the series collection.
     * @return {void}
     * @private
     */

    public findSeriesCollection(column : Column, row : Row, isStack : boolean) : Series[] {
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
    private rectSeriesInChart(series: Series, isStack : boolean): Boolean {
        let type: String = (series.type).toLowerCase();
        return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 || isStack);
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
            if (series.type.indexOf('Stacking') !== -1) {
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
                       series.yMax =  0;
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
    /**
     * To find the control points for spline. 
     * @return {void}
     * @private
     */
    public refreshDataManager(chart: Chart): void {
        this.chart = chart;
        let dataManager: Promise<Object> = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then((e: { result: Object, count: number }) => this.dataManagerSuccess(e));
    }

    private dataManagerSuccess(e: { result: Object, count: number }): void {
        this.currentViewData = e.result;
        this.recordsCount = e.count;
        let argsData: ISeriesRenderEventArgs = {
            name: seriesRender, series: this, data: this.currentViewData,
        };
        this.chart.trigger(seriesRender, argsData);
        this.processJsonData();
        this.refreshChart();
    }

    /* private dataManagerFailure(e: { result: Object[] }): void {
         this.currentViewData = [];
         this.refreshChart();
     }*/

    private refreshChart(): void {
        let chart: Chart = this.chart;
        chart.visibleSeriesCount++;
        if (chart.visibleSeries.length === chart.visibleSeriesCount) {
            chart.refreshBound();
        }
    }
    /** @private */
    public renderSeries(chart: Chart, index: number): void {
        let seriesType: string = firstToLowerCase(this.type);
        if (seriesType.indexOf('100') !== -1) {
            seriesType = seriesType.replace('100', '');
        }
        if (chart[seriesType + 'SeriesModule']) {
            this.createSeriesElements(chart);
            chart[seriesType + 'SeriesModule'].render(this);
            if (this.marker.dataLabel.visible) {
                chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
            }
            this.appendSeriesElement(chart.seriesElements, chart);
            this.performAnimation(chart, seriesType, this.marker, this.marker.dataLabel);
        }
    }

    /**
     * To create seris element. 
     * @return {void}
     * @private
     */
    public createSeriesElements(chart: Chart): void {
        let elementId: string = chart.element.id;
        let xAxisRect: Rect = this.xAxis.rect;
        let explodeValue: number = 5;
        let yAxisRect: Rect = this.yAxis.rect;
        let marker: MarkerSettingsModel = this.marker;
        let render: SvgRenderer = chart.renderer;
        let index: number = this.index;
        let markerHeight: number = (this.type === 'Scatter') ? (this.marker.height + explodeValue) / 2 : 0;
        let markerWidth: number = (this.type === 'Scatter') ? (this.marker.width + explodeValue) / 2 : 0;
        this.clipRectElement = render.drawClipPath(new RectOption(
            elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1,
            {
                x: -markerWidth, y: -markerHeight, width: this.clipRect.width + markerWidth * 2,
                height: this.clipRect.height + markerHeight * 2
            }));
        let transform: string;
        transform = 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')';
        this.seriesElement = render.createGroup({
            'id': elementId + 'SeriesGroup' + index,
            'transform': transform,
            'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
        });
        this.seriesElement.appendChild(this.clipRectElement);
        if (marker.visible) {
            markerHeight = (this.marker.height + explodeValue) / 2; markerWidth = (this.marker.width + explodeValue) / 2;
            let markerClipRect: Element = render.drawClipPath(
                new RectOption(elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: this.clipRect.width + markerWidth * 2, height: this.clipRect.height + markerHeight * 2
                }));
            this.symbolElement = render.createGroup({
                'id': elementId + 'SymbolGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartMarkerClipRect_' + index + ')'
            });
            this.symbolElement.appendChild(markerClipRect);
        }
        if (marker.dataLabel.visible) {
            this.shapeElement = render.createGroup({
                'id': elementId + 'ShapeGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.textElement = render.createGroup({
                'id': elementId + 'TextGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
        }
    }
    /**
     * To append the series. 
     * @return {void}
     * @private
     */
    public appendSeriesElement(element: Element, chart: Chart): void {
        chart.seriesElements.appendChild(this.seriesElement);
        let marker: MarkerSettingsModel = this.marker;
        let dataLabel: DataLabelSettingsModel = marker.dataLabel;
        if (marker.visible) {
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
    public performAnimation(chart: Chart, type: string, marker: MarkerSettingsModel, dataLabel: DataLabelSettingsModel): void {
        if (this.animation.enable && chart.animateSeries) {
            chart[type + 'SeriesModule'].doAnimation(this);
            if (marker.visible) {
                chart.markerModule.doMarkerAnimation(this);
            }
            if (dataLabel.visible) {
                chart.dataLabelModule.doDataLabelAnimation(this);
            }
        }
    }
}


