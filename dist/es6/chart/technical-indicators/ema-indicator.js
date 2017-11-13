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
import { firstToLowerCase } from '../../common/utils/helper';
import { TechnicalAnalysis } from './indicator-base';
var EmaIndicator = (function (_super) {
    __extends(EmaIndicator, _super);
    function EmaIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmaIndicator.prototype.initDataSource = function (indicator, chart) {
        var field = firstToLowerCase(indicator.field);
        var xField = 'x';
        var emaPoints = [];
        var signalSeries = indicator.targetSeries[0];
        var validData = indicator.points;
        if (validData && validData.length && validData.length >= indicator.period) {
            var sum = 0;
            var average = 0;
            var k = (2 / (indicator.period + 1));
            for (var i = 0; i < indicator.period; i++) {
                sum += validData[i][field];
            }
            average = sum / indicator.period;
            emaPoints.push(this.getDataPoint(validData[indicator.period - 1][xField], average, validData[indicator.period - 1], signalSeries, emaPoints.length));
            var index = indicator.period;
            while (index < validData.length) {
                var prevAverage = emaPoints[index - indicator.period][signalSeries.yName];
                var yValue = (validData[index][field] - prevAverage) * k + prevAverage;
                emaPoints.push(this.getDataPoint(validData[index][xField], yValue, validData[index], signalSeries, emaPoints.length));
                index++;
            }
        }
        this.setSeriesRange(emaPoints, indicator);
    };
    EmaIndicator.prototype.destroy = function (chart) {
    };
    EmaIndicator.prototype.getModuleName = function () {
        return 'EmaIndicator';
    };
    return EmaIndicator;
}(TechnicalAnalysis));
export { EmaIndicator };
