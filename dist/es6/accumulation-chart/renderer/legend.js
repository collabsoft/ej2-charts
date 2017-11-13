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
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { pointByIndex } from '../model/acc-base';
import { BaseLegend, LegendOptions } from '../../common/legend/legend';
import { Rect, measureText, textTrim } from '../../common/utils/helper';
var AccumulationLegend = (function (_super) {
    __extends(AccumulationLegend, _super);
    function AccumulationLegend(chart) {
        var _this = _super.call(this, chart) || this;
        _this.library = _this;
        _this.titleRect = new Rect(0, chart.margin.top, 0, 0);
        return _this;
    }
    AccumulationLegend.prototype.getLegendOptions = function (chart, series) {
        this.legendCollections = [];
        for (var i = 0; i < 1; i++) {
            var seriesType = series[i].type;
            if (seriesType === 'Pie' || seriesType === 'Doughnut') {
                seriesType = (series[i].innerRadius !== '0' && series[i].innerRadius !== '0%') ?
                    'Doughnut' : 'Pie';
            }
            for (var _i = 0, _a = series[i].points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!isNullOrUndefined(point.x) && !isNullOrUndefined(point.y)) {
                    this.legendCollections.push(new LegendOptions(point.x.toString(), point.color, series[i].legendShape, point.visible, seriesType, null, null, point.index, series[i].index));
                }
            }
        }
    };
    AccumulationLegend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        var extraWidth = 0;
        var extraHeight = 0;
        var padding = legend.padding;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.width += extraWidth;
        legendBounds.height += extraHeight;
        var shapePadding = legend.shapePadding;
        var maximumWidth = 0;
        var shapeWidth = legend.shapeWidth;
        var rowWidth = 0;
        var rowCount = 0;
        var columnWidth = [];
        var columnHeight = 0;
        var legendWidth = 0;
        this.maxItemHeight = Math.max(measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
        var legendEventArgs;
        var render = false;
        for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
            var legendOption = _a[_i];
            legendEventArgs = { fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                name: 'legendRender', cancel: false };
            this.chart.trigger('legendRender', legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + legendOption.textSize.width + padding;
                if (this.isVertical) {
                    ++rowCount;
                    columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    if ((rowCount * (this.maxItemHeight + padding)) + padding > legendBounds.height) {
                        columnHeight = Math.max(columnHeight, (rowCount * (this.maxItemHeight + padding)) + padding);
                        rowWidth = rowWidth + maximumWidth;
                        columnWidth.push(maximumWidth);
                        this.totalPages = Math.max(rowCount, this.totalPages || 1);
                        maximumWidth = 0;
                        rowCount = 1;
                    }
                    maximumWidth = Math.max(legendWidth, maximumWidth);
                }
                else {
                    rowWidth = rowWidth + legendWidth;
                    if (legendBounds.width < (padding + rowWidth)) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding - legendWidth));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = legendWidth;
                        rowCount++;
                        columnHeight = (rowCount * (this.maxItemHeight + padding)) + padding;
                    }
                }
            }
        }
        if (this.isVertical) {
            rowWidth = rowWidth + maximumWidth;
            this.isPaging = legendBounds.width < (rowWidth + padding);
            columnHeight = Math.max(columnHeight, ((this.totalPages || 1) * (this.maxItemHeight + padding)) + padding);
            this.isPaging = this.isPaging && (this.totalPages > 1);
            if (columnWidth[columnWidth.length - 1] !== maximumWidth) {
                columnWidth.push(maximumWidth);
            }
        }
        else {
            this.isPaging = legendBounds.height < columnHeight;
            this.totalPages = this.totalRowCount = rowCount;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
        }
        this.maxColumns = 0;
        var width = this.isVertical ? this.getMaxColumn(columnWidth, legendBounds.width, padding, rowWidth + padding) :
            Math.max(rowWidth + padding, maximumWidth);
        if (render) {
            this.setBounds(width, columnHeight, legend, legendBounds);
        }
        else {
            this.setBounds(0, 0, legend, legendBounds);
        }
    };
    AccumulationLegend.prototype.getMaxColumn = function (columns, width, padding, rowWidth) {
        var maxPageColumn = padding;
        this.maxColumnWidth = Math.max.apply(null, columns);
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            maxPageColumn += this.maxColumnWidth;
            this.maxColumns++;
            if (maxPageColumn + padding > width) {
                maxPageColumn -= this.maxColumnWidth;
                this.maxColumns--;
                break;
            }
        }
        this.isPaging = (maxPageColumn < rowWidth) && (this.totalPages > 1);
        if (maxPageColumn === padding) {
            maxPageColumn = width;
        }
        this.maxColumns = Math.max(1, this.maxColumns);
        this.maxWidth = maxPageColumn;
        return maxPageColumn;
    };
    AccumulationLegend.prototype.getAvailWidth = function (tx, width, legendX) {
        if (this.isVertical) {
            width = this.maxWidth;
        }
        return width - ((this.legend.padding * 2) + this.legend.shapeWidth + this.legend.shapePadding);
    };
    AccumulationLegend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        if (this.isVertical) {
            if (count === firstLegend || (prevLegend.location.y + (this.maxItemHeight * 1.5) + (padding * 2) > rect.y + rect.height)) {
                legendOption.location.x = prevLegend.location.x + ((count === firstLegend) ? 0 : this.maxColumnWidth);
                legendOption.location.y = start.y;
                this.pageXCollections.push(legendOption.location.x - (this.legend.shapeWidth / 2) - padding);
                this.totalPages++;
            }
            else {
                legendOption.location.x = prevLegend.location.x;
                legendOption.location.y = prevLegend.location.y + this.maxItemHeight + padding;
            }
        }
        else {
            var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
            if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2)) {
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.maxItemHeight + padding;
                legendOption.location.x = start.x;
            }
            else {
                legendOption.location.y = prevLegend.location.y;
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            }
            this.totalPages = this.totalRowCount;
        }
        var availablewidth = this.getAvailWidth(legendOption.location.x, this.legendBounds.width, this.legendBounds.x);
        legendOption.text = textTrim(+availablewidth.toFixed(4), legendOption.text, this.legend.textStyle);
    };
    AccumulationLegend.prototype.getSmartLegendLocation = function (labelBound, legendBound, margin) {
        var space;
        switch (this.position) {
            case 'Left':
                space = ((labelBound.x - legendBound.width) - margin.left) / 2;
                legendBound.x = (labelBound.x - legendBound.width) < margin.left ? legendBound.x :
                    (labelBound.x - legendBound.width) - space;
                break;
            case 'Right':
                space = ((this.chart.availableSize.width - margin.right) - (labelBound.x + labelBound.width + legendBound.width)) / 2;
                legendBound.x = (labelBound.x + labelBound.width + legendBound.width) > (this.chart.availableSize.width - margin.right) ?
                    legendBound.x : (labelBound.x + labelBound.width + space);
                break;
            case 'Top':
                this.getTitleRect(this.chart);
                space = ((labelBound.y - legendBound.height) - (this.titleRect.y + this.titleRect.height)) / 2;
                legendBound.y = (labelBound.y - legendBound.height) < margin.top ? legendBound.y :
                    (labelBound.y - legendBound.height) - space;
                break;
            case 'Bottom':
                space = ((this.chart.availableSize.height - margin.bottom) - (labelBound.y + labelBound.height + legendBound.height)) / 2;
                legendBound.y = labelBound.y + labelBound.height + legendBound.height > (this.chart.availableSize.height - margin.bottom) ?
                    legendBound.y : (labelBound.y + labelBound.height) + space;
                break;
        }
    };
    AccumulationLegend.prototype.getTitleRect = function (accumulation) {
        if (!accumulation.title) {
            return null;
        }
        var titleSize = measureText(accumulation.title, accumulation.titleStyle);
        this.titleRect = new Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
    };
    AccumulationLegend.prototype.legendByIndex = function (index, legendCollections) {
        for (var _i = 0, legendCollections_1 = legendCollections; _i < legendCollections_1.length; _i++) {
            var legend = legendCollections_1[_i];
            if (legend.pointIndex === index) {
                return legend;
            }
        }
        return null;
    };
    AccumulationLegend.prototype.click = function (event) {
        var targetId = event.target.id;
        var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_',
            this.legendID + '_shape_marker_'];
        var selectedDataIndexes = [];
        if (this.chart.accumulationSelectionModule) {
            selectedDataIndexes = extend([], this.chart.accumulationSelectionModule.selectedDataIndexes, null, true);
        }
        for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
            var id = legendItemsId_1[_i];
            if (targetId.indexOf(id) > -1) {
                var pointIndex = parseInt(targetId.split(id)[1], 10);
                var currentSeries = this.chart.visibleSeries[0];
                var point = pointByIndex(pointIndex, currentSeries.points);
                var legendOption = this.legendByIndex(pointIndex, this.legendCollections);
                if (this.chart.legendSettings.toggleVisibility) {
                    point.visible = !point.visible;
                    legendOption.visible = point.visible;
                    this.chart.removeSvg();
                    if (point.visible) {
                        currentSeries.sumOfPoints += point.y;
                    }
                    else {
                        currentSeries.sumOfPoints -= point.y;
                    }
                    this.chart.refreshPoints(currentSeries.points);
                    this.chart.renderElements();
                }
                else if (this.chart.accumulationSelectionModule) {
                    this.chart.accumulationSelectionModule.legendSelection(this.chart, 0, pointIndex);
                }
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
    };
    AccumulationLegend.prototype.getModuleName = function () {
        return 'AccumulationLegend';
    };
    AccumulationLegend.prototype.destroy = function (chart) {
    };
    return AccumulationLegend;
}(BaseLegend));
export { AccumulationLegend };
