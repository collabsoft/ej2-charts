import { withInRange, getPoint, PathOption, drawSymbol, Size, Rect, markerAnimate } from '../../common/utils/helper';
import { pointRender } from '../../common/model/constants';
var BubbleSeries = (function () {
    function BubbleSeries() {
    }
    BubbleSeries.prototype.render = function (series, xAxis, yAxis) {
        var marker = series.marker;
        var visiblePoints = series.points;
        var shapeOption;
        var argsData;
        var segmentRadius;
        var radius;
        var value = Math.max(series.chart.initialClipRect.height, series.chart.initialClipRect.width);
        var percentChange = value / 100;
        var maxRadius = series.maxRadius * percentChange;
        var minRadius = series.minRadius * percentChange;
        var maximumSize = null;
        var maxValue = null;
        if ((series.maxRadius === null || series.minRadius === null)) {
            for (var _i = 0, _a = series.chart.visibleSeries; _i < _a.length; _i++) {
                var value_1 = _a[_i];
                if (value_1.type === 'Bubble' && value_1.visible === true && (value_1.maxRadius === null || value_1.minRadius === null)) {
                    maximumSize = value_1.sizeMax > maximumSize ? value_1.sizeMax : maximumSize;
                }
            }
            maxValue = (value / 5) / 2;
            minRadius = maxRadius = 1;
            radius = maxValue * maxRadius;
        }
        else {
            maximumSize = series.sizeMax;
            radius = maxRadius - minRadius;
        }
        for (var _b = 0, visiblePoints_1 = visiblePoints; _b < visiblePoints_1.length; _b++) {
            var bubblePoint = visiblePoints_1[_b];
            bubblePoint.symbolLocation = null;
            if (bubblePoint.visible &&
                withInRange(visiblePoints[bubblePoint.index - 1], bubblePoint, visiblePoints[bubblePoint.index + 1], series)) {
                bubblePoint.symbolLocation = getPoint(bubblePoint.xValue, bubblePoint.yValue, xAxis, yAxis);
                if ((series.maxRadius === null || series.minRadius === null)) {
                    segmentRadius = radius * Math.abs(+bubblePoint.size / maximumSize);
                }
                else {
                    segmentRadius = minRadius + radius * Math.abs(+bubblePoint.size / maximumSize);
                }
                segmentRadius = segmentRadius || minRadius;
                argsData = {
                    cancel: false, name: pointRender, series: series, point: bubblePoint, fill: series.interior,
                    border: series.border, height: 2 * segmentRadius, width: 2 * segmentRadius
                };
                series.chart.trigger(pointRender, argsData);
                if (!argsData.cancel) {
                    bubblePoint.color = argsData.fill;
                    shapeOption = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + bubblePoint.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
                    series.seriesElement.appendChild(drawSymbol(bubblePoint.symbolLocation, 'Circle', new Size(argsData.width, argsData.height), marker.imageUrl, shapeOption, bubblePoint.x.toString() + ':' + bubblePoint.y.toString()));
                    bubblePoint.region = new Rect(bubblePoint.symbolLocation.x - segmentRadius, bubblePoint.symbolLocation.y - segmentRadius, 2 * segmentRadius, 2 * segmentRadius);
                }
            }
        }
    };
    BubbleSeries.prototype.destroy = function (chart) {
    };
    BubbleSeries.prototype.getModuleName = function () {
        return 'BubbleSeries';
    };
    BubbleSeries.prototype.doAnimation = function (series) {
        var duration = series.animation.duration;
        var delay = series.animation.delay;
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var bubblePoint = _a[_i];
            if (!bubblePoint.symbolLocation) {
                continue;
            }
            markerAnimate(rectElements[count], delay, duration, series, bubblePoint.index, bubblePoint.symbolLocation, false);
            count++;
        }
    };
    return BubbleSeries;
}());
export { BubbleSeries };
