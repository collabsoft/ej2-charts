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
import { PathOption, degreeToLocation } from '../../common/utils/helper';
import { PieBase } from '../renderer/pie-base';
var PieSeries = (function (_super) {
    __extends(PieSeries, _super);
    function PieSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieSeries.prototype.renderPoint = function (point, series, chart, option) {
        var sum = series.sumOfPoints;
        var degree = ((Math.abs(point.y) / sum) * (this.totalAngle));
        option.d = this.getPathOption(point, degree);
        point.midAngle = (this.startAngle - (degree / 2)) % 360;
        point.endAngle = this.startAngle % 360;
        point.symbolLocation = degreeToLocation(point.midAngle, (this.radius + this.innerRadius) / 2, this.center);
        return option;
    };
    PieSeries.prototype.getPathOption = function (point, degree) {
        var path = this.getPathArc(this.center, this.startAngle % 360, (this.startAngle + degree) % 360, this.radius, this.innerRadius);
        this.startAngle += degree;
        return path;
    };
    PieSeries.prototype.animateSeries = function (accumulation, option, series, slice) {
        var groupId = accumulation.element.id + 'SeriesGroup' + series.index;
        if (series.animation.enable && accumulation.animateSeries) {
            var clippath = accumulation.renderer.createClipPath({ id: groupId + '_clipPath' });
            var path = new PathOption(groupId + '_slice', 'transparent', 1, 'transparent', 1, '', '');
            var clipslice = accumulation.renderer.drawPath(path);
            clippath.appendChild(clipslice);
            accumulation.svgObject.appendChild(clippath);
            slice.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
            this.doAnimation(clipslice, series);
        }
    };
    PieSeries.prototype.getModuleName = function () {
        return 'PieSeries';
    };
    PieSeries.prototype.destroy = function (accumulation) {
    };
    return PieSeries;
}(PieBase));
export { PieSeries };
