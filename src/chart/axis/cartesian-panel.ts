import { Chart } from '../chart';
import { Axis, Row, Column, VisibleRangeModel } from '../axis/axis';
import { Orientation } from '../utils/enum';
import { subtractThickness, valueToCoefficient, sum, subArray, TextOption, inside, measureText } from '../../common/utils/helper';
import { Size, Rect, Thickness, PathOption, logBase, createZoomingLabels, getElement, rotateTextSize } from '../../common/utils/helper';
import { textElement } from '../../common/utils/helper';
import { BorderModel } from '../../common/model/base-model';

/**
 * Specifies the Cartesian Axis Layout.
 */
const axisPadding: number = 10;

export class CartesianAxisLayoutPanel {

    private chart: Chart;
    private initialClipRect: Rect;
    private htmlObject: HTMLElement;
    private element: Element;
    private padding: number;
    /** @private */
    public leftSize: number;
    /** @private */
    public rightSize: number;
    /** @private */
    public topSize: number;
    /** @private */
    public bottomSize: number;
    /** @private */
    public seriesClipRect: Rect;
    /** @private */
    constructor(chartModule?: Chart) {
        this.chart = chartModule;
        this.padding = 5;
    }

    /**
     * Measure the axis size.
     * @return {void}
     * @private
     */

