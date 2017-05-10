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
define(["require", "exports", "@syncfusion/ej2-base", "./theme"], function (require, exports, ej2_base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Font;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property('Regular')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Font.prototype, "opacity", void 0);
    exports.Font = Font;
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Border;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Border.prototype, "width", void 0);
    exports.Border = Border;
    var TooltipSettings = (function (_super) {
        __extends(TooltipSettings, _super);
        function TooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        ej2_base_1.Property('#FFFFFF')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.tooltipLabelFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Complex({ color: null }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    exports.TooltipSettings = TooltipSettings;
    var CrosshairSettings = (function (_super) {
        __extends(CrosshairSettings, _super);
        function CrosshairSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#4f4f4f', width: 1 }, Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    exports.CrosshairSettings = CrosshairSettings;
    var ChartArea = (function (_super) {
        __extends(ChartArea, _super);
        function ChartArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChartArea;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    exports.ChartArea = ChartArea;
    var Margin = (function (_super) {
        __extends(Margin, _super);
        function Margin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Margin;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "bottom", void 0);
    exports.Margin = Margin;
    var ZoomSettings = (function (_super) {
        __extends(ZoomSettings, _super);
        function ZoomSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ZoomSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], ZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        ej2_base_1.Property('XY')
    ], ZoomSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], ZoomSettings.prototype, "toolbarItems", void 0);
    exports.ZoomSettings = ZoomSettings;
});
