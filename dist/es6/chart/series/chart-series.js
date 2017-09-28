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
import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { firstToLowerCase, Rect, logBase, StackValues, RectOption } from '../../common/utils/helper';
import { Border, Font, Margin, Animation } from '../../common/model/base';
import { seriesRender } from '../../common/model/constants';
var Points = (function () {
    function Points() {
        this.symbolLocation = null;
        this.region = null;
    }
    return Points;
}());
export { Points };
var DataLabelSettings = (function (_super) {
    __extends(DataLabelSettings, _super);
    function DataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DataLabelSettings;
}(ChildProperty));
export { DataLabelSettings };
__decorate([
    Property(false)
], DataLabelSettings.prototype, "visible", void 0);
__decorate([
    Property(null)
], DataLabelSettings.prototype, "name", void 0);
__decorate([
    Property('transparent')
], DataLabelSettings.prototype, "fill", void 0);
__decorate([
    Property(1)
], DataLabelSettings.prototype, "opacity", void 0);
__decorate([
    Property('Auto')
], DataLabelSettings.prototype, "position", void 0);
__decorate([
    Property(5)
], DataLabelSettings.prototype, "rx", void 0);
__decorate([
    Property(5)
], DataLabelSettings.prototype, "ry", void 0);
__decorate([
    Property('Center')
], DataLabelSettings.prototype, "alignment", void 0);
__decorate([
    Complex({ width: null, color: null }, Border)
], DataLabelSettings.prototype, "border", void 0);
__decorate([
    Complex({ left: 5, right: 5, top: 5, bottom: 5 }, Margin)
], DataLabelSettings.prototype, "margin", void 0);
__decorate([
    Complex({ size: '11px', color: null }, Font)
], DataLabelSettings.prototype, "font", void 0);
__decorate([
    Property(null)
], DataLabelSettings.prototype, "template", void 0);
var MarkerSettings = (function (_super) {
    __extends(MarkerSettings, _super);
    function MarkerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarkerSettings;
}(ChildProperty));
export { MarkerSettings };
__decorate([
    Property(false)
], MarkerSettings.prototype, "visible", void 0);
__decorate([
    Property('Circle')
], MarkerSettings.prototype, "shape", void 0);
__decorate([
    Property('')
], MarkerSettings.prototype, "imageUrl", void 0);
__decorate([
    Property(5)
], MarkerSettings.prototype, "height", void 0);
__decorate([
    Property(5)
], MarkerSettings.prototype, "width", void 0);
__decorate([
    Complex({ width: 1, color: null }, Border)
], MarkerSettings.prototype, "border", void 0);
__decorate([
    Property('')
], MarkerSettings.prototype, "fill", void 0);
__decorate([
    Property(1)
], MarkerSettings.prototype, "opacity", void 0);
__decorate([
    Complex({}, DataLabelSettings)
], MarkerSettings.prototype, "dataLabel", void 0);
var Series = (function (_super) {
    __extends(Series, _super);
    function Series() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentViewData = [];
        _this.visibleSeriesCount = 0;
        _this.clipRect = new Rect(0, 0, 0, 0);
        _this.isRectSeries = false;
        _this.drawPoints = [];
        _this.seriesType = 'XY';
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
        this.sizeMax = -Infinity;
        this.seriesType = (this.type === 'RangeColumn') ? 'HighLow' : 'XY';
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
        point.high = this.currentViewData[i][this.high];
        point.low = this.currentViewData[i][this.low];
        point.size = this.currentViewData[i][this.size];
        point.text = this.currentViewData[i][textMappingName];
        return point;
    };
    Series.prototype.findVisibility = function (point) {
        switch (this.seriesType) {
            case 'XY':
                this.yMin = Math.min(this.yMin, point.yValue);
                this.yMax = Math.max(this.yMax, point.yValue);
                this.yData.push(point.yValue);
                if (this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, point.size);
                }
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.y);
            case 'HighLow':
                this.yMin = Math.min(this.yMin, Math.min((point.low), (point.high)));
                this.yMax = Math.max(this.yMax, Math.max((point.low), (point.high)));
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) || isNullOrUndefined(point.high);
        }
    };
    Series.prototype.pushData = function (point, i) {
        point.index = i;
        point.yValue = point.y;
        point.visible = !this.findVisibility(point);
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    };
    Series.prototype.findSeriesCollection = function (column, row, isStack) {
        var seriesCollection = [];
        for (var _i = 0, _a = row.axes; _i < _a.length; _i++) {
            var rowAxis = _a[_i];
            for (var _b = 0, _c = rowAxis.series; _b < _c.length; _b++) {
                var rowSeries = _c[_b];
                for (var _d = 0, _e = column.axes; _d < _e.length; _d++) {
                    var axis = _e[_d];
                    for (var _f = 0, _g = axis.series; _f < _g.length; _f++) {
                        var series = _g[_f];
                        if (series === rowSeries && series.visible && this.rectSeriesInChart(series, isStack)) {
                            seriesCollection.push(series);
                        }
                    }
                }
            }
        }
        return seriesCollection;
    };
    Series.prototype.rectSeriesInChart = function (series, isStack) {
        var type = (series.type).toLowerCase();
        return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 || isStack);
    };
    Series.prototype.calculateStackedValue = function (isStacking100) {
        var axisSeries;
        for (var _i = 0, _a = this.chart.columns; _i < _a.length; _i++) {
            var columnItem = _a[_i];
            for (var _b = 0, _c = this.chart.rows; _b < _c.length; _b++) {
                var item = _c[_b];
                this.calculateStackingValues(this.findSeriesCollection(columnItem, item, true), isStacking100);
            }
        }
    };
    Series.prototype.calculateStackingValues = function (seriesCollection, isStacking100) {
        var startValues;
        var endValues;
        var yValues = [];
        var lastPositive = [];
        var lastNegative = [];
        var stackingGroup;
        var lastValue;
        var value;
        var frequencies = [];
        if (isStacking100) {
            frequencies = this.findFrequencies(seriesCollection);
        }
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!lastPositive[stackingGroup]) {
                    lastPositive[stackingGroup] = [];
                    lastNegative[stackingGroup] = [];
                }
                yValues = series.yData;
                startValues = [];
                endValues = [];
                for (var j = 0, pointsLength = series.points.length; j < pointsLength; j++) {
                    lastValue = 0;
                    value = yValues[j];
                    if (lastPositive[stackingGroup][series.points[j].xValue] === undefined) {
                        lastPositive[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (lastNegative[stackingGroup][series.points[j].xValue] === undefined) {
                        lastNegative[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (isStacking100) {
                        value = value / frequencies[stackingGroup][series.points[j].xValue] * 100;
                        value = !isNaN(value) ? value : 0;
                        series.points[j].percent = value.toFixed(2);
                    }
                    if (value >= 0) {
                        lastValue = lastPositive[stackingGroup][series.points[j].xValue];
                        lastPositive[stackingGroup][series.points[j].xValue] += value;
                    }
                    else {
                        lastValue = lastNegative[stackingGroup][series.points[j].xValue];
                        lastNegative[stackingGroup][series.points[j].xValue] += value;
                    }
                    startValues.push(lastValue);
                    endValues.push(value + lastValue);
                    if (isStacking100 && (endValues[j] > 100)) {
                        endValues[j] = 100;
                    }
                }
                series.stackedValues = new StackValues(startValues, endValues);
                series.yMin = Math.min.apply(0, startValues);
                series.yMax = Math.max.apply(0, endValues);
                if (series.yMin > Math.min.apply(0, endValues)) {
                    series.yMin = (isStacking100) ? -100 : Math.min.apply(0, endValues);
                }
                if (series.yMax < Math.max.apply(0, startValues)) {
                    series.yMax = 0;
                }
            }
        }
    };
    Series.prototype.findFrequencies = function (seriesCollection) {
        var frequencies = [];
        var stackingGroup;
        for (var _i = 0, seriesCollection_2 = seriesCollection; _i < seriesCollection_2.length; _i++) {
            var series = seriesCollection_2[_i];
            series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
            if (series.type.indexOf('Stacking') !== -1) {
                stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' : series.stackingGroup;
                if (!frequencies[stackingGroup]) {
                    frequencies[stackingGroup] = [];
                }
                for (var j = 0, pointsLength = series.points.length; j < pointsLength; j++) {
                    if (frequencies[stackingGroup][series.points[j].xValue] === undefined) {
                        frequencies[stackingGroup][series.points[j].xValue] = 0;
                    }
                    if (series.yData[j] > 0) {
                        frequencies[stackingGroup][series.points[j].xValue] += series.yData[j];
                    }
                    else {
                        frequencies[stackingGroup][series.points[j].xValue] -= series.yData[j];
                    }
                }
            }
        }
        return frequencies;
    };
    Series.prototype.logWithIn = function (value, axis) {
        if (axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
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
            name: seriesRender, series: this, data: this.currentViewData,
        };
        this.chart.trigger(seriesRender, argsData);
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
        var seriesType = firstToLowerCase(this.type);
        if (seriesType.indexOf('100') !== -1) {
            seriesType = seriesType.replace('100', '');
        }
        if (chart[seriesType + 'SeriesModule']) {
            this.createSeriesElements(chart);
            chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis);
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
        var explodeValue = 5;
        var yAxisRect = this.yAxis.rect;
        var marker = this.marker;
        var render = chart.renderer;
        var index = this.index;
        var markerHeight = (this.type === 'Scatter') ? (this.marker.height + explodeValue) / 2 : 0;
        var markerWidth = (this.type === 'Scatter') ? (this.marker.width + explodeValue) / 2 : 0;
        this.clipRectElement = render.drawClipPath(new RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: -markerWidth, y: -markerHeight, width: this.clipRect.width + markerWidth * 2,
            height: this.clipRect.height + markerHeight * 2
        }));
        var transform;
        transform = 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')';
        this.seriesElement = render.createGroup({
            'id': elementId + 'SeriesGroup' + index,
            'transform': transform,
            'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
        });
        this.seriesElement.appendChild(this.clipRectElement);
        if (marker.visible) {
            markerHeight = (this.marker.height + explodeValue) / 2;
            markerWidth = (this.marker.width + explodeValue) / 2;
            var markerClipRect = render.drawClipPath(new RectOption(elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
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
}(ChildProperty));
export { Series };
__decorate([
    Property('')
], Series.prototype, "name", void 0);
__decorate([
    Property('')
], Series.prototype, "dataSource", void 0);
__decorate([
    Property()
], Series.prototype, "query", void 0);
__decorate([
    Property('')
], Series.prototype, "xName", void 0);
__decorate([
    Property('')
], Series.prototype, "yName", void 0);
__decorate([
    Property('')
], Series.prototype, "high", void 0);
__decorate([
    Property('')
], Series.prototype, "low", void 0);
__decorate([
    Property('')
], Series.prototype, "size", void 0);
__decorate([
    Property(null)
], Series.prototype, "xAxisName", void 0);
__decorate([
    Property(null)
], Series.prototype, "yAxisName", void 0);
__decorate([
    Property(null)
], Series.prototype, "fill", void 0);
__decorate([
    Property(1)
], Series.prototype, "width", void 0);
__decorate([
    Property('')
], Series.prototype, "stackingGroup", void 0);
__decorate([
    Property(true)
], Series.prototype, "visible", void 0);
__decorate([
    Complex({ color: 'transparent', width: 0 }, Border)
], Series.prototype, "border", void 0);
__decorate([
    Property(1)
], Series.prototype, "opacity", void 0);
__decorate([
    Property('0')
], Series.prototype, "dashArray", void 0);
__decorate([
    Property('Line')
], Series.prototype, "type", void 0);
__decorate([
    Complex(null, MarkerSettings)
], Series.prototype, "marker", void 0);
__decorate([
    Complex(null, Animation)
], Series.prototype, "animation", void 0);
__decorate([
    Property(true)
], Series.prototype, "enableTooltip", void 0);
__decorate([
    Property('SeriesType')
], Series.prototype, "legendShape", void 0);
__decorate([
    Property(null)
], Series.prototype, "selectionStyle", void 0);
__decorate([
    Property(1)
], Series.prototype, "minRadius", void 0);
__decorate([
    Property(3)
], Series.prototype, "maxRadius", void 0);
