/**
 * StripLine src
 */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Rect, TextOption, measureText, valueToCoefficient, textElement, logBase, RectOption } from '../../common/utils/helper';
/**
 * `StripLine` module used to render the stripLine in chart.
 */
var StripLine = /** @class */ (function () {
    function StripLine() {
    }
    StripLine.prototype.measureStripLine = function (axis, stripline, seriesClipRect) {
        var rect = this.getFromTovalue(stripline.start, stripline.end, stripline.size, stripline.startFromAxis, axis);
        var height = (axis.orientation === 'Vertical') ? (rect.to - rect.from) * axis.rect.height : seriesClipRect.height;
        var width = (axis.orientation === 'Horizontal') ? (rect.to - rect.from) * axis.rect.width : seriesClipRect.width;
        var x = (axis.orientation === 'Vertical') ? seriesClipRect.x : ((rect.from * axis.rect.width) + axis.rect.x);
        var y = (axis.orientation === 'Horizontal') ? seriesClipRect.y : (axis.rect.y + axis.rect.height -
            (rect.to * axis.rect.height));
        if (height !== 0 && width !== 0) {
            return new Rect(x, y, width, height);
        }
        return new Rect(0, 0, 0, 0);
    };
    /**
     * To get from to value from start, end, size, start from axis
     */
    StripLine.prototype.getFromTovalue = function (start, end, size, startFromAxis, axis) {
        var from = startFromAxis ? axis.visibleRange.min : this.findValue(Math.min(start, isNullOrUndefined(end) ? start : end), axis);
        var to = this.findValue(this.getToValue(Math.max(start, isNullOrUndefined(end) ? start : end), from, size, axis, end), axis);
        return { from: valueToCoefficient(axis.isInversed ? to : from, axis), to: valueToCoefficient(axis.isInversed ? from : to, axis) };
    };
    StripLine.prototype.getToValue = function (to, from, size, axis, end) {
        if (axis.valueType === 'DateTime') {
            return (isNullOrUndefined(end) ? new Date(new Date(from).getTime() + size) : to);
        }
        else {
            return isNullOrUndefined(end) ? (axis.valueType === 'Logarithmic' ? Math.pow(axis.logBase, from) : from) + size : to;
        }
    };
    StripLine.prototype.findValue = function (value, axis) {
        if (axis.valueType === 'Logarithmic') {
            value = logBase(value, axis.logBase);
        }
        if (value < axis.visibleRange.min) {
            value = axis.visibleRange.min;
        }
        else if (value > axis.visibleRange.max) {
            value = axis.visibleRange.max;
        }
        return value;
    };
    /**
     * To render striplines based start and end.
     * @private
     * @param chart
     * @param position
     * @param axes
     */
    StripLine.prototype.renderStripLine = function (chart, position, axes) {
        var id = chart.element.id + '_stripline_' + position + '_';
        var striplineGroup = chart.renderer.createGroup({ id: id + 'collections' });
        var seriesClipRect = chart.chartAxisLayoutPanel.seriesClipRect;
        var rect;
        var count = 0;
        for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
            var axis = axes_1[_i];
            for (var _a = 0, _b = axis.stripLines; _a < _b.length; _a++) {
                var stripline = _b[_a];
                if (stripline.visible && stripline.zIndex === position) {
                    rect = this.measureStripLine(axis, stripline, seriesClipRect);
                    this.renderRectangle(stripline, rect, id + 'rect_' + count, striplineGroup, chart);
                    this.renderText(stripline, rect, id + 'text_' + count, striplineGroup, chart, axis);
                    count++;
                }
            }
        }
        chart.svgObject.appendChild(striplineGroup);
    };
    StripLine.prototype.renderRectangle = function (stripline, rect, id, parent, chart) {
        parent.appendChild(chart.renderer.drawRectangle(new RectOption(id, stripline.color, stripline.border, stripline.opacity, rect, 0, 0, '', '')));
    };
    StripLine.prototype.renderText = function (stripline, rect, id, parent, chart, axis) {
        var textSize = measureText(stripline.text, stripline.textStyle);
        var textMid = 3 * (textSize.height / 8);
        var ty = rect.y + (rect.height / 2) + textMid;
        var rotation = (stripline.rotation === null) ? ((axis.orientation === 'Vertical') ? 0 : -90) : stripline.rotation;
        var tx = rect.x + (rect.width / 2);
        var alignment;
        var anchor;
        var padding = 5;
        if (axis.orientation === 'Horizontal') {
            tx = this.getTextStart(tx + (textMid * this.factor(stripline.horizontalAlignment)), rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty - textMid, rect.height, stripline.verticalAlignment);
            alignment = this.invertAlignment(stripline.verticalAlignment);
        }
        else {
            tx = this.getTextStart(tx, rect.width, stripline.horizontalAlignment);
            ty = this.getTextStart(ty + (textMid * this.factor(stripline.verticalAlignment)) - padding, rect.height, stripline.verticalAlignment);
            alignment = stripline.horizontalAlignment;
        }
        anchor = alignment;
        textElement(new TextOption(id, tx, ty, anchor, stripline.text, 'rotate(' + rotation + ' ' + tx + ',' + ty + ')', 'middle'), stripline.textStyle, stripline.textStyle.color, parent);
    };
    StripLine.prototype.invertAlignment = function (anchor) {
        switch (anchor) {
            case 'Start':
                anchor = 'End';
                break;
            case 'End':
                anchor = 'Start';
                break;
        }
        return anchor;
    };
    StripLine.prototype.factor = function (anchor) {
        var factor = 0;
        switch (anchor) {
            case 'Start':
                factor = 1;
                break;
            case 'End':
                factor = -1;
                break;
        }
        return factor;
    };
    StripLine.prototype.getTextStart = function (xy, size, textAlignment) {
        var padding = 5;
        switch (textAlignment) {
            case 'Start':
                xy = xy - (size / 2) + padding;
                break;
            case 'End':
                xy = xy + (size / 2) - padding;
                break;
        }
        return xy;
    };
    /**
     * To get the module name for `StripLine`.
     * @private
     */
    StripLine.prototype.getModuleName = function () {
        return 'StripLine';
    };
    /**
     * To destroy the `StripLine` module.
     * @private
     */
    StripLine.prototype.destroy = function () {
        // destroy peform here
    };
    return StripLine;
}());
export { StripLine };
