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
/**
 * Defines the appearance of the connectors
 */
var Connector = /** @class */ (function (_super) {
    __extends(Connector, _super);
    function Connector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Line')
    ], Connector.prototype, "type", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], Connector.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Connector.prototype, "length", void 0);
    __decorate([
        Property('')
    ], Connector.prototype, "dashArray", void 0);
    return Connector;
}(ChildProperty));
export { Connector };
/**
 * Configures the fonts in charts.
 */
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
        Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    __decorate([
        Property('Center')
    ], Font.prototype, "textAlignment", void 0);
    return Font;
}(ChildProperty));
export { Font };
/**
 * Configures the borders in the chart.
 */
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        Property(1)
    ], Border.prototype, "width", void 0);
    return Border;
}(ChildProperty));
export { Border };
/**
 * Configures the chart area.
 */
var ChartArea = /** @class */ (function (_super) {
    __extends(ChartArea, _super);
    function ChartArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    return ChartArea;
}(ChildProperty));
export { ChartArea };
/**
 * Configures the chart margins.
 */
var Margin = /** @class */ (function (_super) {
    __extends(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return Margin;
}(ChildProperty));
export { Margin };
/**
 * Configures the animation behavior for chart series.
 */
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], Animation.prototype, "delay", void 0);
    return Animation;
}(ChildProperty));
export { Animation };
/** @private */
var Indexes = /** @class */ (function (_super) {
    __extends(Indexes, _super);
    function Indexes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        Property(0)
    ], Indexes.prototype, "point", void 0);
    return Indexes;
}(ChildProperty));
export { Indexes };
/**
 * Column series rounded corner options
 */
var CornerRadius = /** @class */ (function (_super) {
    __extends(CornerRadius, _super);
    function CornerRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "topRight", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        Property(0)
    ], CornerRadius.prototype, "bottomRight", void 0);
    return CornerRadius;
}(ChildProperty));
export { CornerRadius };
/**
 * @private
 */
var Index = /** @class */ (function () {
    function Index(seriesIndex, pointIndex) {
        this.series = seriesIndex;
        this.point = pointIndex;
    }
    return Index;
}());
export { Index };
/**
 * Configures the Empty Points of series
 */
var EmptyPointSettings = /** @class */ (function (_super) {
    __extends(EmptyPointSettings, _super);
    function EmptyPointSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], EmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], EmptyPointSettings.prototype, "border", void 0);
    __decorate([
        Property('Gap')
    ], EmptyPointSettings.prototype, "mode", void 0);
    return EmptyPointSettings;
}(ChildProperty));
export { EmptyPointSettings };
