import { drawSymbol, PathOption, Size, markerAnimate } from '../utils/helper';
import { pointRender } from '../model/constants';
var Marker = (function () {
    function Marker(chart) {
        this.chart = chart;
        this.elementId = chart.element.id;
    }
    Marker.prototype.render = function (series) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = marker.border;
        var shape = marker.shape;
        var symbolId;
        var shapeOption;
        var fill = marker.fill || series.interior;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible && point.symbolLocation) {
                border.color = border.color || fill;
                symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol';
                argsData = {
                    cancel: false, name: pointRender, series: series, point: point, fill: fill, border: border, height: marker.height,
                    width: marker.width
                };
                this.chart.trigger(pointRender, argsData);
                point.color = argsData.fill;
                if (!argsData.cancel) {
                    shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, marker.opacity, null);
                    series.symbolElement.appendChild(drawSymbol(point.symbolLocation, shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + point.y.toString()));
                }
            }
        }
    };
    Marker.prototype.doMarkerAnimation = function (series) {
        if (!(series.type.indexOf('Column') > -1 || series.type.indexOf('Bar') > -1 || series.type === 'Scatter')) {
            var markerElements = series.symbolElement.childNodes;
            var delay = series.animation.delay + series.animation.duration;
            var j = 1;
            for (var i = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocation) {
                    continue;
                }
                markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocation, false);
                j++;
            }
        }
    };
    Marker.prototype.getModuleName = function () {
        return 'Marker';
    };
    Marker.prototype.destroy = function (chart) {
    };
    return Marker;
}());
export { Marker };
