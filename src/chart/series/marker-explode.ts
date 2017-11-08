import { drawSymbol, PathOption, Size, ChartLocation } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Border } from '../../common/model/base';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { Series, Points } from './chart-series';
import { Browser, extend, remove } from '@syncfusion/ej2-base';
import { Data } from '../../chart/utils/get-data';
import { withInBounds, PointData, stopTimer } from '../../common/utils/helper';
import { ColorValue, colorNameToHex, convertHexToColor, templateAnimate } from '../../common/utils/helper';

/**
 * Marker Module used to render the marker for line type series.
 */
export class MarkerExplode extends Data {
    private markerExplode: number;
    private isRemove: boolean;
    /** @private */
    public elementId: string;

    /**
     * Constructor for the marker module.
     * @private
     */

    constructor(chart: Chart) {
        super(chart);
        this.addEventListener();
        this.elementId = chart.element.id;
    }

    /**
     * @hidden
     */
    public addEventListener(): void {
        if (this.chart.isDestroyed) { return; }
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);

    }
    /**
     * @hidden
     */
    /* public removeEventListener(): void {
         if (this.chart.isDestroyed) { return; }
         this.chart.off(Browser.touchMoveEvent, this.mouseMoveHandler);
    }*/

    /**
     * @hidden
     */
    private mouseUpHandler(): void {
        let chart: Chart = this.chart;
        if (chart.isTouch && !chart.crosshair.enable) {
            this.markerMove(true);
        }
    }

    /**
     * @hidden
     */
    private mouseMoveHandler(): void {
        let chart: Chart = this.chart;
        if ((!chart.crosshair.enable || (chart.tooltip.enable && chart.tooltip.shared)) && (!chart.isTouch || chart.startMove)) {
            this.markerMove(false);
        }
    }

    private markerMove(remove : boolean) : void {
        let chart: Chart = this.chart;
        this.currentPoints = [];
        let data: PointData;
        let explodeSeries: boolean;
        if (!chart.tooltip.shared || !chart.tooltip.enable) {
            data = this.getData();
            explodeSeries = (data.series.type === 'BoxAndWhisker' || data.series.type === 'Bubble'  || data.series.drawType === 'Scatter'
                            || data.series.type === 'Scatter' || (!data.series.isRectSeries && data.series.marker.visible));
            data.lierIndex = this.lierIndex;
            if (
                data.point && explodeSeries && ((!this.previousPoints[0] || (this.previousPoints[0].point !== data.point)) ||
                    (this.previousPoints[0] && this.previousPoints[0].lierIndex > 3 && this.previousPoints[0].lierIndex !== this.lierIndex))
            ) {
                this.currentPoints.push(data);
            }
        } else {
            if (!withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                return null;
            }
            if (chart.tooltip.enable) {
            let pointData: PointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
            for (let chartSeries of chart.visibleSeries) {
                if (!chartSeries.enableTooltip || chartSeries.category === 'Indicator') {
                    continue;
                }
                if (chart.chartAreaType === 'Cartesian' && chartSeries.visible) {
                    data = this.getClosestX(chart, chartSeries);
                } else if (chart.chartAreaType === 'PolarRadar' && chartSeries.visible && pointData.point !== null) {
                    data = new PointData(chartSeries.points[pointData.point.index], chartSeries);
                }
                if (data) {
                    this.currentPoints.push(data);
                    data = null;
                }
              }
            }
        }
        let length: number = this.previousPoints.length;
        if (this.currentPoints.length > 0) {
            if (length === 0 || (length > 0 && this.previousPoints[0].point !== this.currentPoints[0].point)) {
                if (this.previousPoints.length > 0) {
                    this.removeHighlightedMarker();
                }
                for (let data of this.currentPoints) {
                    if (
                        data && data.point &&
                        (!data.series.isRectSeries || data.series.type === 'BoxAndWhisker')
                    ) {
                        stopTimer(this.markerExplode);
                        this.isRemove = true;
                        data.point.symbolLocations.map((location: ChartLocation, index: number) => {
                            this.drawTrackBall(data.series, data.point, location, index);
                        });
                    }
                }
                this.previousPoints = <PointData[]>extend([], this.currentPoints, null, true);
            }
        }
        if (!chart.tooltip.enable && ((this.currentPoints.length === 0 && this.isRemove) || (remove && this.isRemove) ||
            !withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect))) {
            this.isRemove = false;
            this.markerExplode = setTimeout(
                (): void => {
                    this.removeHighlightedMarker();
                },
                2000);
        }
        this.currentPoints = [];
    }

    private drawTrackBall(series: Series, point: Points, location: ChartLocation, index: number): void {
        let marker: MarkerSettingsModel = series.marker;
        let element: Element = series.symbolElement || series.seriesElement;
        let shape: string = series.type === 'Bubble' ? 'Circle' : marker.shape;
        let symbolId: string = this.elementId + '_Series_' + series.index + '_Point_' + point.index + '_Trackball' +
            (index ? index : '');
        let width: number = (series.type !== 'Bubble') ? marker.width : (point.regions[0].width);
        let height: number = (series.type !== 'Bubble') ? marker.height : (point.regions[0].height);
        let size: Size = new Size(width + 5, height + 5);
        let border: Border = <Border>(series.type === 'Bubble' || series.type === 'Scatter' ? series.border : marker.border);
        let explodeSeries: boolean = (series.type === 'BoxAndWhisker' || series.type === 'Bubble' || series.type === 'Scatter');
        let borderColor: string = (border.color && border.color !== 'transparent') ? border.color :
            explodeSeries ? point.color : series.interior;
        let colorValue: ColorValue = convertHexToColor(colorNameToHex(borderColor));
        for (let i: number = 0; i < 2; i++) {
            let options: PathOption = new PathOption(
                symbolId + '_' + i,
                i ? (marker.fill || point.color || (explodeSeries ? series.interior : '#ffffff')) : 'transparent',
                marker.border.width + (i ? 0 : 8),
                i ? borderColor : 'rgba(' + colorValue.r + ',' + colorValue.g + ',' + colorValue.b + ',0.2)',
                marker.opacity, null, null
            );
            let symbol: Element = drawSymbol(location, shape, size, null, options, '');
            symbol.setAttribute('style', 'pointer-events:none');
            symbol.setAttribute('class', 'EJ2-Trackball');
            templateAnimate(symbol, 0, 350, 'FadeIn', false);
            element.appendChild(symbol);
        }
    }

    /**
     * @hidden
     */
    public removeHighlightedMarker(): void {
        let elements: HTMLCollectionOf<Element> = document.getElementsByClassName('EJ2-Trackball');
        for (let i: number = 0, len : number = elements.length; i < len; i++) {
                remove(elements[0]);
        }
        this.previousPoints = [];
    }
}