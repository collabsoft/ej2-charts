import { Double } from '../axis/double-axis';
import { Axis, Size } from '../../chart/index';
/**
 * Common axis classes
 * @private
 */

export class NiceInterval extends Double {
    /**
     * Method to calculate numeric datetime interval
     */
    public calculateDateTimeNiceInterval(axis: Axis, size: Size, start: number, end: number): number {
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
     * To get the skeleton for the DateTime axis.
     * @return {string}
     *  @private
     */
    public getSkeleton(axis: Axis): string {
        let skeleton: string;
        if (axis.skeleton) {
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
}