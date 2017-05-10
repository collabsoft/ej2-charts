import { Animation } from '@syncfusion/ej2-base';
var LineBase = (function () {
    function LineBase() {
    }
    LineBase.prototype.improveChartPerformance = function (series) {
        var tempPoints = [];
        var xVisibleRange = series.xAxis.visibleRange;
        var yVisibleRange = series.yAxis.visibleRange;
        var seriesPoints = series.points;
        var areaBounds = series.clipRect;
        var xTolerance = Math.abs(xVisibleRange.delta / areaBounds.width);
        var yTolerance = Math.abs(yVisibleRange.delta / areaBounds.height);
        var prevXValue = (seriesPoints[0] && seriesPoints[0].x > xTolerance) ? 0 : xTolerance;
        var prevYValue = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
        var xVal = 0;
        var yVal = 0;
        var currentPoint;
        for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
            var currentPoint_1 = seriesPoints_1[_i];
            currentPoint_1.symbolLocation = null;
            xVal = currentPoint_1.xValue ? currentPoint_1.xValue : xVisibleRange.min;
            yVal = currentPoint_1.yValue ? currentPoint_1.yValue : yVisibleRange.min;
            if (Math.abs(prevXValue - xVal) >= xTolerance || Math.abs(prevYValue - yVal) >= yTolerance) {
                tempPoints.push(currentPoint_1);
                prevXValue = xVal;
                prevYValue = yVal;
            }
        }
        return tempPoints;
    };
    LineBase.prototype.appendLinePath = function (options, series) {
        var htmlObject = series.chart.renderer.drawPath(options);
        series.pathElement = htmlObject;
        series.seriesElement.appendChild(htmlObject);
        series.isRectSeries = false;
    };
    LineBase.prototype.renderMarker = function (series) {
        if (series.marker.visible) {
            series.chart.markerModule.render(series);
        }
    };
    LineBase.prototype.doProgressiveAnimation = function (series, option) {
        var animation = new Animation({});
        var path = series.pathElement;
        var strokeDashArray = path.getAttribute('stroke-dasharray');
        var pathLength = series.pathElement.getTotalLength();
        var currentTime;
        path.style.visibility = 'hidden';
        strokeDashArray = strokeDashArray !== 'null' ? strokeDashArray : '0';
        animation.animate(path, {
            duration: option.duration,
            delay: option.delay,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    path.style.visibility = 'visible';
                    currentTime = Math.abs(Math.round(((args.timeStamp - args.delay) * pathLength) / args.duration));
                    path.setAttribute('stroke-dasharray', currentTime + ',' + pathLength);
                }
            },
            end: function (model) {
                path.setAttribute('stroke-dasharray', strokeDashArray);
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    };
    LineBase.prototype.doLinearAnimation = function (series, animation) {
        var clipRect = series.clipRectElement.childNodes[0].childNodes[0];
        var eleWidth = +clipRect.getAttribute('width');
        var width = 0;
        clipRect.setAttribute('width', '0');
        new Animation({}).animate(clipRect, {
            delay: animation.delay,
            duration: animation.duration,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    width = ((args.timeStamp - args.delay) / args.duration) * eleWidth;
                    clipRect.setAttribute('width', width.toString());
                }
            },
            end: function (model) {
                clipRect.setAttribute('width', eleWidth.toString());
                series.chart.trigger('animationComplete', { series: series });
            }
        });
    };
    return LineBase;
}());
export { LineBase };
