import { Axis, VisibleLabels } from '../axis/axis';
import { Size, getMinPointsDelta } from '../utils/helper';
import { DoubleRange } from '../utils/double-range';
import { Chart } from '../chart';
import { Series } from '../series/chart-series';
import { withIn, logBase } from '../utils/helper';
import { IAxisLabelRenderEventArgs } from '../model/interface';
import { axisLabelRender } from '../model/constants';

/**
 * Numeric module is used to render numeric axis.
 */

export class Double {
    /** @private */
    public chart: Chart;
    /** @private */
    public min: Object;
    /** @private */
    public max: Object;

    /**
     * Constructor for the dateTime module.
     * @private
     */
    constructor(chart: Chart) {
        this.chart = chart;
    }

    /**
     * Numeric Nice Interval for the axis.
     * @private
     */
    protected calculateNumericNiceInterval(axis: Axis, delta: number, size: Size): number {
        let actualDesiredIntervalsCount: number = axis.getActualDesiredIntervalsCount(size);
        let niceInterval: number = delta / actualDesiredIntervalsCount;
        if (axis.desiredIntervals != null) {
            return niceInterval;
        }

        let minInterval: number = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (let interval of axis.intervalDivs) {
            let currentInterval: number = minInterval * interval;
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    }

    /**
     * Actual Range for the axis.
     * @private
     */

    protected getActualRange(axis: Axis, size: Size): void {
        this.initializeDoubleRange(axis);
        axis.actualRange.interval = axis.interval || this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    }
    /**
     * Range for the axis.
     * @private
     */
    protected initializeDoubleRange(axis: Axis): void {
        //Axis Min
        if ((<number>axis.minimum) !== null) {
            this.min = <number>axis.minimum;
        } else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = 0;
        }
        // Axis Max
        if ((<number>axis.maximum) !== null) {
            this.max = <number>axis.maximum;
        } else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = 5;
        }
        if (this.min === this.max) {
            this.max = <number>this.min + 1;
        }
        axis.doubleRange = new DoubleRange(<number>this.min, <number>this.max);
        axis.actualRange = {};
    }

    /**
     * The function to calculate the range and labels for the axis.
     * @return {void}
     * @private
     */

    public calculateRangeAndInterval(size: Size, axis: Axis): void {

        this.calculateRange(axis, size);

        this.getActualRange(axis, size);

        this.applyRangePadding(axis, size);

        this.calculateVisibleLabels(axis);

    }


    /**
     * Calculate Range for the axis.
     * @private
     */

    protected calculateRange(axis: Axis, size: Size): void {

        /*! Generate axis range */
        let series: Series;
        let paddingInterval: number = 0;
        this.min = null; this.max = null;
        if (!axis.setRange()) {
            for (let series of axis.series) {
                if (!series.visible) {
                    continue;
                }
                paddingInterval = 0;
                if (series.type.indexOf('Column') > -1 || series.type.indexOf('Bar') > -1) {
                    if (series.xAxis.valueType === 'Double') {
                        paddingInterval = getMinPointsDelta(series.xAxis, axis.series) / 2;
                    }
                }
                //For xRange
                if (axis.orientation === 'Horizontal') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(series.yMin, series.yMax);
                    } else {
                        this.findMinMax(<number>series.xMin - paddingInterval, <number>series.xMax + paddingInterval);
                    }
                }
                // For yRange
                if (axis.orientation === 'Vertical') {
                    if (this.chart.requireInvertedAxis) {
                        this.findMinMax(<number>series.xMin - paddingInterval, <number>series.xMax + paddingInterval);
                    } else {
                        this.findMinMax(series.yMin, series.yMax);
                    }
                }
            }
        }
    }
    private findMinMax(min: Object, max: Object): void {
        if (this.min === null || this.min > min) {
            this.min = <number>min;
        }
        if (this.max === null || this.max < max) {
            this.max = <number>max;
        }
    }
    /**
     * Apply padding for the range.
     * @private
     */
    protected applyRangePadding(axis: Axis, size: Size): void {

        let range: Range;
        let start: number = axis.actualRange.min;
        let end: number = axis.actualRange.max;
        if (!axis.setRange()) {
            let interval: number = axis.actualRange.interval;
            let rangePadding: string = axis.rangePadding === 'Auto' ?
                (axis.orientation === 'Vertical' && !this.chart.requireInvertedAxis) ? 'Normal' :
                    (axis.orientation === 'Horizontal' && this.chart.requireInvertedAxis) ? 'Normal' :
                        'None' : axis.rangePadding;
            if (rangePadding === 'Additional' || rangePadding === 'Round') {
                this.findAdditional(axis, start, end, interval);
            } else if (rangePadding === 'Normal') {
                this.findNormal(axis, start, end, interval, size);
            } else {
                this.updateActualRange(axis, start, end, interval);
            }
        }

        axis.actualRange.delta = axis.actualRange.max - axis.actualRange.min;

        this.calculateVisibleRange(size, axis);
    }

    private updateActualRange(axis: Axis, minimum: number, maximum: number, interval: number): void {
        axis.actualRange.min = minimum;
        axis.actualRange.max = maximum;
        axis.actualRange.interval = interval;
    }

    private findAdditional(axis: Axis, start: number, end: number, interval: number): void {
        let minimum: number; let maximum: number;
        minimum = Math.floor(start / interval) * interval;
        maximum = Math.ceil(end / interval) * interval;
        if (axis.rangePadding === 'Additional') {
            minimum -= interval;
            maximum += interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    }

    private findNormal(axis: Axis, start: number, end: number, interval: number, size: Size): void {
        let remaining: number; let minimum: number; let maximum: number;
        let startValue: number = start;
        if (start < 0) {
            startValue = 0;
            minimum = start + (start / 20);
            remaining = interval + (minimum % interval);
            if ((0.365 * interval) >= remaining) {
                minimum -= interval;
            }
            if (minimum % interval < 0) {
                minimum = (minimum - interval) - (minimum % interval);
            }
        } else {
            minimum = start < ((5.0 / 6.0) * end) ? 0 : (start - (end - start) / 2);
            if (minimum % interval > 0) {
                minimum -= (minimum % interval);
            }
        }

        maximum = (end > 0) ? (end + (end - startValue) / 20) :  (end - (end - startValue) / 20);
        remaining = interval - (maximum % interval);
        if ((0.365 * interval) >= remaining) {
            maximum += interval;
        }
        if (maximum % interval > 0) {
            maximum = (maximum + interval) - (maximum % interval);
        }
        axis.doubleRange = new DoubleRange(minimum, maximum);
        if (minimum === 0) {
            interval = this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size);
            maximum = Math.ceil(maximum / interval) * interval;
        }
        this.updateActualRange(axis, minimum, maximum, interval);
    }


    /**
     * Calculate visible range for axis.
     * @private
     */
    protected calculateVisibleRange(size: Size, axis: Axis): void {
        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming && axis.valueType !== 'Category') ?
                this.calculateNumericNiceInterval(axis, axis.doubleRange.delta, size)
                : axis.visibleRange.interval;
        }
    }


    /**
     * Calculate label for the axis.
     * @private
     */

    protected calculateVisibleLabels(axis: Axis): void {
        /*! Generate axis labels */
        axis.visibleLabels = [];
        let tempInterval: number = axis.visibleRange.min;
        let customLabelFormat: boolean = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
        axis.format = this.chart.intl.getNumberFormat({ format: this.getLabelFormat(axis), useGrouping : this.chart.useGroupingSeparator});
        let argsData: IAxisLabelRenderEventArgs;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        axis.startLabel = axis.format(axis.visibleRange.min);
        axis.endLabel = axis.format(axis.visibleRange.max);
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.visibleRange)) {
              argsData = {
                    cancel: false, name : axisLabelRender, axis: axis,
                    text : customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(tempInterval))
                                             : axis.format(tempInterval), value : tempInterval
                };
              this.chart.trigger(axisLabelRender, argsData);
              if (!argsData.cancel) {
                axis.visibleLabels.push(new VisibleLabels(argsData.text, argsData.value));
              }
            }
        }
        axis.getMaxLabelWidth(this.chart);
    }

    /**
     * To get the label format for the axis. 
     * @return {string}
     * @private
     */

    public getLabelFormat(axis: Axis): string {
        let customLabelFormat: boolean = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
        let skeleton: string = customLabelFormat ? '' : axis.labelFormat;
        return skeleton;
    }
}




