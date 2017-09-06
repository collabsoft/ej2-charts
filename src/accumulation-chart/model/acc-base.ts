/**
 * AccumulationChart base file
 */
import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined} from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Border, Font, Animation, Index } from '../../common/model/base';
import { Rect, ChartLocation, stringToNumber, PathOption} from '../../common/utils/helper';
import { AccumulationType, AccumulationLabelPosition, ConnectorType } from '../model/enum';
import { IAccSeriesRenderEventArgs, IAccPointRenderEventArgs } from '../model/pie-interface';
import { LegendShape } from '../../chart/utils/enum';
import { ConnectorModel, AccumulationDataLabelSettingsModel } from '../model/acc-base-model';
import { Data} from '../../common/model/data';
import { seriesRender, pointRender} from '../../common/model/constants';
import { Theme, getSeriesColor } from '../../common/model/theme';
import { FontModel, BorderModel, AnimationModel } from '../../common/model/base-model';
import { AccumulationChart} from '../accumulation';

export class Connector extends ChildProperty<Connector> {

    /**
     * specifies the type of the connector line. They are
     * * Smooth
     * * Line
     */
    @Property('Line')
    public type: ConnectorType;

    /**
     * Color of the connector line.
     */
    @Property(null)
    public color: string;

    /**
     * Width of the connector line in pixels.
     */
    @Property(1)
    public width: number;

    /**
     * Length of the connector line in pixels.
     */
    @Property('4%')
    public length: string;

}
export class AccumulationDataLabelSettings extends ChildProperty<AccumulationDataLabelSettings> {

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
     * Specifies the position of data label. They are.
     * * outside - Places label outside the point.
     * * inside - Places label inside the point.
     * @default 'Inside'
     */

    @Property('Inside')
    public position: AccumulationLabelPosition;

    /**
     * The roundedCornerX for the data label. It requires `border` values not to be null.
     * @default 5
     */
    @Property(5)
    public rx: number;

    /**
     * The roundedCornerY for the data label. It requires `border` values not to be null.
     * @default 5
     */
    @Property(5)
    public ry: number;

    /**
     * Option for customizing the border lines.
     */

    @Complex<BorderModel>({ width: null, color: null }, Border)
    public border: BorderModel;

    /**
     * Option for customizing the data label text.
     */

    @Complex<FontModel>({ size: '11px', color: null }, Font)
    public font: FontModel;

    /**
     * Options for customize the connector line in series. 
     */
    @Complex<ConnectorModel>({}, Connector)
    public connectorStyle: ConnectorModel;

}

/**
 * Configures the tooltip in accumulation chart.
 */

export class AccumulationTooltipSettings extends ChildProperty<AccumulationTooltipSettings> {

    /**
     * Enable or disable tooltip for the accumulation chart.
     * @default false
     */

    @Property(false)
    public enable: boolean;

    /**
     * If set true, tooltip will animate, while moving from one point to another.
     * @default true
     */
    @Property(true)
    public enableAnimation: boolean;

    /**
     * Format of the tooltip content.
     * @default null
     */

    @Property(null)
    public format: string;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    @Property('#FFFFFF')
    public fill: string;

    /**
     * Options to customize the border for tooltip.
     */
    @Complex<BorderModel>({color : null}, Border)
    public border: BorderModel;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.
     * @default null
     */

    @Property(null)
    public template: string;

    /**
     * Options to customize the tooltip text.
     */

    @Complex<FontModel>(Theme.tooltipLabelFont, Font)
    public textStyle: FontModel;
}

/**
 * Points model for the series.
 * @private 
 */

export class AccPoints {

    public x: Object;
    public y: number;
    public visible: boolean = true;
    public text: string;
    /** @private */
    public label: string;
    public color: string;
    public symbolLocation: ChartLocation = null;
    public index: number;
    /** @private */
    public midAngle: number;
    /** @private */
    public endAngle: number;
    /** @private */
    public labelAngle: number;
    /** @private */
    public labelRegion: Rect = null;
    /** @private */
    public labelVisible: boolean = true;
    /** @private */
    public labelPosition: AccumulationLabelPosition;
}

/**
 *  Configures the series in accumulation chart.
 */