    public measureAxis(rect: Rect): void {

        let chart: Chart = this.chart;

        this.seriesClipRect = new Rect(rect.x, rect.y, rect.width, rect.height);

        this.initialClipRect = rect;

        this.leftSize = 0; this.rightSize = 0; this.topSize = 0; this.bottomSize = 0;

        //Measure Axis size with initial Rect

        this.measureRowAxis(chart, this.initialClipRect);

        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));

        this.measureColumnAxis(chart, this.initialClipRect);

        this.initialClipRect = subtractThickness(this.initialClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));

        if (!this.chart.delayRedraw) {
            this.calculateAxisSize(this.initialClipRect);
        }

        this.leftSize = 0; this.rightSize = 0; this.topSize = 0; this.bottomSize = 0;

        //Measure Axis size with series Rect

        this.measureRowAxis(chart, this.initialClipRect);

        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(this.leftSize, this.rightSize, 0, 0));

        this.measureColumnAxis(chart, this.initialClipRect);

        this.seriesClipRect = subtractThickness(this.seriesClipRect, new Thickness(0, 0, this.topSize, this.bottomSize));

        if (!this.chart.delayRedraw) {
            chart.refreshAxis();
            this.calculateAxisSize(this.seriesClipRect);
        }
    }

    private measureRowAxis(chart: Chart, rect: Rect): void {
        let row: Row;
        this.calculateRowSize(rect);
        for (let item of chart.rows) {
            row = <Row>item;
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
    }

    private measureColumnAxis(chart: Chart, rect: Rect): void {
        let column: Column;
        this.calculateColumnSize(rect);
        for (let item of chart.columns) {
            column = <Column>item;
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
    }

    /**
     * Measure the column and row in chart.
     * @return {void}
     * @private
     */

    public measureDefinition(definition: Row | Column, chart: Chart, size: Size, clipRect: Rect): void {
        let axis: Axis;
        let axisType: string;
        for (let axis of definition.axes) {
            axis.getModule(chart);
            axis.baseModule.calculateRangeAndInterval(size, axis);
            definition.computeSize(axis, clipRect);
        }
        if (definition.farSizes.length > 0) {
            definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
        }
        if (definition.nearSizes.length > 0) {
            definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
        }
    }

    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    private calculateAxisSize(rect : Rect): void {

        let chart: Chart = this.chart;

        let row: Row;

        let column: Column;

        let definition: Row | Column;

        let axis: Axis;

        let nearCount: number = 0;

        let farCount: number = 0;

        let size: number = 0;

        let x: number; let y: number;

        this.calculateRowSize(rect);

        for (let i: number = 0, len: number = chart.rows.length; i < len; i++) {
            row = <Row>chart.rows[i];
            nearCount = 0; farCount = 0;
            for (let j: number = 0, len: number = row.axes.length; j < len; j++) {
                axis = row.axes[j];
                if (axis.rect.height === 0) {
                    axis.rect.height = row.computedHeight;
                    size = 0;
                    for (let k: number = i + 1, len: number = i + axis.span; k < len; k++) {
                        definition = <Row>chart.rows[k];
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
                } else {
                    x = rect.x - sum(subArray(row.nearSizes, nearCount));
                    axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                    nearCount++;
                }

            }
        }

        this.calculateColumnSize(rect);

        for (let i: number = 0, len: number = chart.columns.length; i < len; i++) {
            column = <Column>chart.columns[i];
            nearCount = 0;
            farCount = 0;
            for (let j: number = 0, len: number = column.axes.length; j < len; j++) {
                axis = column.axes[j];
                if (axis.rect.width === 0) {
                    for (let k: number = i, len: number = (i + axis.span); k < len; k++) {
                        definition = <Column>chart.columns[k];
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
                } else {
                    y = rect.y + rect.height + sum(subArray(column.nearSizes, nearCount));
                    axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                    nearCount++;
                }
            }
        }
    }

    /**
     * Measure the axis.
     * @return {void}
     * @private
     */
    public measure(): void {
        let chart: Chart = this.chart;
        let row: Row;
        let column: Column;
        let definition: Row | Column;
        let axis: Axis;
        let actualIndex: number;
        let span: number;
        let axisLength: number;
        for (let axis of chart.axisCollections) {
            //definition.Axes = axis;
            if (axis.orientation === 'Vertical') {
                chart.verticalAxes.push(axis);
                actualIndex = this.getActualRow(axis);
                row = <Row>chart.rows[actualIndex];
                this.pushAxis(row, axis);
                span = ((actualIndex + axis.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis.span));
                for (let j: number = actualIndex + 1; j < span; j++) {
                    definition = <Row>chart.rows[j];
                    definition.axes[row.axes.length - 1] = axis;
                    chart.rows[j] = definition;
                }
                chart.rows[actualIndex] = row;
            } else {
                chart.horizontalAxes.push(axis);
                actualIndex = this.getActualColumn(axis);
                column = <Column>chart.columns[actualIndex];
                this.pushAxis(column, axis);
                span = ((actualIndex + axis.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis.span));
                for (let j: number = actualIndex + 1; j < span; j++) {
                    definition = <Column>chart.columns[j];
                    definition.axes[column.axes.length - 1] = axis;
                    chart.columns[j] = definition;
                }
                chart.columns[actualIndex] = column;
            }
        }
    }

    private pushAxis(definition: Row | Column, axis: Axis): void {
        for (let i: number = 0, len: number = definition.axes.length; i <= len; i++) {
            if (!definition.axes[i]) {
                definition.axes[i] = axis;
                break;
            }
        }
    }

    private arrangeAxis(definition: Row | Column): void {
        let axisCollection: Axis[] = [];
        for (let i: number = 0, len: number = definition.axes.length; i <= len; i++) {
            if (definition.axes[i]) {
                axisCollection.push(definition.axes[i]);
            }
        }
        definition.axes = axisCollection;
    }

    private getActualColumn(axis: Axis): number {
        let actualLength: number = this.chart.columns.length;
        let pos: number = axis.columnIndex;
        let result: number = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    }

    private getActualRow(axis: Axis): number {
        let actualLength: number = this.chart.rows.length;
        let pos: number = axis.rowIndex;
        let result: number = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
        return result;
    }

    /**
     * Measure the row size.
     * @return {void}
     */

    private calculateRowSize(rect: Rect): void {
        /*! Calculate row size */
        let chart: Chart = this.chart;
        let row: Row;
        let rowTop: number = rect.y + rect.height;
        let height: number = 0;

        let remainingHeight: number = Math.max(0, rect.height);
        for (let i: number = 0, len: number = chart.rows.length; i < len; i++) {
            row = <Row>chart.rows[i];
            if (row.height.indexOf('%') !== -1) {
                height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
            } else {
                height = Math.min(remainingHeight, parseInt(row.height, 10));
            }

            height = (i !== (len - 1)) ? height : remainingHeight;
            row.computedHeight = height;
            rowTop -= height;
            row.computedTop = rowTop;
            remainingHeight -= height;
        }
    }

    /**
     * Measure the row size.
     * @return {void}
     */

    private calculateColumnSize(rect: Rect): void {
        /*! Calculate column size */

        let chart: Chart = this.chart;
        let column: Column;
        let columnLeft: number = rect.x;
        let width: number = 0;

        let remainingWidth: number = Math.max(0, rect.width);

        for (let i: number = 0, len: number = chart.columns.length; i < len; i++) {
            column = <Column>chart.columns[i];
            if (column.width.indexOf('%') !== -1) {
                width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
            } else {
                width = Math.min(remainingWidth, parseInt(column.width, 10));
            }
            width = (i !== (len - 1)) ? width : remainingWidth;
            column.computedWidth = width;
            column.computedLeft = columnLeft;
            columnLeft += width;
            remainingWidth -= width;
        }
    }

    /**
     * To render the axis element. 
     * @return {void}
     * @private
     */

    public renderAxes(): void {

        let chart: Chart = this.chart;
        let axis: Axis;

        let axisElement: Element = chart.renderer.createGroup({ id: chart.element.id + 'AxisCollection' });

        let definitionElement: Element = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });

        for (let i: number = 0, len: number = chart.axisCollections.length; i < len; i++) {

            axis = chart.axisCollections[i];

            this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i });

            if (axis.orientation === 'Horizontal') {

                if (axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, axis.plotOffset, 0);
                }

                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawXAxisGridLine(axis, i);
                }

                if (axis.visible) {
                    this.drawXAxisLabels(axis, i);
                }

                this.drawXAxisTitle(axis, i);

            } else {

                if (axis.lineStyle.width > 0) {
                    this.drawAxisLine(axis, i, 0, axis.plotOffset);
                }

                if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                    this.drawYAxisGridLine(axis, i);
                }

                if (axis.visible) {
                    this.drawYAxisLabels(axis, i);
                }

                this.drawYAxisTitle(axis, i);
            }

            axisElement.appendChild(this.element);
        }

        this.element = chart.renderer.createGroup({ id: chart.element.id + 'DefintionLine' });

        for (let j: number = 0, len: number = chart.rows.length; j < len; j++) {
            let row: Row = <Row>chart.rows[j];
            if (row.border.color) {
                this.drawBottomLine(row, j, true);
            }
        }

        for (let j: number = 0, len: number = chart.columns.length; j < len; j++) {
            let column: Column = <Column>chart.columns[j];
            if (column.border.color) {
                this.drawBottomLine(column, j, false);
            }
        }

        axisElement.appendChild(this.element);

        chart.svgObject.appendChild(axisElement);
    }

    private drawBottomLine(definition: Row | Column, index: number, isRow: boolean): void {
        let chart: Chart = this.chart;
        let optionsLine: Object = {};
        let x1: number; let x2: number;
        let y1: number; let y2: number;
        let definitionName: string;
        if (isRow) {
            definition = <Row>definition;
            y1 = y2 = definition.computedTop + definition.computedHeight;
            x1 = this.seriesClipRect.x;
            x2 = x1 + this.seriesClipRect.width;
            definitionName = 'Row';
        } else {
            definition = <Column>definition;
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

        this.htmlObject = chart.renderer.drawLine(optionsLine) as HTMLElement;

        this.element.appendChild(this.htmlObject);
    }

    private drawAxisLine(axis: Axis, index: number, plotX: number, plotY: number): void {

        let chart: Chart = this.chart;
        let optionsLine: Object = {};
        let rect: Rect = axis.rect;
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

        this.htmlObject = chart.renderer.drawLine(optionsLine) as HTMLElement;

        this.element.appendChild(this.htmlObject);
    }

    private drawYAxisGridLine(axis: Axis, index: number): void {

        let chart: Chart = this.chart;
        let tempInterval: number;
        let pointY: number = 0;
        let majorGrid: string = '';
        let majorTick: string = '';
        let minorGird: string = '';
        let minorTick: string = '';
        let minorDirection: string[];
        let tickSize: number = (axis.opposedPosition) ? axis.majorTickLines.height : -axis.majorTickLines.height;
        let axisLineSize: number = (axis.opposedPosition) ? axis.lineStyle.width / 2 : -axis.lineStyle.width / 2;
        let rect: Rect = axis.rect;
        let ticksbwtLabel: number = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
            0.5 : 0;
        let length : number = axis.visibleLabels.length;
        if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks' && length > 0) {
            length += 1;
        }
        //Gridlines
        for (let i: number = 0; i < length; i++) {
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
    }

    private isBorder(axis: Axis, index: number, value: number): boolean {
        let chart: Chart = this.chart;
        let border: BorderModel = chart.chartArea.border;
        let rect: Rect = this.seriesClipRect;
        let orientation: Orientation = axis.orientation;
        let start: number = (orientation === 'Horizontal') ? rect.x : rect.y;
        let size: number = (orientation === 'Horizontal') ? rect.width : rect.height;
        let startIndex: number = (orientation === 'Horizontal') ? 0 : axis.visibleLabels.length - 1;
        let endIndex: number = (orientation === 'Horizontal') ? axis.visibleLabels.length - 1 : 0;
        if (axis.plotOffset > 0) {
            return true;
        } else if ((value === start || value === (start + size)) && (border.width <= 0 || border.color === 'transparent')) {
            return true;
        } else if ((value !== start && index === startIndex) || (value !== (start + size) && index === endIndex)) {
            return true;
        }
        return false;
    }
    /**
     * To render the axis label. 
     * @return {void}
     * @private
     */
    public drawYAxisLabels(axis: Axis, index: number): void {

        let chart: Chart = this.chart;
        let pointX: number = 0;
        let pointY: number = 0;
        let elementSize: Size;
        let options: TextOption;
        let padding: number = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
        padding = (axis.opposedPosition) ? padding : -padding;
        let anchor: string = (axis.opposedPosition) ? 'start' : 'end';
        let labelElement: Element = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        let rect: Rect = axis.rect;

        for (let i: number = 0, len: number = axis.visibleLabels.length; i < len; i++) {

            pointX = (rect.x + padding);

            elementSize = axis.visibleLabels[i].size;

            pointY = valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height;

            pointY = Math.floor((pointY * -1) + (rect.y + rect.height));

            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY + (elementSize.height / 4),
                                     anchor, axis.visibleLabels[i].text);
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if ((i === 0 && options.y > rect.y + rect.height) ||
                            ((i === axis.visibleLabels.length - 1) && options.y - elementSize.height / 2 < rect.y)) {
                            options.text = '';
                        }
                        break;
                    case 'Shift':
                        if (i === 0 && options.y > rect.y + rect.height) {
                            options.y = pointY = rect.y + rect.height;
                        } else if ((i === axis.visibleLabels.length - 1) && (options.y - elementSize.height / 2 < rect.y)) {
                            options.y = pointY = rect.y + elementSize.height / 2;
                        }
                        break;
                }
            }

            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
        }

        if (!chart.delayRedraw) {
            this.element.appendChild(labelElement);
        } else if (axis.visible) {
            this.createZoomingLabel(this.chart, labelElement, axis, index);
        }
    }

    private drawYAxisTitle(axis: Axis, index: number): void {

        let chart: Chart = this.chart;

        let labelRotation: number = (axis.opposedPosition) ? 90 : -90;

        let elementSize: Size = measureText(axis.title, axis.titleStyle);

        let padding: number = axis.majorTickLines.height + axis.maxLabelSize.width + this.padding * 2;

        let rect: Rect = axis.rect;

        padding = axis.opposedPosition ? padding : -padding;

        let x: number = rect.x + padding;

        let y: number = rect.y + rect.height / 2;


        let options: TextOption = new TextOption(chart.element.id + '_AxisTitle_' + index, x, y - this.padding, 'middle',
                                                 axis.title, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')');

        let element : Element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
        element.setAttribute('aria-label', axis.description || axis.title);
        element.setAttribute('tabindex', axis.tabIndex.toString());

    }

    private drawXAxisGridLine(axis: Axis, index: number): void {
        let chart: Chart = this.chart;
        let tempInterval: number;
        let pointX: number = 0;
        let majorGrid: string = '';
        let majorTick: string = '';
        let minorGird: string = '';
        let minorTick: string = '';
        let minorDirection: string[];
        let tickSize: number = (axis.opposedPosition) ? -axis.majorTickLines.height : axis.majorTickLines.height;
        let axisLineSize: number = (axis.opposedPosition) ? -axis.lineStyle.width / 2 : axis.lineStyle.width / 2;
        let ticksbwtLabel: number = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
            0.5 : 0;
        let rect: Rect = axis.rect;
        let length : number = axis.visibleLabels.length;
        if (axis.valueType === 'Category' && length > 0 && axis.labelPlacement === 'BetweenTicks') {
            length += 1;
        }
        //Gridlines
        for (let i: number = 0; i < length; i++) {
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
    }

    private drawAxisMinorLine(axis: Axis, tempInterval: number, minorGird: string, minorTick: string): string[] {
        let value: number = tempInterval;
        let coor: number = 0;
        let position: number = 0;
        let range: VisibleRangeModel = axis.visibleRange;
        let direction: string[] = [];
        let tickSize: number = axis.opposedPosition ? -axis.minorTickLines.height : axis.minorTickLines.height;
        let rect: Rect = axis.rect;
        let logStart: number;
        let logEnd: number;
        let logInterval: number = 1;
        let logPosition: number = 1;
        if (axis.valueType === 'Logarithmic') {
            logStart = Math.pow(axis.logBase, value - range.interval);
            logEnd = Math.pow(axis.logBase, value);
            logInterval = (logEnd - logStart) / (axis.minorTicksPerInterval + 1);
            logPosition = logStart + logInterval;
        }
        if (axis.orientation === 'Horizontal') {
            for (let j: number = 0; j < axis.minorTicksPerInterval; j++) {
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
        } else {
            tickSize = axis.opposedPosition ? axis.minorTickLines.height : -axis.minorTickLines.height;
            for (let j: number = 0; j < axis.minorTicksPerInterval; j++) {
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
    }
    private findLogNumeric(axis: Axis, logPosition: number, logInterval: number, value: number): number {
        let range: VisibleRangeModel = axis.visibleRange;
        if (axis.valueType === 'Logarithmic') {
            value = logBase(logPosition, axis.logBase);
        } else if (axis.valueType === 'DateTime') {
            value += axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
        } else {
            value += range.interval / (axis.minorTicksPerInterval + 1);
        }
        return value;
    }
    /**
     * To render the axis label. 
     * @return {void}
     * @private
     */
    public drawXAxisLabels(axis: Axis, index: number): void {

        let chart: Chart = this.chart;
        let pointX: number = 0;
        let pointY: number = 0;
        let elementSize: Size;
        let labelElement: Element = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
        let padding: number = axis.majorTickLines.height + this.padding + axis.lineStyle.width / 2;
        let labelPadding: number;
        let rotateSize: Size;
        let diffHeight: number;
        let yLocation: number;
        let angle: number;
        let anglePadding: number = ((axis.angle === 90 || axis.angle === -90)) ? -2 : 0;
        let rect: Rect = axis.rect;
        let options: TextOption;
        let previousEnd : number = 0;

        for (let i: number = 0, len: number = axis.visibleLabels.length; i < len; i++) {

            pointX = (valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.width) + rect.x;

            elementSize = axis.visibleLabels[i].size;

            pointX -= elementSize.width / 2;

            labelPadding = (axis.opposedPosition) ?
                - (padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4) + (2 * axis.maxLabelSize.height / 5)) : 0))
                : padding + ((axis.angle !== 0) ? (3 * (elementSize.height / 4)) + (2 * axis.maxLabelSize.height / 5)
                    : (3 * (elementSize.height / 4)));

            pointY = (rect.y + labelPadding);

            options = new TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, '', axis.visibleLabels[i].text);
            if (axis.edgeLabelPlacement) {
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if ((i === 0 && options.x < rect.x) ||
                            ((i === axis.visibleLabels.length - 1) && (options.x + elementSize.width > rect.x + rect.width))) {
                            continue;
                        }
                        break;
                    case 'Shift':
                        if (i === 0 && options.x < rect.x) {
                            options.x = pointX = rect.x;
                        } else if ((i === axis.visibleLabels.length - 1) && ((options.x + elementSize.width) > rect.x + rect.width)) {
                            options.x = pointX = rect.x + rect.width - elementSize.width;
                        }
                        break;
                }
            }
            if (axis.angle % 360 === 0 && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                (!axis.isInversed ? options.x <= previousEnd : options.x + elementSize.width >= previousEnd)) {
                continue;
            }
            previousEnd = axis.isInversed ? options.x  : options.x + elementSize.width;
            if (axis.angle !== 0) {
                angle = (axis.angle > 360) ? axis.angle % 360 : axis.angle;
                rotateSize = rotateTextSize(axis.labelStyle, axis.visibleLabels[i].text, angle, chart);
                diffHeight = axis.maxLabelSize.height - Math.ceil(rotateSize.height - elementSize.height);
                yLocation = axis.opposedPosition ? diffHeight / 2 : - diffHeight / 2;
                options.transform = 'rotate(' + angle + ',' + (pointX + elementSize.width / 2 + anglePadding) + ','
                    + (pointY + yLocation) + ')';
                options.y += yLocation;
            }
            textElement(options, axis.labelStyle, axis.labelStyle.color, labelElement);
        }

        if (!chart.delayRedraw) {
            this.element.appendChild(labelElement);
        }  else if (axis.visible) {
            this.createZoomingLabel(this.chart, labelElement, axis, index);
        }
    }


    private drawXAxisTitle(axis: Axis, index: number): void {

        let chart: Chart = this.chart;

        let elementSize: Size = measureText(axis.title, axis.titleStyle);

        let padding: number = axis.majorTickLines.height + axis.maxLabelSize.height + this.padding * 2;
        let rect: Rect = axis.rect;

        padding = axis.opposedPosition ? -(padding + elementSize.height / 4) : (padding + (3 * elementSize.height / 4));

        let options: TextOption = new TextOption(chart.element.id + '_AxisTitle_' + index, rect.x + rect.width / 2,
                                                 rect.y + padding, 'middle', axis.title);

        let element : Element = textElement(options, axis.titleStyle, axis.titleStyle.color, this.element);
        element.setAttribute('aria-label', axis.description || axis.title);
        element.setAttribute('tabindex', axis.tabIndex.toString());
    }

    private renderTickLine(axis: Axis, index: number, majorTick: string, minorTick: string): void {

        let options: PathOption;
        let chart: Chart = this.chart;

        if (axis.majorTickLines.width > 0) {

            options = new PathOption(chart.element.id + '_MajorTickLine_' + index, 'transparent', axis.majorTickLines.width,
                                     axis.majorTickLines.color, null, null, majorTick);

            this.htmlObject = chart.renderer.drawPath(options) as HTMLElement;

            this.element.appendChild(this.htmlObject);

        }
        if (axis.minorTickLines.width > 0) {

            options = new PathOption(chart.element.id + '_MinorTickLine_' + index, 'transparent', axis.minorTickLines.width,
                                     axis.minorTickLines.color, null, null, minorTick);

            this.htmlObject = chart.renderer.drawPath(options) as HTMLElement;

            this.element.appendChild(this.htmlObject);

        }
    }

    private renderGridLine(axis: Axis, index: number, majorGrid: string, minorGird: string): void {
        let chart: Chart = this.chart;
        let options: PathOption;
        if (axis.majorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MajorGridLine_' + index, 'transparent', axis.majorGridLines.width,
                                     axis.majorGridLines.color, null, axis.majorGridLines.dashArray, majorGrid);

            this.htmlObject = chart.renderer.drawPath(options) as HTMLElement;

            this.element.appendChild(this.htmlObject);

        }
        if (axis.minorGridLines.width > 0) {
            options = new PathOption(chart.element.id + '_MinorGridLine_' + index, 'transparent', axis.minorGridLines.width,
                                     axis.minorGridLines.color, null, axis.minorGridLines.dashArray, minorGird);

            this.htmlObject = chart.renderer.drawPath(options) as HTMLElement;

            this.element.appendChild(this.htmlObject);
        }
    }

    private createZoomingLabel(chart: Chart, labelElement: Element, axis: Axis, index: number): void {
        let parentNode: Element = document.getElementById(chart.element.id + 'AxisGroup' + index);
        labelElement.setAttribute('opacity', '0.3');
        let zoomElement: Element = chart.renderer.createGroup({
            id: chart.element.id + 'AxisLabels_Zoom' + index
        });
        zoomElement = createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical');
        parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
        if (getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
            parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
        } else {
            parentNode.appendChild(zoomElement);
        }
    }
}



