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
var SmaIndicator = (function (_super) {
    __extends(SmaIndicator, _super);
    function SmaIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmaIndicator.prototype.initDataSource = function (indicator, chart) {
        var smaPoints = [];
        var points = indicator.points;
        if (points && points.length) {
            var validData = points;
            var field = firstToLowerCase(indicator.field);
            var xField = 'x';
            var signalSeries = indicator.targetSeries[0];
            if (validData && validData.length && validData.length >= indicator.period) {
                var average = 0;
                var sum = 0;
                for (var i = 0; i < indicator.period; i++) {
                    sum += validData[i][field];
                }
                average = sum / indicator.period;
                smaPoints.push(this.getDataPoint(validData[indicator.period - 1][xField], average, validData[indicator.period - 1], signalSeries, smaPoints.length));
                var index = indicator.period;
                while (index < validData.length) {
                    sum -= validData[index - indicator.period][field];
                    sum += validData[index][field];
                    average = sum / indicator.period;
                    smaPoints.push(this.getDataPoint(validData[index][xField], average, validData[index], signalSeries, smaPoints.length));
                    index++;
                }
            }
            this.setSeriesRange(smaPoints, indicator);
        }
    };
    SmaIndicator.prototype.destroy = function (chart) {
    };
    SmaIndicator.prototype.getModuleName = function () {
        return 'SmaIndicator';
    };
    return SmaIndicator;
}(TechnicalAnalysis));
export { SmaIndicator };
