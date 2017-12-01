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
import { Property, Complex, ChildProperty, Collection } from '@syncfusion/ej2-base';
import { Font, Border } from '../../common/model/base';
import { Size, Rect, measureText, rotateTextSize, firstToLowerCase, valueToCoefficient, textTrim } from '../../common/utils/helper';
import { DoubleRange } from '../utils/double-range';
import { Double } from '../axis/double-axis';
import { Theme } from '../../common/model/theme';
import { axisLabelRender } from '../../common/model/constants';
import { StripLineSettings } from '../model/chart-base';
var axisPadding = 10;
/**
 * Configures the `rows` of the chart.
 */
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        /**
         * The height of the row as a string accept input both as '100px' and '100%'.
         * If specified as '100%, row renders to the full height of its chart.
         * @default 100%.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        return _this;
    }
    /**
     * Measure the row size
     * @return {void}
     * @private
     */
    Row.prototype.computeSize = function (axis, clipRect) {
        var titleSize = 0;
        var width = 0;
        var innerPadding = 5;
        if (axis.visible) {
            if (axis.title) {
                titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            width += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.width + innerPadding + axisPadding +
                axis.lineStyle.width / 2);
        }
        if (axis.opposedPosition) {
            this.farSizes.push(width);
        }
        else {
            this.nearSizes.push(width);
        }
    };
    __decorate([
        Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate([
        Complex({}, Border)
    ], Row.prototype, "border", void 0);
    return Row;
}(ChildProperty));
export { Row };
/**
 * Configures the `columns` of the chart.
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        /**
         * The width of the column as a string accepts input both as like '100px' or '100%'.
         * If specified as '100%, column renders to the full width of its chart.
         * @default 100%.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        /** @private */
        _this.padding = 0;
        return _this;
    }
    /**
     * Measure the column size
     * @return {void}
     * @private
     */
    Column.prototype.computeSize = function (axis, clipRect) {
        var titleSize = 0;
        var height = 0;
        var innerPadding = 5;
        if (axis.visible) {
            if (axis.title) {
                titleSize = measureText(axis.title, axis.titleStyle).height + innerPadding;
            }
            height += (titleSize + axis.majorTickLines.height + axis.maxLabelSize.height + innerPadding + axisPadding
                + axis.lineStyle.width / 2);
        }
        if (axis.opposedPosition) {
            this.farSizes.push(height);
        }
        else {
            this.nearSizes.push(height);
        }
    };
    __decorate([
        Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate([
        Complex({}, Border)
    ], Column.prototype, "border", void 0);
    return Column;
}(ChildProperty));
export { Column };
/**
 * Configures the major grid lines in the `axis`.
 */
var MajorGridLines = /** @class */ (function (_super) {
    __extends(MajorGridLines, _super);
    function MajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(Theme.axisMajorGridLineColor)
    ], MajorGridLines.prototype, "color", void 0);
    return MajorGridLines;
}(ChildProperty));
export { MajorGridLines };
/**
 * Configures the minor grid lines in the `axis`.
 */
var MinorGridLines = /** @class */ (function (_super) {
    __extends(MinorGridLines, _super);
    function MinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(Theme.axisMinorGridLineColor)
    ], MinorGridLines.prototype, "color", void 0);
    return MinorGridLines;
}(ChildProperty));
export { MinorGridLines };
/**
 * Configures the axis line of a chart.
 */
var AxisLine = /** @class */ (function (_super) {
    __extends(AxisLine, _super);
    function AxisLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        Property(Theme.axisLineColor)
    ], AxisLine.prototype, "color", void 0);
    return AxisLine;
}(ChildProperty));
export { AxisLine };
/**
 * Configures the major tick lines.
 */
var MajorTickLines = /** @class */ (function (_super) {
    __extends(MajorTickLines, _super);
    function MajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(Theme.axisMajorTickLineColor)
    ], MajorTickLines.prototype, "color", void 0);
    return MajorTickLines;
}(ChildProperty));
export { MajorTickLines };
/**
 * Configures the minor tick lines.
 */
var MinorTickLines = /** @class */ (function (_super) {
    __extends(MinorTickLines, _super);
    function MinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(Theme.axisMinorTickLineColor)
    ], MinorTickLines.prototype, "color", void 0);
    return MinorTickLines;
}(ChildProperty));
export { MinorTickLines };
/**
 * Configures the crosshair ToolTip.
 */
