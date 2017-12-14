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
/**
 * AccumulationChart base file
 */
import { Property, ChildProperty, Complex, createElement } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Border, Font, Animation, Index, EmptyPointSettings, Connector } from '../../common/model/base';
import { stringToNumber, PathOption } from '../../common/utils/helper';
import { seriesRender, pointRender } from '../../common/model/constants';
import { Theme, getSeriesColor } from '../../common/model/theme';
import { getElement, firstToLowerCase } from '../../common/utils/helper';
/**
 * Annotation for accumulation series
 */
var AccumulationAnnotationSettings = /** @class */ (function (_super) {
    __extends(AccumulationAnnotationSettings, _super);
    function AccumulationAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "x", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "y", void 0);
    __decorate([
        Property('Pixel')
    ], AccumulationAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        Property('Chart')
    ], AccumulationAnnotationSettings.prototype, "region", void 0);
    __decorate([
        Property('Middle')
    ], AccumulationAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Property('Center')
    ], AccumulationAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "description", void 0);
    return AccumulationAnnotationSettings;
}(ChildProperty));
export { AccumulationAnnotationSettings };
/**
 * Configures the dataLabel in accumulation chart.
 */
var AccumulationDataLabelSettings = /** @class */ (function (_super) {
    __extends(AccumulationDataLabelSettings, _super);
    function AccumulationDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], AccumulationDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property('Inside')
    ], AccumulationDataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "ry", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], AccumulationDataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ size: '11px', color: null }, Font)
    ], AccumulationDataLabelSettings.prototype, "font", void 0);
    __decorate([
        Complex({}, Connector)
    ], AccumulationDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "template", void 0);
    return AccumulationDataLabelSettings;
}(ChildProperty));
export { AccumulationDataLabelSettings };
/**
 * Configures the tooltip in accumulation chart.
 */
var AccumulationTooltipSettings = /** @class */ (function (_super) {
    __extends(AccumulationTooltipSettings, _super);
    function AccumulationTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], AccumulationTooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(true)
    ], AccumulationTooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Property(null)
    ], AccumulationTooltipSettings.prototype, "format", void 0);
    __decorate([
        Property('#FFFFFF')
    ], AccumulationTooltipSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: null }, Border)
    ], AccumulationTooltipSettings.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], AccumulationTooltipSettings.prototype, "template", void 0);
    __decorate([
        Complex(Theme.tooltipLabelFont, Font)
    ], AccumulationTooltipSettings.prototype, "textStyle", void 0);
    return AccumulationTooltipSettings;
}(ChildProperty));
export { AccumulationTooltipSettings };
/**
 * Points model for the series.
 * @private
 */
var AccPoints = /** @class */ (function () {
    function AccPoints() {
        this.visible = true;
        this.symbolLocation = null;
        /** @private */
        this.region = null;
        /** @private */
        this.labelRegion = null;
        /** @private */
        this.labelVisible = true;
    }
    return AccPoints;
}());
export { AccPoints };
/**
 *  Configures the series in accumulation chart.
 */
