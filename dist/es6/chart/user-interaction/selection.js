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
import { Browser } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ChartLocation, Rect, RectOption, CircleOption, withInBounds, getDraggedRectLocation, removeElement, getElement } from '../../common/utils/helper';
import { Index } from '../../common/model/base';
import { Theme } from '../../common/model/theme';
import { dragComplete } from '../../common/model/constants';
import { BaseSelection } from '../../common/selection/selection';
var Selection = (function (_super) {
    __extends(Selection, _super);
    function Selection(chart) {
        var _this = _super.call(this, chart) || this;
        _this.chart = chart;
        _this.renderer = chart.renderer;
        _this.addEventListener();
        return _this;
    }
    Selection.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.chart.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.chart.on(cancelEvent, this.completeSelection, this);
        this.chart.on('click', this.calculateSelectedElements, this);
        this.chart.on(Browser.touchStartEvent, this.mousedown, this);
        this.chart.on(Browser.touchEndEvent, this.completeSelection, this);
    };
    Selection.prototype.mousedown = function (e) {
        var chart = this.chart;
        if (chart.selectionMode === 'None' || chart.isChartDrag) {
            return;
        }
        if (chart.isDoubleTap || !chart.isTouch || this.rectPoints) {
            this.dragStart(chart, chart.chartAxisLayoutPanel.seriesClipRect, chart.mouseDownX, chart.mouseDownY, e);
        }
    };
    Selection.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMove);
        this.chart.off('pointerleave' || 'mouseleave', this.completeSelection);
        this.chart.off('click', this.calculateSelectedElements);
        this.chart.off(Browser.touchStartEvent, this.mousedown);
        this.chart.off(Browser.touchEndEvent, this.completeSelection);
    };
    Selection.prototype.initPrivateVariables = function (chart) {
        this.styleId = chart.element.id + '_ej2_chart_selection';
        this.unselected = chart.element.id + '_ej2_deselected';
        this.closeIconId = chart.element.id + '_ej2_drag_close';
        this.draggedRectGroup = chart.element.id + '_ej2_drag_group';
        this.draggedRect = chart.element.id + '_ej2_drag_rect';
        this.selectedDataIndexes = [];
        this.rectPoints = null;
        this.isSeriesMode = chart.selectionMode === 'Series';
    };
    Selection.prototype.invokeSelection = function (chart) {
        this.initPrivateVariables(chart);
        this.series = extend({}, chart.visibleSeries, null, true);
        this.seriesStyles();
        if (!(chart.selectionMode.indexOf('Drag') > -1)) {
            this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
        }
    };
    Selection.prototype.generateStyle = function (series) {
        if (series) {
            return (series.selectionStyle || this.styleId + '_series_' + series.index);
        }
        return 'undefined';
    };
    Selection.prototype.selectDataIndex = function (chart, indexes) {
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            this.performSelection(index, chart, this.getElementByIndex(chart, index)[0]);
        }
    };
    Selection.prototype.getElementByIndex = function (chart, index, suffix) {
        if (suffix === void 0) { suffix = ''; }
        var elementId = chart.element.id + '_Series_' + index.series + '_Point' + '_' + index.point;
        var series = chart.series[index.series];
        elementId = (!series.isRectSeries && series.type !== 'Scatter' && series.type !== 'Bubble' &&
            series.marker.visible) ? (elementId + '_Symbol' + suffix) : elementId;
        return [getElement(elementId), (series.type === 'RangeArea' && series.marker.visible) ? getElement(elementId + '1') : null];
    };
    Selection.prototype.getClusterElements = function (chart, index) {
        var clusters = [];
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            index = new Index(series.index, index.point);
            clusters.push(this.getElementByIndex(chart, index)[0]);
        }
        return clusters;
    };
    Selection.prototype.findElements = function (chart, series, index, suffix) {
        if (suffix === void 0) { suffix = ''; }
        if (this.isSeriesMode) {
            return this.getSeriesElements(series);
        }
        else if (chart.selectionMode === 'Cluster') {
            return this.getClusterElements(chart, index);
        }
        else {
            return this.getElementByIndex(chart, index, suffix);
        }
    };
    Selection.prototype.calculateSelectedElements = function (event) {
        if (this.chart.selectionMode === 'None' || event.target.id.indexOf(this.chart.element.id + '_') === -1) {
            return;
        }
        if (event.target.id.indexOf('_Series_') > -1) {
            this.performSelection(this.indexFinder(event.target.id), this.chart, event.target);
        }
    };
    Selection.prototype.performSelection = function (index, chart, element) {
        this.isSeriesMode = chart.selectionMode === 'Series';
        if (chart.series[index.series].type === 'BoxAndWhisker' &&
            element.id === chart.element.id + '_Series_' + index.series + '_Point_' + index.point + '_BoxPath') {
            element = element.parentElement;
        }
        switch (chart.selectionMode) {
            case 'Series':
                this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                this.blurEffect(chart.element.id, chart.visibleSeries);
                break;
            case 'Point':
                if (!isNaN(index.point)) {
                    this.selection(chart, index, [element]);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
            case 'Cluster':
                if (!isNaN(index.point)) {
                    this.clusterSelection(chart, chart.series, index);
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
                break;
        }
    };
    Selection.prototype.selection = function (chart, index, selectedElements) {
        if (!chart.isMultiSelect && (chart.selectionMode.indexOf('Drag') === -1)) {
            this.removeMultiSelectEelments(chart, this.selectedDataIndexes, index, chart.series);
        }
        var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
        if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
            this.removeStyles(selectedElements);
            this.addOrRemoveIndex(this.selectedDataIndexes, index);
        }
        else {
            this.applyStyles(selectedElements);
            this.addOrRemoveIndex(this.selectedDataIndexes, index, true);
        }
    };
    Selection.prototype.clusterSelection = function (chart, series, index) {
        this.selection(chart, index, this.getClusterElements(chart, new Index(index.series, index.point)));
    };
    Selection.prototype.removeMultiSelectEelments = function (chart, index, currentIndex, seriesCollection) {
        var series;
        for (var i = 0; i < index.length; i++) {
            series = seriesCollection[index[i].series];
            if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                (this.control.selectionMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                this.removeStyles(this.findElements(chart, series, index[i]));
                index.splice(i, 1);
                i--;
            }
        }
    };
    Selection.prototype.blurEffect = function (chartId, visibleSeries) {
        var visibility = this.checkVisibility(this.selectedDataIndexes);
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (series.visible) {
                this.checkSelectionElements(getElement(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility);
                if (!isNullOrUndefined(getElement(chartId + 'SymbolGroup' + series.index))) {
                    this.checkSelectionElements(getElement(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility);
                }
            }
        }
    };
    Selection.prototype.checkSelectionElements = function (element, className, visibility) {
        var children = (this.isSeriesMode ? [element] : element.childNodes);
        var elementClassName;
        var parentClassName;
        for (var i = 0; i < children.length; i++) {
            elementClassName = children[i].getAttribute('class') || '';
            parentClassName = children[i].parentNode.getAttribute('class') || '';
            if (elementClassName.indexOf(className) === -1 &&
                parentClassName.indexOf(className) === -1 && visibility) {
                this.addSvgClass(children[i], this.unselected);
            }
            else {
                this.removeSvgClass(children[i], this.unselected);
            }
        }
    };
    Selection.prototype.applyStyles = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element) {
                this.removeSvgClass(element.parentNode, this.unselected);
                this.removeSvgClass(element, this.unselected);
                this.addSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    Selection.prototype.getSelectionClass = function (id) {
        return this.generateStyle(this.control.series[this.indexFinder(id).series]);
    };
    Selection.prototype.removeStyles = function (elements) {
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            if (element) {
                this.removeSvgClass(element, this.getSelectionClass(element.id));
            }
        }
    };
    Selection.prototype.addOrRemoveIndex = function (indexes, index, add) {
        for (var i = 0; i < indexes.length; i++) {
            if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                indexes.splice(i, 1);
                i--;
            }
        }
        if (add) {
            indexes.push(index);
        }
    };
    Selection.prototype.toEquals = function (first, second, checkSeriesOnly) {
        return ((first.series === second.series || (this.control.selectionMode === 'Cluster' && !checkSeriesOnly))
            && (checkSeriesOnly || (first.point === second.point)));
    };
    Selection.prototype.redrawSelection = function (chart, oldMode) {
        this.isSeriesMode = oldMode === 'Series';
        var selectedDataIndexes = extend([], this.selectedDataIndexes, null, true);
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.selectDataIndex(chart, selectedDataIndexes);
    };
    Selection.prototype.legendSelection = function (chart, series) {
        var seriesStyle = this.generateStyle(chart.visibleSeries[series]);
        var selectedElements = document.getElementsByClassName(seriesStyle);
        this.isSeriesMode = chart.selectionMode === 'Series';
        var isBlurEffectNeeded = true;
        if (selectedElements.length > 0) {
            var elements = [];
            for (var i = 0; i < selectedElements.length; i++) {
                elements.push(selectedElements[i]);
            }
            this.removeStyles(elements);
            this.isSeriesMode = true;
            this.addOrRemoveIndex(this.selectedDataIndexes, new Index(series, NaN));
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                seriesStyle = this.generateStyle(series_1);
                if (document.getElementsByClassName(seriesStyle).length > 0) {
                    for (var _b = 0, elements_3 = elements; _b < elements_3.length; _b++) {
                        var element = elements_3[_b];
                        this.checkSelectionElements(element, seriesStyle, true);
                    }
                    isBlurEffectNeeded = false;
                    break;
                }
            }
            if (isBlurEffectNeeded) {
                this.isSeriesMode = chart.selectionMode === 'Series';
                this.blurEffect(chart.element.id, chart.visibleSeries);
            }
        }
        else {
            var seriesElements = this.getSeriesElements(chart.visibleSeries[series]);
            for (var _c = 0, seriesElements_1 = seriesElements; _c < seriesElements_1.length; _c++) {
                var seriesElement = seriesElements_1[_c];
                this.checkSelectionElements(seriesElement, seriesStyle, false);
            }
            this.isSeriesMode = true;
            this.selection(chart, new Index(series, NaN), seriesElements);
            this.isSeriesMode = chart.selectionMode === 'Series';
            this.blurEffect(chart.element.id, chart.visibleSeries);
        }
    };
    Selection.prototype.getSeriesElements = function (series) {
        var seriesElements = [series.seriesElement];
        if (series.marker.visible && !series.isRectSeries) {
            seriesElements.push(series.symbolElement);
        }
        return seriesElements;
    };
    Selection.prototype.indexFinder = function (id) {
        var ids = ['NaN', 'NaN'];
        if (id.indexOf('SeriesGroup') > -1) {
            ids = id.split('SeriesGroup');
            ids[0] = ids[1];
        }
        else if (id.indexOf('SymbolGroup') > -1) {
            ids = id.split('SymbolGroup');
            ids[0] = ids[1];
        }
        else if (id.indexOf('_Point_') > -1) {
            ids = id.split('_Series_')[1].split('_Point_');
        }
        else if (id.indexOf('_Series_') > -1) {
            ids[0] = id.split('_Series_')[1];
        }
        return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    };
    Selection.prototype.calculateDragSelectedElements = function (chart, dragRect) {
        this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
        var rect = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        var axisOffset = new ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
        this.removeOffset(rect, axisOffset);
        var points;
        var index;
        var selectedPointValues = [];
        var selectedSeriesValues = [];
        this.isSeriesMode = false;
        var symbolLocation;
        var _loop_1 = function (series) {
            if (series.visible) {
                points = series.points;
                selectedPointValues = [];
                var xAxisOffset_1;
                var yAxisOffset_1;
                if ((chart.isTransposed || series.type.indexOf('Bar') !== -1) &&
                    !(chart.isTransposed && series.type.indexOf('Bar') !== -1)) {
                    xAxisOffset_1 = series.xAxis.rect.y - axisOffset.y;
                    yAxisOffset_1 = series.yAxis.rect.x - axisOffset.x;
                }
                else {
                    xAxisOffset_1 = series.xAxis.rect.x - axisOffset.x;
                    yAxisOffset_1 = series.yAxis.rect.y - axisOffset.y;
                }
                for (var j = 0; j < points.length; j++) {
                    var yValue = series.type !== 'RangeArea' ? points[j].yValue :
                        points[j].regions[0].y;
                    var isCurrentPoint = void 0;
                    if (series.type === 'BoxAndWhisker') {
                        isCurrentPoint = points[j].regions.some(function (region) {
                            return withInBounds(region.x + xAxisOffset_1, region.y + yAxisOffset_1, rect);
                        });
                    }
                    else {
                        isCurrentPoint = points[j].symbolLocations.some(function (location) {
                            return location && withInBounds(location.x + xAxisOffset_1, location.y + yAxisOffset_1, rect);
                        });
                    }
                    if (isCurrentPoint && series.category !== 'Indicator') {
                        index = new Index(series.index, points[j].index);
                        this_1.selection(chart, index, this_1.findElements(chart, series, index));
                        selectedPointValues.push({ x: points[j].xValue.toString(), y: yValue });
                    }
                    if (isCurrentPoint && series.type === 'RangeArea') {
                        selectedPointValues.push({ x: points[j].xValue.toString(), y: points[j].regions[0].y });
                    }
                }
                selectedSeriesValues.push(selectedPointValues);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            _loop_1(series);
        }
        this.blurEffect(chart.element.id, chart.visibleSeries);
        this.rectPoints = new Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
        this.createCloseButton((dragRect.x + dragRect.width), dragRect.y);
        var args = {
            name: dragComplete,
            selectedDataValues: selectedSeriesValues,
            cancel: false
        };
        chart.trigger(dragComplete, args);
    };
    Selection.prototype.removeOffset = function (rect, clip) {
        rect.x -= clip.x;
        rect.y -= clip.y;
    };
    Selection.prototype.drawDraggingRect = function (chart, dragRect) {
        var cartesianLayout = chart.chartAxisLayoutPanel.seriesClipRect;
        switch (chart.selectionMode) {
            case 'DragX':
                dragRect.y = cartesianLayout.y;
                dragRect.height = cartesianLayout.height;
                break;
            case 'DragY':
                dragRect.x = cartesianLayout.x;
                dragRect.width = cartesianLayout.width;
                break;
        }
        if (dragRect.width < 5 || dragRect.height < 5) {
            return null;
        }
        var element = getElement(this.draggedRect);
        if (this.closeIcon) {
            removeElement(this.closeIconId);
        }
        if (element) {
            this.setAttributes(element, dragRect);
        }
        else {
            var dragGroup = this.renderer.createGroup({ id: this.draggedRectGroup });
            chart.svgObject.appendChild(dragGroup);
            element = this.renderer.drawRectangle(new RectOption(this.draggedRect, Theme.selectionRectFill, { color: Theme.selectionRectStroke, width: 1 }, 1, dragRect));
            element.setAttribute('style', 'cursor:move;');
            dragGroup.appendChild(element);
        }
    };
    Selection.prototype.createCloseButton = function (x, y) {
        var closeIcon = this.renderer.createGroup({
            id: this.closeIconId,
            style: 'cursor:pointer; visibility: visible;'
        });
        closeIcon.appendChild(this.renderer.drawCircle(new CircleOption(this.closeIconId + '_circle', '#FFFFFF', { color: Theme.selectionRectStroke, width: 1 }, 1, x, y, 10)));
        var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
            ' L ' + (x + 4) + ' ' + (y - 4);
        closeIcon.appendChild(this.renderer.drawPath({
            id: this.closeIconId + '_cross', d: direction, stroke: Theme.selectionRectStroke,
            'stroke-width': 2, fill: Theme.selectionRectStroke
        }));
        this.closeIcon = closeIcon;
        getElement(this.draggedRectGroup).appendChild(closeIcon);
    };
    Selection.prototype.removeDraggedElements = function (chart, event) {
        if ((event.target.id.indexOf(this.closeIconId) > -1) && (event.type.indexOf('move') === -1)) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            this.blurEffect(chart.element.id, chart.visibleSeries);
            remove(getElement(this.draggedRectGroup));
            this.changeCursorStyle(false, chart.svgObject, 'auto');
            this.rectPoints = null;
        }
    };
    Selection.prototype.resizingSelectionRect = function (chart, location, tapped) {
        var rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        var resize = this.findResizeMode(chart.svgObject, rect, location);
        if (this.resizing) {
            rect = getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
            this.drawDraggingRect(chart, rect);
            this.dragRect = rect;
        }
        if (tapped) {
            this.resizing = resize;
        }
    };
    Selection.prototype.findResizeMode = function (chartSvgObject, rect, location) {
        var cursorStyle = 'se-resize';
        var resize = false;
        if (!this.resizing) {
            var resizeEdges = [new Rect(rect.x, (rect.y - 10), rect.width - 5, 20),
                new Rect((rect.x - 10), rect.y, 20, rect.height),
                new Rect(rect.x, (rect.y + rect.height - 10), rect.width - 10, 20),
                new Rect((rect.x + rect.width - 10), rect.y + 5, 20, rect.height - 15),
                new Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 20, 20)];
            for (var i = 0; i < resizeEdges.length; i++) {
                if (withInBounds(location.x, location.y, resizeEdges[i])) {
                    cursorStyle = (i === 4) ? cursorStyle : (i % 2 === 0) ? 'ns-resize' : 'ew-resize';
                    resize = true;
                    this.resizeMode = i;
                    break;
                }
            }
        }
        else {
            var x = rect.x;
            var y = rect.y;
            var width = (location.x - x);
            var height = (location.y - y);
            switch (this.resizeMode) {
                case 0:
                    height = Math.abs((rect.height + rect.y) - location.y);
                    rect.y = Math.min((rect.height + rect.y), location.y);
                    rect.height = height;
                    break;
                case 1:
                    width = Math.abs((rect.width + rect.x) - location.x);
                    rect.x = Math.min((rect.width + rect.x), location.x);
                    rect.width = width;
                    break;
                case 2:
                    rect.height = Math.abs(height);
                    rect.y = Math.min(location.y, y);
                    break;
                case 3:
                    rect.width = Math.abs(width);
                    rect.x = Math.min(location.x, x);
                    break;
                case 4:
                    rect.width = Math.abs(width);
                    rect.height = Math.abs(height);
                    rect.x = Math.min(location.x, x);
                    rect.y = Math.min(location.y, y);
                    break;
            }
        }
        this.changeCursorStyle(resize, getElement(this.draggedRect), cursorStyle);
        this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
        return resize;
    };
    Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
        cursorStyle = isResize ? cursorStyle : (this.control.svgObject === rectelement) ? 'auto' : 'move';
        rectelement.setAttribute('style', 'cursor:' + cursorStyle + ';');
    };
    Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
        index.splice(0, index.length);
        var seriesElements;
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            seriesElements = this.getSeriesElements(series);
            this.removeStyles(seriesElements);
            for (var _a = 0, seriesElements_2 = seriesElements; _a < seriesElements_2.length; _a++) {
                var seriesElement = seriesElements_2[_a];
                this.removeStyles(this.getChildren(seriesElement));
            }
        }
    };
    Selection.prototype.setAttributes = function (ele, object) {
        var keys = Object.keys(object);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            ele.setAttribute(key, object[key]);
        }
    };
    Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing) {
        var rect = new Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
        rect.x -= (grabbedPoint.x - chart.mouseX);
        rect.y -= (grabbedPoint.y - chart.mouseY);
        rect = getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
        if (doDrawing) {
            this.drawDraggingRect(chart, rect);
        }
        else {
            this.calculateDragSelectedElements(chart, rect);
        }
    };
    Selection.prototype.completeSelection = function (e) {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        if ((this.dragging || this.resizing) && this.dragRect.width > 5 && this.dragRect.height > 5) {
            this.calculateDragSelectedElements(chart, this.dragRect);
        }
        else if (this.rectGrabbing && this.rectPoints.width && this.rectPoints.height) {
            this.draggedRectMoved(chart, this.dragRect);
        }
        this.dragging = false;
        this.rectGrabbing = false;
        this.resizing = false;
        this.removeDraggedElements(chart, e);
    };
    Selection.prototype.getDragRect = function (chart, seriesClipRect) {
        return getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
    };
    Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
        this.dragging = (chart.selectionMode.indexOf('Drag') > -1) && (chart.isDoubleTap || !chart.isTouch) &&
            chart.chartAreaType !== 'PolarRadar';
        if (this.dragging) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                this.dragging = false;
            }
        }
        if (this.rectPoints) {
            this.dragRect = new Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
            this.resizingSelectionRect(chart, new ChartLocation(mouseDownX, mouseDownY), true);
            this.rectGrabbing = withInBounds(mouseDownX, mouseDownY, this.rectPoints);
        }
    };
    Selection.prototype.mouseMove = function (event) {
        var chart = this.chart;
        if (chart.selectionMode === 'None') {
            return;
        }
        if (event.type === 'touchmove' && (Browser.isIos || Browser.isIos7) && this.dragging && event.preventDefault) {
            event.preventDefault();
        }
        var insideMoving = withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
        if (insideMoving) {
            if (this.rectGrabbing && !this.resizing) {
                this.draggedRectMoved(chart, this.dragRect, true);
            }
            else if (this.dragging && !this.resizing) {
                this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                this.drawDraggingRect(chart, this.dragRect);
            }
            if (this.rectPoints) {
                this.resizingSelectionRect(chart, new ChartLocation(chart.mouseX, chart.mouseY));
            }
        }
        else {
            this.completeSelection(event);
        }
    };
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    Selection.prototype.destroy = function (chart) {
        this.removeEventListener();
    };
    return Selection;
}(BaseSelection));
export { Selection };
