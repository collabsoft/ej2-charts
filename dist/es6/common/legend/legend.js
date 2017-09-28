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
import { Font, Border } from '../model/base';
import { Theme } from '../model/theme';
import { Size, Rect, subtractThickness, Thickness, drawSymbol, measureText, ChartLocation, PathOption } from '../utils/helper';
import { RectOption, TextOption, textElement, stringToNumber, removeElement, showTooltip } from '../utils/helper';
var Location = (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Location;
}(ChildProperty));
export { Location };
__decorate([
    Property(0)
], Location.prototype, "x", void 0);
__decorate([
    Property(0)
], Location.prototype, "y", void 0);
var LegendSettings = (function (_super) {
    __extends(LegendSettings, _super);
    function LegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LegendSettings;
}(ChildProperty));
export { LegendSettings };
__decorate([
    Property(true)
], LegendSettings.prototype, "visible", void 0);
__decorate([
    Property(null)
], LegendSettings.prototype, "height", void 0);
__decorate([
    Property(null)
], LegendSettings.prototype, "width", void 0);
__decorate([
    Complex({ x: 0, y: 0 }, Location)
], LegendSettings.prototype, "location", void 0);
__decorate([
    Property('Auto')
], LegendSettings.prototype, "position", void 0);
__decorate([
    Property(8)
], LegendSettings.prototype, "padding", void 0);
__decorate([
    Property('Center')
], LegendSettings.prototype, "alignment", void 0);
__decorate([
    Complex(Theme.legendLabelFont, Font)
], LegendSettings.prototype, "textStyle", void 0);
__decorate([
    Property(10)
], LegendSettings.prototype, "shapeHeight", void 0);
__decorate([
    Property(10)
], LegendSettings.prototype, "shapeWidth", void 0);
__decorate([
    Complex({}, Border)
], LegendSettings.prototype, "border", void 0);
__decorate([
    Property(5)
], LegendSettings.prototype, "shapePadding", void 0);
__decorate([
    Property('transparent')
], LegendSettings.prototype, "background", void 0);
__decorate([
    Property(1)
], LegendSettings.prototype, "opacity", void 0);
__decorate([
    Property(true)
], LegendSettings.prototype, "toggleVisibility", void 0);
__decorate([
    Property(null)
], LegendSettings.prototype, "description", void 0);
__decorate([
    Property(3)
], LegendSettings.prototype, "tabIndex", void 0);
var BaseLegend = (function () {
    function BaseLegend(chart) {
        this.rowCount = 0;
        this.columnCount = 0;
        this.pageButtonSize = 8;
        this.pageXCollections = [];
        this.maxColumns = 0;
        this.isTrimmed = false;
        this.maxWidth = 0;
        this.currentPage = 1;
        this.chart = chart;
        this.legend = chart.legendSettings;
        this.legendID = chart.element.id + '_chart_legend';
        this.isChartControl = (chart.getModuleName() === 'chart');
    }
    BaseLegend.prototype.calculateLegendBounds = function (rect, availableSize) {
        var legend = this.legend;
        this.getPosition(legend.position, availableSize);
        this.legendBounds = new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (this.position === 'Left' || this.position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height) || rect.height;
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        }
        else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.library.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(this.position, legend.alignment, this.legendBounds, rect, availableSize);
    };
    BaseLegend.prototype.getPosition = function (position, availableSize) {
        if (this.isChartControl) {
            this.position = (position !== 'Auto') ? position : 'Bottom';
        }
        else {
            this.position = (position !== 'Auto') ? position :
                (availableSize.width > availableSize.height ? 'Right' : 'Bottom');
        }
    };
    BaseLegend.prototype.setBounds = function (computedWidth, computedHeight, legend, legendBounds) {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxItemHeight + legend.padding)));
    };
    BaseLegend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize) {
        var padding = this.legend.border.width / 2;
        var legendHeight = legendBounds.height + padding;
        var legendWidth = legendBounds.width + padding;
        var marginTop = this.chart.margin.top;
        if (position === 'Bottom') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y + (rect.height - legendHeight) + padding;
            subtractThickness(rect, new Thickness(0, 0, 0, legendHeight));
        }
        else if (position === 'Top') {
            legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
            legendBounds.y = rect.y;
            subtractThickness(rect, new Thickness(0, 0, legendHeight, 0));
        }
        else if (position === 'Right') {
            legendBounds.x = rect.x + (rect.width - legendBounds.width);
            legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(0, legendWidth, 0, 0));
        }
        else if (position === 'Left') {
            legendBounds.y = this.alignLegend(marginTop, availableSize.height, legendBounds.height, alignment);
            subtractThickness(rect, new Thickness(legendWidth, 0, 0, 0));
        }
        else {
            legendBounds.x = this.legend.location.x;
            legendBounds.y = this.legend.location.y;
            subtractThickness(rect, new Thickness(0, 0, 0, 0));
        }
    };
    BaseLegend.prototype.alignLegend = function (start, size, legendSize, alignment) {
        switch (alignment) {
            case 'Far':
                start = (size - legendSize) - start;
                break;
            case 'Center':
                start = ((size - legendSize) / 2);
                break;
        }
        return start;
    };
    BaseLegend.prototype.renderLegend = function (chart, legend, legendBounds) {
        var firstLegend = this.findFirstLegendPosition(this.legendCollections);
        var padding = legend.padding;
        this.maxItemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
        var legendGroup = chart.renderer.createGroup({ id: this.legendID + '_g' });
        var legendTranslateGroup = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollections.length) {
            var legendSeriesGroup = void 0;
            var start = void 0;
            start = new ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2), legendBounds.y + padding + this.maxItemHeight / 2);
            var textOptions = new TextOption('', start.x, start.y, 'start');
            this.totalPages = this.isChartControl ? this.totalPages : 0;
            var textPadding = legend.shapePadding + padding + legend.shapeWidth;
            var count = 0;
            this.pageXCollections = [];
            this.legendCollections[firstLegend].location = start;
            var previousLegend = this.legendCollections[firstLegend];
            for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                var legendOption = _a[_i];
                if (legendOption.render && legendOption.text !== '') {
                    legendSeriesGroup = chart.renderer.createGroup({
                        id: this.legendID + this.generateId(legendOption, '_g_', count)
                    });
                    legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                    legendSeriesGroup.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                    this.library.getRenderPoint(legendOption, start, textPadding, previousLegend, legendBounds, count, firstLegend);
                    this.renderSymbol(legendOption, legendSeriesGroup, count);
                    this.renderText(chart, legendOption, legendSeriesGroup, textOptions, count);
                    legendSeriesGroup.setAttribute('style', 'cursor: pointer');
                    legendTranslateGroup.appendChild(legendSeriesGroup);
                    previousLegend = legendOption;
                }
                count++;
            }
            if (this.isPaging) {
                this.renderPagingElements(chart, legendBounds, textOptions, legendGroup);
            }
        }
        chart.svgObject.appendChild(legendGroup);
    };
    BaseLegend.prototype.findFirstLegendPosition = function (legendCollection) {
        var count = 0;
        for (var _i = 0, legendCollection_1 = legendCollection; _i < legendCollection_1.length; _i++) {
            var legend = legendCollection_1[_i];
            if (legend.render && legend.text !== '') {
                break;
            }
            count++;
        }
        return count;
    };
    BaseLegend.prototype.createLegendElements = function (chart, legendBounds, legendGroup, legend, id) {
        var padding = legend.padding;
        var options = new RectOption(id + '_element', legend.background, legend.border, legend.opacity, legendBounds);
        legendGroup.appendChild(chart.renderer.drawRectangle(options));
        var legendItemsGroup = chart.renderer.createGroup({ id: id + '_collections' });
        legendGroup.appendChild(legendItemsGroup);
        this.legendTranslateGroup = chart.renderer.createGroup({ id: id + '_translate_g' });
        legendItemsGroup.appendChild(this.legendTranslateGroup);
        var clippath = chart.renderer.createClipPath({ id: id + '_clipPath' });
        options.y += padding;
        options.id += '_clipPath_rect';
        options.width = (!this.isChartControl && this.isVertical) ? this.maxWidth - padding : legendBounds.width;
        this.clipRect = chart.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        chart.svgObject.appendChild(clippath);
        legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
        return this.legendTranslateGroup;
    };
    BaseLegend.prototype.renderSymbol = function (legendOption, group, i) {
        var symbolColor = legendOption.visible ? legendOption.fill : '#D3D3D3';
        var shape = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
        shape = shape === 'Scatter' ? legendOption.markerShape : shape;
        var symbolOption = new PathOption(this.legendID + this.generateId(legendOption, '_shape_', i), symbolColor, 1, symbolColor, 1, '', '');
        group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth, this.legend.shapeHeight), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image' ||
            legendOption.type === 'Doughnut') {
            symbolOption.id = this.legendID + this.generateId(legendOption, '_shape_marker_', i);
            shape = legendOption.type === 'Doughnut' ? 'Circle' : legendOption.markerShape;
            symbolOption.fill = legendOption.type === 'Doughnut' ? '#FFFFFF' : symbolOption.fill;
            group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth / 2, this.legend.shapeHeight / 2), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        }
    };
    BaseLegend.prototype.renderText = function (chart, legendOption, group, textOptions, i) {
        var legend = chart.legendSettings;
        var hiddenColor = '#D3D3D3';
        textOptions.id = this.legendID + this.generateId(legendOption, '_text_', i);
        var fontcolor = legendOption.visible ? legend.textStyle.color : hiddenColor;
        textOptions.text = legendOption.text;
        textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
        textOptions.y = legendOption.location.y + this.maxItemHeight / 4;
        var element = textElement(textOptions, legend.textStyle, fontcolor, group);
        element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
    };
    BaseLegend.prototype.renderPagingElements = function (chart, bounds, textOption, legendGroup) {
        var paginggroup = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
        legendGroup.appendChild(paginggroup);
        var grayColor = '#545454';
        var legend = chart.legendSettings;
        var padding = legend.padding;
        if (this.isChartControl || !this.isVertical) {
            this.totalPages = Math.ceil(this.totalPages / Math.max(1, this.rowCount - 1));
        }
        else {
            this.totalPages = Math.ceil(this.totalPages / this.maxColumns);
        }
        var symbolOption = new PathOption(this.legendID + '_pageup', 'transparent', 2, grayColor, 1, '', '');
        var iconSize = this.pageButtonSize;
        paginggroup.setAttribute('style', 'cursor: pointer');
        this.clipPathHeight = (this.rowCount - 1) * (this.maxItemHeight + padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        var x = bounds.x + iconSize / 2;
        var y = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
        textOption.x = x + (iconSize / 2) + legend.padding;
        var size = measureText(this.totalPages + '/' + this.totalPages, legend.textStyle);
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = '1/' + this.totalPages;
        var pageTextElement = textElement(textOption, legend.textStyle, legend.textStyle.color, paginggroup);
        x = (textOption.x + legend.padding + (iconSize / 2) + size.width);
        symbolOption.id = this.legendID + '_pagedown';
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'RightArrow', new Size(iconSize, iconSize), '', symbolOption, 'RightArrow'));
        paginggroup.setAttribute('transform', 'translate(' + (bounds.width - (2 * (iconSize + legend.padding) +
            legend.padding + size.width)) + ', ' + 0 + ')');
        this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
    };
    BaseLegend.prototype.translatePage = function (pagingText, page, pageNumber) {
        var size = (this.clipPathHeight) * page;
        var translate = 'translate(0,-' + size + ')';
        if (!this.isChartControl && this.isVertical) {
            var pageLength = page * this.maxColumns;
            size = this.pageXCollections[page * this.maxColumns] - this.legendBounds.x;
            size = size < 0 ? 0 : size;
            translate = 'translate(-' + size + ',0)';
        }
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = (pageNumber) + '/' + this.totalPages;
        this.currentPage = pageNumber;
    };
    BaseLegend.prototype.changePage = function (event, pageUp) {
        var pageText = document.getElementById(this.legendID + '_pagenumber');
        var page = parseInt(pageText.textContent.split('/')[0], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        }
        else if (!pageUp && page < this.totalPages) {
            this.translatePage(pageText, page, (page + 1));
        }
    };
    BaseLegend.prototype.generateId = function (option, prefix, count) {
        if (this.isChartControl) {
            return prefix + count;
        }
        else {
            return prefix + option.pointIndex;
        }
    };
    BaseLegend.prototype.move = function (event, x, y, isTouch) {
        var _this = this;
        if (event.target.textContent.indexOf('...') > -1) {
            var targetId = event.target.id.split(this.legendID + '_text_');
            if (targetId.length === 2) {
                var index = parseInt(targetId[1], 10);
                var element = this.chart.element;
                if (!isNaN(index)) {
                    if (isTouch) {
                        removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
                    }
                    if (this.isChartControl) {
                        showTooltip(this.chart.series[index].name, x, y, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip');
                    }
                    else {
                        showTooltip(this.chart.visibleSeries[0].points[index].x.toString(), x, y, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip');
                    }
                }
            }
        }
        else {
            removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
        }
        if (isTouch) {
            clearTimeout(this.clearTooltip);
            this.clearTooltip = setTimeout(function () { removeElement(_this.chart.element.id + '_EJ2_Legend_Tooltip'); }, 1000);
        }
    };
    return BaseLegend;
}());
export { BaseLegend };
var LegendOptions = (function () {
    function LegendOptions(text, fill, shape, visible, type, markerShape, markerVisibility, pointIndex, seriesIndex) {
        this.location = { x: 0, y: 0 };
        this.text = text;
        this.fill = fill;
        this.shape = shape;
        this.visible = visible;
        this.type = type;
        this.markerVisibility = markerVisibility;
        this.markerShape = markerShape;
        this.pointIndex = pointIndex;
        this.seriesIndex = seriesIndex;
    }
    return LegendOptions;
}());
export { LegendOptions };
