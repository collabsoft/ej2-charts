import { Chart } from '../chart';
import { extend, Browser } from '@syncfusion/ej2-base';
import { AnimationOptions, Animation } from '@syncfusion/ej2-base';
import { Size, Rect, PointData, ChartLocation } from '../../common/utils/helper';
import { drawSymbol, PathOption, valueToCoefficient,
         removeElement, valueToPolarCoefficient, withInBounds
} from '../../common/utils/helper';
import { Axis } from '../axis/axis';
import { Series, Points } from '../series/chart-series';
import { BaseTooltip, Side } from '../../common/user-interaction/tooltip';


/**
 * `Tooltip` module is used to render the tooltip for chart series.
 */
export class Tooltip extends BaseTooltip {
    /**
     * Constructor for tooltip module.
     * @private.
     */
    constructor(chart: Chart) {
        super(chart);
        this.addEventListener();
    }

    /**
     * @hidden
     */
    private addEventListener(): void {
        if (this.chart.isDestroyed) { return; }
        let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
        this.chart.on('tapHold', this.longPress, this);
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    }

    private mouseUpHandler(): void {
        let chart: Chart = this.control as Chart;
        if (chart.isTouch && !this.isSelected(chart) &&
            ((withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect) && chart.tooltip.shared)
             || !chart.tooltip.shared)) {
            if (!chart.crosshair.enable) {
                this.tooltip();
                this.removeTooltip(2000);
            } else if (chart.startMove) {
                this.removeTooltip(2000);
            }
        }
    }

    private mouseLeaveHandler(): void {
        this.removeTooltip(1000);
    }

    private mouseMoveHandler(): void {
        let chart: Chart = this.chart;
        // Tooltip for chart series.
        if (!chart.disableTrackTooltip && !this.isSelected(chart)) {
            if (!chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                this.tooltip();
            }
            if (withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                if (chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                    this.tooltip();
                }
            } else {
                if (chart.tooltip.shared) {
                    this.removeTooltip(1000);
                }
            }
        }
    }

    /**
     * Handles the long press on chart. 
     * @return {boolean}
     * @private
     */
    private longPress(): boolean {
        let chart: Chart = this.chart;
        if (chart.crosshair.enable && withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
            this.tooltip();
        }
        return false;
    }


    /**
     * Renders the tooltip.
     * @return {void}
     */
    public tooltip(): void {
        let isTooltip: HTMLElement = this.getElement(this.element.id + '_tooltip');
        let tooltipDiv: HTMLDivElement = this.getTooltipElement(isTooltip);
        if (!this.chart.tooltip.shared) {
            this.renderSeriesTooltip(this.chart, !isTooltip, tooltipDiv);
        } else {
            this.renderGroupedTooltip(this.chart, !isTooltip, tooltipDiv);
        }
    }

    private findHeader(data: PointData) : void {
        this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            this.formattedText = this.formattedText.concat(this.header);
        }
    }

    private renderSeriesTooltip(chart: Chart, isFirst: boolean, tooltipDiv: HTMLDivElement): void {
        let data: PointData = this.getData();
        let markerSide : Side;
        data.lierIndex = this.lierIndex;
        let rect : Rect = chart.chartAxisLayoutPanel.seriesClipRect;
        this.currentPoints = [];
        if (this.findData(data, this.previousPoints[0] as PointData)) {
            if (this.pushData(data, isFirst, tooltipDiv, true)) {
                let text : string =  this.getTooltipText(data);
                if (!chart.tooltip.template) {
                    if (this.header !== '') {
                       this.findHeader(data);
                    }
                    markerSide =  this.renderTooltip(data, rect, this.getSymbolLocation(data), text, isFirst,
                                                     chart.chartAreaType === 'Cartesian');
                    if (markerSide) {
                      this.drawMarker(markerSide.isBottom, markerSide.isRight, 10);
                    }
                } else {
                   this.renderTemplate(data, rect, this.getSymbolLocation(data), this.getTemplateText(data), isFirst);
                }
                this.isRemove = true;
            }
            this.previousPoints = <PointData[]>extend([], this.currentPoints, null, true);
        } else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(1000);
                this.isRemove = false;
            } else {
                for (let series of chart.visibleSeries) {
                    if (series.visible) {
                        data = this.getClosestX(chart, series) || data;
                    }
                }
            }
        }
        if (data && data.point) {
            this.findMouseValue(data, chart);
        }
    }

    private findData (data : PointData, previous : PointData) : boolean {
        return data.point && ((!previous || (previous.point !== data.point)) ||
        (previous && previous.lierIndex > 3 && previous.lierIndex !== this.lierIndex));
    }

    private getSymbolLocation(data : PointData) : ChartLocation {
        return data.series.type === 'BoxAndWhisker' ?
        this.getBoxLocation(data) : data.point.symbolLocations[0];
    }

    private getTooltipText(pointData: PointData): string {
        let series: Series = pointData.series;
        let text: string;
        return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
    }

    private getTemplateText(data : PointData) : Points {
        let point: Points = extend({}, data.point) as Points;
        point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
        if ((data.series.seriesType === 'XY')) {
            point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
        } else {
            point.low = this.formatPointValue(data.point, data.series.yAxis, 'low', false, true);
            point.high = this.formatPointValue(data.point, data.series.yAxis, 'high', false, true);
        }
        return point;
    }

    private findMouseValue(data: PointData, chart: Chart): void {
        if (!chart.requireInvertedAxis) {
            if (chart.chartAreaType === 'PolarRadar') {
                this.valueX = valueToPolarCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            } else {
                this.valueX = valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                    + data.series.xAxis.rect.x;
            }
            this.valueY = chart.mouseY;
        } else {
            this.valueY = (1 - valueToCoefficient(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                + data.series.xAxis.rect.y;
            this.valueX = chart.mouseX;
        }
    }

    private renderGroupedTooltip(chart: Chart, isFirst: boolean, tooltipDiv: Element): void {
        let data: PointData;
        let height: number = 0; let width: number = 0;
        let pointData: PointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
        this.stopAnimation();
        this.removeHighlight(chart);
        this.currentPoints = [];
        let extraPoints: PointData[] = [];
        let markerSide : Side;
        if (isFirst) {
            document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
        }
        this.removeText();
        for (let series of chart.visibleSeries) {
            if (!series.enableTooltip) {
                continue;
            }
            if (chart.chartAreaType === 'Cartesian' && series.visible) {
                data = this.getClosestX(chart, series);
            } else if (chart.chartAreaType === 'PolarRadar' && series.visible && pointData.point !== null) {
                data = new PointData(series.points[pointData.point.index], series);
            }
            if (data && this.header !== '' && this.currentPoints.length === 0) {
                this.findHeader(data);
            }
            if (data && this.triggerEvent(data, isFirst, this.getTooltipText(data))) {
                if (series.category === 'Series') {
                    this.highlightPoints(data);
                }
                this.findMouseValue(data, chart);
                (<PointData[]>this.currentPoints).push(data);
                data = null;
            } else if (data) {
                extraPoints.push(data);
            }
        }
        if (this.currentPoints.length > 0) {
            this.renderText(isFirst, chart);
            markerSide = this.renderTooltipElement(chart, (<PointData[]>this.currentPoints)[0],
                                                   chart.chartAxisLayoutPanel.seriesClipRect,
                                                   this.getSymbolLocation((<PointData[]>this.currentPoints)[0]),
                                                   chart.chartAreaType === 'Cartesian', isFirst);
            this.drawMarker(markerSide.isBottom, markerSide.isRight, 10);
        } else {
            this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
        }
        this.currentPoints = (<PointData[]>this.currentPoints).concat(extraPoints);
        this.previousPoints = <PointData[]>extend([], this.currentPoints, null, true);
    }

    private getBoxLocation(data: PointData): ChartLocation {
        let location: ChartLocation;
        location = this.lierIndex > 3 ? data.point.symbolLocations[this.lierIndex - 4] :
            {
                x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                y: data.point.regions[0].y + (data.point.regions[0].height / 2)
            };
        return location;
    }

    private drawMarker(isBottom: boolean, isRight: boolean, size: number): void {
        let shapeOption: PathOption;
        let count: number = 0;
        let series: Series;
        let markerGroup: HTMLElement = <HTMLElement>this.chart.renderer.createGroup({ id: this.element.id + '_tooltip_trackball_group' });
        let groupElement: Element = this.getElement(this.element.id + '_tooltip_group');
        let x: number = (this.padding * 2) + (size / 2) + (isRight ? this.arrowPadding : 0);
        for (let data of (<PointData[]>this.currentPoints)) {
            series = data.series;
            if (series.visible && series.enableTooltip && data.point.visible) {
                shapeOption = new PathOption(
                    this.element.id + '_Tooltip_Trackball_' + series.index,
                    this.findColor(data, series) || series.interior,
                    1, '#cccccc', series.opacity, null);
                markerGroup.appendChild(drawSymbol(
                    new ChartLocation(x, this.markerPoint[count] - this.padding + (isBottom ? this.arrowPadding : 0)),
                    data.point.marker.shape || series.marker.shape , new Size(size, size), series.marker.imageUrl, shapeOption, null));
                count++;
            }
        }
        groupElement.appendChild(markerGroup);
    }
    private findColor(data: PointData, series: Series) : string {
        if (series.isRectSeries) {
            return data.point.color;
        } else {
            return (data.point.color && data.point.color !== '#ffffff' ? data.point.color : data.point.interior) || series.marker.fill;
        }
    }

    private parseTemplate(point: Points, series: Series, format: string, xAxis: Axis, yAxis: Axis): string {
        let val: RegExp;
        let textValue: string;
        let xFormat: Function;
        let customLabelFormat: boolean;
        let chart: Chart = this.chart;
        for (let dataValue of Object.keys(point)) {
            val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(
                val.source, this.formatPointValue(
                    point, val.source === '${point.x}' ? xAxis : yAxis,
                    dataValue, val.source === '${point.x}',
                    (
                        val.source === '${point.high}' ||
                        val.source === '${point.open}' ||
                        val.source === '${point.close}' ||
                        val.source === '${point.low}' ||
                        val.source === '${point.y}' ||
                        val.source === '${point.minimum}' ||
                        val.source === '${point.maximum}' ||
                        val.source === '${point.outliers}' ||
                        val.source === '${point.upperQuartile}' ||
                        val.source === '${point.lowerQuartile}' ||
                        val.source === '${point.median}'
                    )
                )
            );
        }

        for (let dataValue of Object.keys(Object.getPrototypeOf(series))) {
            val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(val.source, textValue);
        }
        return format;
    }

    private formatPointValue(point: Points, axis: Axis, dataValue: string, isXPoint: boolean, isYPoint: boolean): string {
        let textValue: string;
        let customLabelFormat: boolean;
        let value: string;
        if (axis.valueType !== 'Category' && isXPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(point[dataValue])) :
                axis.format(point[dataValue]);
        } else if (isYPoint) {
            customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
            value = dataValue === 'outliers' ? axis.format(point[dataValue][this.lierIndex - 4]) :
                axis.format(point[dataValue]);
            textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;

        } else {
            textValue = point[dataValue];
        }
        return textValue;
    }

    private getFormat(chart: Chart, series: Series): string {
        if (chart.tooltip.format) {
            if (series.seriesType === 'XY' && series.category === 'Indicator') {
                return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
            }
            return chart.tooltip.format;
        }
        let format: string = !chart.tooltip.shared ? '${point.x}' : '${series.name}';
        switch (series.seriesType) {
            case 'XY':
                if (series.category === 'Indicator') {
                    this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return format + ' : ' + ((series.type === 'Bubble') ? '<b>${point.y}</b>  Size : <b>${point.size}</b>'
                    : '<b>${point.y}</b>');
            case 'HighLow':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b>');
            case 'HighLowOpenClose':
                return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                    'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>');
            case 'BoxPlot': {
                return format + '<br/>' + (this.lierIndex > 3 ? 'Outliers : <b>${point.outliers}</b>' :
                    'Maximum : <b>${point.maximum}</b><br/>Q1 : <b>${point.upperQuartile}</b><br/>' +
                    'Median : <b>${point.median}</b><br/>Q3 : <b>${point.lowerQuartile}</b><br/>Minimum : <b>${point.minimum}</b>');
            }
        }
        return '';
    }

    private getIndicatorTooltipFormat(series: Series, chart: Chart, format: string): string {
        let toolTip: string;
        let points: Points[] = [];
        if (series.seriesType === 'XY') {
            toolTip = series.name + ' : ${point.y}';
        } else {
            toolTip = format;
        }
        return toolTip;
    }

     /*
    * @hidden
    */
   public removeHighlightedMarker(data: PointData[]): void {
    for (let item of data) {
        removeElement(this.element.id + '_Series_' + item.series.index +
            '_Point_' + item.point.index + '_Trackball');
    }
    if (this.chart.markerRender) {
        this.chart.markerRender.removeHighlightedMarker();
    }
    this.previousPoints = [];
}
   /**
    * Removes the tooltip on mouse leave.
    * @return {void}
    * @private
    */

    public removeTooltip(duration: number): void {
        let chart: Chart = this.chart;
        let tooltipElement: HTMLElement = this.getElement(this.element.id + '_tooltip');
        this.stopAnimation();
        if (tooltipElement && this.previousPoints.length > 0) {
            let data: PointData[] = <PointData[]>this.previousPoints;
            this.toolTipInterval = setTimeout(
                (): void => {
                    let rectOpacity: number;
                    let tooltipGroup: HTMLElement = tooltipElement.firstChild as HTMLElement;
                    let series: Series = data[0].series;
                    let element: HTMLElement = this.getElement(chart.element.id + '_Series_' + data[0].series.index
                    + '_Point_' + data[0].point.index);
                    let opacity: number = parseFloat(tooltipGroup.getAttribute('opacity')) || 1;
                    if (element && series.isRectSeries && !chart.tooltip.shared) {
                        rectOpacity = parseFloat(element.getAttribute('opacity'));
                    }
                    new Animation({}).animate(tooltipGroup, {
                        duration: 200,
                        progress: (args: AnimationOptions): void => {
                            //  tooltipGroup.removeAttribute('e-animate');
                            this.progressAnimation(element, tooltipGroup, series, opacity, rectOpacity,
                                                   (args.timeStamp / args.duration), series.isRectSeries, !chart.tooltip.shared);
                        },
                        end: (model: AnimationOptions) => {
                            this.valueX = null;
                            this.valueY = null;
                            this.endAnimation(element, tooltipGroup, series, chart.tooltip.shared);
                            this.removeHighlightedMarker(data);
                        }
                    });
                },
                duration);
        }
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name
         */
        return 'Tooltip';
    }
    /**
     * To destroy the tooltip.
     * @return {void}
     * @private
     */
    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}