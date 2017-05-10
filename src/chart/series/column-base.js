define(["require", "exports", "@syncfusion/ej2-base", "../utils/double-range", "../utils/helper", "../model/constants"], function (require, exports, ej2_base_1, double_range_1, helper_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var minimumPointDelta = helper_1.getMinPointsDelta(series.xAxis, visibleSeries);
            var width = minimumPointDelta * pointSpacing;
            var radius;
            var location = (series.position) / series.rectCount - 0.5;
            var doubleRange = new double_range_1.DoubleRange(location, location + (1 / series.rectCount));
            if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
                doubleRange = new double_range_1.DoubleRange(doubleRange.start * width, doubleRange.end * width);
                radius = (seriesSpacing) * (doubleRange.start - doubleRange.end);
                doubleRange = new double_range_1.DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
            }
            return doubleRange;
        };
        ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
            var point1 = this.getPointOrigin(x1, y1, series);
            var point2 = this.getPointOrigin(x2, y2, series);
            return new helper_1.Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
        };
        ColumnBase.prototype.getPointOrigin = function (x, y, series) {
            if (series.chart.requireInvertedAxis) {
                x = (series.yAxis.valueType === 'Logarithmic' ? helper_1.logBase(x === 0 ? 1 : x, series.yAxis.logBase) : x);
                y = (series.xAxis.valueType === 'Logarithmic' ? helper_1.logBase(y, series.xAxis.logBase) : y);
                return new helper_1.ChartLocation((helper_1.valueToCoefficient(x, series.yAxis)) * series.yAxis.rect.width, (1 - helper_1.valueToCoefficient(y, series.xAxis)) * series.xAxis.rect.height);
            }
            else {
                x = (series.xAxis.valueType === 'Logarithmic' ? helper_1.logBase(x, series.xAxis.logBase) : x);
                y = (series.yAxis.valueType === 'Logarithmic' ? helper_1.logBase(y === 0 ? 1 : y, series.yAxis.logBase) : y);
                return new helper_1.ChartLocation((helper_1.valueToCoefficient(x, series.xAxis)) * series.xAxis.rect.width, (1 - helper_1.valueToCoefficient(y, series.yAxis)) * series.yAxis.rect.height);
            }
        };
        ColumnBase.prototype.getSideBySidePositions = function (series) {
            var chart = series.chart;
            var seriesCollection = [];
            var axis = series.chart.requireInvertedAxis ? series.chart.verticalAxes : series.chart.horizontalAxes;
            var column;
            var row;
            var stackingGroup = [];
            var verticalSeries = [];
            var axisCollection;
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                seriesCollection = [];
                axisCollection = [];
                for (var _b = 0, _c = column.axes; _b < _c.length; _b++) {
                    var columnAxis = _c[_b];
                    axisCollection.push(columnAxis);
                }
                var _loop_1 = function (index) {
                    for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
                        var item_1 = _a[_i];
                        row = item_1;
                        seriesCollection = [];
                        for (var _b = 0, _c = row.axes; _b < _c.length; _b++) {
                            var rowAxis = _c[_b];
                            for (var _d = 0, _e = rowAxis.series; _d < _e.length; _d++) {
                                var rowSeries = _e[_d];
                                for (var _f = 0, axisCollection_1 = axisCollection; _f < axisCollection_1.length; _f++) {
                                    var axis_1 = axisCollection_1[_f];
                                    for (var _g = 0, _h = axis_1.series; _g < _h.length; _g++) {
                                        var series_1 = _h[_g];
                                        if (series_1 === rowSeries && this_1.rectSeriesInChart(series_1) && series_1.visible) {
                                            seriesCollection.push(series_1);
                                        }
                                    }
                                }
                            }
                        }
                        verticalSeries = [];
                        stackingGroup = [];
                        verticalSeries[index] = [];
                        verticalSeries[index].rectCount = 0;
                        seriesCollection.forEach(function (value) {
                            if (value.type === 'StackingColumn' || value.type === 'StackingBar') {
                                if (value.stackingGroup) {
                                    if (stackingGroup[value.stackingGroup] === undefined) {
                                        value.position = verticalSeries[index].rectCount;
                                        stackingGroup[value.stackingGroup] = verticalSeries[index].rectCount++;
                                    }
                                    else {
                                        value.position = stackingGroup[value.stackingGroup];
                                    }
                                }
                                else {
                                    if (verticalSeries[index].position === undefined) {
                                        value.position = verticalSeries[index].rectCount;
                                        verticalSeries[index].position = verticalSeries[index].rectCount++;
                                    }
                                    else {
                                        value.position = verticalSeries[index].position;
                                    }
                                }
                            }
                            else {
                                value.position = verticalSeries[index].rectCount++;
                            }
                        });
                        seriesCollection.forEach(function (value) {
                            value.rectCount = verticalSeries[index].rectCount;
                        });
                    }
                };
                var this_1 = this;
                for (var index = 0; index < chart.rows.length; index++) {
                    _loop_1(index);
                }
            }
        };
        ColumnBase.prototype.updateXRegion = function (point, rect) {
            point.region = rect;
            point.symbolLocation = {
                x: rect.x + (rect.width) / 2,
                y: point.yValue < 0 ? (rect.y + rect.height) : rect.y,
            };
        };
        ColumnBase.prototype.updateYRegion = function (point, rect) {
            point.region = new helper_1.Rect(rect.x, rect.y, rect.width, rect.height);
            point.symbolLocation = {
                x: point.yValue < 0 ? rect.x : rect.x + rect.width,
                y: rect.y + rect.height / 2
            };
        };
        ColumnBase.prototype.rectSeriesInChart = function (series) {
            var type = (series.type).toLowerCase();
            return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1);
        };
        ColumnBase.prototype.triggerEvent = function (chart, series, point) {
            var argsData = {
                cancel: false, name: constants_1.pointRender, series: series, point: point, fill: series.interior, border: series.border
            };
            chart.trigger(constants_1.pointRender, argsData);
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
            var options = new helper_1.PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
            var element = series.chart.renderer.drawPath(options);
            element.setAttribute('aria-label', point.x.toString() + ':' + point.y.toString());
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
            var effect = helper_1.getAnimationFunction('Linear');
            var isPlot = point.yValue < 0;
            var x;
            var y;
            var elementHeight = +point.region.height;
            var elementWidth = +point.region.width;
            var centerX;
            var centerY;
            if (!series.chart.requireInvertedAxis) {
                x = +point.region.x;
                if (series.type === 'StackingColumn') {
                    y = (1 - helper_1.valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                    centerX = x;
                    centerY = y;
                }
                else {
                    y = +point.region.y;
                    centerX = isPlot ? x : x + elementWidth;
                    centerY = isPlot ? y : y + elementHeight;
                }
            }
            else {
                y = +point.region.y;
                if (series.type === 'StackingBar') {
                    x = (helper_1.valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                    centerX = isPlot ? x : x;
                    centerY = isPlot ? y : y;
                }
                else {
                    x = +point.region.x;
                    centerY = isPlot ? y : y + elementHeight;
                    centerX = isPlot ? x + elementWidth : x;
                }
            }
            var value;
            element.style.visibility = 'hidden';
            new ej2_base_1.Animation({}).animate(element, {
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
    exports.ColumnBase = ColumnBase;
});
