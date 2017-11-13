import { subtractThickness, valueToCoefficient, sum, subArray, TextOption, inside, measureText } from '../../common/utils/helper';
import { Size, Rect, Thickness, PathOption, logBase, createZoomingLabels, getElement, rotateTextSize } from '../../common/utils/helper';
import { textElement, textTrim } from '../../common/utils/helper';
var axisPadding = 10;
var CartesianAxisLayoutPanel = (function () {
    function CartesianAxisLayoutPanel(chartModule) {
        this.chart = chartModule;
        this.padding = 5;
    }
    CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
        var chart = this.chart;
        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);
        this.initialClipRect = rect;
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        this.measureRowAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            this.calculateAxisSize(this.initialClipRect);
        }
        this.leftSize = 0;
        this.rightSize = 0;
        this.topSize = 0;
        this.bottomSize = 0;
        this.measureRowAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));
        this.measureColumnAxis(chart, this.initialClipRect);
        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));
        if (!this.chart.delayRedraw) {
            chart.refreshAxis();
            this.calculateAxisSize(this.seriesClipRect);
        }
    };
    CartesianAxisLayoutPanel.prototype.measureRowAxis = function (chart, rect) {
        var row;
        this.calculateRowSize(rect);
        for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            row = item;
            row.nearSizes = [];
            row.farSizes = [];
            this.arrangeAxis(row);
            this.measureDefinition(row, chart, new Size(chart.availableSize.width, row.computedHeight), rect);
            if (this.leftSize < sum(row.nearSizes)) {
                this.leftSize = sum(row.nearSizes);
            }
            if (this.rightSize < sum(row.farSizes)) {
                this.rightSize = sum(row.farSizes);
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.measureColumnAxis = function (chart, rect) {
        var column;
        this.calculateColumnSize(rect);
        for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
            var item = _a[_i];
            column = item;
            column.farSizes = [];
            column.nearSizes = [];
            this.arrangeAxis(column);
            this.measureDefinition(column, chart, new Size(column.computedWidth, chart.availableSize.height), rect);
            if (this.bottomSize < sum(column.nearSizes)) {
                this.bottomSize = sum(column.nearSizes);
            }
            if (this.topSize < sum(column.farSizes)) {
                this.topSize = sum(column.farSizes);
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size, clipRect) {
        var axis;
        var axisType;
        for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
            var axis_1 = _a[_i];
            axis_1.getModule(chart);
            axis_1.baseModule.calculateRangeAndInterval(size, axis_1);
            definition.computeSize(axis_1, clipRect);
        }
        if (definition.farSizes.length > 0) {
            definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
        }
        if (definition.nearSizes.length > 0) {
            definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
        }
    };
    CartesianAxisLayoutPanel.prototype.calculateAxisSize = function (rect) {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var axis;
        var nearCount = 0;
        var farCount = 0;
        var size = 0;
        var x;
        var y;
        this.calculateRowSize(rect);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_1 = row.axes.length; j < len_1; j++) {
                axis = row.axes[j];
                if (axis.rect.height === 0) {
                    axis.rect.height = row.computedHeight;
                    size = 0;
                    for (var k = i + 1, len_2 = i + axis.span; k < len_2; k++) {
                        definition = chart.rows[k];
                        size += definition.computedHeight;
                    }
                    axis.rect.y = (row.computedTop - size) + axis.plotOffset;
                    axis.rect.height = (axis.rect.height + size) - (2 * axis.plotOffset);
                    axis.rect.width = 0;
                }
                if (axis.opposedPosition) {
                    x = rect.x + rect.width + sum(subArray(row.farSizes, farCount));
                    axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                    farCount++;
                }
                else {
                    x = rect.x - sum(subArray(row.nearSizes, nearCount));
                    axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                    nearCount++;
                }
            }
        }
        this.calculateColumnSize(rect);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            nearCount = 0;
            farCount = 0;
            for (var j = 0, len_3 = column.axes.length; j < len_3; j++) {
                axis = column.axes[j];
                if (axis.rect.width === 0) {
                    for (var k = i, len_4 = (i + axis.span); k < len_4; k++) {
                        definition = chart.columns[k];
                        axis.rect.width += definition.computedWidth;
                    }
                    axis.rect.x = column.computedLeft + axis.plotOffset;
                    axis.rect.width -= (2 * axis.plotOffset);
                    axis.rect.height = 0;
                }
                if (axis.opposedPosition) {
                    y = rect.y - sum(subArray(column.farSizes, farCount));
                    axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                    farCount++;
                }
                else {
                    y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount));
                    axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                    nearCount++;
                }
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.measure = function () {
        var chart = this.chart;
        var row;
        var column;
        var definition;
        var axis;
        var actualIndex;
        var span;
        var axisLength;
        for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
            var axis_2 = _a[_i];
            if (axis_2.orientation === 'Vertical') {
                chart.verticalAxes.push(axis_2);
                actualIndex = this.getActualRow(axis_2);
                row = chart.rows[actualIndex];
                this.pushAxis(row, axis_2);
                span = ((actualIndex + axis_2.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis_2.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.rows[j];
                    definition.axes[row.axes.length - 1] = axis_2;
                    chart.rows[j] = definition;
                }
                chart.rows[actualIndex] = row;
            }
            else {
                chart.horizontalAxes.push(axis_2);
                actualIndex = this.getActualColumn(axis_2);
                column = chart.columns[actualIndex];
                this.pushAxis(column, axis_2);
                span = ((actualIndex + axis_2.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis_2.span));
                for (var j = actualIndex + 1; j < span; j++) {
                    definition = chart.columns[j];
                    definition.axes[column.axes.length - 1] = axis_2;
                    chart.columns[j] = definition;
                }
                chart.columns[actualIndex] = column;
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.pushAxis = function (definition, axis) {
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (!definition.axes[i]) {
                definition.axes[i] = axis;
                break;
            }
        }
    };
    CartesianAxisLayoutPanel.prototype.arrangeAxis = function (definition) {
        var axisCollection = [];
        for (var i = 0, len = definition.axes.length; i <= len; i++) {
            if (definition.axes[i]) {
                axisCollection.push(definition.axes[i]);
            }
        }
        definition.axes = axisCollection;
    };
    CartesianAxisLayoutPanel.prototype.getActualColumn = function (axis) {
        var actualLength = this.chart.columns.length;
        var pos = axis.columnIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    CartesianAxisLayoutPanel.prototype.getActualRow = function (axis) {
        var actualLength = this.chart.rows.length;
        var pos = axis.rowIndex;
        var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    };
    CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
        var chart = this.chart;
        var row;
        var rowTop = rect.y + rect.height;
        var height = 0;
        var remainingHeight = Math.max(0, rect.height);
        for (var i = 0, len = chart.rows.length; i < len; i++) {
            row = chart.rows[i];
            if (row.height.indexOf('%') !== -1) {
                height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
            }
            else {
                height = Math.min(remainingHeight, parseInt(row.height, 10));
            }
            height = (i !== (len - 1)) ? height : remainingHeight;
            row.computedHeight = height;
            rowTop -= height;
            row.computedTop = rowTop;
            remainingHeight -= height;
        }
    };
    CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
        var chart = this.chart;
        var column;
        var columnLeft = rect.x;
        var width = 0;
        var remainingWidth = Math.max(0, rect.width);
        for (var i = 0, len = chart.columns.length; i < len; i++) {
            column = chart.columns[i];
            if (column.width.indexOf('%') !== -1) {
                width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
            }
            else {
                width = Math.min(remainingWidth, parseInt(column.width, 10));
            }
            width = (i !== (len - 1)) ? width : remainingWidth;
            column.computedWidth = width;
            column.computedLeft = columnLeft;
            columnLeft += width;
            remainingWidth -= width;
        }
    };
    CartesianAxisLayoutPanel.prototype.renderAxes = function () {
        var chart = this.chart;
        var axis;
        var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });
        var definitionElement = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });
        for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
            axis = chart.axisCollections[i];
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });
            if (axis.orientation === 'Horizontal') {
                if (axis.visible && axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, axis.plotOffset, 0);
                }
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawXAxisGridLine(axis, i);
                }
                if (axis.visible) {
                    this.drawXAxisLabels(axis, i);
                    this.drawXAxisTitle(axis, i);
                }
            }
            else {
                if (axis.visible && axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, 0, axis.plotOffset);
                }
                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawYAxisGridLine(axis, i);
                }
                if (axis.visible) {
                    this.drawYAxisLabels(axis, i);
                    this.drawYAxisTitle(axis, i);
                }
            }
            axisElement.appendChild(this.element);
        }
        this.element = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });
        for (var j = 0, len = chart.rows.length; j < len; j++) {
            var row = chart.rows[j];
            if (row.border.color) {
                this.drawBottomLine(row, j, true);
            }
        }
        for (var j = 0, len = chart.columns.length; j < len; j++) {
            var column = chart.columns[j];
            if (column.border.color) {
                this.drawBottomLine(column, j, false);
            }
        }
        axisElement.appendChild(this.element);
        chart.svgObject.appendChild(axisElement);
    };
    CartesianAxisLayoutPanel.prototype.drawBottomLine = function (definition, index, isRow) {
        var chart = this.chart;
        var optionsLine = {};
        var x1;
        var x2;
        var y1;
        var y2;
        var definitionName;
        if (isRow) {
            definition = definition;
            y1 = y2 = definition.computedTop + definition.computedHeight;
            x1 = this.seriesClipRect.x;
            x2 = x1 + this.seriesClipRect.width;
            definitionName = 'Row';
        }
        else {
            definition = definition;
            x1 = x2 = definition.computedLeft;
            y1 = this.seriesClipRect.y;
            y2 = y1 + this.seriesClipRect.height;
            definitionName = 'Column';
        }
        optionsLine = {
            'id': chart.element.id + '_AxisBottom_' + definitionName + index,
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            'stroke-width': definition.border.width,
            'stroke': definition.border.color,
        };
        this.htmlObject = chart.renderer.drawLine(optionsLine);
        this.element.appendChild(this.htmlObject);
    };
    CartesianAxisLayoutPanel.prototype.drawAxisLine = function (axis, index, plotX, plotY) {
        var chart = this.chart;
        var optionsLine = {};
        var rect = axis.rect;
        optionsLine = {
            'id': chart.element.id + 'AxisLine_' + index,
            x1: rect.x - plotX,
            y1: rect.y - plotY,
            x2: rect.x + rect.width + plotX,
            y2: rect.y + rect.height + plotY,
            'stroke-dasharray': axis.lineStyle.dashArray,
            'stroke-width': axis.lineStyle.width,
            'stroke': axis.lineStyle.color
        };
        this.htmlObject = chart.renderer.drawLine(optionsLine);
        this.element.appendChild(this.htmlObject);
    };
    CartesianAxisLayoutPanel.prototype.drawYAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var tempInterval;
        var pointY = 0;
        var majorGrid = '';
        var majorTick = '';
        var minorGird = '';
        var minorTick = '';
        var minorDirection;
        var tickSize = (axis.opposedPosition) ? axis.majorTickLines.height : -axis.majorTickLines.height;
        var axisLineSize = (axis.opposedPosition) ? axis.lineStyle.width / 2 : -axis.lineStyle.width / 2;
        var rect = axis.rect;
        var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
            0.5 : 0;
        var length = axis.visibleLabels.length;
        if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks' && length > 0) {
            length += 1;
        }
        for (var i = 0; i < length; i++) {
            tempInterval = !axis.visibleLabels[i] ? (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel
                : axis.visibleLabels[i].value - ticksbwtLabel;
            pointY = valueToCoefficient(tempInterval, axis) * rect.height;
            pointY = (pointY * -1) + (rect.y + rect.height);
            if (pointY >= rect.y && (rect.y + rect.height) >= pointY) {
                if ((inside(tempInterval, axis.visibleRange)) || this.isBorder(axis, i, pointY)) {
                    majorGrid = majorGrid.concat('M ' + this.seriesClipRect.x + ' ' + (pointY) +
                        ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + pointY + ' ');
                }
                majorTick = majorTick.concat('M ' + (rect.x + axisLineSize) + ' ' + pointY +
                    ' L ' + (rect.x + tickSize + axisLineSize) + ' ' + pointY + ' ');
            }
            if ((axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0) && axis.minorTicksPerInterval > 0) {
                minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGird, minorTick);
                minorGird = minorDirection[0];
                minorTick = minorDirection[1];
            }
        }
        this.renderGridLine(axis, index, majorGrid, minorGird);
        this.renderTickLine(axis, index, majorTick, minorTick);
    };
    CartesianAxisLayoutPanel.prototype.isBorder = function (axis, index, value) {
        var chart = this.chart;
        var border = chart.chartArea.border;
        var rect = this.seriesClipRect;
        var orientation = axis.orientation;
        var start = (orientation === 'Horizontal') ? rect.x : rect.y;
        var size = (orientation === 'Horizontal') ? rect.width : rect.height;
        var startIndex = (orientation === 'Horizontal') ? 0 : axis.visibleLabels.length - 1;
        var endIndex = (orientation === 'Horizontal') ? axis.visibleLabels.length - 1 : 0;
        if (axis.plotOffset > 0) {
            return true;
        }
        else if ((value === start || value === (start + size)) && (border.width <= 0 || border.color === 'transparent')) {
            return true;
        }
        else if ((value !== start && index === startIndex) || (value !== (start + size) && index === endIndex)) {
            return true;
        }
        return false;
    };
    CartesianAxisLayoutPanel.prototype.drawYAxisLabels = function (axis, index) {
        var chart = this.chart;
        var pointX = 0;
        var pointY = 0;
        var elementSize;
        var options;
        var padding = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
        padding = (axis.opposedPosition) ? padding : -padding;
        var anchor = (axis.opposedPosition) ? 'start' : 'end';
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var rect = axis.rect;
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            pointX = (rect.x + padding);
            elementSize = axis.visibleLabels[i].size;
            pointY = valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height;
            pointY = Math.floor((pointY * -1) + (rect.y + rect.height));
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY + (elementSize.height / 4), anchor, axis.visibleLabels[i].text);
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (axis.isInversed && i === len - 1)) && options.y > rect.y + rect.height) ||
                            (((i === len - 1) || (axis.isInversed && i === 0)) && options.y - elementSize.height / 2 < rect.y)) {
                            options.text = '';
                        }
                        break;
                    case 'Shift':
                        if ((i === 0 || (axis.isInversed && i === len - 1)) && options.y > rect.y + rect.height) {
                            options.y = pointY = rect.y + rect.height;
                        }
                        else if (((i === len - 1) || (axis.isInversed && i === 0)) && (options.y - elementSize.height / 2 < rect.y)) {
                            options.y = pointY = rect.y + elementSize.height / 2;
                        }
                        break;
                }
            }
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
        }
        if (!chart.delayRedraw) {
            this.element.appendChild(labelElement);
        }
        else if (axis.visible) {
            this.createZoomingLabel(this.chart, labelElement, axis, index);
        }
    };
    CartesianAxisLayoutPanel.prototype.drawYAxisTitle = function (axis, index) {
        var chart = this.chart;
        var labelRotation = (axis.opposedPosition) ? 90 : -90;
        var elementSize = measureText(axis.title, axis.titleStyle);
        var padding = axis.majorTickLines.height + axis.maxLabelSize.width + this.padding * 2;
        var rect = axis.rect;
        padding = axis.opposedPosition ? padding : -padding;
        var x = rect.x + padding;
        var y = rect.y + rect.height / 2;
        var options = new TextOption(chart.element.id + '_AxisTitle_' + index, x, y - this.padding, 'middle', axis.title, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')');
        var element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
        element.setAttribute('aria-label', axis.description || axis.title);
        element.setAttribute('tabindex', axis.tabIndex.toString());
    };
    CartesianAxisLayoutPanel.prototype.drawXAxisGridLine = function (axis, index) {
        var chart = this.chart;
        var tempInterval;
        var pointX = 0;
        var majorGrid = '';
        var majorTick = '';
        var minorGird = '';
        var minorTick = '';
        var minorDirection;
        var tickSize = (axis.opposedPosition) ? -axis.majorTickLines.height : axis.majorTickLines.height;
        var axisLineSize = (axis.opposedPosition) ? -axis.lineStyle.width / 2 : axis.lineStyle.width / 2;
        var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
            0.5 : 0;
        var rect = axis.rect;
        var length = axis.visibleLabels.length;
        if (axis.valueType === 'Category' && length > 0 && axis.labelPlacement === 'BetweenTicks') {
            length += 1;
        }
        for (var i = 0; i < length; i++) {
            tempInterval = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel
                : (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
            pointX = (valueToCoefficient(tempInterval, axis) * rect.width) + rect.x;
            if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                if (inside(tempInterval, axis.visibleRange) || this.isBorder(axis, i, pointX)) {
                    majorGrid = majorGrid.concat('M ' + pointX + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                        ' L ' + pointX + ' ' + this.seriesClipRect.y + ' ');
                }
                majorTick = majorTick.concat('M ' + (pointX) + ' ' + (rect.y + axisLineSize) +
                    ' L ' + (pointX) + ' ' + (rect.y + tickSize + axisLineSize) + ' ');
            }
            if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)) {
                minorDirection = this.drawAxisMinorLine(axis, tempInterval, minorGird, minorTick);
                minorGird = minorDirection[0];
                minorTick = minorDirection[1];
            }
        }
        this.renderGridLine(axis, index, majorGrid, minorGird);
        this.renderTickLine(axis, index, majorTick, minorTick);
    };
    CartesianAxisLayoutPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, minorGird, minorTick) {
        var value = tempInterval;
        var coor = 0;
        var position = 0;
        var range = axis.visibleRange;
        var direction = [];
        var tickSize = axis.opposedPosition ? -axis.minorTickLines.height : axis.minorTickLines.height;
        var rect = axis.rect;
        var logStart;
        var logEnd;
        var logInterval = 1;
        var logPosition = 1;
        if (axis.valueType === 'Logarithmic') {
            logStart = Math.pow(axis.logBase, value - range.interval);
            logEnd = Math.pow(axis.logBase, value);
            logInterval = (logEnd - logStart) / (axis.minorTicksPerInterval + 1);
            logPosition = logStart + logInterval;
        }
        if (axis.orientation === 'Horizontal') {
            for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                value = this.findLogNumeric(axis, logPosition, logInterval, value);
                logPosition += logInterval;
                if (inside(value, range)) {
                    position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.width);
                    coor = (Math.floor(position + rect.x));
                    minorGird = minorGird.concat('M' + ' ' + coor + ' ' + (this.seriesClipRect.y)
                        + 'L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height));
                    coor = (Math.floor(position + rect.x));
                    minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y)
                        + 'L ' + coor + ' ' + (rect.y + tickSize));
                }
            }
        }
        else {
            tickSize = axis.opposedPosition ? axis.minorTickLines.height : -axis.minorTickLines.height;
            for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                value = this.findLogNumeric(axis, logPosition, logInterval, value);
                if (inside(value, range)) {
                    position = Math.ceil(((value - range.min) / (range.max - range.min)) * rect.height) * -1;
                    coor = (Math.floor(position + rect.y + rect.height));
                    minorGird = minorGird.concat('M' + ' ' + (this.seriesClipRect.x) + ' ' + coor
                        + 'L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor);
                    coor = (Math.floor(position + rect.y + rect.height));
                    minorTick = minorTick.concat('M' + ' ' + rect.x + ' ' + coor + 'L ' + (rect.x + tickSize) + ' ' + coor);
                }
                logPosition += logInterval;
            }
        }
        direction.push(minorGird);
        direction.push(minorTick);
        return direction;
    };
    CartesianAxisLayoutPanel.prototype.findLogNumeric = function (axis, logPosition, logInterval, value) {
        var range = axis.visibleRange;
        if (axis.valueType === 'Logarithmic') {
            value = logBase(logPosition, axis.logBase);
        }
        else if (axis.valueType === 'DateTime') {
            value += axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
        }
        else {
            value += range.interval / (axis.minorTicksPerInterval + 1);
        }
        return value;
    };
    CartesianAxisLayoutPanel.prototype.drawXAxisLabels = function (axis, index) {
        var chart = this.chart;
        var pointX = 0;
        var pointY = 0;
        var elementSize;
        var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        var padding = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
        var labelPadding;
        var rotateSize;
        var diffHeight;
        var yLocation;
        var angle;
        var anglePadding = ((axis.angle === 90 || axis.angle === -90)) ? -2 : 0;
        var rect = axis.rect;
        var options;
        var previousEnd = 0;
        var width = 0;
        var intervalLength = axis.rect.width / axis.visibleLabels.length;
        var label;
        for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
            label = axis.visibleLabels[i];
            pointX = (valueToCoefficient(label.value, axis) * rect.width) + rect.x;
            elementSize = label.size;
            width = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap')
                && elementSize.width > intervalLength) ? intervalLength : elementSize.width;
            pointX -= width / 2;
            labelPadding = (axis.opposedPosition) ?
                -(padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4) + (2 * axis.maxLabelSize.height / 5)) :
                    (label.index > 1 ? (2 * (elementSize.height / 4)) : 0)))
                : padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4)) + (2 * axis.maxLabelSize.height / 5)
                    : (3 * (elementSize.height / 4)));
            pointY = (rect.y + (labelPadding * label.index));
            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, '', this.findAxisLabel(axis, label.text, intervalLength));
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (axis.isInversed && i === len - 1)) && options.x < rect.x) ||
                            ((i === len - 1 || (axis.isInversed && i === 0)) && (options.x + width > rect.x + rect.width))) {
                            continue;
                        }
                        break;
                    case 'Shift':
                        if ((i === 0 || (axis.isInversed && i === len - 1)) && options.x < rect.x) {
                            options.x = pointX = rect.x;
                        }
                        else if ((i === len - 1 || (axis.isInversed && i === 0)) && ((options.x + width) > rect.x + rect.width)) {
                            options.x = pointX = rect.x + rect.width - width;
                        }
                        break;
                }
            }
            if (axis.angle % 360 === 0 && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                (!axis.isInversed ? options.x <= previousEnd : options.x + width >= previousEnd)) {
                continue;
            }
            previousEnd = axis.isInversed ? options.x : options.x + width;
            if (axis.angle !== 0) {
                angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                rotateSize = rotateTextSize(axis.labelStyle, label.text, angle, chart);
                diffHeight = axis.maxLabelSize.height - Math.ceil(rotateSize.height - elementSize.height);
                yLocation = axis.opposedPosition ? diffHeight / 2 : -diffHeight / 2;
                options.transform = 'rotate(' + angle + ',' + (pointX + width / 2 + anglePadding) + ','
                    + (pointY + yLocation) + ')';
                options.y += yLocation;
            }
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement, axis.opposedPosition).setAttribute('style', 'cursor: default');
        }
        if (!chart.delayRedraw) {
            this.element.appendChild(labelElement);
        }
        else if (axis.visible) {
            this.createZoomingLabel(this.chart, labelElement, axis, index);
        }
    };
    CartesianAxisLayoutPanel.prototype.findAxisLabel = function (axis, label, width) {
        switch (axis.labelIntersectAction) {
            case 'Trim':
                return textTrim(width, label, axis.labelStyle);
            default:
                return label;
        }
    };
    CartesianAxisLayoutPanel.prototype.drawXAxisTitle = function (axis, index) {
        var chart = this.chart;
        var elementSize = measureText(axis.title, axis.titleStyle);
        var padding = axis.majorTickLines.height + axis.maxLabelSize.height + this.padding * 2;
        var rect = axis.rect;
        padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));
        var options = new TextOption(chart.element.id + '_AxisTitle_' + index, rect.x + rect.width / 2, rect.y + padding, 'middle', axis.title);
        var element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
        element.setAttribute('aria-label', axis.description || axis.title);
        element.setAttribute('tabindex', axis.tabIndex.toString());
    };
    CartesianAxisLayoutPanel.prototype.renderTickLine = function (axis, index, majorTick, minorTick) {
        var options;
        var chart = this.chart;
        if (axis.majorTickLines.width > 0 && axis.visible) {
            options = new PathOption(chart.element.id + '_MajorTickLine_' + index, 'transparent', axis.majorTickLines.width, axis.majorTickLines.color, null, null, majorTick);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
        if (axis.minorTickLines.width > 0 && axis.visible) {
            options = new PathOption(chart.element.id + '_MinorTickLine_' + index, 'transparent', axis.minorTickLines.width, axis.minorTickLines.color, null, null, minorTick);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
    };
    CartesianAxisLayoutPanel.prototype.renderGridLine = function (axis, index, majorGrid, minorGird) {
        var chart = this.chart;
        var options;
        if (axis.majorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width, axis.majorGridLines.color, null, axis.majorGridLines.dashArray, majorGrid);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
        if (axis.minorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MinorGridLine_' + index, 'transparent', axis.minorGridLines.width, axis.minorGridLines.color, null, axis.minorGridLines.dashArray, minorGird);
            this.htmlObject = chart.renderer.drawPath(options);
            this.element.appendChild(this.htmlObject);
        }
    };
    CartesianAxisLayoutPanel.prototype.createZoomingLabel = function (chart, labelElement, axis, index) {
        var parentNode = document.getElementById(chart.element.id + 'AxisGroup' + index);
        labelElement.setAttribute('opacity', '0.3');
        var zoomElement = chart.renderer.createGroup({
            id: chart.element.id + 'AxisLabels_Zoom' + index
        });
        zoomElement = createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical');
        parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
        if (getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
            parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
        }
        else {
            parentNode.appendChild(zoomElement);
        }
    };
    return CartesianAxisLayoutPanel;
}());
export { CartesianAxisLayoutPanel };
