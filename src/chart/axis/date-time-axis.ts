import { DateFormatOptions } from '@syncfusion/ej2-base';
import { Axis } from '../axis/axis';
import { Double } from '../axis/double-axis';
import { Size } from '../../common/utils/helper';
import { DoubleRange } from '../utils/double-range';
import { IntervalType, ChartRangePadding } from '../utils/enum';
import { withIn, firstToLowerCase } from '../../common/utils/helper';
import { Chart } from '../chart';


/**
 * DateTime module is used to render DateTime axis.
 */

export class DateTime extends Double {

    private start: number;
    private end: number;

    /**
     * Constructor for the dateTime module.
     * @private
     */
    constructor(chart: Chart) {
        super(chart);
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
     * Actual Range for the axis.
     * @private
     */
    protected getActualRange(axis: Axis, size: Size): void {
        let option: DateFormatOptions = {
            skeleton: 'full',
            type: 'dateTime'
        };
        let dateParser: Function = this.chart.intl.getDateParser(option);
        let dateFormatter: Function = this.chart.intl.getDateFormat(option);
        // Axis min
        if ((axis.minimum) !== null) {
            this.min = Date.parse(dateParser(dateFormatter(axis.minimum)));
        } else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(1970, 1, 1))));
        }
        // Axis Max
        if ((axis.maximum) !== null) {
            this.max = Date.parse(dateParser(dateFormatter(axis.maximum)));
        } else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(1970, 5, 1))));
        }

        if (this.min === this.max) {
            this.max = <number>this.max + 2592000000;
            this.min = <number>this.min - 2592000000;
        }
        axis.actualRange = {};
        axis.doubleRange = new DoubleRange(<number>this.min, <number>this.max);
        let datetimeInterval: number = this.calculateDateTimeNiceInterval(axis, size, axis.doubleRange.start, axis.doubleRange.end);

        if (!axis.interval) {
            axis.actualRange.interval = datetimeInterval;
        } else {
            axis.actualRange.interval = axis.interval;
        }
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    }

    /**
     * Apply padding for the range.
     * @private
     */
    protected applyRangePadding(axis: Axis, size: Size): void {
        this.start = (axis.actualRange.min);
        this.end = (axis.actualRange.max);
        let minimum: Date; let maximum: Date;
        let interval: number = axis.actualRange.interval;
        if (!axis.setRange()) {
            let rangePadding: string  = axis.getRangePadding(this.chart);
            minimum = new Date(this.start);
            maximum = new Date(this.end);
            let intervalType: IntervalType = axis.actualIntervalType;
            if (rangePadding === 'None') {
                this.start = minimum.getTime();
                this.end = maximum.getTime();
            } else if (rangePadding === 'Additional' || rangePadding === 'Round') {
                switch (intervalType) {
                    case 'Years':
                        this.getYear(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Months':
                        this.getMonth(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Days':
                        this.getDay(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Hours':
                        this.getHour(minimum, maximum, rangePadding, interval);
                        break;
                    case 'Minutes':
                        let minute: number = (minimum.getMinutes() / interval) * interval;
                        let endMinute: number = maximum.getMinutes() + (minimum.getMinutes() - minute);
                        if (rangePadding === 'Round') {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(),
                                                   minimum.getHours(), minute, 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(),
                                                 maximum.getHours(), endMinute, 59)).getTime();
                        } else {
                            this.start = (new Date(minimum.getFullYear(), maximum.getMonth(), minimum.getDate(),
                                                   minimum.getHours(), minute + (-interval), 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(),
                                                 maximum.getDate(), maximum.getHours(), endMinute + (interval), 0)).getTime();
                        }
                        break;
                    case 'Seconds':
                        let second: number = (minimum.getSeconds() / interval) * interval;
                        let endSecond: number = maximum.getSeconds() + (minimum.getSeconds() - second);
                        if (rangePadding === 'Round') {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(),
                                                   minimum.getHours(), minimum.getMinutes(), second, 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(),
                                                 maximum.getHours(), maximum.getMinutes(), endSecond, 0)).getTime();
                        } else {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(),
                                                   minimum.getHours(), minimum.getMinutes(), second + (-interval), 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(),
                                                 maximum.getHours(), maximum.getMinutes(), endSecond + (interval), 0)).getTime();
                        }
                        break;
                }
            }
        }
        axis.actualRange.min = (axis.minimum != null) ? <number>this.min : this.start;
        axis.actualRange.max = (axis.maximum != null) ? <number>this.max : this.end;
        axis.actualRange.delta = (axis.actualRange.max - axis.actualRange.min);
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        this.calculateVisibleRange(size, axis);
    }

    private getYear(minimum: Date, maximum: Date, rangePadding: ChartRangePadding, interval: number): void {
        let startYear: number = minimum.getFullYear();
        let endYear: number = maximum.getFullYear();
        if (rangePadding === 'Additional') {
            this.start = (new Date(startYear - interval, 1, 1, 0, 0, 0)).getTime();
            this.end = (new Date(endYear + interval, 1, 1, 0, 0, 0)).getTime();
        } else {
            this.start = new Date(startYear, 0, 0, 0, 0, 0).getTime();
            this.end = new Date(endYear, 11, 30, 23, 59, 59).getTime();
        }
    }
    private getMonth(minimum: Date, maximum: Date, rangePadding: ChartRangePadding, interval: number): void {
        let month: number = minimum.getMonth();
        let endMonth: number = maximum.getMonth();
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), month, 0, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), endMonth,
                                 new Date(maximum.getFullYear(), maximum.getMonth(), 0).getDate(), 23, 59, 59)).getTime();
        } else {
            this.start = (new Date(minimum.getFullYear(), month + (-interval), 1, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), endMonth + (interval), endMonth === 2 ? 28 : 30, 0, 0, 0)).getTime();
        }
    }
    private getDay(minimum: Date, maximum: Date, rangePadding: ChartRangePadding, interval: number): void {
        let day: number = minimum.getDate();
        let endDay: number = maximum.getDate();
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay, 23, 59, 59)).getTime();
        } else {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day + (-interval), 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay + (interval), 0, 0, 0)).getTime();
        }
    }
    private getHour(minimum: Date, maximum: Date, rangePadding: ChartRangePadding, interval: number): void {
        let hour: number = (minimum.getHours() / interval) * interval;
        let endHour: number = maximum.getHours() + (minimum.getHours() - hour);
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour, 59, 59)).getTime();
        } else {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(),
                                   hour + (-interval), 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(),
                                 endHour + (interval), 0, 0)).getTime();
        }
    }

    /**
     * Calculate visible range for axis.
     * @private
     */
    protected calculateVisibleRange(size: Size, axis: Axis): void {

        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateDateTimeNiceInterval(axis, size, axis.visibleRange.min, axis.visibleRange.max)
                : axis.visibleRange.interval;
        }
        axis.dateTimeInterval = this.increaseDateTimeInterval(axis, axis.visibleRange.min, axis.visibleRange.interval).getTime()
                                                              - axis.visibleRange.min;
    }

    /**
     * Calculate visible labels for the axis.
     * @private
     */
    protected calculateVisibleLabels(axis: Axis): void {
        axis.visibleLabels = [];
        let tempInterval: number = axis.visibleRange.min;
        if (!axis.setRange()) {
            tempInterval = this.alignRangeStart(axis, tempInterval, axis.visibleRange.interval, axis.actualIntervalType).getTime();
        }
        axis.format = this.chart.intl.getDateFormat({
            format: axis.labelFormat, type: firstToLowerCase(axis.skeletonType), skeleton: this.getSkeleton(axis)
        });

        axis.startLabel = axis.format(new Date(axis.visibleRange.min));
        axis.endLabel = axis.format(new Date(axis.visibleRange.max));

        while (tempInterval <= axis.visibleRange.max) {
            if (withIn(tempInterval, axis.visibleRange)) {
                 axis.triggerLabelRender(this.chart, tempInterval, axis.format(new Date(tempInterval)));
            }
            tempInterval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
        }
        axis.getMaxLabelWidth(this.chart);
    }
    /** @private */
    public increaseDateTimeInterval(axis: Axis, value: number, interval: number): Date {
        let result: Date = new Date(value);
        interval = Math.ceil(interval);
        switch (axis.actualIntervalType) {
            case 'Years':
                result.setFullYear(result.getFullYear() + interval);
                return result;

            case 'Months':
                result.setMonth(result.getMonth() + interval);
                return result;

            case 'Days':
                result.setDate(result.getDate() + interval);
                return result;

            case 'Hours':
                result.setHours(result.getHours() + interval);
                return result;

            case 'Minutes':
                result.setMinutes(result.getMinutes() + interval);
                return result;

            case 'Seconds':
                result.setSeconds(result.getSeconds() + interval);
                return result;
        }
        return result;
    }
    private alignRangeStart(axis: Axis, sDate: number, intervalSize: number, intervalType: IntervalType): Date {
        let sResult: Date = new Date(sDate);
        switch (axis.actualIntervalType) {
            case 'Years':
                let year: number = Math.floor(Math.floor(sResult.getFullYear() / intervalSize) * intervalSize);
                sResult = new Date(year, sResult.getMonth(), sResult.getDate(), 0, 0, 0);
                return sResult;

            case 'Months':
                let month: number = Math.floor(Math.floor((sResult.getMonth()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), month, sResult.getDate(), 0, 0, 0);
                return sResult;

            case 'Days':
                let day: number = Math.floor(Math.floor((sResult.getDate()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), day, 0, 0, 0);
                return sResult;

            case 'Hours':
                let hour: number = Math.floor(Math.floor((sResult.getHours()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), hour, 0, 0);
                return sResult;

            case 'Minutes':
                let minutes: number = Math.floor(Math.floor((sResult.getMinutes()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), minutes, 0, 0);
                return sResult;

            case 'Seconds':
                let seconds: number = Math.floor(Math.floor((sResult.getSeconds()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(),
                                   sResult.getHours(), sResult.getMinutes(), seconds, 0);
                return sResult;

        }
        return sResult;
    }

    /**
     * To get the skeleton for the DateTime axis.
     * @return {string}
     * @private
     */
    public getSkeleton(axis: Axis): string {
        let skeleton: string;
        if (axis.skeleton ) {
             return axis.skeleton;
        }
        if (axis.actualIntervalType === 'Years') {
            skeleton = 'yMMM';
        } else if (axis.actualIntervalType === 'Months') {
            skeleton = 'MMMd';
        } else if (axis.actualIntervalType === 'Days') {
            skeleton = 'yMd';
        } else if (axis.actualIntervalType === 'Hours') {
            skeleton = 'EHm';
        } else if (axis.actualIntervalType === 'Minutes' || axis.actualIntervalType === 'Seconds') {
            skeleton = 'Hms';
        } else {
            skeleton = 'Hms';
        }
        return skeleton;
    }


    private calculateDateTimeNiceInterval(axis: Axis, size: Size, start: number, end: number): number {
        let oneDay: number = 24 * 60 * 60 * 1000;
        let startDate: Date = new Date(start);
        let endDate: Date = new Date(end);
        //var axisInterval ;
        let totalDays: number = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
        let interval: number;
        axis.actualIntervalType = axis.intervalType;
        switch (axis.intervalType) {
            case 'Years':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                break;
            case 'Months':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                break;
            case 'Days':
                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                break;
            case 'Hours':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                break;
            case 'Minutes':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                break;
            case 'Seconds':
                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                break;
            case 'Auto':
                interval = this.calculateNumericNiceInterval(axis, totalDays / 365, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Years';
                    return interval;
                }

                interval = this.calculateNumericNiceInterval(axis, totalDays / 30, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Months';
                    return interval;
                }

                interval = this.calculateNumericNiceInterval(axis, totalDays, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Days';
                    return interval;
                }

                interval = this.calculateNumericNiceInterval(axis, totalDays * 24, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Hours';
                    return interval;
                }

                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60, size);
                if (interval >= 1) {
                    axis.actualIntervalType = 'Minutes';
                    return interval;
                }

                interval = this.calculateNumericNiceInterval(axis, totalDays * 24 * 60 * 60, size);
                axis.actualIntervalType = 'Seconds';
                return interval;
        }
        return interval;
    }
    /**
     * Get module name
     */
    protected getModuleName(): string {
        /**
         * Returns the module name
         */
        return 'DateTime';
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
