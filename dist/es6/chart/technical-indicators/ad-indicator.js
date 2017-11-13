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
import { TechnicalAnalysis } from './indicator-base';
var AccumulationDistributionIndicator = (function (_super) {
    __extends(AccumulationDistributionIndicator, _super);
    function AccumulationDistributionIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccumulationDistributionIndicator.prototype.initDataSource = function (indicator, chart) {
        var sourceSeries = indicator.sourceSeries;
        var adPoints = [];
        var validData = indicator.points;
        if (validData.length > 0 && validData.length > indicator.period) {
            adPoints = this.calculateADPoints(indicator, validData);
        }
        this.setSeriesRange(adPoints, indicator);
    };
    AccumulationDistributionIndicator.prototype.calculateADPoints = function (indicator, validData) {
        var temp = [];
        var sum = 0;
        var i = 0;
        var value = 0;
        var high = 0;
        var low = 0;
        var close = 0;
        var signalSeries = indicator.targetSeries[0];
        for (i = 0; i < validData.length; i++) {
            high = Number(validData[i].high);
            low = Number(validData[i].low);
            close = Number(validData[i].close);
            value = ((close - low) - (high - close)) / (high - low);
            sum = sum + value * Number(validData[i].volume);
            temp[i] = this.getDataPoint(validData[i].x, sum, validData[i], signalSeries, temp.length);
        }
        return temp;
    };
    AccumulationDistributionIndicator.prototype.destroy = function (chart) {
    };
    AccumulationDistributionIndicator.prototype.getModuleName = function () {
        return 'AccumulationDistributionIndicator';
    };
    return AccumulationDistributionIndicator;
}(TechnicalAnalysis));
export { AccumulationDistributionIndicator };
