import { drawSymbol, PathOption, Size, Rect, markerAnimate, CircleOption, RectOption, ChartLocation } from '../../common/utils/helper';
import { findlElement } from '../../common/utils/helper';
import { Chart } from '../chart';
import { SvgRenderer, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BorderModel } from '../../common/model/base-model';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { Series, Points } from './chart-series';
import { IPointRenderEventArgs } from '../../common/model/interface';
import { pointRender } from '../../common/model/constants';
import { MarkerExplode } from './marker-explode';
import { getSaturationColor } from '../../common/utils/helper';

/**
 * Marker Module used to render the marker for line type series.
 */
export class Marker extends MarkerExplode {

    /**
     * Constructor for the marker module.
     * @private
     */

    constructor(chart: Chart) {
        super(chart);
        this.addEventListener();
    }


    /**
     * Render the marker for series.
     * @return {void}
     * @private
     */

    public render(series: Series): void {
        this.createElement(series);
        for (let point of series.points) {
            if (point.visible && point.symbolLocations.length) {
                point.symbolLocations.map((location: ChartLocation, index: number) => {
                    this.renderMarker(series, point, location, index);
                });
            }
        }
    }

    private renderMarker(
        series: Series, point: Points,
        location: ChartLocation, index: number
    ): void {
        let seriesIndex: number = series.index;
        let marker: MarkerSettingsModel = series.marker;
        let border: BorderModel = {
            color: marker.border.color,
            width: marker.border.width
        };
        let shape: string = marker.shape;
        let borderColor: string = marker.border.color;
        let symbolId: string;
        let shapeOption: PathOption;
        let isBoxPlot: boolean = series.type === 'BoxAndWhisker';
        let fill: string = marker.fill || (isBoxPlot ? series.interior : '#ffffff');
        let argsData: IPointRenderEventArgs;
        let parentElement: Element = isBoxPlot ?
            findlElement(series.seriesElement.childNodes, 'Series_' + series.index + '_Point_' + point.index)
            : series.symbolElement;
        border.color = borderColor || series.interior;
        symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol' +
            (index ? index : '');
        argsData = {
            cancel: false, name: pointRender, series: series, point: point, fill: series.setPointColor(point, fill),
            border: {
                color: series.type === 'BoxAndWhisker' ?
                    (!isNullOrUndefined(borderColor) && borderColor !== 'transparent') ? borderColor :
                        getSaturationColor(fill, -0.6)
                    : border.color,
                width: border.width
            },
            height: marker.height,
            width: marker.width
        };
        argsData.border = series.setBorderColor(point, { width: argsData.border.width, color: argsData.border.color });
        this.chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        if (!argsData.cancel) {
            let y: Object;
            if (series.type === 'RangeArea') {
                y = index ? point.low : point.high;
            } else if (isBoxPlot) {
                y = point.outliers[index];
            } else {
                y = point.y;
            }
            shapeOption = new PathOption(
                symbolId, argsData.fill,
                argsData.border.width,
                argsData.border.color,
                marker.opacity, null
            );
            if (parentElement !== undefined && parentElement !== null) {
                parentElement.appendChild(
                    drawSymbol(
                        location, shape,
                        new Size(argsData.width, argsData.height),
                        marker.imageUrl, shapeOption,
                        point.x.toString() + ':' + y.toString()
                    )
                );
            }
        } else {
            location = null;
        }
    }

    public createElement(series: Series): void {
        let markerClipRect: Element;
        let marker: MarkerSettingsModel = series.marker;
        // 8 for extend border value 5 for extend size value
        let explodeValue: number = marker.border.width + 8 + 5;
        let render: SvgRenderer = series.chart.renderer;
        let transform: string;
        transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        if (marker.visible) {
            let markerHeight: number = (marker.height + explodeValue) / 2;
            let markerWidth: number = (marker.width + explodeValue) / 2;
            if (series.chart.chartAreaType === 'Cartesian') {
                markerClipRect = render.drawClipPath(
                    new RectOption(this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                        x: -markerWidth, y: -markerHeight,
                        width: series.clipRect.width + markerWidth * 2,
                        height: series.clipRect.height + markerHeight * 2
                    }));
            } else {
                markerClipRect = render.drawCircularClipPath(new CircleOption(
                    this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1,
                    series.clipRect.width / 2 + series.clipRect.x, series.clipRect.height / 2 + series.clipRect.y,
                    series.chart.radius + Math.max(markerHeight, markerWidth)
                ));
            }
            series.symbolElement = render.createGroup({
                'id': this.elementId + 'SymbolGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.elementId + '_ChartMarkerClipRect_' + series.index + ')'
            });
            series.symbolElement.appendChild(markerClipRect);
        }
    }

    private getRangeLowPoint(region: Rect, series: Series): ChartLocation {
        let x: number = region.x;
        let y: number = region.y;
        if (series.chart.requireInvertedAxis) {
            y += region.height / 2;
            x += series.yAxis.isInversed ? region.width : 0;
        } else {
            y += series.yAxis.isInversed ? 0 : region.height;
            x += region.width / 2;
        }
        return { x: x, y: y };
    }

    /**
     * Animates the marker.
     * @return {void}.
     * @private
     */
    public doMarkerAnimation(series: Series): void {
        if (!(series.isRectSeries || series.type === 'Scatter' || series.type === 'Bubble' ||
            (series.chart.chartAreaType === 'PolarRadar' && (series.drawType === 'Scatter' || series.drawType.indexOf('Column') > -1)))) {
            let markerElements: HTMLCollection = <HTMLCollection>series.symbolElement.childNodes;
            let delay: number = series.animation.delay + series.animation.duration;
            let j: number = 1;
            let incFactor: number = series.type === 'RangeArea' ? 2 : 1;
            for (let i: number = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocations.length) {
                    continue;
                }
                markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocations[0], false);
                if (incFactor === 2) {
                    let lowPoint: ChartLocation = this.getRangeLowPoint(series.points[i].regions[0], series);
                    markerAnimate(markerElements[j + 1], delay, 200, series, i, lowPoint, false);
                }
                j += incFactor;
            }
        }
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns te module name
         */
        return 'Marker';
    }

    /**
     * To destroy the marker. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}