export class AccumulationSeries extends ChildProperty<AccumulationSeries> {

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
     * let pie: AccumulationChart = new AccumulationChart({
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
     * Specifies the series name
     * @default ''
     */

    @Property('')
    public name: string;

    /**
     * The DataSource field which contains the y value.
     * @default ''
     */

    @Property('')
    public yName: string;

    /**
     * Specifies the series visibility.
     * @default true
     */

    @Property(true)
    public visible: boolean;

    /**
     * Options for customizing the border of the series.
     */

    @Complex<BorderModel>({ color: null, width: 0 }, Border)
    public border: BorderModel;

    /**
     * Options for customizing the animation for series.
     */

    @Complex<AnimationModel>(null, Animation)
    public animation: AnimationModel;

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
     * AccumulationSeries y values less than groupTo are combined into single slice named others
     * @default null
     */
    @Property(null)
    public groupTo: string;

    /**
     * The data label for the series.
     */
    @Complex<AccumulationDataLabelSettingsModel>({}, AccumulationDataLabelSettings)
    public dataLabel: AccumulationDataLabelSettingsModel;

    /**
     * Palette for series points.
     * @default []
     */
    @Property([])
    public palettes: string[];

    /**
     * Start angle for a series.
     * @default 0
     */
    @Property(0)
    public startAngle: number;

    /**
     * End angle for a series.
     * @default 360
     */
    @Property(360)
    public endAngle: number;

    /**
     * Radius of the pie series and its values in percentage.
     * @default '80%'
     */
    @Property('80%')
    public radius: string;

    /**
     * When the innerRadius value is greater than 0 percentage, a donut will appear in pie series. It takes values only in percentage.
     * @default '0'
     */
    @Property('0')
    public innerRadius: string;

    /**
     * Specify the type of the series in accumulation chart. 
     * @default 'Pie'
     */
    @Property('Pie')
    public type: AccumulationType;

    /**
     * To enable or disable tooltip for a series.
     */
    @Property(true)
    public enableTooltip: boolean;

    /**
     * If set true, series points will be exploded on mouse click or touch.
     * @default false
     */
    @Property(false)
    public explode: boolean;

    /**
     * Distance of the point from the center, which takes values in both pixels and percentage. 
     * @default '30%'
     */
    @Property('30%')
    public explodeOffset: string;

    /**
     * If set true, all the points in the series will get exploded on load.
     * @default false
     */
    @Property(false)
    public explodeAll: boolean;

    /**
     * Index of the point, to be exploded on load. 
     * @default null
     */
    @Property(null)
    public explodeIndex: number;

    /** @private */
    public points: AccPoints[] = [];
    /** @private */
    public dataModule: Data;
    /** @private */
    public sumOfPoints: number = 0;
    /** @private */
    public index: number;
    private sumOfClub: number;
    /** @private */
    public resultData: Object;
    /** @private */
    public lastGroupTo: string;
    /**
     * To find the max bounds of the data label to place smart legend
     *  @private
     */
    public labelBound: Rect;
    /**
     * To find the max bounds of the accumulation segment to place smart legend
     *  @private
     */
    public accumulationBound: Rect;
    /** @private To refresh the Datamanager for series */
    public refreshDataManager(accumulation: AccumulationChart): void {
        let dataManager: Promise<Object> = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then((e: { result: Object, count: number }) => this.dataManagerSuccess(e, accumulation));
    }
    /**
     * To get points on dataManager is success
     * @private
     */
    public dataManagerSuccess(e: { result: Object, count: number }, accumulation: AccumulationChart): void {
        let argsData: IAccSeriesRenderEventArgs = {
            name: seriesRender, series: this, data: e.result,
        };
        accumulation.trigger(seriesRender, argsData);
        this.resultData = e.result;
        this.getPoints(e.result, accumulation);
        if (++accumulation.seriesCounts === accumulation.visibleSeries.length) {
            accumulation.refreshChart();
        }
    }
    /** @private To find points from result data */
    public getPoints(result: Object, accumulation: AccumulationChart) : void {
        let length: number =  Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        this.sumOfClub = 0;
        let point: AccPoints;
        let colors: string[] = this.palettes.length ? this.palettes : getSeriesColor(accumulation.theme);
        let clubValue: number = stringToNumber(this.groupTo, this.sumOfPoints);
        for (let i: number = 0; i < length; i++) {
            point = this.setPoints(result[i]);
            if (!this.isClub(point, clubValue)) {
                if (isNullOrUndefined(point.y)) {
                    point.visible = false;
                }
                this.pushPoints(point, colors);
            }
        }
        this.lastGroupTo = this.groupTo;
        if (this.sumOfClub > 0) {
            let clubPoint: AccPoints = new AccPoints();
            clubPoint.x =  'Others';
            clubPoint.y = this.sumOfClub;
            clubPoint.text = clubPoint.x + ': ' + this.sumOfClub;
            this.pushPoints(clubPoint, colors);
        }
    }
    /**
     * Method to set point index and color 
     */
    private pushPoints(point: AccPoints, colors: string[]): void {
        point.index = this.points.length;
        point.color = colors[point.index % colors.length];
        this.points.push(point);
    }
    /**
     * Method to find club point
     */
    private isClub(point: AccPoints, clubValue: number): boolean {
        if (Math.abs(point.y) < clubValue) {
            this.sumOfClub += Math.abs(point.y);
            return true;
        }
        return false;
    }
    /**
     * Method to find sum of points in the series
     */
    private findSumOfPoints(result: Object): void {
        let length: number =  Object.keys(result).length;
        for (let i: number = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    }
    /**
     * Method to set points x, y and text from data source
     */
    private setPoints(data: Object): AccPoints {
        let point: AccPoints = new AccPoints();
        point.x = data[this.xName];
        point.y = data[this.yName];
        point.text = data[this.dataLabel.name];
        return point;
    }
    /**
     * Method render the series elements for accumulation chart
     * @private
     */
    public renderSeries(accumulation: AccumulationChart): void {

        let seriesGroup: Element = accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index});

        this.renderPoints(accumulation, seriesGroup);

        let datalabelGroup: Element;

        if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {

            datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });

            (datalabelGroup as HTMLElement).style.visibility = (this.animation.enable && accumulation.animateSeries) ? 'hidden' : 'visible';

            this.renderDataLabel(accumulation, datalabelGroup);
        }

