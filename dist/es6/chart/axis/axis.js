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
import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { Font, Border } from '../../common/model/base';
import { Size, Rect, measureText, rotateTextSize, firstToLowerCase, valueToCoefficient } from '../../common/utils/helper';
import { DoubleRange } from '../utils/double-range';
import { Double } from '../axis/double-axis';
import { Theme } from '../../common/model/theme';
import { axisLabelRender } from '../../common/model/constants';
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
            titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
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
}(ChildProperty));
export { Row };
__decorate([
    Property('100%')
], Row.prototype, "height", void 0);
__decorate([
    Complex({}, Border)
], Row.prototype, "border", void 0);
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
            titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
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
}(ChildProperty));
export { Column };
__decorate([
    Property('100%')
], Column.prototype, "width", void 0);
__decorate([
    Complex({}, Border)
], Column.prototype, "border", void 0);
var MajorGridLines = (function (_super) {
    __extends(MajorGridLines, _super);
    function MajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MajorGridLines;
}(ChildProperty));
export { MajorGridLines };
__decorate([
    Property(1)
], MajorGridLines.prototype, "width", void 0);
__decorate([
    Property('')
], MajorGridLines.prototype, "dashArray", void 0);
__decorate([
    Property(Theme.axisMajorGridLineColor)
], MajorGridLines.prototype, "color", void 0);
var MinorGridLines = (function (_super) {
    __extends(MinorGridLines, _super);
    function MinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MinorGridLines;
}(ChildProperty));
export { MinorGridLines };
__decorate([
    Property(0.7)
], MinorGridLines.prototype, "width", void 0);
__decorate([
    Property('')
], MinorGridLines.prototype, "dashArray", void 0);
__decorate([
    Property(Theme.axisMinorGridLineColor)
], MinorGridLines.prototype, "color", void 0);
var AxisLine = (function (_super) {
    __extends(AxisLine, _super);
    function AxisLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AxisLine;
}(ChildProperty));
export { AxisLine };
__decorate([
    Property(1)
], AxisLine.prototype, "width", void 0);
__decorate([
    Property('')
], AxisLine.prototype, "dashArray", void 0);
__decorate([
    Property(Theme.axisLineColor)
], AxisLine.prototype, "color", void 0);
var MajorTickLines = (function (_super) {
    __extends(MajorTickLines, _super);
    function MajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MajorTickLines;
}(ChildProperty));
export { MajorTickLines };
__decorate([
    Property(1)
], MajorTickLines.prototype, "width", void 0);
__decorate([
    Property(5)
], MajorTickLines.prototype, "height", void 0);
__decorate([
    Property(Theme.axisMajorTickLineColor)
], MajorTickLines.prototype, "color", void 0);
var MinorTickLines = (function (_super) {
    __extends(MinorTickLines, _super);
    function MinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MinorTickLines;
}(ChildProperty));
export { MinorTickLines };
__decorate([
    Property(0.7)
], MinorTickLines.prototype, "width", void 0);
__decorate([
    Property(5)
], MinorTickLines.prototype, "height", void 0);
__decorate([
    Property(Theme.axisMinorTickLineColor)
], MinorTickLines.prototype, "color", void 0);
var CrosshairTooltip = (function (_super) {
    __extends(CrosshairTooltip, _super);
    function CrosshairTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CrosshairTooltip;
}(ChildProperty));
export { CrosshairTooltip };
__decorate([
    Property(false)
], CrosshairTooltip.prototype, "enable", void 0);
__decorate([
    Property(Theme.crossHairLabelColor)
], CrosshairTooltip.prototype, "fill", void 0);
__decorate([
    Complex(Theme.crosshairLabelFont, Font)
], CrosshairTooltip.prototype, "textStyle", void 0);
var Axis = (function (_super) {
    __extends(Axis, _super);
    function Axis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visibleLabels = [];
        _this.series = [];
        _this.rect = new Rect(undefined, undefined, 0, 0);
        _this.axisBottomLine = null;
        _this.intervalDivs = [10, 5, 2, 1];
        _this.angle = _this.labelRotation;
        _this.isStack100 = false;
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
            this.doubleRange = new DoubleRange(start, end);
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
    Axis.prototype.triggerLabelRender = function (chart, tempInterval, text) {
        var argsData;
        argsData = {
            cancel: false, name: axisLabelRender, axis: this,
            text: text, value: tempInterval
        };
        chart.trigger(axisLabelRender, argsData);
        if (!argsData.cancel) {
            this.visibleLabels.push(new VisibleLabels(argsData.text, argsData.value));
        }
    };
    Axis.prototype.getRangePadding = function (chart) {
        var padding = this.rangePadding;
        if (padding !== 'Auto') {
            return padding;
        }
        switch (this.orientation) {
            case 'Horizontal':
                if (chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
            case 'Vertical':
                if (!chart.requireInvertedAxis) {
                    padding = (this.isStack100 ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
        }
        return padding;
    };
    Axis.prototype.getMaxLabelWidth = function (chart) {
        var prevSize = new Size(0, 0);
        var rotatedLabel;
        var pointX;
        var previousEnd = 0;
        var isIntersect = false;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        var label;
        for (var i = 0; i < this.visibleLabels.length; i++) {
            label = this.visibleLabels[i];
            label.size = measureText(label.text, this.labelStyle);
            if (label.size.width > this.maxLabelSize.width) {
                this.maxLabelSize.width = label.size.width;
                this.rotatedLabel = label.text;
            }
            if (label.size.height > this.maxLabelSize.height) {
                this.maxLabelSize.height = label.size.height;
            }
            if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect &&
                (this.labelIntersectAction === 'Rotate90' || this.labelIntersectAction === 'Rotate45')) {
                pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
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
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
        }
    };
    Axis.prototype.getModule = function (chart) {
        if (this.valueType === 'Double') {
            this.baseModule = new Double(chart);
        }
        else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + 'Module'];
        }
    };
    return Axis;
}(ChildProperty));
export { Axis };
__decorate([
    Complex(Theme.axisLabelFont, Font)
], Axis.prototype, "labelStyle", void 0);
__decorate([
    Complex({}, CrosshairTooltip)
], Axis.prototype, "crosshairTooltip", void 0);
__decorate([
    Property('')
], Axis.prototype, "title", void 0);
__decorate([
    Complex(Theme.axisTitleFont, Font)
], Axis.prototype, "titleStyle", void 0);
__decorate([
    Property('')
], Axis.prototype, "labelFormat", void 0);
__decorate([
    Property(0)
], Axis.prototype, "plotOffset", void 0);
__decorate([
    Property(10)
], Axis.prototype, "logBase", void 0);
__decorate([
    Property(0)
], Axis.prototype, "columnIndex", void 0);
__decorate([
    Property(0)
], Axis.prototype, "rowIndex", void 0);
__decorate([
    Property(1)
], Axis.prototype, "span", void 0);
__decorate([
    Property(null)
], Axis.prototype, "desiredIntervals", void 0);
__decorate([
    Property(3)
], Axis.prototype, "maximumLabels", void 0);
__decorate([
    Property(1)
], Axis.prototype, "zoomFactor", void 0);
__decorate([
    Property(0)
], Axis.prototype, "zoomPosition", void 0);
__decorate([
    Property(false)
], Axis.prototype, "opposedPosition", void 0);
__decorate([
    Property(true)
], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
__decorate([
    Property('Auto')
], Axis.prototype, "rangePadding", void 0);
__decorate([
    Property('Double')
], Axis.prototype, "valueType", void 0);
__decorate([
    Property('None')
], Axis.prototype, "edgeLabelPlacement", void 0);
__decorate([
    Property('Auto')
], Axis.prototype, "intervalType", void 0);
__decorate([
    Property('BetweenTicks')
], Axis.prototype, "labelPlacement", void 0);
__decorate([
    Property('')
], Axis.prototype, "name", void 0);
__decorate([
    Property(true)
], Axis.prototype, "visible", void 0);
__decorate([
    Property(0)
], Axis.prototype, "minorTicksPerInterval", void 0);
__decorate([
    Property(0)
], Axis.prototype, "labelRotation", void 0);
__decorate([
    Property(null)
], Axis.prototype, "minimum", void 0);
__decorate([
    Property(null)
], Axis.prototype, "maximum", void 0);
__decorate([
    Property(null)
], Axis.prototype, "interval", void 0);
__decorate([
    Complex({}, MajorTickLines)
], Axis.prototype, "majorTickLines", void 0);
__decorate([
    Complex({}, MinorTickLines)
], Axis.prototype, "minorTickLines", void 0);
__decorate([
    Complex({}, MajorGridLines)
], Axis.prototype, "majorGridLines", void 0);
__decorate([
    Complex({}, MinorGridLines)
], Axis.prototype, "minorGridLines", void 0);
__decorate([
    Complex({}, AxisLine)
], Axis.prototype, "lineStyle", void 0);
__decorate([
    Property('Hide')
], Axis.prototype, "labelIntersectAction", void 0);
__decorate([
    Property(false)
], Axis.prototype, "isInversed", void 0);
__decorate([
    Property(null)
], Axis.prototype, "description", void 0);
__decorate([
    Property(2)
], Axis.prototype, "tabIndex", void 0);
var VisibleLabels = (function () {
    function VisibleLabels(text, value, size) {
        if (size === void 0) { size = new Size(0, 0); }
        this.text = text;
        this.value = value;
        this.size = size;
    }
    return VisibleLabels;
}());
export { VisibleLabels };
