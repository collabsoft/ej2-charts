import { drawSymbol, PathOption, Size, ChartLocation } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Border } from '../../common/model/base';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { Series, Points } from './chart-series';
import { Browser, extend } from '@syncfusion/ej2-base';
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
    /** @private */
    public currentPoints: PointData[] = [];
    /** @private */
    public previousPoints: PointData[] = [];

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
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveAndUpHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseMoveAndUpHandler, this);

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
    public mouseMoveAndUpHandler(): void {
        let chart: Chart = this.chart;
        if (!chart.tooltip.enable || !chart.tooltipModule) {
            this.currentPoints.push(this.getData());
        } else {
            this.currentPoints = <PointData[]>extend([], chart.tooltipModule.currentPoints, null, true);
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
                        && (data.series.type === 'Bubble'
                            || data.series.type === 'Scatter' || data.series.category === 'Indicator' ||
                              data.series.marker.visible || (chart.chartAreaType === 'PolarRadar' && data.series.drawType === 'Scatter'))
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
        if (!chart.tooltip.enable && ((this.currentPoints.length === 0 && this.isRemove) ||
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
                i ? (marker.fill || point.color) : 'transparent',
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
        let elements: HTMLCollectionOf<Element>;
        let symbolId: string;
        for (let item of this.previousPoints) {
            if (item.point) {
                symbolId = '_Series_' + item.series.index + '_Point_' + item.point.index + '_Trackball';
                elements = document.getElementsByClassName('EJ2-Trackball');
                for (let i: number = 0; i < elements.length; i++) {
                    if (elements[i].id.indexOf(symbolId) > -1) {
                        templateAnimate(elements[i], 0, 350, 'FadeOut', true);
                    }
                }
            }
        }
        this.previousPoints = [];
    }
}