        this.findMaxBounds(this.labelBound, this.accumulationBound);

        accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup);

        if (accumulation.accumulationLegendModule) {
            this.labelBound.x -= accumulation.explodeDistance;
            this.labelBound.y -= accumulation.explodeDistance;
            this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
            this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
        }
    }
    /**
     * Method render the points elements for accumulation chart series.
     */
    private renderPoints(accumulation: AccumulationChart, seriesGroup: Element): void {
        let pointId: string = accumulation.element.id + '_Series_' + this.index + '_Point_';
        let option: PathOption;
        for (let point of this.points) {
            let argsData: IAccPointRenderEventArgs = {
                cancel: false, name: pointRender, series: this, point: point, fill: point.color, border: this.border
            };
            accumulation.trigger(pointRender, argsData);
            point.color = argsData.fill;
            if (point.visible) {
                option = new PathOption(
                    pointId + point.index, point.color, this.border.width || 1, this.border.color || point.color, 1,
                    '', ''
                );
                accumulation.pieSeriesModule.renderPoint(point, option, this.sumOfPoints);
                seriesGroup.appendChild(accumulation.renderer.drawPath(option));
            }
        }
        accumulation.getSeriesElement().appendChild(seriesGroup);
    }
    /**
     * Method render the datalabel elements for accumulation chart.
     */
    private renderDataLabel(accumulation: AccumulationChart, datalabelGroup: Element): void {
        accumulation.accumulationDataLabelModule.initProperties(accumulation, this);
        accumulation.accumulationDataLabelModule.findAreaRect();
        for (let point of this.points) {
            if (point.visible) {
                accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index);
            }
        }
        accumulation.getSeriesElement().appendChild(datalabelGroup);
    }

    /**
     * To find maximum bounds for smart legend placing
     * @private
     */
    public findMaxBounds(totalbound: Rect, bound: Rect): void {
        totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
        totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
        totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
        totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
    }
}
/**
 * method to get series from index
 * @private
 */
export function getSeriesFromIndex(index: number, visibleSeries: AccumulationSeries[]): AccumulationSeries {
    for (let series of visibleSeries) {
        if (index === series.index) {
            return <AccumulationSeries>series;
        }
    }
    return <AccumulationSeries>visibleSeries[0];
}
/**
 * method to get point from index
 * @private
 */
export function pointByIndex(index: number, points: AccPoints[]): AccPoints {
    for (let point of points) {
        if (point.index === index) {
            return point;
        }
    }
    return null;
}
/**
 * method to find series, point index by element id
 * @private
 */
export function indexFinder(id: string): Index {
    let ids: string[] = ['NaN', 'NaN'];
    if (id.indexOf('_Point_') > -1) {
        ids = id.split('_Series_')[1].split('_Point_');
    } else if (id.indexOf('_shape_') > -1) {
        ids = id.split('_shape_');
        ids[0] = '0';
    } else if (id.indexOf('_text_') > -1) {
        ids = id.split('_text_');
        ids[0] = '0';
    }
    return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
}