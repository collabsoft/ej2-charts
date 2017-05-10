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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base/util", "../utils/helper", "../model/base", "../model/constants"], function (require, exports, ej2_base_1, util_1, helper_1, base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Points = (function () {
        function Points() {
            this.symbolLocation = null;
            this.region = null;
        }
        return Points;
    }());
    exports.Points = Points;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Animation;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Animation.prototype, "delay", void 0);
    exports.Animation = Animation;
    var DataLabelSettings = (function (_super) {
        __extends(DataLabelSettings, _super);
        function DataLabelSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DataLabelSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Complex({ width: null, color: null }, base_1.Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 5, right: 5, top: 5, bottom: 5 }, base_1.Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '11px', color: null }, base_1.Font)
    ], DataLabelSettings.prototype, "font", void 0);
    exports.DataLabelSettings = DataLabelSettings;
    var MarkerSettings = (function (_super) {
        __extends(MarkerSettings, _super);
        function MarkerSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MarkerSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Circle')
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({ width: 1, color: null }, base_1.Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    exports.MarkerSettings = MarkerSettings;
    var Series = (function (_super) {
        __extends(Series, _super);
        function Series() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.currentViewData = [];
            _this.visibleSeriesCount = 0;
            _this.clipRect = new helper_1.Rect(0, 0, 0, 0);
            _this.isRectSeries = false;
            _this.drawPoints = [];
            return _this;
        }
        Series.prototype.processJsonData = function () {
            var i = 0;
            var len = Object.keys(this.currentViewData).length;
            var point = new Points();
            var textMappingName = this.marker.dataLabel.name;
            this.points = [];
            this.xMin = Infinity;
            this.xMax = -Infinity;
            this.yMin = Infinity;
            this.yMax = -Infinity;
            if (this.xAxis.valueType === 'Category') {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    this.pushCategoryData(point);
                    this.pushData(point, i);
                    i++;
                }
            }
            else if (this.xAxis.valueType === 'DateTime') {
                var option = {
                    skeleton: 'full',
                    type: 'dateTime'
                };
                var dateParser = this.chart.intl.getDateParser(option);
                var dateFormatter = this.chart.intl.getDateFormat(option);
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                    this.pushData(point, i);
                    i++;
                }
            }
            else {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName);
                    point.xValue = point.x;
                    this.pushData(point, i);
                    i++;
                }
            }
            if (this.type === 'Spline') {
                this.chart.splineSeriesModule.findSplinePoint(this);
            }
        };
        Series.prototype.pushCategoryData = function (point) {
            if (this.xAxis.labels.indexOf(point.x) < 0) {
                this.xAxis.labels.push(point.x);
            }
            point.xValue = this.xAxis.labels.indexOf(point.x);
        };
        Series.prototype.refreshAxisLabel = function () {
            if (this.xAxis.valueType !== 'Category') {
                return null;
            }
            this.xAxis.labels = [];
            for (var _i = 0, _a = this.xAxis.series; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.visible) {
                    item.xMin = Infinity;
                    item.xMax = -Infinity;
                    for (var _b = 0, _c = item.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        item.pushCategoryData(point);
                        item.xMin = Math.min(item.xMin, point.xValue);
                        item.xMax = Math.max(item.xMax, point.xValue);
                    }
                }
            }
        };
        Series.prototype.dataPoint = function (i, textMappingName) {
            var point;
            this.points[i] = new Points();
            point = this.points[i];
            point.x = this.currentViewData[i][this.xName];
            point.y = this.currentViewData[i][this.yName];
            point.text = this.currentViewData[i][textMappingName];
            return point;
        };
        Series.prototype.pushData = function (point, i) {
            if (util_1.isNullOrUndefined(point.x) || util_1.isNullOrUndefined(point.y)) {
                point.visible = false;
            }
            else {
                point.visible = true;
            }
            point.index = i;
            point.yValue = point.y;
            this.xMin = Math.min(this.xMin, point.xValue);
            this.xMax = Math.max(this.xMax, point.xValue);
            this.yMin = Math.min(this.yMin, point.yValue);
            this.yMax = Math.max(this.yMax, point.yValue);
            this.xData.push(point.xValue);
            this.yData.push(point.yValue);
        };
        Series.prototype.calculateStackedValue = function () {
            var axis = this.chart.requireInvertedAxis ? this.chart.verticalAxes : this.chart.horizontalAxes;
            var axisCollection = this.chart.axisCollections;
            var startValues;
            var endValues;
            var yValues = [];
            var lastPositive = [];
            var lastNegative = [];
            var seriesCollection;
            var stackingGroup;
            var pointsLength;
            var lastValue;
            var column;
            var row;
            var axisSeries;
            for (var _i = 0, _a = this.chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                seriesCollection = [];
                axisCollection = [];
                for (var _b = 0, _c = column.axes; _b < _c.length; _b++) {
                    var columnAxis = _c[_b];
                    axisCollection.push(columnAxis);
                }
                for (var index = 0; index < this.chart.rows.length; index++) {
                    for (var _d = 0, _e = this.chart.rows; _d < _e.length; _d++) {
                        var item_1 = _e[_d];
                        row = item_1;
                        seriesCollection = [];
                        for (var _f = 0, _g = row.axes; _f < _g.length; _f++) {
                            var rowAxis = _g[_f];
                            for (var _h = 0, _j = rowAxis.series; _h < _j.length; _h++) {
                                var rowSeries = _j[_h];
                                for (var _k = 0, axisCollection_1 = axisCollection; _k < axisCollection_1.length; _k++) {
                                    var axis_1 = axisCollection_1[_k];
                                    for (var _l = 0, _m = axis_1.series; _l < _m.length; _l++) {
                                        var series = _m[_l];
                                        if (series === rowSeries && series.visible) {
                                            seriesCollection.push(series);
                                        }
                                    }
                                }
                            }
                        }
                        lastPositive = [];
                        lastNegative = [];
                        for (var _o = 0, seriesCollection_1 = seriesCollection; _o < seriesCollection_1.length; _o++) {
                            var series = seriesCollection_1[_o];
                            if (series.type.indexOf('Stacking') !== -1) {
                                stackingGroup = series.stackingGroup;
                                stackingGroup = ((series.type !== 'StackingArea') && stackingGroup) ? stackingGroup : '';
                                if (!lastPositive[stackingGroup]) {
                                    lastPositive[stackingGroup] = [];
                                    lastNegative[stackingGroup] = [];
                                }
                                yValues = series.yData;
                                startValues = [];
                                endValues = [];
                                for (var j = 0, pointsLength_1 = series.points.length; j < pointsLength_1; j++) {
                                    lastValue = 0;
                                    if (lastPositive[stackingGroup][series.points[j].xValue] === undefined) {
                                        lastPositive[stackingGroup][series.points[j].xValue] = 0;
                                    }
                                    if (lastNegative[stackingGroup][series.points[j].xValue] === undefined) {
                                        lastNegative[stackingGroup][series.points[j].xValue] = 0;
                                    }
                                    if (yValues[j] >= 0) {
                                        lastValue = lastPositive[stackingGroup][series.points[j].xValue];
                                        lastPositive[stackingGroup][series.points[j].xValue] += yValues[j];
                                    }
                                    else {
                                        lastValue = lastNegative[stackingGroup][series.points[j].xValue];
                                        lastNegative[stackingGroup][series.points[j].xValue] += yValues[j];
                                    }
                                    startValues.push(lastValue);
                                    endValues.push(yValues[j] + lastValue);
                                }
                                series.stackedValues = new helper_1.StackValues(startValues, endValues);
                                series.yMin = Math.min.apply(series.yMin, endValues);
                                series.yMax = Math.max.apply(series.yMax, endValues);
                            }
                        }
                    }
                }
            }
        };
        Series.prototype.logWithIn = function (value, axis) {
            if (axis.valueType === 'Logarithmic') {
                value = helper_1.logBase(value, axis.logBase);
            }
            else {
                value = value;
            }
            return value;
        };
        Series.prototype.refreshDataManager = function (chart) {
            var _this = this;
            this.chart = chart;
            var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
            dataManager.then(function (e) { return _this.dataManagerSuccess(e); });
        };
        Series.prototype.dataManagerSuccess = function (e) {
            this.currentViewData = e.result;
            this.recordsCount = e.count;
            var argsData = {
                name: constants_1.seriesRender, series: this, data: this.currentViewData,
            };
            this.chart.trigger(constants_1.seriesRender, argsData);
            this.processJsonData();
            this.refreshChart();
        };
        Series.prototype.refreshChart = function () {
            var chart = this.chart;
            chart.visibleSeriesCount++;
            if (chart.visibleSeries.length === chart.visibleSeriesCount) {
                chart.refreshBound();
            }
        };
        Series.prototype.renderSeries = function (chart, index) {
            var seriesType = helper_1.firstToLowerCase(this.type);
            if (chart[seriesType + 'SeriesModule']) {
                this.createSeriesElements(chart);
                chart[seriesType + 'SeriesModule'].render(this);
                if (this.marker.dataLabel.visible) {
                    chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                }
                this.appendSeriesElement(chart.seriesElements, chart);
                this.performAnimation(chart, seriesType, this.marker, this.marker.dataLabel);
            }
        };
        Series.prototype.createSeriesElements = function (chart) {
            var elementId = chart.element.id;
            var xAxisRect = this.xAxis.rect;
            var yAxisRect = this.yAxis.rect;
            var marker = this.marker;
            var render = chart.renderer;
            var index = this.index;
            var markerHeight = (this.type === 'Scatter') ? (this.marker.height + 5) / 2 : 0;
            var markerWidth = (this.type === 'Scatter') ? (this.marker.width + 5) / 2 : 0;
            this.clipRectElement = render.drawClipPath(new helper_1.RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, { x: -markerWidth, y: -markerHeight, width: this.clipRect.width + markerWidth * 2,
                height: this.clipRect.height + markerHeight * 2 }));
            var transform;
            transform = 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')';
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.seriesElement.appendChild(this.clipRectElement);
            if (marker.visible) {
                markerHeight = (this.marker.height + 5) / 2;
                markerWidth = (this.marker.width + 5) / 2;
                var markerClipRect = render.drawClipPath(new helper_1.RectOption(elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: this.clipRect.width + markerWidth * 2, height: this.clipRect.height + markerHeight * 2
                }));
                this.symbolElement = render.createGroup({
                    'id': elementId + 'SymbolGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartMarkerClipRect_' + index + ')'
                });
                this.symbolElement.appendChild(markerClipRect);
            }
            if (marker.dataLabel.visible) {
                this.shapeElement = render.createGroup({
                    'id': elementId + 'ShapeGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
                });
                this.textElement = render.createGroup({
                    'id': elementId + 'TextGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
                });
            }
        };
        Series.prototype.appendSeriesElement = function (element, chart) {
            chart.seriesElements.appendChild(this.seriesElement);
            var marker = this.marker;
            var dataLabel = marker.dataLabel;
            if (marker.visible) {
                chart.seriesElements.appendChild(this.symbolElement);
            }
            if (dataLabel.visible) {
                chart.dataLabelElements.appendChild(this.shapeElement);
                chart.dataLabelElements.appendChild(this.textElement);
            }
        };
        Series.prototype.performAnimation = function (chart, type, marker, dataLabel) {
            if (this.animation.enable && chart.animateSeries) {
                chart[type + 'SeriesModule'].doAnimation(this);
                if (marker.visible) {
                    chart.markerModule.doMarkerAnimation(this);
                }
                if (dataLabel.visible) {
                    chart.dataLabelModule.doDataLabelAnimation(this);
                }
            }
        };
        return Series;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property()
    ], Series.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "stackingGroup", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, base_1.Border)
    ], Series.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], Series.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Complex(null, MarkerSettings)
    ], Series.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Complex(null, Animation)
    ], Series.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], Series.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "selectionStyle", void 0);
    exports.Series = Series;
});
