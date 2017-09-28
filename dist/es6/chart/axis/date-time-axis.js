var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Double } from '../axis/double-axis';
import { DoubleRange } from '../utils/double-range';
import { withIn } from '../../common/utils/helper';
var DateTime = (function (_super) {
    __extends(DateTime, _super);
    function DateTime(chart) {
        return _super.call(this, chart) || this;
    }
    DateTime.prototype.calculateRangeAndInterval = function (size, axis) {
        this.calculateRange(axis, size);
        this.getActualRange(axis, size);
        this.applyRangePadding(axis, size);
        this.calculateVisibleLabels(axis);
    };
    DateTime.prototype.getActualRange = function (axis, size) {
        var option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        var dateParser = this.chart.intl.getDateParser(option);
        var dateFormatter = this.chart.intl.getDateFormat(option);
        if ((axis.minimum) !== null) {
            this.min = Date.parse(dateParser(dateFormatter(axis.minimum)));
        }
        else if (this.min === null || this.min === Number.POSITIVE_INFINITY) {
            this.min = Date.parse(dateParser(dateFormatter(new Date(1970, 1, 1))));
        }
        if ((axis.maximum) !== null) {
            this.max = Date.parse(dateParser(dateFormatter(axis.maximum)));
        }
        else if (this.max === null || this.max === Number.NEGATIVE_INFINITY) {
            this.max = Date.parse(dateParser(dateFormatter(new Date(1970, 5, 1))));
        }
        if (this.min === this.max) {
            this.max = this.max + 2592000000;
            this.min = this.min - 2592000000;
        }
        axis.actualRange = {};
        axis.doubleRange = new DoubleRange(this.min, this.max);
        var datetimeInterval = this.calculateDateTimeNiceInterval(axis, size, axis.doubleRange.start, axis.doubleRange.end);
        if (!axis.interval) {
            axis.actualRange.interval = datetimeInterval;
        }
        else {
            axis.actualRange.interval = axis.interval;
        }
        axis.actualRange.min = axis.doubleRange.start;
        axis.actualRange.max = axis.doubleRange.end;
    };
    DateTime.prototype.applyRangePadding = function (axis, size) {
        this.start = (axis.actualRange.min);
        this.end = (axis.actualRange.max);
        var minimum;
        var maximum;
        var interval = axis.actualRange.interval;
        if (!axis.setRange()) {
            var rangePadding = axis.getRangePadding(this.chart);
            minimum = new Date(this.start);
            maximum = new Date(this.end);
            var intervalType = axis.actualIntervalType;
            if (rangePadding === 'None') {
                this.start = minimum.getTime();
                this.end = maximum.getTime();
            }
            else if (rangePadding === 'Additional' || rangePadding === 'Round') {
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
                        var minute = (minimum.getMinutes() / interval) * interval;
                        var endMinute = maximum.getMinutes() + (minimum.getMinutes() - minute);
                        if (rangePadding === 'Round') {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minute, 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute, 59)).getTime();
                        }
                        else {
                            this.start = (new Date(minimum.getFullYear(), maximum.getMonth(), minimum.getDate(), minimum.getHours(), minute + (-interval), 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), endMinute + (interval), 0)).getTime();
                        }
                        break;
                    case 'Seconds':
                        var second = (minimum.getSeconds() / interval) * interval;
                        var endSecond = maximum.getSeconds() + (minimum.getSeconds() - second);
                        if (rangePadding === 'Round') {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second, 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond, 0)).getTime();
                        }
                        else {
                            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), minimum.getHours(), minimum.getMinutes(), second + (-interval), 0)).getTime();
                            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), maximum.getHours(), maximum.getMinutes(), endSecond + (interval), 0)).getTime();
                        }
                        break;
                }
            }
        }
        axis.actualRange.min = (axis.minimum != null) ? this.min : this.start;
        axis.actualRange.max = (axis.maximum != null) ? this.max : this.end;
        axis.actualRange.delta = (axis.actualRange.max - axis.actualRange.min);
        axis.doubleRange = new DoubleRange(axis.actualRange.min, axis.actualRange.max);
        this.calculateVisibleRange(size, axis);
    };
    DateTime.prototype.getYear = function (minimum, maximum, rangePadding, interval) {
        var startYear = minimum.getFullYear();
        var endYear = maximum.getFullYear();
        if (rangePadding === 'Additional') {
            this.start = (new Date(startYear - interval, 1, 1, 0, 0, 0)).getTime();
            this.end = (new Date(endYear + interval, 1, 1, 0, 0, 0)).getTime();
        }
        else {
            this.start = new Date(startYear, 0, 0, 0, 0, 0).getTime();
            this.end = new Date(endYear, 11, 30, 23, 59, 59).getTime();
        }
    };
    DateTime.prototype.getMonth = function (minimum, maximum, rangePadding, interval) {
        var month = minimum.getMonth();
        var endMonth = maximum.getMonth();
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), month, 0, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), endMonth, new Date(maximum.getFullYear(), maximum.getMonth(), 0).getDate(), 23, 59, 59)).getTime();
        }
        else {
            this.start = (new Date(minimum.getFullYear(), month + (-interval), 1, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), endMonth + (interval), endMonth === 2 ? 28 : 30, 0, 0, 0)).getTime();
        }
    };
    DateTime.prototype.getDay = function (minimum, maximum, rangePadding, interval) {
        var day = minimum.getDate();
        var endDay = maximum.getDate();
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day, 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay, 23, 59, 59)).getTime();
        }
        else {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), day + (-interval), 0, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), endDay + (interval), 0, 0, 0)).getTime();
        }
    };
    DateTime.prototype.getHour = function (minimum, maximum, rangePadding, interval) {
        var hour = (minimum.getHours() / interval) * interval;
        var endHour = maximum.getHours() + (minimum.getHours() - hour);
        if (rangePadding === 'Round') {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour, 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour, 59, 59)).getTime();
        }
        else {
            this.start = (new Date(minimum.getFullYear(), minimum.getMonth(), minimum.getDate(), hour + (-interval), 0, 0)).getTime();
            this.end = (new Date(maximum.getFullYear(), maximum.getMonth(), maximum.getDate(), endHour + (interval), 0, 0)).getTime();
        }
    };
    DateTime.prototype.calculateVisibleRange = function (size, axis) {
        axis.visibleRange = axis.actualRange;
        if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
            axis.calculateVisibleRange(size);
            axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                this.calculateDateTimeNiceInterval(axis, size, axis.visibleRange.min, axis.visibleRange.max)
                : axis.visibleRange.interval;
        }
        axis.dateTimeInterval = this.increaseDateTimeInterval(axis, axis.visibleRange.min, axis.visibleRange.interval).getTime()
            - axis.visibleRange.min;
    };
    DateTime.prototype.calculateVisibleLabels = function (axis) {
        axis.visibleLabels = [];
        var tempInterval = axis.visibleRange.min;
        if (!axis.setRange()) {
            tempInterval = this.alignRangeStart(axis, tempInterval, axis.visibleRange.interval, axis.actualIntervalType).getTime();
        }
        axis.format = this.chart.intl.getDateFormat({ skeleton: this.getLabelFormat(axis), type: 'dateTime' });
        axis.startLabel = axis.format(new Date(axis.visibleRange.min));
        axis.endLabel = axis.format(new Date(axis.visibleRange.max));
        while (tempInterval <= axis.visibleRange.max) {
            if (withIn(tempInterval, axis.visibleRange)) {
                axis.triggerLabelRender(this.chart, tempInterval, axis.format(new Date(tempInterval)));
            }
            tempInterval = this.increaseDateTimeInterval(axis, tempInterval, axis.visibleRange.interval).getTime();
        }
        axis.getMaxLabelWidth(this.chart);
    };
    DateTime.prototype.increaseDateTimeInterval = function (axis, value, interval) {
        var result = new Date(value);
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
    };
    DateTime.prototype.alignRangeStart = function (axis, sDate, intervalSize, intervalType) {
        var sResult = new Date(sDate);
        switch (axis.actualIntervalType) {
            case 'Years':
                var year = Math.floor(Math.floor(sResult.getFullYear() / intervalSize) * intervalSize);
                sResult = new Date(year, sResult.getMonth(), sResult.getDate(), 0, 0, 0);
                return sResult;
            case 'Months':
                var month = Math.floor(Math.floor((sResult.getMonth()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), month, sResult.getDate(), 0, 0, 0);
                return sResult;
            case 'Days':
                var day = Math.floor(Math.floor((sResult.getDate()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), day, 0, 0, 0);
                return sResult;
            case 'Hours':
                var hour = Math.floor(Math.floor((sResult.getHours()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), hour, 0, 0);
                return sResult;
            case 'Minutes':
                var minutes = Math.floor(Math.floor((sResult.getMinutes()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), minutes, 0, 0);
                return sResult;
            case 'Seconds':
                var seconds = Math.floor(Math.floor((sResult.getSeconds()) / intervalSize) * intervalSize);
                sResult = new Date(sResult.getFullYear(), sResult.getMonth(), sResult.getDate(), sResult.getHours(), sResult.getMinutes(), seconds, 0);
                return sResult;
        }
        return sResult;
    };
    DateTime.prototype.getLabelFormat = function (axis) {
        var format;
        if (axis.labelFormat) {
            return axis.labelFormat;
        }
        if (axis.actualIntervalType === 'Years') {
            format = 'yMMM';
        }
        else if (axis.actualIntervalType === 'Months') {
            format = 'MMMd';
        }
        else if (axis.actualIntervalType === 'Days') {
            format = 'yMd';
        }
        else if (axis.actualIntervalType === 'Hours') {
            format = 'EHm';
        }
        else if (axis.actualIntervalType === 'Minutes' || axis.actualIntervalType === 'Seconds') {
            format = 'Hms';
        }
        else {
            format = 'Hms';
        }
        return format;
    };
    DateTime.prototype.calculateDateTimeNiceInterval = function (axis, size, start, end) {
        var oneDay = 24 * 60 * 60 * 1000;
        var startDate = new Date(start);
        var endDate = new Date(end);
        var totalDays = (Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay)));
        var interval;
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
    };
    DateTime.prototype.getModuleName = function () {
        return 'DateTime';
    };
    DateTime.prototype.destroy = function (chart) {
    };
    return DateTime;
}(Double));
export { DateTime };
