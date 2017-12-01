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
import { ChildProperty, Property, Complex } from '@syncfusion/ej2-base';
import { Theme } from '../../common/model/theme';
import { Font, Border } from '../../common/model/base';
/**
 * Configures the Annotation for chart.
 */
var ChartAnnotationSettings = /** @class */ (function (_super) {
    __extends(ChartAnnotationSettings, _super);
    function ChartAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('0')
    ], ChartAnnotationSettings.prototype, "x", void 0);
    __decorate([
        Property('0')
    ], ChartAnnotationSettings.prototype, "y", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property('Center')
    ], ChartAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Pixel')
    ], ChartAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        Property('Chart')
    ], ChartAnnotationSettings.prototype, "region", void 0);
    __decorate([
        Property('Middle')
    ], ChartAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "xAxisName", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "yAxisName", void 0);
    __decorate([
        Property(null)
    ], ChartAnnotationSettings.prototype, "description", void 0);
    return ChartAnnotationSettings;
}(ChildProperty));
export { ChartAnnotationSettings };
/**
 * Strip line properties
 */
var StripLineSettings = /** @class */ (function (_super) {
    __extends(StripLineSettings, _super);
    function StripLineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], StripLineSettings.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], StripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "start", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "end", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "size", void 0);
    __decorate([
        Property('#808080')
    ], StripLineSettings.prototype, "color", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], StripLineSettings.prototype, "border", void 0);
    __decorate([
        Property('')
    ], StripLineSettings.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], StripLineSettings.prototype, "rotation", void 0);
    __decorate([
        Property('Middle')
    ], StripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Middle')
    ], StripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Complex(Theme.stripLineLabelFont, Font)
    ], StripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        Property('Behind')
    ], StripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        Property(1)
    ], StripLineSettings.prototype, "opacity", void 0);
    return StripLineSettings;
}(ChildProperty));
export { StripLineSettings };
