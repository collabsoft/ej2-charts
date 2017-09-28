import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Animation } from '@syncfusion/ej2-base';
import { stringToNumber, ChartLocation, degreeToLocation, Rect, getAnimationFunction, getElement } from '../../common/utils/helper';
import { animationComplete } from '../../common/model/constants';
import { pointByIndex, indexFinder } from '../model/acc-base';
var PieBase = (function () {
    function PieBase() {
    }
    PieBase.prototype.findCenter = function (accumulation) {
        this.accumulation = accumulation;
        this.center = {
            x: stringToNumber('50%', accumulation.initialClipRect.width) + (accumulation.initialClipRect.x),
            y: stringToNumber('50%', accumulation.initialClipRect.height) + (accumulation.initialClipRect.y)
        };
        var accumulationRect = this.getSeriesBound(accumulation.visibleSeries[0]);
        var accumulationRectCenter = new ChartLocation(accumulationRect.x + accumulationRect.width / 2, accumulationRect.y + accumulationRect.height / 2);
        this.center.x += (this.center.x - accumulationRectCenter.x);
        this.center.y += (this.center.y - accumulationRectCenter.y);
        this.accumulation.center = this.center;
    };
    PieBase.prototype.initProperties = function (chart, series) {
        var size = Math.min(chart.initialClipRect.width, chart.initialClipRect.height);
        this.initAngles(series);
        this.radius = stringToNumber(series.radius, size / 2);
        this.innerRadius = stringToNumber(series.innerRadius, this.radius);
        this.labelRadius = series.dataLabel.position === 'Inside' ? (((this.radius - this.innerRadius) / 2) + this.innerRadius) :
            (this.radius + stringToNumber(series.dataLabel.connectorStyle.length, size / 2));
        this.findCenter(chart);
        chart.explodeDistance = series.explode ? stringToNumber(series.explodeOffset, this.radius) : 0;
        this.defaultLabelBound(series, series.dataLabel.visible, series.dataLabel.position);
        this.totalAngle -= 0.001;
    };
    PieBase.prototype.initAngles = function (series) {
        this.totalAngle = (series.endAngle - series.startAngle) % 360;
        this.startAngle = series.startAngle - 90;
        this.totalAngle = this.totalAngle <= 0 ? (360 + this.totalAngle) : this.totalAngle;
        this.startAngle = (this.startAngle < 0 ? (this.startAngle + 360) : this.startAngle) % 360;
    };
    PieBase.prototype.defaultLabelBound = function (series, visible, position) {
        var accumulationBound = this.getSeriesBound(series);
        series.accumulationBound = accumulationBound;
        series.labelBound = new Rect(accumulationBound.x, accumulationBound.y, accumulationBound.width + accumulationBound.x, accumulationBound.height + accumulationBound.y);
        if (visible && position === 'Outside') {
            series.labelBound = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        }
    };
    PieBase.prototype.getSeriesBound = function (series) {
        var rect = new Rect(Infinity, Infinity, -Infinity, -Infinity);
        this.initAngles(series);
        var start = this.startAngle;
        var total = this.totalAngle;
        var end = (this.startAngle + total) % 360;
        end = (end === 0) ? 360 : end;
        series.findMaxBounds(rect, this.getRectFromAngle(start));
        series.findMaxBounds(rect, this.getRectFromAngle(end));
        series.findMaxBounds(rect, new Rect(this.center.x, this.center.y, 0, 0));
        var nextQuandrant = (Math.floor(start / 90) * 90 + 90) % 360;
        var lastQuadrant = (Math.floor(end / 90) * 90) % 360;
        lastQuadrant = (lastQuadrant === 0) ? 360 : lastQuadrant;
        if (total >= 90 || lastQuadrant === nextQuandrant) {
            series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            series.findMaxBounds(rect, this.getRectFromAngle(lastQuadrant));
        }
        if (start === 0 || (start + total >= 360)) {
            series.findMaxBounds(rect, this.getRectFromAngle(0));
        }
        var length = nextQuandrant === lastQuadrant ? 0 : Math.floor(total / 90);
        for (var i = 1; i < length; i++) {
            nextQuandrant = nextQuandrant + 90;
            if ((nextQuandrant < lastQuadrant || end < start) || total === 360) {
                series.findMaxBounds(rect, this.getRectFromAngle(nextQuandrant));
            }
        }
        rect.width -= rect.x;
        rect.height -= rect.y;
        return rect;
    };
    PieBase.prototype.getRectFromAngle = function (angle) {
        var location = degreeToLocation(angle, this.radius, this.center);
        return new Rect(location.x, location.y, 0, 0);
    };
    PieBase.prototype.getPathArc = function (center, start, end, radius, innerRadius) {
        var degree = end - start;
        degree = degree < 0 ? (degree + 360) : degree;
        var flag = (degree < 180) ? 0 : 1;
        if (!innerRadius && innerRadius === 0) {
            return this.getPiePath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, flag);
        }
        else {
            return this.getDoughnutPath(center, degreeToLocation(start, radius, center), degreeToLocation(end, radius, center), radius, degreeToLocation(start, innerRadius, center), degreeToLocation(end, innerRadius, center), innerRadius, flag);
        }
    };
    PieBase.prototype.getPiePath = function (center, start, end, radius, clockWise) {
        return 'M ' + center.x + ' ' + center.y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' 0 ' + clockWise + ' 1 ' + end.x + ' ' + end.y + ' Z';
    };
    PieBase.prototype.getDoughnutPath = function (center, start, end, radius, innerStart, innerEnd, innerRadius, clockWise) {
        return 'M ' + start.x + ' ' + start.y + ' A ' + radius + ' ' + radius + ' 0 ' + clockWise +
            ' 1 ' + end.x + ' ' + end.y + ' L ' + innerEnd.x + ' ' + innerEnd.y + ' A ' + innerRadius +
            ' ' + innerRadius + ' 0 ' + clockWise + ',0 ' + innerStart.x + ' ' + innerStart.y + ' Z';
    };
    PieBase.prototype.getTooltipPoint = function (e, accumulation, x, y) {
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
    PieBase.prototype.isDataLabel = function (target) {
        if (target.id.indexOf(this.accumulation.element.id + '_datalabel_Series_') > -1) {
            return true;
        }
        return false;
    };
    PieBase.prototype.getSeriesFromIndex = function (index, visibleSeries) {
        return visibleSeries[0];
    };
    PieBase.prototype.processExplode = function (event) {
        if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
            var pointIndex = indexFinder(event.target.id).point;
            if (isNaN(pointIndex)) {
                return null;
            }
            this.explodePoints(pointIndex);
            this.deExplodeAll(pointIndex);
        }
    };
    PieBase.prototype.invokeExplode = function () {
        if (this.accumulation.visibleSeries[0].explodeAll) {
            for (var _i = 0, _a = this.accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
                var point = _a[_i];
                this.explodePoints(point.index);
            }
        }
        else if (!isNullOrUndefined(this.accumulation.visibleSeries[0].explodeIndex)) {
            this.explodePoints(this.accumulation.visibleSeries[0].explodeIndex);
        }
        if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
            this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
            for (var _b = 0, _c = this.accumulation.accumulationSelectionModule.selectedDataIndexes; _b < _c.length; _b++) {
                var index = _c[_b];
                this.explodePoints(index.point, true);
                this.deExplodeAll(index.point);
            }
        }
    };
    PieBase.prototype.deExplodeAll = function (index) {
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var points = this.accumulation.visibleSeries[0].points;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var currentPoint = points_1[_i];
            if (index !== currentPoint.index) {
                this.deExplodeSlice(currentPoint.index, pointId, this.center);
            }
        }
    };
    PieBase.prototype.explodePoints = function (index, explode) {
        if (explode === void 0) { explode = false; }
        var pointId = this.accumulation.element.id + '_Series_0_Point_';
        var translate;
        var points = this.accumulation.visibleSeries[0].points;
        var point = pointByIndex(index, this.accumulation.visibleSeries[0].points);
        if (isNullOrUndefined(point)) {
            return null;
        }
        translate = degreeToLocation(point.midAngle, this.accumulation.explodeDistance, this.center);
        if (this.isExplode(pointId + index) || explode) {
            this.explodeSlice(index, translate, pointId, this.center);
        }
        else {
            this.deExplodeSlice(index, pointId, this.center);
        }
    };
    PieBase.prototype.isExplode = function (id) {
        var element = getElement(id);
        if (element && (element.getAttribute('transform') === 'translate(0, 0)' || element.getAttribute('transform') === null ||
            element.getAttribute('transform') === 'translate(0)')) {
            return true;
        }
        else {
            return false;
        }
    };
    PieBase.prototype.deExplodeSlice = function (index, sliceId, center) {
        var position = 'translate(0, 0)';
        this.setTranslate(index, sliceId, position);
    };
    PieBase.prototype.setTranslate = function (index, sliceId, position) {
        this.setElementTransform(sliceId + index, position);
        if (this.accumulation.visibleSeries[0].dataLabel.visible) {
            sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
            this.setElementTransform(sliceId + 'shape_' + index, position);
            this.setElementTransform(sliceId + 'text_' + index, position);
            this.setElementTransform(sliceId + 'connector_' + index, position);
        }
    };
    PieBase.prototype.setElementTransform = function (id, position) {
        var element = getElement(id);
        if (element) {
            element.setAttribute('transform', position);
        }
    };
    PieBase.prototype.explodeSlice = function (index, translate, sliceId, center) {
        var position = 'translate(' + (translate.x - center.x) + ', ' + (translate.y - center.y) + ')';
        this.setTranslate(index, sliceId, position);
    };
    PieBase.prototype.doAnimation = function (slice, series) {
        var _this = this;
        var startAngle = series.startAngle - 90;
        var value;
        var radius = Math.max(this.accumulation.availableSize.height, this.accumulation.availableSize.width) * 0.75;
        radius += radius * (0.414);
        var effect = getAnimationFunction('Linear');
        new Animation({}).animate(slice, {
            duration: series.animation.duration,
            delay: series.animation.delay,
            progress: function (args) {
                value = effect(args.timeStamp, startAngle, _this.totalAngle, args.duration);
                slice.setAttribute('d', _this.getPathArc(_this.center, startAngle, value, radius, 0));
            },
            end: function (args) {
                slice.setAttribute('d', _this.getPathArc(_this.center, 0, 359.99999, radius, 0));
                _this.accumulation.trigger(animationComplete, { series: series, accumulation: _this.accumulation });
                var datalabelGroup = getElement(_this.accumulation.element.id + '_datalabel_Series_' + series.index);
                datalabelGroup.style.visibility = 'visible';
            }
        });
    };
    return PieBase;
}());
export { PieBase };
