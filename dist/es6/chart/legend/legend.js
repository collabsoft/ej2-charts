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
import { createElement, remove } from '@syncfusion/ej2-base/dom';
import { extend } from '@syncfusion/ej2-base/util';
import { legendRender } from '../model/constants';
import { Font, Border } from '../model/base';
import { Theme } from '../model/theme';
import { Size, Rect, subtractThickness, Thickness, drawSymbol, measureText, ChartLocation, PathOption } from '../utils/helper';
import { RectOption, TextOption, textElement, textTrim, stringToNumber } from '../utils/helper';
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
var Legend = (function () {
    function Legend(chart) {
        this.rowCount = 0;
        this.columnCount = 0;
        this.pageButtonSize = 8;
        this.pageXCollection = [];
        this.isTrimmed = false;
        this.maxWidth = 0;
        this.currentPage = 1;
        this.chart = chart;
        this.legend = chart.legendSettings;
        this.legendID = chart.element.id + '_chart_legend';
    }
    Legend.prototype.getLegendOptions = function (visibleSeriesCollection) {
        this.legendCollections = [];
        for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
            var series = visibleSeriesCollection_1[_i];
            this.legendCollections.push(new LegendOptions(series));
        }
    };
    Legend.prototype.calculateLegendBounds = function (rect, areaType, availableSize) {
        var legend = this.legend;
        var position = (legend.position !== 'Auto') ? legend.position : (areaType === 'None' ? 'Right' : 'Bottom');
        this.legendBounds = new Rect(rect.x, rect.y, 0, 0);
        this.isVertical = (position === 'Left' || position === 'Right');
        if (this.isVertical) {
            this.legendBounds.height = stringToNumber(legend.height, availableSize.height) ||
                (rect.height + rect.y - this.chart.margin.top);
            this.legendBounds.width = stringToNumber(legend.width || '20%', availableSize.width);
        }
        else {
            this.legendBounds.width = stringToNumber(legend.width, availableSize.width) || rect.width;
            this.legendBounds.height = stringToNumber(legend.height || '20%', availableSize.height);
        }
        this.getLegendBounds(availableSize, this.legendBounds, legend);
        this.getLocation(position, legend.alignment, this.legendBounds, rect, availableSize);
    };
    Legend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
        var padding = legend.padding;
        var extraHeight = 0;
        var extraWidth = 0;
        if (!this.isVertical) {
            extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
        }
        else {
            extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
        }
        legendBounds.height += extraHeight;
        legendBounds.width += extraWidth;
        var shapeHeight = legend.shapeHeight;
        var shapeWidth = legend.shapeWidth;
        var shapePadding = legend.shapePadding;
        var maximumWidth = 0;
        var rowWidth = 0;
        var legendWidth = 0;
        var columnHeight = 0;
        var rowCount = 0;
        var legendEventArgs;
        this.maxitemHeight = Math.max(measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
        var render = false;
        for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
            var legendOption = _a[_i];
            legendEventArgs = { fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                markerShape: legendOption.markerShape, name: legendRender, cancel: false };
            this.chart.trigger(legendRender, legendEventArgs);
            legendOption.render = !legendEventArgs.cancel;
            legendOption.text = legendEventArgs.text;
            legendOption.fill = legendEventArgs.fill;
            legendOption.shape = legendEventArgs.shape;
            legendOption.markerShape = legendEventArgs.markerShape;
            legendOption.textSize = measureText(legendOption.text, legend.textStyle);
            if (legendOption.render && legendOption.text !== '') {
                render = true;
                legendWidth = shapeWidth + shapePadding + legendOption.textSize.width + padding;
                rowWidth = rowWidth + legendWidth;
                if (legendBounds.width < (padding + rowWidth) || this.isVertical) {
                    maximumWidth = Math.max(maximumWidth, (rowWidth + padding - (this.isVertical ? 0 : legendWidth)));
                    if (rowCount === 0 && (legendWidth !== rowWidth)) {
                        rowCount = 1;
                    }
                    rowWidth = this.isVertical ? 0 : legendWidth;
                    rowCount++;
                    columnHeight = (rowCount * (this.maxitemHeight + padding)) + padding;
                }
            }
        }
        columnHeight = Math.max(columnHeight, (this.maxitemHeight + padding) + padding);
        this.isPaging = legendBounds.height < columnHeight;
        this.totalpages = rowCount;
        if (render) {
            this.setbounds(Math.max((rowWidth + padding), maximumWidth), legend, columnHeight, legendBounds);
        }
        else {
            this.setbounds(0, legend, 0, legendBounds);
        }
    };
    Legend.prototype.setbounds = function (computedWidth, legend, computedHeight, legendBounds) {
        computedWidth = computedWidth < legendBounds.width ? computedWidth : legendBounds.width;
        computedHeight = computedHeight < legendBounds.height ? computedHeight : legendBounds.height;
        legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
        legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
        this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding) / (this.maxitemHeight + legend.padding)));
    };
    Legend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize) {
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
    Legend.prototype.alignLegend = function (start, size, legendSize, alignment) {
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
    Legend.prototype.renderLegend = function (chart, legend, legendBounds) {
        var firstLegend = this.findFirstLegendPosition(this.legendCollections);
        var padding = legend.padding;
        this.maxitemHeight = Math.max(this.legendCollections[0].textSize.height, legend.shapeHeight);
        var legendGroup = chart.renderer.createGroup({ id: this.legendID + '_g' });
        var legendTranslateGroup = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID);
        if (firstLegend !== this.legendCollections.length) {
            var legendSeriesGroup = void 0;
            var start = void 0;
            start = new ChartLocation(legendBounds.x + padding + (legend.shapeWidth / 2), legendBounds.y + padding + this.maxitemHeight / 2);
            var textOptions = new TextOption('', start.x, start.y, 'start');
            this.maxsize = 0;
            var textPadding = legend.shapePadding + padding + legend.shapeWidth;
            var count = 0;
            this.pageXCollection[0] = 0;
            this.legendCollections[firstLegend].location = start;
            var previousLegend = this.legendCollections[firstLegend];
            for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                var legendOption = _a[_i];
                if (legendOption.render && legendOption.text !== '') {
                    legendSeriesGroup = chart.renderer.createGroup({ id: this.legendID + '_series_' + count });
                    legendSeriesGroup.setAttribute('tabindex', legend.tabIndex.toString());
                    legendSeriesGroup.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
                    this.getRenderPoint(legendOption, start.x, textPadding, previousLegend, legendBounds, count, firstLegend);
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
    Legend.prototype.findFirstLegendPosition = function (legendCollection) {
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
    Legend.prototype.createLegendElements = function (chart, legendBounds, legendGroup, legend, id) {
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
        this.clipRect = chart.renderer.drawRectangle(options);
        clippath.appendChild(this.clipRect);
        chart.svgObject.appendChild(clippath);
        legendItemsGroup.setAttribute('style', 'clip-path:url(#' + clippath.id + ')');
        return this.legendTranslateGroup;
    };
    Legend.prototype.getRenderPoint = function (legendOption, x, textPadding, prevLegend, rect, count, firstLegend) {
        var padding = this.legend.padding;
        var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
        if ((previousBound + (legendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
            this.isVertical) {
            legendOption.location.x = x;
            legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                prevLegend.location.y + this.maxitemHeight + padding;
        }
        else {
            legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
            legendOption.location.y = prevLegend.location.y;
        }
        var availwidth = (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
            textPadding - this.legend.shapeWidth / 2);
        legendOption.text = textTrim(availwidth, legendOption.text, this.legend.textStyle);
    };
    Legend.prototype.renderSymbol = function (legendOption, group, i) {
        var symbolColor = legendOption.visible ? legendOption.fill : '#D3D3D3';
        var shape = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
        shape = shape === 'Scatter' ? legendOption.markerShape : shape;
        var symbolOption = new PathOption(this.legendID + '_shape_series_' + i, symbolColor, 1, symbolColor, 1, '', '');
        group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth, this.legend.shapeHeight), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image') {
            symbolOption.id = this.legendID + '_shape_series_marker' + i;
            shape = legendOption.markerShape;
            group.appendChild(drawSymbol(legendOption.location, shape, new Size(this.legend.shapeWidth / 3, this.legend.shapeHeight / 2), '', symbolOption, 'Click to show or hide the ' + legendOption.text + ' series'));
        }
    };
    Legend.prototype.renderText = function (chart, legendOption, group, textOptions, i) {
        var legend = chart.legendSettings;
        var hiddenColor = '#D3D3D3';
        textOptions.id = this.legendID + '_text_series_' + i;
        var fontcolor = legendOption.visible ? legend.textStyle.color : hiddenColor;
        textOptions.text = legendOption.text;
        textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
        textOptions.y = legendOption.location.y + this.maxitemHeight / 4;
        var element = textElement(textOptions, legend.textStyle, fontcolor, group);
        element.setAttribute('aria-label', legend.description || 'Click to show or hide the ' + legendOption.text + ' series');
    };
    Legend.prototype.renderPagingElements = function (chart, bounds, textOption, legendGroup) {
        var paginggroup = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
        legendGroup.appendChild(paginggroup);
        var grayColor = '#545454';
        var legend = chart.legendSettings;
        var padding = legend.padding;
        this.totalpages = Math.ceil(this.totalpages / Math.max(1, this.rowCount - 1));
        var symbolOption = new PathOption(this.legendID + '_pageup', 'transparent', 2, grayColor, 1, '', '');
        var iconSize = this.pageButtonSize;
        paginggroup.setAttribute('style', 'cursor: pointer');
        this.clipPathHeight = (this.rowCount - 1) * (this.maxitemHeight + padding);
        this.clipRect.setAttribute('height', this.clipPathHeight.toString());
        var x = bounds.x + iconSize / 2;
        var y = bounds.y + this.clipPathHeight + ((bounds.height - this.clipPathHeight) / 2);
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'LeftArrow', new Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
        textOption.x = x + (iconSize / 2) + legend.padding;
        var size = measureText(this.totalpages + '/' + this.totalpages, legend.textStyle);
        textOption.y = y + (size.height / 4);
        textOption.id = this.legendID + '_pagenumber';
        textOption.text = '1/' + this.totalpages;
        var pageTextElement = textElement(textOption, legend.textStyle, legend.textStyle.color, paginggroup);
        x = (textOption.x + legend.padding + (iconSize / 2) + size.width);
        symbolOption.id = this.legendID + '_pagedown';
        paginggroup.appendChild(drawSymbol({ x: x, y: y }, 'RightArrow', new Size(iconSize, iconSize), '', symbolOption, 'RightArrow'));
        paginggroup.setAttribute('transform', 'translate(' + (bounds.width - (2 * (iconSize + legend.padding) +
            legend.padding + size.width)) + ', ' + 0 + ')');
        this.translatePage(pageTextElement, this.currentPage - 1, this.currentPage);
    };
    Legend.prototype.showText = function (event, seriesIndex, x, y) {
        var series = this.chart.series[seriesIndex];
        var id = 'EJ2_legend_tooltip';
        var tooltip = document.getElementById(id);
        if (!tooltip) {
            tooltip = createElement('div', {
                id: id,
                innerHTML: series.name,
                styles: 'top:' + (y + 10).toString() + 'px;left:' + (x + 10).toString() + 'px;background:white;' +
                    'position:fixed;border:1px solid ' + series.interior + ';',
            });
            document.body.appendChild(tooltip);
        }
    };
    Legend.prototype.removeText = function () {
        var tooltip = document.getElementById('EJ2_legend_tooltip');
        if (tooltip) {
            document.body.removeChild(tooltip);
        }
    };
    Legend.prototype.changePage = function (event, pageUp) {
        var pageText = document.getElementById(this.legendID + '_pagenumber');
        var page = parseInt(pageText.textContent.split('/')[0], 10);
        if (pageUp && page > 1) {
            this.translatePage(pageText, (page - 2), (page - 1));
        }
        else if (!pageUp && page < this.totalpages) {
            this.translatePage(pageText, page, (page + 1));
        }
    };
    Legend.prototype.translatePage = function (pagingText, page, pagenumber) {
        var height = (this.clipPathHeight) * page;
        var translate = 'translate(0,-' + height + ')';
        this.legendTranslateGroup.setAttribute('transform', translate);
        pagingText.textContent = (pagenumber) + '/' + this.totalpages;
        this.currentPage = pagenumber;
    };
    Legend.prototype.LegendClick = function (seriesIndex) {
        var chart = this.chart;
        var series = chart.visibleSeries[seriesIndex];
        var legend = this.legendCollections[seriesIndex];
        var selectedDataIndexes = [];
        if (chart.selectionModule) {
            selectedDataIndexes = extend([], chart.selectionModule.selectedDataIndexes, null, true);
        }
        if (chart.legendSettings.toggleVisibility) {
            if (!series.visible) {
                series.visible = true;
            }
            else {
                series.visible = false;
            }
            legend.visible = (series.visible);
            chart.loaded = null;
            if (chart.svgObject.childNodes.length > 0) {
                while (chart.svgObject.lastChild) {
                    chart.svgObject.removeChild(chart.svgObject.lastChild);
                }
                remove(chart.svgObject);
            }
            chart.animateSeries = false;
            chart.removeSvg();
            chart.refreshAxis();
            series.refreshAxisLabel();
            this.refreshSeries(chart.visibleSeries);
            chart.refreshBound();
            if (selectedDataIndexes.length > 0) {
                chart.selectionModule.selectedDataIndexes = selectedDataIndexes;
                chart.selectionModule.redrawSelection(chart, chart.selectionMode);
            }
        }
        else if (chart.selectionModule) {
            chart.selectionModule.legendSelection(chart, seriesIndex);
        }
    };
    Legend.prototype.refreshSeries = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            series.position = undefined;
        }
    };
    Legend.prototype.click = function (event) {
        var targetId = event.target.id;
        var legendItemsId = [this.legendID + '_text_series_', this.legendID + '_shape_series_marker',
            this.legendID + '_shape_series_'];
        var seriesIndex;
        for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
            var id = legendItemsId_1[_i];
            if (targetId.indexOf(id) > -1) {
                seriesIndex = parseInt(targetId.split(id)[1], 10);
                this.LegendClick(seriesIndex);
            }
        }
        if (targetId.indexOf(this.legendID + '_pageup') > -1) {
            this.changePage(event, true);
        }
        else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
            this.changePage(event, false);
        }
    };
    Legend.prototype.move = function (event, x, y) {
        if (event.target.textContent.indexOf('...') > -1) {
            var targetId = event.target.id;
            var seriesIndex = parseInt(targetId.split(this.legendID + '_text_series_')[1], 10);
            if (!isNaN(seriesIndex)) {
                this.showText(event, seriesIndex, x, y);
            }
        }
        else {
            this.removeText();
        }
    };
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    Legend.prototype.destroy = function (chart) {
    };
    return Legend;
}());
export { Legend };
var LegendOptions = (function () {
    function LegendOptions(series) {
        this.location = { x: 0, y: 0 };
        this.text = series.name;
        this.fill = series.interior;
        this.shape = series.legendShape;
        this.visible = (series.visible);
        this.markerVisibility = series.marker.visible;
        this.type = series.type;
        this.markerShape = series.marker.shape;
    }
    return LegendOptions;
}());
export { LegendOptions };
