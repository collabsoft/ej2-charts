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
import { Series } from '../series/chart-series';
import { TechnicalAnalysis } from './indicator-base';
var MomentumIndicator = (function (_super) {
    __extends(MomentumIndicator, _super);
    function MomentumIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MomentumIndicator.prototype.initSeriesCollection = function (indicator, chart) {
        _super.prototype.initSeriesCollection.call(this, indicator, chart);
        var upperLine = new Series(indicator, 'targetSeries', {}, true);
        _super.prototype.setSeriesProperties.call(this, upperLine, indicator, 'UpperLine', indicator.upperLine.color, indicator.upperLine.width, chart);
    };
    MomentumIndicator.prototype.initDataSource = function (indicator, chart) {
        var upperCollection = [];
        var signalCollection = [];
        var validData = indicator.points;
        if (validData && validData.length) {
            var upperSeries = indicator.targetSeries[1];
            var signalSeries = indicator.targetSeries[0];
            var length_1 = indicator.period;
            if (validData.length >= indicator.period) {
                for (var i = 0; i < validData.length; i++) {
                    upperCollection.push(this.getDataPoint(validData[i].x, 100, validData[i], upperSeries, upperCollection.length));
                    if (!(i < length_1)) {
                        signalCollection.push(this.getDataPoint(validData[i].x, (Number(validData[i].close) / Number(validData[i - length_1].close) * 100), validData[i], signalSeries, signalCollection.length));
                    }
                }
            }
            this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
            this.setSeriesRange(upperCollection, indicator, indicator.targetSeries[1]);
        }
    };
    MomentumIndicator.prototype.destroy = function (chart) {
    };
    MomentumIndicator.prototype.getModuleName = function () {
        return 'MomentumIndicator';
    };
    return MomentumIndicator;
}(TechnicalAnalysis));
export { MomentumIndicator };
