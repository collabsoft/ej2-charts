import { Axis, VisibleLabels, } from '../axis/axis';
import { Double } from '../axis/double-axis';
import { Size } from '../utils/helper';
import { logBase, withIn } from '../utils/helper';
import { Chart } from '../chart';
import { IAxisLabelRenderEventArgs } from '../model/interface';
import { axisLabelRender } from '../model/constants';

/**
 * Logarithmic module is used to render log axis.
 */

export class Logarithmic extends Double {

    /**
     * Constructor for the logerithmic module.
     * @private
     */
    constructor(chart: Chart) {
        super(chart);
    }

    /**
     * The method to calculate the range and labels for the axis.
     * @return {void}
     * @private
     */

    public calculateRangeAndInterval(size: Size, axis: Axis): void {

        this.calculateRange(axis, size);

        this.getActualRange(axis, size);

        this.calculateVisibleRange(size, axis);

        this.calculateVisibleLabels(axis);
    }
    /**
     * Calculates actual range for the axis.
     * @private
     */

    protected getActualRange(axis: Axis, size: Size): void {

        this.initializeDoubleRange(axis);
        let logStart: number = logBase(<number>this.min, axis.logBase);
        logStart = isFinite(logStart) ? logStart : <number>this.min;
        let logEnd: number = logBase(<number>this.max, axis.logBase);
        logEnd = isFinite(logStart) ? logEnd : <number>this.max;
        this.min = Math.floor(logStart / 1);
        this.max = Math.ceil(logEnd / 1);
        axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(<number>this.max - <number>this.min, size, axis);
        axis.actualRange.min = <number>this.min;
        axis.actualRange.max = <number>this.max;
        axis.actualRange.delta = <number>this.max - <number>this.min;
    }
    /**
     * Calculates visible range for the axis.
     * @private
     */
    protected calculateVisibleRange(size: Size, axis: Axis): void {
        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateLogNiceInterval(axis.doubleRange.delta, size, axis)
                : axis.visibleRange.interval;
            axis.visibleRange.interval = Math.floor(axis.visibleRange.interval) === 0 ? 1 : Math.floor(axis.visibleRange.interval);
        }
    }
    /**
     * Calculates log iInteval for the axis.
     * @private
     */
    protected calculateLogNiceInterval(delta: number, size: Size, axis: Axis): number {
        let actualDesiredIntervalsCount: number = axis.getActualDesiredIntervalsCount(size);
        let niceInterval: number = delta;
        let minInterval: number = Math.pow(10, Math.floor(logBase(niceInterval, 10)));
        for (let j: number = 0, len: number = axis.intervalDivs.length; j < len; j++) {
            let currentInterval: number = minInterval * axis.intervalDivs[j];
            if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                break;
            }
            niceInterval = currentInterval;
        }
        return niceInterval;
    }

    /**
     * Calculates labels for the axis.
     * @private
     */
    protected calculateVisibleLabels(axis: Axis): void {
        /*! Generate axis labels */
        let tempInterval: number = axis.visibleRange.min;
        let tempIntervalText: number;
        let customLabelFormat: boolean = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
        let label: string;
        axis.format = this.chart.intl.getNumberFormat({ format: this.getLabelFormat(axis), useGrouping: this.chart.useGroupingSeparator });
        axis.visibleLabels = [];
        let argsData: IAxisLabelRenderEventArgs;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
        }
        axis.startLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.min));
        axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
        for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
            if (withIn(tempInterval, axis.actualRange)) {
                tempIntervalText = Math.pow(axis.logBase, tempInterval);
                argsData = {
                    cancel: false, name: axisLabelRender, axis: axis,  value: tempInterval,
                    text: customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(tempIntervalText))
                                            : axis.format(tempIntervalText)
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
     * Get module name
     */

    protected getModuleName(): string {
        /**
         * Returns the module name
         */
        return 'Logarithmic';
    }

    /**
     * To destroy the category axis. 
     * @return {void}
     * @private
     */

    public destroy(chart: Chart): void {
        /**
         * Destroy method performed here
         */
    }
}