var AccumulationSeries = /** @class */ (function (_super) {
    __extends(AccumulationSeries, _super);
    function AccumulationSeries() {
        /**
         * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
         * ```html
         * <div id='Pie'></div>
         * ```
         * ```typescript
         * let dataManager: DataManager = new DataManager({
         *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
         * });
         * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
         * let pie: AccumulationChart = new AccumulationChart({
         * ...
         *     series: [{
         *        dataSource: dataManager,
         *        xName: 'Id',
         *        yName: 'Estimate',
         *        query: query
         *    }],
         * ...
         * });
         * pie.appendTo('#Pie');
         * ```
         * @default ''
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.points = [];
        /** @private */
        _this.sumOfPoints = 0;
        return _this;
    }
    /** @private To refresh the Datamanager for series */
    AccumulationSeries.prototype.refreshDataManager = function (accumulation) {
        var _this = this;
        if (isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: this.dataSource, count: this.dataSource.length }, accumulation);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, accumulation); });
    };
    /**
     * To get points on dataManager is success
     * @private
     */
    AccumulationSeries.prototype.dataManagerSuccess = function (e, accumulation) {
        var argsData = {
            name: seriesRender, series: this, data: e.result,
        };
        accumulation.trigger(seriesRender, argsData);
        this.resultData = e.result;
        this.getPoints(e.result, accumulation);
        if (++accumulation.seriesCounts === accumulation.visibleSeries.length) {
            accumulation.refreshChart();
        }
    };
    /** @private To find points from result data */
    AccumulationSeries.prototype.getPoints = function (result, accumulation) {
        var length = Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        this.sumOfClub = 0;
        var point;
        var colors = this.palettes.length ? this.palettes : getSeriesColor(accumulation.theme);
        var clubValue = stringToNumber(this.groupTo, this.sumOfPoints);
        for (var i = 0; i < length; i++) {
            point = this.setPoints(result, i, colors);
            var currentY = point.y;
            if (!this.isClub(point, clubValue)) {
                if (isNullOrUndefined(point.y)) {
                    point.visible = false;
                }
                this.pushPoints(point, colors);
            }
        }
        this.lastGroupTo = this.groupTo;
        if (this.sumOfClub > 0) {
            var clubPoint = new AccPoints();
            clubPoint.x = 'Others';
            clubPoint.y = this.sumOfClub;
            clubPoint.text = clubPoint.originalText = clubPoint.x + ': ' + this.sumOfClub;
            this.pushPoints(clubPoint, colors);
        }
    };
    /**
     * Method to set point index and color
     */
    AccumulationSeries.prototype.pushPoints = function (point, colors) {
        point.index = this.points.length;
        point.color = point.color || colors[point.index % colors.length];
        this.points.push(point);
    };
    /**
     * Method to find club point
     */
    AccumulationSeries.prototype.isClub = function (point, clubValue) {
        if (Math.abs(point.y) <= clubValue && !isNullOrUndefined(clubValue)) {
            this.sumOfClub += Math.abs(point.y);
            return true;
        }
        return false;
    };
    /**
     * Method to find sum of points in the series
     */
    AccumulationSeries.prototype.findSumOfPoints = function (result) {
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    };
    /**
     * Method to set points x, y and text from data source
     */
    AccumulationSeries.prototype.setPoints = function (data, i, colors) {
        var point = new AccPoints();
        point.x = data[i][this.xName];
        point.y = data[i][this.yName];
        point.text = point.originalText = data[i][this.dataLabel.name];
        this.setAccEmptyPoint(point, i, data, colors);
        return point;
    };
    /**
     * Method render the series elements for accumulation chart
     * @private
     */
    AccumulationSeries.prototype.renderSeries = function (accumulation) {
        var seriesGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index });
        this.renderPoints(accumulation, seriesGroup);
        var datalabelGroup;
        if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
            datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });
            datalabelGroup.style.visibility =
                (this.animation.enable && accumulation.animateSeries && this.type === 'Pie') ? 'hidden' : 'visible';
            this.renderDataLabel(accumulation, datalabelGroup);
        }
        if (this.type === 'Pie') {
            this.findMaxBounds(this.labelBound, this.accumulationBound);
            accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup);
        }
        if (accumulation.accumulationLegendModule) {
            this.labelBound.x -= accumulation.explodeDistance;
            this.labelBound.y -= accumulation.explodeDistance;
            this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
            this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
        }
    };
    /**
     * Method render the points elements for accumulation chart series.
     */
    AccumulationSeries.prototype.renderPoints = function (accumulation, seriesGroup) {
        var pointId = accumulation.element.id + '_Series_' + this.index + '_Point_';
        var option;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var argsData = {
                cancel: false, name: pointRender, series: this, point: point, fill: point.color,
                border: this.isEmpty(point) ? { width: this.emptyPointSettings.border.width, color: this.emptyPointSettings.border.color } :
                    { width: this.border.width, color: this.border.color }
            };
            accumulation.trigger(pointRender, argsData);
            point.color = argsData.fill;
            if (point.visible) {
                option = new PathOption(pointId + point.index, point.color, argsData.border.width || 1, argsData.border.color || point.color, 1, '', '');
                accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].
                    renderPoint(point, this, accumulation, option);
                seriesGroup.appendChild(accumulation.renderer.drawPath(option));
            }
        }
        accumulation.getSeriesElement().appendChild(seriesGroup);
    };
    /**
     * Method render the datalabel elements for accumulation chart.
     */
    AccumulationSeries.prototype.renderDataLabel = function (accumulation, datalabelGroup) {
        accumulation.accumulationDataLabelModule.findAreaRect();
        var element = createElement('div', {
            id: accumulation.element.id + '_Series_0' + '_DataLabelCollections'
        });
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible) {
                accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index, element);
            }
        }
        if (this.dataLabel.template !== null && element.childElementCount) {
            getElement(accumulation.element.id + '_Secondary_Element').appendChild(element);
        }
        accumulation.getSeriesElement().appendChild(datalabelGroup);
    };
    /**
     * To find maximum bounds for smart legend placing
     * @private
     */
    AccumulationSeries.prototype.findMaxBounds = function (totalbound, bound) {
        totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
        totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
        totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
        totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
    };
    /**
     * To set empty point value for null points
     * @private
     */
    AccumulationSeries.prototype.setAccEmptyPoint = function (point, i, data, colors) {
        if (!isNullOrUndefined(point.y)) {
            return null;
        }
        point.color = this.emptyPointSettings.fill || point.color;
        switch (this.emptyPointSettings.mode) {
            case 'Zero':
                point.y = 0;
                point.visible = true;
                break;
            case 'Average':
                var previous = data[i - 1] ? (data[i - 1][this.yName] || 0) : 0;
                var next = data[i + 1] ? (data[i + 1][this.yName] || 0) : 0;
                point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                this.sumOfPoints += point.y;
                point.visible = true;
                break;
            case 'Drop':
                point.visible = false;
                break;
        }
    };
    /**
     * To find point is empty
     */
    AccumulationSeries.prototype.isEmpty = function (point) {
        return point.color === this.emptyPointSettings.fill;
    };
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], AccumulationSeries.prototype, "query", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "name", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "yName", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "visible", void 0);
    __decorate([
        Complex({ color: null, width: 0 }, Border)
    ], AccumulationSeries.prototype, "border", void 0);
    __decorate([
        Complex(null, Animation)
    ], AccumulationSeries.prototype, "animation", void 0);
    __decorate([
        Property('SeriesType')
    ], AccumulationSeries.prototype, "legendShape", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "selectionStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "groupTo", void 0);
    __decorate([
        Complex({}, AccumulationDataLabelSettings)
    ], AccumulationSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property([])
    ], AccumulationSeries.prototype, "palettes", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "startAngle", void 0);
    __decorate([
        Property(360)
    ], AccumulationSeries.prototype, "endAngle", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "radius", void 0);
    __decorate([
        Property('0')
    ], AccumulationSeries.prototype, "innerRadius", void 0);
    __decorate([
        Property('Pie')
    ], AccumulationSeries.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explode", void 0);
    __decorate([
        Property('30%')
    ], AccumulationSeries.prototype, "explodeOffset", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explodeAll", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "explodeIndex", void 0);
    __decorate([
        Complex({ mode: 'Drop' }, EmptyPointSettings)
    ], AccumulationSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "gapRatio", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "width", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "height", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckWidth", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckHeight", void 0);
    __decorate([
        Property('Linear')
    ], AccumulationSeries.prototype, "pyramidMode", void 0);
    return AccumulationSeries;
}(ChildProperty));
export { AccumulationSeries };
/**
 * method to get series from index
 * @private
 */
export function getSeriesFromIndex(index, visibleSeries) {
    for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
        var series = visibleSeries_1[_i];
        if (index === series.index) {
            return series;
        }
    }
    return visibleSeries[0];
}
/**
 * method to get point from index
 * @private
 */
export function pointByIndex(index, points) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        if (point.index === index) {
            return point;
        }
    }
    return null;
}
/**
 * method to find series, point index by element id
 * @private
 */
export function indexFinder(id) {
    var ids = ['NaN', 'NaN'];
    if (id.indexOf('_Point_') > -1) {
        ids = id.split('_Series_')[1].split('_Point_');
    }
    else if (id.indexOf('_shape_') > -1) {
        ids = id.split('_shape_');
        ids[0] = '0';
    }
    else if (id.indexOf('_text_') > -1) {
        ids = id.split('_text_');
        ids[0] = '0';
    }
    return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
}
