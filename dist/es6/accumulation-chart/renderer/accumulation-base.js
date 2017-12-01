/**
 * Defines the common functionalities of accumulation series
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { degreeToLocation, getElement } from '../../common/utils/helper';
import { pointByIndex, indexFinder } from '../model/acc-base';
/**
 * Accumulation Base used to do some base calculation for accumulation chart.
 */
var AccumulationBase = /** @class */ (function () {
    /** @private */
    function AccumulationBase(accumulation) {
        this.accumulation = accumulation;
    }
    Object.defineProperty(AccumulationBase.prototype, "center", {
        /**
         * Gets the center of the pie
         * @private
         */
        get: function () {
            return this.pieCenter || (this.accumulation.visibleSeries[0].type === 'Pie' ?
                this.accumulation.pieSeriesModule.center : null);
        },
        /**
         * Sets the center of the pie
         * @private
         */
        set: function (value) {
            this.pieCenter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "radius", {
        /**
         * Gets the radius of the pie
         * @private
         */
        get: function () {
            return this.pieRadius !== undefined ? this.pieRadius :
                this.accumulation.pieSeriesModule.radius;
        },
        /**
         * Sets the radius of the pie
         * @private
         */
        set: function (value) {
            this.pieRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccumulationBase.prototype, "labelRadius", {
        /**
         * Gets the label radius of the pie
         * @private
         */
        get: function () {
            return this.pieLabelRadius !== undefined ? this.pieLabelRadius :
                this.accumulation.pieSeriesModule.labelRadius;
        },
        /**
         * Sets the label radius of the pie
         * @private
         */
        set: function (value) {
            this.pieLabelRadius = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks whether the series is circular or not
     * @private
     */
    AccumulationBase.prototype.isCircular = function () {
        return this.accumulation.type === 'Pie';
    };
    /**
     * To get tooltip point from mouse x, y
     * @private
     */
    AccumulationBase.prototype.getTooltipPoint = function (e, accumulation, x, y) {
        var target = e.target;
        target = accumulation.isTouch ? document.elementFromPoint(x, y) : target;
        var id = target.id.split(accumulation.element.id + '_Series_');
        if (id[1]) {
            var seriesIndex = parseInt(id[1].split('_Point_')[0], 10);
            var pointIndex = parseInt(id[1].split('_Point_')[1], 10);
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                var series = this.getSeriesFromIndex(seriesIndex, accumulation.visibleSeries);
                if (series.enableTooltip) {
                    accumulation.accumulationTooltipModule.renderTooltip(series.points[pointIndex], series.index);
                }
            }
        }
        else if (accumulation.accumulationTooltipModule && accumulation.accumulationTooltipModule.tooltip && !this.isDataLabel(target)) {
            accumulation.accumulationTooltipModule.tooltip.close();
        }
    };
    /**
     * To find datalabel from target element
     */
    AccumulationBase.prototype.isDataLabel = function (target) {
        if (target.id.indexOf(this.accumulation.element.id + '_datalabel_Series_') > -1) {
            return true;
        }
        return false;
    };
    /**
     * To get series from index
     */
    AccumulationBase.prototype.getSeriesFromIndex = function (index, visibleSeries) {
        return visibleSeries[0];
    };
    /**
     * To process the explode on accumulation chart loading
     * @private
     */
    AccumulationBase.prototype.processExplode = function (event) {
        if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
            var pointIndex = indexFinder(event.target.id).point;
            if (isNaN(pointIndex) || (event.target.id.indexOf('_datalabel_') > -1 &&
                this.accumulation.visibleSeries[0].points[pointIndex].labelPosition === 'Outside')) {
                return null;
            }
            this.explodePoints(pointIndex, this.accumulation);
            this.deExplodeAll(pointIndex);
        }
    };
    /**
     * To invoke the explode on accumulation chart loading
     * @private
     */
    AccumulationBase.prototype.invokeExplode = function () {
        if (this.accumulation.visibleSeries[0].explodeAll) {
            for (var _i = 0, _a = this.accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
                var point = _a[_i];
                this.explodePoints(point.index, this.accumulation);
            }
        }
        else if (!isNullOrUndefined(this.accumulation.visibleSeries[0].explodeIndex)) {
            this.explodePoints(this.accumulation.visibleSeries[0].explodeIndex, this.accumulation);
        }
        if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
            this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
            for (var _b = 0, _c = this.accumulation.accumulationSelectionModule.selectedDataIndexes; _b < _c.length; _b++) {
                var index = _c[_b];
                this.explodePoints(index.point, this.accumulation, true);
                this.deExplodeAll(index.point);
            }
        }
    };
    /**
     * To deExplode all points in the series
     */
    AccumulationBase.prototype.deExplodeAll = function (index) {
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var points = this.accumulation.visibleSeries[0].points;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var currentPoint = points_1[_i];
            if (index !== currentPoint.index) {
                this.deExplodeSlice(currentPoint.index, pointId, this.center);
            }
        }
    };
    /**
     * To explode point by index
     * @private
     */
    AccumulationBase.prototype.explodePoints = function (index, chart, explode) {
        if (explode === void 0) { explode = false; }
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var translate;
        var points = this.accumulation.visibleSeries[0].points;
        var point = pointByIndex(index, this.accumulation.visibleSeries[0].points);
        if (isNullOrUndefined(point)) {
            return null;
        }
        if (!this.isCircular()) {
            translate = { x: chart.explodeDistance, y: 0 };
        }
        else {
            translate = degreeToLocation(point.midAngle, chart.explodeDistance, this.center);
        }
        if (this.isExplode(pointId + index) || explode) {
            this.explodeSlice(index, translate, pointId, this.center || { x: 0, y: 0 });
        }
        else {
            this.deExplodeSlice(index, pointId, this.center);
        }
    };
    /**
     * To check point is exploded by id
     */
    AccumulationBase.prototype.isExplode = function (id) {
        var element = getElement(id);
        if (element && (element.getAttribute('transform') === 'translate(0, 0)' || element.getAttribute('transform') === null ||
            element.getAttribute('transform') === 'translate(0)')) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * To deExplode the point by index
     */
    AccumulationBase.prototype.deExplodeSlice = function (index, sliceId, center) {
        var position = 'translate(0, 0)';
        this.setTranslate(index, sliceId, position);
    };
    /**
     * To translate the point elements by index and position
     */
    AccumulationBase.prototype.setTranslate = function (index, sliceId, position) {
        this.setElementTransform(sliceId + index, position);
        if (this.accumulation.visibleSeries[0].dataLabel.visible) {
            sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    };
    /**
     * To translate the point element by id and position
     */
    AccumulationBase.prototype.setElementTransform = function (id, position) {
        var element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    };
    /**
     * To translate the point elements by index position
     */
    AccumulationBase.prototype.explodeSlice = function (index, translate, sliceId, center) {
        var position = 'translate(' + (translate.x - center.x) + ', ' + (translate.y - center.y) + ')';
        this.setTranslate(index, sliceId, position);
    };
    return AccumulationBase;
}());
export { AccumulationBase };
