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
import { PolarSeries } from '../series/polar-series';
var RadarSeries = (function (_super) {
    __extends(RadarSeries, _super);
    function RadarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadarSeries.prototype.render = function (series) {
        var seriesType = firstToLowerCase(series.drawType);
        if (series.drawType.indexOf('Column') === -1) {
            series.chart[seriesType + 'SeriesModule'].render(series, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
        }
        else {
            this.columnDrawTypeRender(series);
        }
    };
    RadarSeries.prototype.getModuleName = function () {
        return 'RadarSeries';
    };
    RadarSeries.prototype.destroy = function (chart) {
    };
    return RadarSeries;
}(PolarSeries));
export { RadarSeries };
