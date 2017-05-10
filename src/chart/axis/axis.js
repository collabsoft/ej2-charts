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
define(["require", "exports", "@syncfusion/ej2-base", "../model/base", "../utils/helper", "../utils/double-range", "../axis/double-axis", "../model/theme"], function (require, exports, ej2_base_1, base_1, helper_1, double_range_1, double_axis_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axisPadding = 10;
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            return _this;
        }
        Row.prototype.computeSize = function (axis, clipRect) {
            var titleSize = 0;
            var width = 0;
            var innerPadding = 5;
            if (axis.title) {
                titleSize = helper_1.measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            width += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.width + innerPadding + axisPadding + axis.lineStyle.width / 2);
            if (axis.opposedPosition) {
                this.farSizes.push(width);
            }
            else {
                this.nearSizes.push(width);
            }
        };
        return Row;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Row.prototype, "border", void 0);
    exports.Row = Row;
    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            _this.padding = 0;
            return _this;
        }
        Column.prototype.computeSize = function (axis, clipRect) {
            var titleSize = 0;
            var height = 0;
            var innerPadding = 5;
            if (axis.title) {
                titleSize = helper_1.measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            height += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.height + innerPadding + axisPadding
                + axis.lineStyle.width / 2);
            if (axis.opposedPosition) {
                this.farSizes.push(height);
            }
            else {
                this.nearSizes.push(height);
            }
        };
        return Column;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Column.prototype, "border", void 0);
    exports.Column = Column;
    var MajorGridLines = (function (_super) {
        __extends(MajorGridLines, _super);
        function MajorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMajorGridLineColor)
    ], MajorGridLines.prototype, "color", void 0);
    exports.MajorGridLines = MajorGridLines;
    var MinorGridLines = (function (_super) {
        __extends(MinorGridLines, _super);
        function MinorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMinorGridLineColor)
    ], MinorGridLines.prototype, "color", void 0);
    exports.MinorGridLines = MinorGridLines;
    var AxisLine = (function (_super) {
        __extends(AxisLine, _super);
        function AxisLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AxisLine;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisLineColor)
    ], AxisLine.prototype, "color", void 0);
    exports.AxisLine = AxisLine;
    var MajorTickLines = (function (_super) {
        __extends(MajorTickLines, _super);
        function MajorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMajorTickLineColor)
    ], MajorTickLines.prototype, "color", void 0);
    exports.MajorTickLines = MajorTickLines;
    var MinorTickLines = (function (_super) {
        __extends(MinorTickLines, _super);
        function MinorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.axisMinorTickLineColor)
    ], MinorTickLines.prototype, "color", void 0);
    exports.MinorTickLines = MinorTickLines;
    var CrosshairTooltip = (function (_super) {
        __extends(CrosshairTooltip, _super);
        function CrosshairTooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairTooltip;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.crossHairLabelColor)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.crosshairLabelFont, base_1.Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    exports.CrosshairTooltip = CrosshairTooltip;
    var Axis = (function (_super) {
        __extends(Axis, _super);
        function Axis() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.visibleLabels = [];
            _this.series = [];
            _this.rect = new helper_1.Rect(undefined, undefined, 0, 0);
            _this.axisBottomLine = null;
            _this.intervalDivs = [10, 5, 2, 1];
            _this.angle = _this.labelRotation;
            return _this;
        }
        Axis.prototype.setRange = function () {
            if (this.minimum != null && this.maximum != null) {
                return true;
            }
            return false;
        };
        Axis.prototype.calculateVisibleRange = function (size) {
            if (this.zoomFactor < 1 || this.zoomPosition > 0) {
                var baseRange = this.actualRange;
                var start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                var end = start + this.zoomFactor * this.actualRange.delta;
                if (start < baseRange.min) {
                    end = end + (baseRange.min - start);
                    start = baseRange.min;
                }
                if (end > baseRange.max) {
                    start = start - (end - baseRange.max);
                    end = baseRange.max;
                }
                this.doubleRange = new double_range_1.DoubleRange(start, end);
                this.visibleRange.min = this.doubleRange.start;
                this.visibleRange.max = this.doubleRange.end;
                this.visibleRange.delta = this.doubleRange.delta;
            }
        };
        Axis.prototype.getActualDesiredIntervalsCount = function (availableSize) {
            var size = this.orientation === 'Horizontal' ? availableSize.width : availableSize.height;
            if (this.desiredIntervals === null) {
                var desiredIntervalsCount = (this.orientation === 'Horizontal' ? 0.533 : 1) * this.maximumLabels;
                desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
                return desiredIntervalsCount;
            }
            else {
                return this.desiredIntervals;
            }
        };
        Axis.prototype.getMaxLabelWidth = function (chart) {
            var prevSize = new helper_1.Size(0, 0);
            var rotatedLabel;
            var pointX;
            var previousEnd = 0;
            var isIntersect = false;
            this.angle = this.labelRotation;
            this.maxLabelSize = new helper_1.Size(0, 0);
            var label;
            for (var i = 0; i < this.visibleLabels.length; i++) {
                label = this.visibleLabels[i];
                label.size = helper_1.measureText(label.text, this.labelStyle);
                if (label.size.width > this.maxLabelSize.width) {
                    this.maxLabelSize.width = label.size.width;
                    this.rotatedLabel = label.text;
                }
                if (label.size.height > this.maxLabelSize.height) {
                    this.maxLabelSize.height = label.size.height;
                }
                if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect &&
                    (this.labelIntersectAction === 'Rotate90' || this.labelIntersectAction === 'Rotate45')) {
                    pointX = (helper_1.valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                    pointX -= label.size.width / 2;
                    if (this.edgeLabelPlacement === 'Shift') {
                        if (i === 0 && pointX < this.rect.x) {
                            pointX = this.rect.x;
                        }
                        if (i === this.visibleLabels.length - 1 && ((pointX + label.size.width) > (this.rect.x + this.rect.width))) {
                            pointX = this.rect.x + this.rect.width - label.size.width;
                        }
                    }
                    if (pointX <= previousEnd) {
                        this.angle = (this.labelIntersectAction === 'Rotate45') ? 45 : 90;
                        isIntersect = true;
                    }
                    previousEnd = pointX + label.size.width;
                }
            }
            if (this.angle !== 0) {
                this.maxLabelSize = helper_1.rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
            }
        };
        Axis.prototype.getModule = function (chart) {
            if (this.valueType === 'Double') {
                this.baseModule = new double_axis_1.Double(chart);
            }
            else {
                this.baseModule = chart[helper_1.firstToLowerCase(this.valueType) + 'Module'];
            }
        };
        return Axis;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, base_1.Font)
    ], Axis.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, CrosshairTooltip)
    ], Axis.prototype, "crosshairTooltip", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisTitleFont, base_1.Font)
    ], Axis.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Axis.prototype, "logBase", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "columnIndex", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "rowIndex", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "span", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "desiredIntervals", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], Axis.prototype, "maximumLabels", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "zoomFactor", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "zoomPosition", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "rangePadding", void 0);
    __decorate([
        ej2_base_1.Property('Double')
    ], Axis.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Axis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property('BetweenTicks')
    ], Axis.prototype, "labelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "labelRotation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorTickLines)
    ], Axis.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorTickLines)
    ], Axis.prototype, "minorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorGridLines)
    ], Axis.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorGridLines)
    ], Axis.prototype, "minorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, AxisLine)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate([
        ej2_base_1.Property('Hide')
    ], Axis.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    exports.Axis = Axis;
    var VisibleLabels = (function () {
        function VisibleLabels(text, value, size) {
            if (size === void 0) { size = new helper_1.Size(0, 0); }
            this.text = text;
            this.value = value;
            this.size = size;
        }
        return VisibleLabels;
    }());
    exports.VisibleLabels = VisibleLabels;
});
