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
import { ChildProperty, Property } from '@syncfusion/ej2-base';
var ChartAnnotationSettings = (function (_super) {
    __extends(ChartAnnotationSettings, _super);
    function ChartAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChartAnnotationSettings;
}(ChildProperty));
export { ChartAnnotationSettings };
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
