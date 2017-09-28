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
import { AnnotationBase } from '../../common/annotation/annotation';
import { ChartLocation, appendElement } from '../../common/utils/helper';
import { createElement } from '@syncfusion/ej2-base';
var AccumulationAnnotation = (function (_super) {
    __extends(AccumulationAnnotation, _super);
    function AccumulationAnnotation(control, annotations) {
        var _this = _super.call(this, control) || this;
        _this.pie = control;
        _this.annotations = annotations;
        return _this;
    }
    AccumulationAnnotation.prototype.renderAnnotations = function (element) {
        var _this = this;
        var annotationElement;
        var location;
        this.parentElement = createElement('div', {
            id: this.pie.element.id + '_Annotation_Collections'
        });
        this.annotations.map(function (annotation, index) {
            location = new ChartLocation(0, 0);
            annotationElement = _this.render(annotation, index);
            if (_this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                _this.setElementStyle(location, annotationElement, _this.parentElement);
            }
        });
        appendElement(this.parentElement, element);
    };
    AccumulationAnnotation.prototype.getModuleName = function () {
        return 'Annotation';
    };
    AccumulationAnnotation.prototype.destroy = function (control) {
    };
    return AccumulationAnnotation;
}(AnnotationBase));
export { AccumulationAnnotation };
