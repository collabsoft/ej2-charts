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
var Font = (function (_super) {
    __extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Font;
}(ChildProperty));
export { Font };
__decorate([
    Property('16px')
], Font.prototype, "size", void 0);
__decorate([
    Property('')
], Font.prototype, "color", void 0);
__decorate([
    Property('Segoe UI')
], Font.prototype, "fontFamily", void 0);
__decorate([
    Property('Regular')
], Font.prototype, "fontWeight", void 0);
__decorate([
    Property('Normal')
], Font.prototype, "fontStyle", void 0);
__decorate([
    Property(1)
], Font.prototype, "opacity", void 0);
var Border = (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Border;
}(ChildProperty));
export { Border };
__decorate([
    Property('')
], Border.prototype, "color", void 0);
__decorate([
    Property(1)
], Border.prototype, "width", void 0);
var ChartArea = (function (_super) {
    __extends(ChartArea, _super);
    function ChartArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChartArea;
}(ChildProperty));
export { ChartArea };
__decorate([
    Complex({}, Border)
], ChartArea.prototype, "border", void 0);
__decorate([
    Property('transparent')
], ChartArea.prototype, "background", void 0);
__decorate([
    Property(1)
], ChartArea.prototype, "opacity", void 0);
var Margin = (function (_super) {
    __extends(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Margin;
}(ChildProperty));
export { Margin };
__decorate([
    Property(10)
], Margin.prototype, "left", void 0);
__decorate([
    Property(10)
], Margin.prototype, "right", void 0);
__decorate([
    Property(10)
], Margin.prototype, "top", void 0);
__decorate([
    Property(10)
], Margin.prototype, "bottom", void 0);
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Animation;
}(ChildProperty));
export { Animation };
__decorate([
    Property(true)
], Animation.prototype, "enable", void 0);
__decorate([
    Property(1000)
], Animation.prototype, "duration", void 0);
__decorate([
    Property(0)
], Animation.prototype, "delay", void 0);
var Indexes = (function (_super) {
    __extends(Indexes, _super);
    function Indexes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Indexes;
}(ChildProperty));
export { Indexes };
__decorate([
    Property(0)
], Indexes.prototype, "series", void 0);
__decorate([
    Property(0)
], Indexes.prototype, "point", void 0);
var Index = (function () {
    function Index(seriesIndex, pointIndex) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
    return Index;
}());
export { Index };