var CrosshairTooltip = /** @class */ (function (_super) {
    __extends(CrosshairTooltip, _super);
    function CrosshairTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        Property(Theme.crossHairLabelColor)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        Complex(Theme.crosshairLabelFont, Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    return CrosshairTooltip;
}(ChildProperty));
export { CrosshairTooltip };
/**
 * Configures the axes in the chart.
 */
var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    function Axis() {
        /**
         * Options to customize the axis label.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.visibleLabels = [];
        /** @private */
        _this.series = [];
        /** @private */
        _this.rect = new Rect(undefined, undefined, 0, 0);
        /** @private */
        _this.axisBottomLine = null;
        /** @private */
        _this.intervalDivs = [10, 5, 2, 1];
        /** @private */
        _this.angle = _this.labelRotation;
        /** @private */
        _this.isStack100 = false;
        return _this;
    }
    /**
     * The function used to find whether the range is set.
     * @return {boolean}
     * @private
     */
    Axis.prototype.setRange = function () {
        if (this.minimum != null && this.maximum != null) {
            return true;
        }
        return false;
    };
    /**
     * Calculate visible range for axis.
     * @return {void}
     * @private
     */
    Axis.prototype.calculateVisibleRange = function (size) {
        if (this.zoomFactor < 1 || this.zoomPosition > 0) {
            var baseRange = this.actualRange;
            var start = void 0;
            var end = void 0;
            if (!this.isInversed) {
                start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                end = start + this.zoomFactor * this.actualRange.delta;
            }
            else {
                start = this.actualRange.max - (this.zoomPosition * this.actualRange.delta);
                end = start - (this.zoomFactor * this.actualRange.delta);
            }
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
    /**
     * Calculate desired interval for the axis.
     * @return {void}
     * @private
     */
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
    /**
     * Triggers the event.
     * @return {void}
     * @private
     */
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
    /**
     * Calculate padding for the axis.
     * @return {string}
     * @private
     */
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
    /**
     * Calculate maximum label width for the axis.
     * @return {void}
     * @private
     */
    Axis.prototype.getMaxLabelWidth = function (chart) {
        var prevSize = new Size(0, 0);
        var rotatedLabel;
        var pointX;
        var previousEnd = 0;
        var isIntersect = false;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        var action = this.labelIntersectAction;
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
            if (action === 'None' || action === 'Hide' || action === 'Trim') {
                continue;
            }
            if (this.angle % 360 === 0 && this.orientation === 'Horizontal' && this.rect.width > 0 && !isIntersect) {
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
                switch (action) {
                    case 'MultipleRows':
                        if (i > 0) {
                            this.findMultiRows(i, pointX, label);
                        }
                        break;
                    case 'Rotate45':
                    case 'Rotate90':
                        if (i > 0 && (!this.isInversed ? pointX <= previousEnd : pointX + label.size.width >= previousEnd)) {
                            this.angle = (action === 'Rotate45') ? 45 : 90;
                            isIntersect = true;
                        }
                        break;
                    default:
                        this.findWrap(i, pointX, label);
                        break;
                }
                previousEnd = this.isInversed ? pointX : pointX + label.size.width;
            }
        }
        if (this.angle !== 0) {
            this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
        }
    };
    /**
     * Finds the wrap for axis label.
     * @return {void}
     */
    Axis.prototype.findWrap = function (width, currentX, currentLabel) {
        var intervalLength = this.rect.width / this.visibleLabels.length;
        var textCollection = currentLabel.text.split(' ');
        var label = '';
        var labelCollection = [];
        var text;
        for (var i = 0, len = textCollection.length; i < len; i++) {
            text = textCollection[i];
            if (measureText(label.concat(text), this.labelStyle).width < intervalLength) {
                label = label.concat((label === '' ? '' : ' ') + text);
            }
            else {
                if (label !== '') {
                    labelCollection.push(textTrim(intervalLength, label, this.labelStyle));
                    label = text;
                }
                else {
                    labelCollection.push(textTrim(intervalLength, text, this.labelStyle));
                    text = '';
                }
            }
            if (label && i === len - 1) {
                labelCollection.push(textTrim(intervalLength, label, this.labelStyle));
            }
        }
        currentLabel.text = labelCollection;
        var height = (currentLabel.size.height * labelCollection.length);
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the multiple rows for axis.
     * @return {void}
     */
    Axis.prototype.findMultiRows = function (length, currentX, currentLabel) {
        var label;
        var pointX;
        var store = [];
        var isMultiRows;
        for (var i = length - 1; i >= 0; i--) {
            label = this.visibleLabels[i];
            pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
            isMultiRows = !this.isInversed ? currentX < (pointX + label.size.width / 2) :
                currentX + currentLabel.size.width > (pointX - label.size.width / 2);
            if (isMultiRows) {
                store.push(label.index);
                currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
            }
            else {
                currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
            }
        }
        var height = (currentLabel.size.height * currentLabel.index) + (5 * (currentLabel.index - 1));
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the default module for axis.
     * @return {void}
     * @private
     */
    Axis.prototype.getModule = function (chart) {
        if (this.valueType === 'Double') {
            this.baseModule = new Double(chart);
        }
        else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + 'Module'];
        }
    };
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
        Property('')
    ], Axis.prototype, "skeleton", void 0);
    __decorate([
        Property('DateTime')
    ], Axis.prototype, "skeletonType", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate([
        Property(false)
    ], Axis.prototype, "isIndexed", void 0);
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
        Property(100)
    ], Axis.prototype, "coefficient", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "startAngle", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate([
        Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    __decorate([
        Collection([], StripLineSettings)
    ], Axis.prototype, "stripLines", void 0);
    return Axis;
}(ChildProperty));
export { Axis };
/** @private */
var VisibleLabels = /** @class */ (function () {
    function VisibleLabels(text, value, size, index) {
        if (size === void 0) { size = new Size(0, 0); }
        if (index === void 0) { index = 1; }
        this.text = text;
        this.originalText = text;
        this.value = value;
        this.size = size;
        this.index = 1;
    }
    return VisibleLabels;
}());
export { VisibleLabels };
