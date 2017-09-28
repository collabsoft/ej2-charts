import { createTemplate, measureElementRect, logBase } from '../utils/helper';
import { ChartLocation, stringToNumber, appendElement, withIn, Rect } from '../utils/helper';
import { getPoint } from '../utils/helper';
import { createElement } from '@syncfusion/ej2-base';
import { annotationRender } from '../model/constants';
var AnnotationBase = (function () {
    function AnnotationBase(control) {
        this.control = control;
    }
    AnnotationBase.prototype.render = function (annotation, index) {
        this.isChart = this.control.getModuleName() === 'chart';
        this.annotation = annotation;
        var childElement = createTemplate(createElement('div', {
            id: this.control.element.id + '_Annotation_' + index,
            styles: 'position: absolute;'
        }), index, annotation.content, this.control);
        return childElement;
    };
    AnnotationBase.prototype.setAnnotationPixelValue = function (location) {
        var rect;
        rect = this.annotation.region === 'Chart' ?
            new Rect(0, 0, this.control.availableSize.width, this.control.availableSize.height) :
            this.isChart ?
                this.control.chartAxisLayoutPanel.seriesClipRect :
                this.control.series[0].accumulationBound;
        location.x = ((typeof this.annotation.x !== 'string') ?
            ((typeof this.annotation.x === 'number') ? this.annotation.x : 0) :
            stringToNumber(this.annotation.x, rect.width)) + rect.x;
        location.y = ((typeof this.annotation.y === 'number') ? this.annotation.y :
            stringToNumber(this.annotation.y, rect.height)) + rect.y;
        return true;
    };
    AnnotationBase.prototype.setAnnotationPointValue = function (location) {
        var symbolLocation = new ChartLocation(0, 0);
        if (this.isChart) {
            var xAxis = void 0;
            var yAxis = void 0;
            var chart = this.control;
            var annotation = this.annotation;
            var xValue = void 0;
            var isLog = false;
            var xAxisName = annotation.xAxisName;
            var yAxisName = annotation.yAxisName;
            var isInverted = chart.requireInvertedAxis;
            var withinRange = void 0;
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis = _a[_i];
                if (xAxisName === axis.name || (xAxisName == null && axis.name === 'primaryXAxis')) {
                    xAxis = axis;
                    if (xAxis.valueType === 'Category') {
                        if (xAxis.labels.indexOf(annotation.x) < 0) {
                            return false;
                        }
                        else {
                            xValue = xAxis.labels.indexOf(annotation.x);
                        }
                    }
                    else if (xAxis.valueType === 'DateTime') {
                        var option = { skeleton: 'full', type: 'dateTime' };
                        xValue = (typeof this.annotation.x === 'object') ?
                            Date.parse(chart.intl.getDateParser(option)(chart.intl.getDateFormat(option)(annotation.x))) : 0;
                    }
                    else {
                        xValue = +annotation.x;
                    }
                }
                else if (yAxisName === axis.name || (yAxisName == null && axis.name === 'primaryYAxis')) {
                    yAxis = axis;
                    isLog = yAxis.valueType === 'Logarithmic';
                }
            }
            if (xAxis && yAxis && withIn(xAxis.valueType === 'Logarithmic' ? logBase(xValue, xAxis.logBase) : xValue, xAxis.visibleRange)) {
                withinRange = withIn((isLog ? logBase(+this.annotation.y, yAxis.logBase) : +this.annotation.y), yAxis.visibleRange);
                symbolLocation = isInverted ? getPoint(withinRange ? +annotation.y :
                    isLog ?
                        Math.pow(yAxis.logBase, yAxis.visibleRange.max) :
                        +annotation.y > yAxis.visibleRange.max ? yAxis.visibleRange.max : yAxis.visibleRange.min, xValue, yAxis, xAxis) : getPoint(xValue, withinRange ? +annotation.y :
                    isLog ? Math.pow(yAxis.logBase, yAxis.visibleRange.max) :
                        +annotation.y > yAxis.visibleRange.max ? yAxis.visibleRange.max : yAxis.visibleRange.min, xAxis, yAxis);
                location.x = symbolLocation.x + (isInverted ? yAxis.rect.x : xAxis.rect.x);
                location.y = symbolLocation.y + (isInverted ? xAxis.rect.y : yAxis.rect.y);
            }
            else {
                return false;
            }
            return true;
        }
        else {
            return this.setAccumulationPointValue(location);
        }
    };
    AnnotationBase.prototype.setAccumulationPointValue = function (location) {
        var accumulation = this.control;
        var point;
        for (var _i = 0, _a = accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
            var accPoint = _a[_i];
            if (typeof accPoint.x === 'object') {
                if (Date.parse(accPoint.x) === Date.parse(this.annotation.x) &&
                    accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            }
            else {
                if (accPoint.x === this.annotation.x && accPoint.y === this.annotation.y) {
                    point = accPoint;
                    break;
                }
            }
        }
        if (point && point.visible) {
            location.x = point.symbolLocation.x;
            location.y = point.symbolLocation.y;
            return true;
        }
        else {
            return false;
        }
    };
    AnnotationBase.prototype.setElementStyle = function (location, element, parentElement) {
        var elementRect = measureElementRect(element);
        var argsData = {
            cancel: false, name: annotationRender, content: element,
            location: location
        };
        this.control.trigger(annotationRender, argsData);
        if (!argsData.cancel) {
            argsData.content.style.left = this.setAlignmentValue(this.annotation.horizontalAlignment, elementRect.width, argsData.location.x) + 'px';
            argsData.content.style.top = this.setAlignmentValue(this.annotation.verticalAlignment, elementRect.height, argsData.location.y) + 'px';
            argsData.content.setAttribute('aria-label', this.annotation.description || 'Annotation');
            appendElement(argsData.content, parentElement);
        }
    };
    AnnotationBase.prototype.setAlignmentValue = function (alignment, size, value) {
        switch (alignment) {
            case 'Top':
            case 'Near':
                value -= size;
                break;
            case 'Bottom':
            case 'Far':
                value += 0;
                break;
            case 'Middle':
            case 'Center':
                value -= (size / 2);
                break;
        }
        return value;
    };
    return AnnotationBase;
}());
export { AnnotationBase };
