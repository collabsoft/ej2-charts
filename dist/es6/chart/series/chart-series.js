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
import { Property, ChildProperty, Complex, Collection } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { StackValues, RectOption } from '../../common/utils/helper';
import { firstToLowerCase, Rect, logBase, CircleOption } from '../../common/utils/helper';
import { Border, Font, Margin, Animation, EmptyPointSettings, CornerRadius, Connector } from '../../common/model/base';
import { seriesRender } from '../../common/model/constants';
var Points = (function () {
    function Points() {
        this.symbolLocations = null;
        this.regions = null;
        this.regionData = null;
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
    Complex({ width: 2, color: null }, Border)
], MarkerSettings.prototype, "border", void 0);
__decorate([
    Property(null)
], MarkerSettings.prototype, "fill", void 0);
__decorate([
    Property(1)
], MarkerSettings.prototype, "opacity", void 0);
__decorate([
    Complex({}, DataLabelSettings)
], MarkerSettings.prototype, "dataLabel", void 0);
var Trendline = (function (_super) {
    __extends(Trendline, _super);
    function Trendline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clipRect = new Rect(0, 0, 0, 0);
        return _this;
    }
    Trendline.prototype.setDataSource = function (series, chart) {
        if (series) {
            this.points = series.points;
        }
        var type = firstToLowerCase(this.type);
        chart.trendLineModule.initDataSource(this, chart);
        chart.visibleSeriesCount++;
    };
    return Trendline;
}(ChildProperty));
export { Trendline };
__decorate([
    Property('')
], Trendline.prototype, "name", void 0);
__decorate([
    Property('Linear')
], Trendline.prototype, "type", void 0);
__decorate([
    Property(2)
], Trendline.prototype, "period", void 0);
__decorate([
    Property(2)
], Trendline.prototype, "polynomialOrder", void 0);
__decorate([
    Property(0)
], Trendline.prototype, "backwardForecast", void 0);
__decorate([
    Property(0)
], Trendline.prototype, "forwardForecast", void 0);
__decorate([
    Complex({}, Animation)
], Trendline.prototype, "animation", void 0);
__decorate([
    Complex({}, MarkerSettings)
], Trendline.prototype, "marker", void 0);
__decorate([
    Property(true)
], Trendline.prototype, "enableTooltip", void 0);
__decorate([
    Property(null)
], Trendline.prototype, "intercept", void 0);
__decorate([
    Property('')
], Trendline.prototype, "fill", void 0);
__decorate([
    Property(1)
], Trendline.prototype, "width", void 0);
__decorate([
    Property('SeriesType')
], Trendline.prototype, "legendShape", void 0);
var ErrorBarCapSettings = (function (_super) {
    __extends(ErrorBarCapSettings, _super);
    function ErrorBarCapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErrorBarCapSettings;
}(ChildProperty));
export { ErrorBarCapSettings };
__decorate([
    Property(1)
], ErrorBarCapSettings.prototype, "width", void 0);
__decorate([
    Property(10)
], ErrorBarCapSettings.prototype, "length", void 0);
__decorate([
    Property('black')
], ErrorBarCapSettings.prototype, "color", void 0);
__decorate([
    Property(1)
], ErrorBarCapSettings.prototype, "opacity", void 0);
var ErrorBarSettings = (function (_super) {
    __extends(ErrorBarSettings, _super);
    function ErrorBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErrorBarSettings;
}(ChildProperty));
export { ErrorBarSettings };
__decorate([
    Property(false)
], ErrorBarSettings.prototype, "visible", void 0);
__decorate([
    Property('Fixed')
], ErrorBarSettings.prototype, "type", void 0);
__decorate([
    Property('Both')
], ErrorBarSettings.prototype, "direction", void 0);
__decorate([
    Property('Vertical')
], ErrorBarSettings.prototype, "mode", void 0);
__decorate([
    Property('black')
], ErrorBarSettings.prototype, "color", void 0);
__decorate([
    Property(1)
], ErrorBarSettings.prototype, "verticalError", void 0);
__decorate([
    Property(1)
], ErrorBarSettings.prototype, "width", void 0);
__decorate([
    Property(1)
], ErrorBarSettings.prototype, "horizontalError", void 0);
__decorate([
    Property(3)
], ErrorBarSettings.prototype, "verticalPositiveError", void 0);
__decorate([
    Property(3)
], ErrorBarSettings.prototype, "verticalNegativeError", void 0);
__decorate([
    Property(1)
], ErrorBarSettings.prototype, "horizontalPositiveError", void 0);
__decorate([
    Property(1)
], ErrorBarSettings.prototype, "horizontalNegativeError", void 0);
__decorate([
    Complex(null, ErrorBarCapSettings)
], ErrorBarSettings.prototype, "errorBarCap", void 0);
var SeriesBase = (function (_super) {
    __extends(SeriesBase, _super);
    function SeriesBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentViewData = [];
        _this.clipRect = new Rect(0, 0, 0, 0);
        _this.seriesType = 'XY';
        return _this;
    }
    SeriesBase.prototype.processJsonData = function () {
        var i = 0;
        var len = Object.keys(this.currentViewData).length;
        var point = new Points();
        var textMappingName = this instanceof Series ? this.marker.dataLabel.name : '';
        if (this instanceof Series && this.type === 'Waterfall') {
            this.chart[firstToLowerCase(this.type) + 'SeriesModule'].
                processWaterfallData(this.currentViewData, this);
        }
        this.points = [];
        this.xMin = Infinity;
        this.xMax = -Infinity;
        this.yMin = Infinity;
        this.yMax = -Infinity;
        this.sizeMax = -Infinity;
        this.getSeriesType();
        if (this.xAxis.valueType === 'Category') {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                this.pushCategoryData(point, i);
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
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
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        else {
            while (i < len) {
                point = this.dataPoint(i, textMappingName);
                point.xValue = point.x;
                this.pushData(point, i);
                this.setEmptyPoint(point, i);
                i++;
            }
        }
        if (this instanceof Series) {
            if (this.type === 'Spline' || this.drawType === 'Spline') {
                this.chart.splineSeriesModule.findSplinePoint(this);
            }
        }
    };
    SeriesBase.prototype.pushData = function (point, i) {
        point.index = i;
        point.yValue = point.y;
        this.xMin = Math.min(this.xMin, point.xValue);
        this.xMax = Math.max(this.xMax, point.xValue);
        this.xData.push(point.xValue);
    };
    SeriesBase.prototype.dataPoint = function (i, textMappingName) {
        var point;
        this.points[i] = new Points();
        point = this.points[i];
        var currentViewData = this.currentViewData;
        point.x = currentViewData[i][this.xName];
        point.high = currentViewData[i][this.high];
        point.low = currentViewData[i][this.low];
        point.open = currentViewData[i][this.open];
        point.close = currentViewData[i][this.close];
        point.volume = currentViewData[i][this.volume];
        if (this instanceof Series) {
            point.y = currentViewData[i][this.yName];
            point.size = currentViewData[i][this.size];
            point.text = currentViewData[i][textMappingName];
        }
        return point;
    };
    SeriesBase.prototype.setEmptyPoint = function (point, i) {
        if (!this.findVisibility(point)) {
            point.visible = true;
            return null;
        }
        point.isEmpty = true;
        var mode = this instanceof Series ? this.emptyPointSettings.mode : 'Drop';
        switch (mode) {
            case 'Zero':
                point.visible = true;
                if (this instanceof Series && this.seriesType.indexOf('HighLow') > -1) {
                    point.high = point.low = 0;
                    if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                        point.open = point.close = 0;
                    }
                }
                else {
                    point.y = point.yValue = this.yData[i] = 0;
                }
                break;
            case 'Average':
                if (this instanceof Series) {
                    if (this.seriesType.indexOf('HighLow') > -1) {
                        point.high = isNullOrUndefined(point.high) ? this.getAverage(this.high, i) : point.high;
                        point.low = isNullOrUndefined(point.low) ? this.getAverage(this.low, i) : point.low;
                        if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                            point.open = isNullOrUndefined(point.open) ? this.getAverage(this.open, i) : point.open;
                            point.close = isNullOrUndefined(point.close) ? this.getAverage(this.close, i) : point.close;
                        }
                    }
                    else {
                        point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                    }
                }
                point.visible = true;
                break;
            case 'Drop':
            case 'Gap':
                this.yData[i] = null;
                point.visible = false;
                break;
        }
    };
    SeriesBase.prototype.findVisibility = function (point) {
        var type = this instanceof Series ? this.seriesType : 'HighLowOpenClose';
        var yValues;
        switch (type) {
            case 'XY':
                this.setXYMinMax(point.yValue);
                this.yData.push(point.yValue);
                if (this instanceof Series && this.type === 'Bubble') {
                    this.sizeMax = Math.max(this.sizeMax, point.size);
                }
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.y);
            case 'HighLow':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) || isNullOrUndefined(point.high);
            case 'HighLowOpenClose':
                this.setHiloMinMax(point.high, point.low);
                return isNullOrUndefined(point.x) || isNullOrUndefined(point.low) ||
                    isNullOrUndefined(point.open) || isNullOrUndefined(point.close)
                    || isNullOrUndefined(point.high);
            case 'BoxPlot':
                yValues = (point.y || [null]).filter(function (value) {
                    return !isNullOrUndefined(value);
                }).sort(function (a, b) {
                    return a - b;
                });
                point.y = yValues;
                this.yMin = Math.min(this.yMin, Math.min.apply(Math, yValues));
                this.yMax = Math.max(this.yMax, Math.max.apply(Math, yValues));
                return !yValues.length;
        }
    };
    SeriesBase.prototype.setXYMinMax = function (yValue) {
        this.yMin = Math.min(this.yMin, isNullOrUndefined(yValue) ? this.yMin : yValue);
        this.yMax = Math.max(this.yMax, isNullOrUndefined(yValue) ? this.yMax : yValue);
    };
    SeriesBase.prototype.setHiloMinMax = function (high, low) {
        this.yMin = Math.min(this.yMin, Math.min(isNullOrUndefined(low) ? this.yMin : low, isNullOrUndefined(high) ? this.yMin : high));
        this.yMax = Math.max(this.yMax, Math.max(isNullOrUndefined(low) ? this.yMax : low, isNullOrUndefined(high) ? this.yMax : high));
    };
    SeriesBase.prototype.getSeriesType = function () {
        var type;
        if (this instanceof Series) {
            var seriesType = this.chart.chartAreaType === 'PolarRadar' ? this.drawType : this.type;
            if (seriesType) {
                switch (seriesType) {
                    case 'RangeColumn':
                    case 'RangeArea':
                    case 'Hilo':
                        type = 'HighLow';
                        break;
                    case 'HiloOpenClose':
                    case 'Candle':
                        type = 'HighLowOpenClose';
                        break;
                    case 'BoxAndWhisker':
                        type = 'BoxPlot';
                        break;
                    default:
                        type = 'XY';
                }
            }
        }
        this.seriesType = type;
    };
    SeriesBase.prototype.pushCategoryData = function (point, index) {
        if (!this.xAxis.isIndexed) {
            if (this.xAxis.labels.indexOf(point.x) < 0) {
                this.xAxis.labels.push(point.x);
            }
            point.xValue = this.xAxis.labels.indexOf(point.x);
        }
        else {
            this.xAxis.labels[index] ? this.xAxis.labels[index] += ', ' + point.x :
                this.xAxis.labels.push(point.x);
            point.xValue = index;
        }
    };
    SeriesBase.prototype.getAverage = function (member, i, data) {
        if (data === void 0) { data = this.currentViewData; }
        var previous = data[i - 1] ? (data[i - 1][member] || 0) : 0;
        var next = data[i + 1] ? (data[i + 1][member] || 0) : 0;
        return (previous + next) / 2;
    };
    SeriesBase.prototype.refreshDataManager = function (chart) {
        var _this = this;
        this.chart = chart;
        if (isNullOrUndefined(this.query) && !isNullOrUndefined(this.dataSource)) {
            this.dataManagerSuccess({ result: this.dataSource, count: this.dataSource.length }, chart, false);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, chart); });
    };
    SeriesBase.prototype.dataManagerSuccess = function (e, chart, isRemoteData) {
        if (isRemoteData === void 0) { isRemoteData = true; }
        this.currentViewData = e.result !== '' ? e.result : [];
        if (this instanceof Series) {
            var argsData = {
                name: seriesRender, series: this, data: this.currentViewData, fill: this.interior
            };
            this.chart.trigger(seriesRender, argsData);
            this.interior = argsData.fill;
            this.currentViewData = argsData.data;
        }
        this.processJsonData();
        this.recordsCount = e.count;
        this.refreshChart(isRemoteData);
    };
    SeriesBase.prototype.refreshChart = function (isRemoteData) {
        var chart = this.chart;
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 1 : 0;
        }
        chart.refreshTechnicalIndicator(this);
        if (this instanceof Series && this.category !== 'TrendLine') {
            for (var _i = 0, _a = this.trendlines; _i < _a.length; _i++) {
                var trendline = _a[_i];
                trendline.setDataSource(this, chart);
            }
        }
        if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
            chart.refreshBound();
            chart.trigger('loaded', { chart: chart });
        }
        if (this instanceof Series) {
            chart.visibleSeriesCount += isRemoteData ? 0 : 1;
        }
    };
    return SeriesBase;
}(ChildProperty));
export { SeriesBase };
__decorate([
    Property('')
], SeriesBase.prototype, "xName", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "high", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "low", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "open", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "close", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "volume", void 0);
__decorate([
    Property(null)
], SeriesBase.prototype, "xAxisName", void 0);
__decorate([
    Property(null)
], SeriesBase.prototype, "yAxisName", void 0);
__decorate([
    Complex(null, Animation)
], SeriesBase.prototype, "animation", void 0);
__decorate([
    Property(null)
], SeriesBase.prototype, "fill", void 0);
__decorate([
    Property(1)
], SeriesBase.prototype, "width", void 0);
__decorate([
    Property('0')
], SeriesBase.prototype, "dashArray", void 0);
__decorate([
    Property('')
], SeriesBase.prototype, "dataSource", void 0);
__decorate([
    Property()
], SeriesBase.prototype, "query", void 0);
var Series = (function (_super) {
    __extends(Series, _super);
    function Series(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        _this.visibleSeriesCount = 0;
        _this.category = 'Series';
        _this.isRectSeries = false;
        _this.drawPoints = [];
        _this.delayedAnimation = false;
        return _this;
    }
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
                    item.pushCategoryData(point, point.index);
                    item.xMin = Math.min(item.xMin, point.xValue);
                    item.xMax = Math.max(item.xMax, point.xValue);
                }
            }
        }
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
        return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 ||
            type.indexOf('hiloopenclose') !== -1 || type.indexOf('candle') !== -1 ||
            type.indexOf('hilo') !== -1 || series.drawType.indexOf('Column') !== -1 ||
            type.indexOf('waterfall') !== -1 || type.indexOf('boxandwhisker') !== -1 || isStack);
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
            if (series.type.indexOf('Stacking') !== -1 || (series.drawType.indexOf('Stacking') !== -1 &&
                (series.chart.chartAreaType === 'PolarRadar'))) {
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
    Series.prototype.renderSeries = function (chart, index) {
        var seriesType = firstToLowerCase(this.type);
        if (seriesType.indexOf('100') !== -1) {
            seriesType = seriesType.replace('100', '');
        }
        if (chart[seriesType + 'SeriesModule']) {
            if (this.category !== 'Indicator' && this.category !== 'TrendLine') {
                this.createSeriesElements(chart);
            }
            chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
            if (this.category !== 'Indicator') {
                if (this.errorBar.visible) {
                    this.chart.errorBarModule.render(this);
                }
                if (this.marker.dataLabel.visible) {
                    chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                }
                this.appendSeriesElement(chart.seriesElements, chart);
            }
            this.performAnimation(chart, seriesType, this.errorBar, this.marker, this.marker.dataLabel);
        }
    };
    Series.prototype.createSeriesElements = function (chart) {
        if (this.category !== 'Indicator') {
            var elementId = chart.element.id;
            var xAxisRect = this.xAxis.rect;
            var explodeValue = this.marker.border.width + 8 + 5;
            var yAxisRect = this.yAxis.rect;
            var marker = this.marker;
            var render = chart.renderer;
            var index = this.index;
            var markerHeight = (this.type === 'Scatter') ? (this.marker.height + explodeValue) / 2 : 0;
            var markerWidth = (this.type === 'Scatter') ? (this.marker.width + explodeValue) / 2 : 0;
            if (chart.chartAreaType === 'PolarRadar') {
                this.clipRectElement = render.drawCircularClipPath(new CircleOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, this.clipRect.width / 2 + this.clipRect.x, this.clipRect.height / 2 + this.clipRect.y, chart.radius));
            }
            else {
                this.clipRectElement = render.drawClipPath(new RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: -markerWidth, y: -markerHeight,
                    width: this.clipRect.width + markerWidth * 2,
                    height: this.clipRect.height + markerHeight * 2
                }));
            }
            var transform = void 0;
            transform = chart.chartAreaType === 'Cartesian' ? 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')' : '';
            this.symbolElement = null;
            this.seriesElement = render.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': transform,
                'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
            });
            this.seriesElement.appendChild(this.clipRectElement);
        }
    };
    Series.prototype.appendSeriesElement = function (element, chart) {
        var marker = this.marker;
        var dataLabel = marker.dataLabel;
        if (this.category !== 'TrendLine') {
            chart.seriesElements.appendChild(this.seriesElement);
            var errorBar = this.errorBar;
            if (errorBar.visible) {
                if (chart.chartAreaType === 'PolarRadar') {
                    chart.seriesElements.appendChild(this.seriesElement);
                }
                else {
                    chart.seriesElements.appendChild(this.errorBarElement);
                }
            }
            if (this.type === 'Scatter' || this.type === 'Bubble') {
                chart.seriesElements.appendChild(this.seriesElement);
            }
        }
        if (marker.visible && ((chart.chartAreaType === 'Cartesian' && (!this.isRectSeries || this.type === 'BoxAndWhisker'))
            || ((this.drawType !== 'Scatter' && !this.isRectSeries) && chart.chartAreaType === 'PolarRadar')) &&
            this.type !== 'Scatter' && this.type !== 'Bubble') {
            chart.seriesElements.appendChild(this.symbolElement);
        }
        if (dataLabel.visible) {
            chart.dataLabelElements.appendChild(this.shapeElement);
            chart.dataLabelElements.appendChild(this.textElement);
        }
    };
    Series.prototype.performAnimation = function (chart, type, errorBar, marker, dataLabel) {
        if (this.animation.enable && chart.animateSeries) {
            chart[type + 'SeriesModule'].doAnimation(this);
            if (errorBar.visible) {
                chart.errorBarModule.doErrorBarAnimation(this);
            }
            if (marker.visible) {
                chart.markerRender.doMarkerAnimation(this);
            }
            if (dataLabel.visible) {
                chart.dataLabelModule.doDataLabelAnimation(this);
            }
        }
    };
    Series.prototype.setPointColor = function (point, color) {
        return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
    };
    Series.prototype.setBorderColor = function (point, border) {
        border.width = point.isEmpty ? (this.emptyPointSettings.border.width || border.width) : border.width;
        border.color = point.isEmpty ? (this.emptyPointSettings.border.color || border.color) : border.color;
        return border;
    };
    return Series;
}(SeriesBase));
export { Series };
__decorate([
    Property('')
], Series.prototype, "name", void 0);
__decorate([
    Property('')
], Series.prototype, "yName", void 0);
__decorate([
    Property('Line')
], Series.prototype, "drawType", void 0);
__decorate([
    Property(true)
], Series.prototype, "isClosed", void 0);
__decorate([
    Property('#2ecd71')
], Series.prototype, "bearFillColor", void 0);
__decorate([
    Property('#e74c3d')
], Series.prototype, "bullFillColor", void 0);
__decorate([
    Property(false)
], Series.prototype, "enableSolidCandles", void 0);
__decorate([
    Property('')
], Series.prototype, "size", void 0);
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
    Property('Line')
], Series.prototype, "type", void 0);
__decorate([
    Complex(null, ErrorBarSettings)
], Series.prototype, "errorBar", void 0);
__decorate([
    Complex(null, MarkerSettings)
], Series.prototype, "marker", void 0);
__decorate([
    Collection([], Trendline)
], Series.prototype, "trendlines", void 0);
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
__decorate([
    Property('Natural')
], Series.prototype, "splineType", void 0);
__decorate([
    Property(0.5)
], Series.prototype, "cardinalSplineTension", void 0);
__decorate([
    Complex(null, EmptyPointSettings)
], Series.prototype, "emptyPointSettings", void 0);
__decorate([
    Property(true)
], Series.prototype, "showMean", void 0);
__decorate([
    Property('Normal')
], Series.prototype, "boxPlotMode", void 0);
__decorate([
    Property(0.7)
], Series.prototype, "columnWidth", void 0);
__decorate([
    Property(0)
], Series.prototype, "columnSpacing", void 0);
__decorate([
    Property('#C64E4A')
], Series.prototype, "negativeFillColor", void 0);
__decorate([
    Property('#4E81BC')
], Series.prototype, "summaryFillColor", void 0);
__decorate([
    Property()
], Series.prototype, "intermediateSumIndexes", void 0);
__decorate([
    Property()
], Series.prototype, "sumIndexes", void 0);
__decorate([
    Complex({ color: 'black', width: 2 }, Connector)
], Series.prototype, "connector", void 0);
__decorate([
    Complex(null, CornerRadius)
], Series.prototype, "cornerRadius", void 0);
