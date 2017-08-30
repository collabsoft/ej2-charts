import { ChartLocation, PathOption, ControlPoints, getPoint, Rect, withInRange } from '../../common/utils/helper';
import { Chart } from '../chart';
import { Series, Points } from './chart-series';
import { LineBase } from './line-base';
import { MarkerSettingsModel } from '../series/chart-series-model';
import { AnimationModel } from '../../common/model/base-model';


/**
 * Spline Module used to render the spline series.
 */

export class SplineSeries extends LineBase {

    private naturalSplinePoints: number[] = [];
    /**
     * Render the spline series.
     * @return {void}
     * @private
     */
    public render(series: Series): void {
        let chart: Chart = series.chart;
        let marker: MarkerSettingsModel = series.marker;
        let ySpline: number[];
        let options: PathOption;
        let firstPoint: Points = null;
        let secondPoint: Points = null;
        let direction: string = '';
        let pt1: ChartLocation;
        let pt2: ChartLocation;
        let bpt1: ChartLocation;
        let bpt2: ChartLocation;
        let data: ControlPoints;
        let controlPointCount: number = 0;
        let controlPoint1: ChartLocation;
        let controlPoint2: ChartLocation;
        let startPoint: string = 'M';
        for (let point of series.points) {
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                if (firstPoint !== null) {
                    data = series.drawPoints[point.index - 1];
                    controlPoint1 = data.controlPoint1;
                    controlPoint2 = data.controlPoint2;
                    pt1 = getPoint(firstPoint.xValue, firstPoint.yValue, series);
                    pt2 = getPoint(point.xValue, point.yValue, series);
                    bpt1 = getPoint(controlPoint1.x, controlPoint1.y, series);
                    bpt2 = getPoint(controlPoint2.x, controlPoint2.y, series);
                    direction = direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
                        + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
                    startPoint = 'L';
                }
                firstPoint = point;
                point.symbolLocation = getPoint(point.xValue, point.yValue, series);
                point.region = new Rect(point.symbolLocation.x - marker.width, point.symbolLocation.y - marker.height,
                                        2 * marker.width, 2 * marker.height);
            } else {
                startPoint = 'M';
                firstPoint = null;
                point.symbolLocation = null;
            }
        }
        options = new PathOption(series.chart.element.id + '_Series_' + series.index, 'transparent', series.width, series.interior,
                                 series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series);
        this.renderMarker(series);
    }

    /**
     * To find the control points for spline. 
     * @return {void}
     * @private
     */
     public findSplinePoint(series : Series): void {
        let spline : SplineSeries = series.chart.splineSeriesModule;
        let value: ControlPoints;
        this.naturalSplinePoints = this.naturalSpline(series.points);
        if (series.points.length > 1) {
        series.yMax = null;
        series.yMin = null;
        for (let point of series.points) {
            if (point.index !== 0) {
                value = this.getControlPoints(series.points[point.index - 1], point,
                                              this.naturalSplinePoints[point.index - 1], this.naturalSplinePoints[point.index]);
                series.drawPoints.push(value);
                series.yMin = (Math.min(series.yMin, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
                series.yMax = (Math.max(series.yMax, point.yValue, value.controlPoint1.y, value.controlPoint2.y));
            }
        }
        }
    }
    /**
     * To find the natural spline. 
     * @return {void}
     * @private
     */
    public naturalSpline(points: Points[]): number[] {
        let count: number = points.length;
        let a: number = 6;
        let ySpline: number[] = [];
        let ySplineDuplicate: number[] = [];
        let d1: number;
        let d2: number;
        let d3: number;
        let dy1: number;
        let dy2: number;

        // assigning the first and last value as zero
        ySpline[0] = ySplineDuplicate[0] = 0;
        ySpline[points.length - 1] = 0;

        for (let i: number = 1; i < count - 1; i++) {
            d1 = points[i].xValue - points[i - 1].xValue;
            d2 = points[i + 1].xValue - points[i - 1].xValue;
            d3 = points[i + 1].xValue - points[i].xValue;
            dy1 = points[i + 1].yValue - points[i].yValue;
            dy2 = points[i].yValue - points[i - 1].yValue;

            if (d1 === 0 || d2 === 0 || d3 === 0) {
                ySpline[i] = 0;
                ySplineDuplicate[i] = 0;
            } else {
                let p: number = 1 / (d1 * ySpline[i - 1] + 2 * d2);
                ySpline[i] = -p * d3;
                ySplineDuplicate[i] = p * (a * (dy1 / d3 - dy2 / d1) - d1 * ySplineDuplicate[i - 1]);
            }
        }

        for (let k: number = count - 2; k >= 0; k--) {
            ySpline[k] = ySpline[k] * ySpline[k + 1] + ySplineDuplicate[k];
        }
        return ySpline;
    }
    /**
     * To find the control points for spline. 
     * @return {void}
     * @private
     */
    public getControlPoints(point1: Points, point2: Points, ySpline1: number, ySpline2: number): ControlPoints {
        let one3: number = 1 / 3.0;
        let deltaX2: number = (point2.xValue - point1.xValue);
        deltaX2 = deltaX2 * deltaX2;

        let y1: number = one3 * (((2 * point1.yValue) + point2.yValue) - one3 * deltaX2 * (ySpline1 + 0.5 * ySpline2));
        let y2: number = one3 * ((point1.yValue + (2 * point2.yValue)) - one3 * deltaX2 * (0.5 * ySpline1 + ySpline2));

        let control1: ChartLocation = new ChartLocation((2 * (point1.xValue) + (point2.xValue)) * one3, y1);
        let control2: ChartLocation = new ChartLocation(((point1.xValue) + 2 * (point2.xValue)) * one3, y2);
        let points: ControlPoints = new ControlPoints(control1, control2);
        return points;
    }

    /**
     * Get module name.
     */
    protected getModuleName(): string {
        /**
         * Returns the module name of the series
         */
        return 'SplineSeries';
    }
    /**
     * To destroy the spline. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method calling here
         */
    }

    /**
     * Animates the series.
     * @return {void}.
     * @private
     */
    public doAnimation(series: Series): void {
        let option: AnimationModel = series.animation;
        this.doLinearAnimation(series, option);
    }
}


