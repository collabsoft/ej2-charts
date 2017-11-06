import { Chart } from '../chart';
import { withInBounds, PointData, Rect } from '../../common/utils/helper';
import { Series, Points } from '../series/chart-series';

/**
 * To get the data on mouse move.
 * @private
 */
export class Data {
    /** @private */
    public chart: Chart;
    public lierIndex: number;

    /**
     * Constructor for the data.
     * @private
     */

    constructor(chart: Chart) {
        this.chart = chart;
        this.lierIndex = 0;
    }
    /**
     * Method to get the Data.
     * @private
     */

    public getData(): PointData {
        let chart: Chart = this.chart;
        let point: Points = null;
        let series: Series = null;
        let width: number; let height: number;
        for (let len: number = chart.visibleSeries.length, i: number = len - 1; i >= 0; i--) {
            series = chart.visibleSeries[i];
            width = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.height + 5) / 2 : 0;
            height = (series.type === 'Scatter' || series.drawType === 'Scatter' || (!series.isRectSeries && series.marker.visible))
                ? (series.marker.width + 5) / 2 : 0;
            if (series.visible && withInBounds(chart.mouseX, chart.mouseY, series.clipRect, width, height)) {
                point = this.getRectPoint(series, series.clipRect, chart.mouseX, chart.mouseY);
            }
            if (point) {
                return new PointData(point, series);
            }
        }
        return new PointData(point, series);
    }

    private getRectPoint(series: Series, rect: Rect, x: number, y: number): Points {
        let currentRect: Rect;
        let fromCenterX: number; let fromCenterY: number;
        let clickAngle: number; let arcAngle: number = 0;
        let startAngle: number; let endAngle: number;
        let distanceFromCenter: number;
        for (let point of series.points) {
            if (!point.regions && !point.regions.length && !point.regionData) {
                continue;
            }
            if (point.regionData && this.chart.chartAreaType === 'PolarRadar' && series.drawType.indexOf('Column') > -1) {
                fromCenterX = x - (series.clipRect.width / 2 + series.clipRect.x);
                fromCenterY = y - (series.clipRect.height / 2 + series.clipRect.y);
                arcAngle = 2 * Math.PI * (point.regionData.currentXPosition < 0 ? 1 + point.regionData.currentXPosition
                    : point.regionData.currentXPosition);
                clickAngle = (Math.atan2(fromCenterY, fromCenterX) + 0.5 * Math.PI - arcAngle) % (2 * Math.PI);
                clickAngle = clickAngle < 0 ? 2 * Math.PI + clickAngle : clickAngle;
                clickAngle = clickAngle + 2 * Math.PI * series.chart.primaryXAxis.startAngle;
                startAngle = point.regionData.startAngle;
                startAngle -= arcAngle;
                startAngle = startAngle < 0 ? 2 * Math.PI + startAngle : startAngle;
                endAngle = point.regionData.endAngle;
                endAngle -= arcAngle;
                endAngle = endAngle < 0 ? 2 * Math.PI + endAngle : endAngle;
                distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                if (clickAngle >= startAngle && clickAngle <= endAngle &&
                    (((distanceFromCenter >= point.regionData.innerRadius && distanceFromCenter <= point.regionData.radius) ||
                        (distanceFromCenter <= point.regionData.innerRadius && distanceFromCenter >= point.regionData.radius))
                        && distanceFromCenter <= series.chart.radius)) {
                    return point;
                }
            } else if (this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                return point;
            }
        }
        return null;
    }

    /**
     * Checks whether the region contains a point
     */
    private checkRegionContainsPoint(regionRect: Rect[], rect: Rect, x: number, y: number): boolean {
        return regionRect.some((region: Rect, index: number) => {
            this.lierIndex = index;
            return withInBounds(
                x, y,
                new Rect(
                    (this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x,
                    (this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y,
                    region.width, region.height
                )
            );
        });
    }
}