import { Animation } from '@syncfusion/ej2-base';
import { DoubleRange } from '../utils/double-range';
import { Rect, ChartLocation, valueToCoefficient, getMinPointsDelta, PathOption, logBase } from '../../common/utils/helper';
import { getAnimationFunction } from '../../common/utils/helper';
import { pointRender } from '../../common/model/constants';
var ColumnBase = (function () {
    function ColumnBase() {
    }
    ColumnBase.prototype.getSideBySideInfo = function (series) {
        if (!series.position) {
            this.getSideBySidePositions(series);
        }
        series.isRectSeries = true;
        var visibleSeries = series.chart.visibleSeries;
        var seriesSpacing = 0;
        var pointSpacing = 0.7;
        var minimumPointDelta = getMinPointsDelta(series.xAxis, visibleSeries);
        var width = minimumPointDelta * pointSpacing;
        var radius;
        var location = (series.position) / series.rectCount - 0.5;
        var doubleRange = new DoubleRange(location, location + (1 / series.rectCount));
        if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
            doubleRange = new DoubleRange(doubleRange.start * width, doubleRange.end * width);
            radius = (seriesSpacing) * (doubleRange.start - doubleRange.end);
            doubleRange = new DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
        }
        return doubleRange;
    };
    ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
        var point1 = this.getPointOrigin(x1, y1, series);
        var point2 = this.getPointOrigin(x2, y2, series);
        return new Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
    };
    ColumnBase.prototype.getPointOrigin = function (x, y, series) {
        if (series.chart.requireInvertedAxis) {
            x = (series.yAxis.valueType === 'Logarithmic' ? logBase(x === 0 ? 1 : x, series.yAxis.logBase) : x);
            y = (series.xAxis.valueType === 'Logarithmic' ? logBase(y, series.xAxis.logBase) : y);
            return new ChartLocation((valueToCoefficient(x, series.yAxis)) * series.yAxis.rect.width, (1 - valueToCoefficient(y, series.xAxis)) * series.xAxis.rect.height);
        }
        else {
            x = (series.xAxis.valueType === 'Logarithmic' ? logBase(x, series.xAxis.logBase) : x);
            y = (series.yAxis.valueType === 'Logarithmic' ? logBase(y === 0 ? 1 : y, series.yAxis.logBase) : y);
            return new ChartLocation((valueToCoefficient(x, series.xAxis)) * series.xAxis.rect.width, (1 - valueToCoefficient(y, series.yAxis)) * series.yAxis.rect.height);
        }
    };
    ColumnBase.prototype.getSideBySidePositions = function (series) {
        var chart = series.chart;
        var seriesCollection = [];
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.findRectPosition(series.findSeriesCollection(columnItem, item, false));
            }
        }
    };
    ColumnBase.prototype.findRectPosition = function (seriesCollection) {
        var stackingGroup = [];
        var vSeries = { rectCount: 0, position: null };
        seriesCollection.forEach(function (value) {
            if (value.type.indexOf('Stacking') !== -1) {
                if (value.stackingGroup) {
                    if (stackingGroup[value.stackingGroup] === undefined) {
                        value.position = vSeries.rectCount;
                        stackingGroup[value.stackingGroup] = vSeries.rectCount++;
                    }
                    else {
                        value.position = stackingGroup[value.stackingGroup];
                    }
                }
                else {
                    if (vSeries.position === null) {
                        value.position = vSeries.rectCount;
                        vSeries.position = vSeries.rectCount++;
                    }
                    else {
                        value.position = vSeries.position;
                    }
                }
            }
            else {
                value.position = vSeries.rectCount++;
            }
        });
        seriesCollection.forEach(function (value) {
            value.rectCount = vSeries.rectCount;
        });
    };
    ColumnBase.prototype.updateXRegion = function (point, rect, series) {
        point.region = rect;
        point.symbolLocation = {
            x: rect.x + (rect.width) / 2,
            y: ((series.seriesType === 'HighLow' && series.yAxis.isInversed) || (point.yValue < 0 !== series.yAxis.isInversed)) ?
                rect.y + rect.height : rect.y
        };
    };
    ColumnBase.prototype.updateYRegion = function (point, rect, series) {
        point.region = new Rect(rect.x, rect.y, rect.width, rect.height);
        point.symbolLocation = {
            x: point.yValue < 0 !== series.yAxis.isInversed ? rect.x : rect.x + rect.width,
            y: rect.y + rect.height / 2
        };
    };
    ColumnBase.prototype.triggerEvent = function (chart, series, point) {
        var argsData = {
            cancel: false, name: pointRender, series: series, point: point, fill: series.interior, border: series.border
        };
        chart.trigger(pointRender, argsData);
        point.color = argsData.fill;
        return argsData;
    };
    ColumnBase.prototype.drawRectangle = function (series, point, rect, argsData) {
        var check = series.chart.requireInvertedAxis ? rect.height : rect.width;
        if (check <= 0) {
            return null;
        }
        var direction = ('M' + ' ' + (rect.x) + ' ' + (rect.y + rect.height) + ' ' +
            'L' + ' ' + (rect.x) + ' ' + (rect.y) + ' ' +
            'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y) + ' ' +
            'L' + ' ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + 'Z');
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
        var element = series.chart.renderer.drawPath(options);
        switch (series.seriesType) {
            case 'XY':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.y.toString());
                break;
            case 'HighLow':
                element.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString() + ':' + point.low.toString());
                break;
        }
        series.seriesElement.appendChild(element);
    };
    ColumnBase.prototype.animate = function (series) {
        var rectElements = series.seriesElement.childNodes;
        var count = 1;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (!point.symbolLocation) {
                continue;
            }
            this.animateRect(rectElements[count], series, point);
            count++;
        }
    };
    ColumnBase.prototype.animateRect = function (element, series, point) {
        var option = series.animation;
        var effect = getAnimationFunction('Linear');
        var isPlot = point.yValue < 0;
        var x;
        var y;
        var elementHeight = +point.region.height;
        var elementWidth = +point.region.width;
        var centerX;
        var centerY;
        if (!series.chart.requireInvertedAxis) {
            x = +point.region.x;
            if (series.type === 'StackingColumn' || series.type === 'StackingColumn100') {
                y = (1 - valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                centerX = x;
                centerY = y;
            }
            else {
                y = +point.region.y;
                centerY = (series.seriesType === 'HighLow') ? y + elementHeight / 2 :
                    (isPlot !== series.yAxis.isInversed) ? y : y + elementHeight;
                centerX = isPlot ? x : x + elementWidth;
            }
        }
        else {
            y = +point.region.y;
            if (series.type === 'StackingBar' || series.type === 'StackingBar100') {
                x = (valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                centerX = x;
                centerY = y;
            }
            else {
                x = +point.region.x;
                centerY = isPlot ? y : y + elementHeight;
                centerX = isPlot !== series.yAxis.isInversed ? x + elementWidth : x;
            }
        }
        var value;
        element.style.visibility = 'hidden';
        new Animation({}).animate(element, {
            duration: option.duration,
            delay: option.delay,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    element.style.visibility = 'visible';
                    if (!series.chart.requireInvertedAxis) {
                        elementHeight = elementHeight ? elementHeight : 1;
                        value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                        element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                            ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                    }
                    else {
                        elementWidth = elementWidth ? elementWidth : 1;
                        value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                        element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                            ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                    }
                }
            },
            end: function (model) {
                element.setAttribute('transform', 'translate(0,0)');
                if ((point.index === series.points.length - 1)) {
                    series.chart.trigger('animationComplete', { series: series });
                }
            }
        });
    };
    return ColumnBase;
}());
export { ColumnBase };
