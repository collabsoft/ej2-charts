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
import { drawSymbol, PathOption, Size, markerAnimate, CircleOption, RectOption } from '../../common/utils/helper';
import { findlElement } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { pointRender } from '../../common/model/constants';
import { MarkerExplode } from './marker-explode';
import { getSaturationColor } from '../../common/utils/helper';
var Marker = (function (_super) {
    __extends(Marker, _super);
    function Marker(chart) {
        var _this = _super.call(this, chart) || this;
        _this.addEventListener();
        return _this;
    }
    Marker.prototype.render = function (series) {
        var _this = this;
        this.createElement(series);
        var _loop_1 = function (point) {
            if (point.visible && point.symbolLocations.length) {
                point.symbolLocations.map(function (location, index) {
                    _this.renderMarker(series, point, location, index);
                });
            }
        };
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            _loop_1(point);
        }
    };
    Marker.prototype.renderMarker = function (series, point, location, index) {
        var seriesIndex = series.index;
        var marker = series.marker;
        var border = {
            color: marker.border.color,
            width: marker.border.width
        };
        var shape = marker.shape;
        var borderColor = marker.border.color;
        var symbolId;
        var shapeOption;
        var isBoxPlot = series.type === 'BoxAndWhisker';
        var fill = marker.fill || (isBoxPlot ? series.interior : '#ffffff');
        var argsData;
        var parentElement = isBoxPlot ?
            findlElement(series.seriesElement.childNodes, 'Series_' + series.index + '_Point_' + point.index)
            : series.symbolElement;
        border.color = borderColor || series.interior;
        symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol' +
            (index ? index : '');
        argsData = {
            cancel: false, name: pointRender, series: series, point: point, fill: series.setPointColor(point, fill),
            border: {
                color: series.type === 'BoxAndWhisker' ?
                    (!isNullOrUndefined(borderColor) && borderColor !== 'transparent') ? borderColor :
                        getSaturationColor(fill, -0.6)
                    : border.color,
                width: border.width
            },
            height: marker.height,
            width: marker.width
        };
        argsData.border = series.setBorderColor(point, { width: argsData.border.width, color: argsData.border.color });
        this.chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        if (!argsData.cancel) {
            var y = void 0;
            if (series.type === 'RangeArea') {
                y = index ? point.low : point.high;
            }
            else if (isBoxPlot) {
                y = point.outliers[index];
            }
            else {
                y = point.y;
            }
            shapeOption = new PathOption(symbolId, argsData.fill, argsData.border.width, argsData.border.color, marker.opacity, null);
            if (parentElement !== undefined && parentElement !== null) {
                parentElement.appendChild(drawSymbol(location, shape, new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, point.x.toString() + ':' + y.toString()));
            }
        }
        else {
            location = null;
        }
    };
    Marker.prototype.createElement = function (series) {
        var markerClipRect;
        var marker = series.marker;
        var explodeValue = marker.border.width + 8 + 5;
        var render = series.chart.renderer;
        var transform;
        transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
        if (marker.visible) {
            var markerHeight = (marker.height + explodeValue) / 2;
            var markerWidth = (marker.width + explodeValue) / 2;
            if (series.chart.chartAreaType === 'Cartesian') {
                markerClipRect = render.drawClipPath(new RectOption(this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: series.clipRect.width + markerWidth * 2,
                    height: series.clipRect.height + markerHeight * 2
                }));
            }
            else {
                markerClipRect = render.drawCircularClipPath(new CircleOption(this.elementId + '_ChartMarkerClipRect_' + series.index, 'transparent', { width: 1, color: 'Gray' }, 1, series.clipRect.width / 2 + series.clipRect.x, series.clipRect.height / 2 + series.clipRect.y, series.chart.radius + Math.max(markerHeight, markerWidth)));
            }
            series.symbolElement = render.createGroup({
                'id': this.elementId + 'SymbolGroup' + series.index,
                'transform': transform,
                'clip-path': 'url(#' + this.elementId + '_ChartMarkerClipRect_' + series.index + ')'
            });
            series.symbolElement.appendChild(markerClipRect);
        }
    };
    Marker.prototype.getRangeLowPoint = function (region, series) {
        var x = region.x;
        var y = region.y;
        if (series.chart.requireInvertedAxis) {
            y += region.height / 2;
            x += series.yAxis.isInversed ? region.width : 0;
        }
        else {
            y += series.yAxis.isInversed ? 0 : region.height;
            x += region.width / 2;
        }
        return { x: x, y: y };
    };
    Marker.prototype.doMarkerAnimation = function (series) {
        if (!(series.isRectSeries || series.type === 'Scatter' || series.type === 'Bubble' ||
            (series.chart.chartAreaType === 'PolarRadar' && (series.drawType === 'Scatter' || series.drawType.indexOf('Column') > -1)))) {
            var markerElements = series.symbolElement.childNodes;
            var delay = series.animation.delay + series.animation.duration;
            var j = 1;
            var incFactor = series.type === 'RangeArea' ? 2 : 1;
            for (var i = 0; i < series.points.length; i++) {
                if (!series.points[i].symbolLocations.length) {
                    continue;
                }
                markerAnimate(markerElements[j], delay, 200, series, i, series.points[i].symbolLocations[0], false);
                if (incFactor === 2) {
                    var lowPoint = this.getRangeLowPoint(series.points[i].regions[0], series);
                    markerAnimate(markerElements[j + 1], delay, 200, series, i, lowPoint, false);
                }
                j += incFactor;
            }
        }
    };
    return Marker;
}(MarkerExplode));
export { Marker };
