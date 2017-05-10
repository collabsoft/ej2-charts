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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base/dom", "@syncfusion/ej2-base/util", "../utils/helper", "../model/theme", "../model/constants"], function (require, exports, ej2_base_1, dom_1, util_1, helper_1, theme_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Indexes = (function (_super) {
        __extends(Indexes, _super);
        function Indexes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Indexes;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "point", void 0);
    exports.Indexes = Indexes;
    var Selection = (function () {
        function Selection(chart) {
            this.chart = chart;
            this.renderer = chart.renderer;
        }
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
            this.series = util_1.extend({}, chart.visibleSeries, null, true);
            this.seriesStyles(chart.visibleSeries);
            if (!(chart.selectionMode.indexOf('Drag') > -1)) {
                this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
            }
        };
        Selection.prototype.concatIndexes = function (userIndexes, localIndexes) {
            return userIndexes.concat(localIndexes);
        };
        Selection.prototype.generateStyle = function (series) {
            if (series) {
                return (series.selectionStyle || this.styleId + '_series_' + series.index);
            }
            return 'undefined';
        };
        Selection.prototype.seriesStyles = function (seriesCollection) {
            var seriesclass;
            var style = document.getElementById(this.styleId);
            if (util_1.isNullOrUndefined(style)) {
                style = document.createElement('style');
                style.setAttribute('id', this.styleId);
                for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                    var series = seriesCollection_1[_i];
                    seriesclass = series.selectionStyle || this.styleId + '_series_' + series.index;
                    style.innerHTML += series.selectionStyle ? '' : '.' + seriesclass + ' { } ';
                }
                style.innerHTML += '.' + this.unselected + ' { opacity:' + (seriesCollection[0].opacity / 3) + ';} ';
                document.body.appendChild(style);
            }
        };
        Selection.prototype.selectDataIndex = function (chart, indexes) {
            for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                var index = indexes_1[_i];
                this.performSelection(index, chart, this.getElementByIndex(chart, index));
            }
        };
        Selection.prototype.getElementByIndex = function (chart, index) {
            var elementId = chart.element.id + '_Series_' + index.series + '_Point_' + index.point;
            elementId = (!chart.series[index.series].isRectSeries && chart.series[index.series].type !== 'Scatter' &&
                chart.series[index.series].marker.visible) ? (elementId + '_Symbol') : elementId;
            return document.getElementById(elementId);
        };
        Selection.prototype.getClusterElements = function (chart, index) {
            var clusters = [];
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                index = new Index(series.index, index.point);
                clusters.push(this.getElementByIndex(chart, index));
            }
            return clusters;
        };
        Selection.prototype.findElements = function (chart, series, index) {
            if (this.isSeriesMode) {
                return this.getSeriesElements(series);
            }
            else if (chart.selectionMode === 'Cluster') {
                return this.getClusterElements(chart, index);
            }
            else {
                return [this.getElementByIndex(chart, index)];
            }
        };
        Selection.prototype.calculateSelectedElements = function (chart, event) {
            if (event.target.id.indexOf('_Series_') > -1) {
                this.performSelection(this.indexFinder(event.target.id), chart, event.target);
            }
        };
        Selection.prototype.performSelection = function (index, chart, element) {
            this.isSeriesMode = chart.selectionMode === 'Series';
            this.legendSelectionMode = false;
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
            if (selectedElements[0] && selectedElements[0].classList.contains(this.getSelectionClass(selectedElements[0].id))) {
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
                    (this.chart.selectionMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                    (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                    this.removeStyles(this.findElements(chart, series, index[i]));
                    index.splice(i, 1);
                    i--;
                }
            }
        };
        Selection.prototype.blurEffect = function (chartId, visibleSeries) {
            var visibility = this.checkVibility(this.selectedDataIndexes, this.chart.series);
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                if (series.visible) {
                    this.checkSelectionElements(document.getElementById(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility);
                    if (!util_1.isNullOrUndefined(document.getElementById(chartId + 'SymbolGroup' + series.index))) {
                        this.checkSelectionElements(document.getElementById(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility);
                    }
                }
            }
        };
        Selection.prototype.checkSelectionElements = function (element, className, visibility) {
            var children = (this.isSeriesMode ? [element] : element.childNodes);
            for (var i = 0; i < children.length; i++) {
                if (!children[i].classList.contains(className) && !children[i].parentElement.classList.contains(className) && visibility) {
                    children[i].classList.add(this.unselected);
                }
                else {
                    children[i].classList.remove(this.unselected);
                }
            }
        };
        Selection.prototype.checkVibility = function (selectedIndexes, seriesCollection) {
            var visible = false;
            var uniqueSeries = [];
            for (var _i = 0, selectedIndexes_1 = selectedIndexes; _i < selectedIndexes_1.length; _i++) {
                var index = selectedIndexes_1[_i];
                if (uniqueSeries.indexOf(index.series) === -1) {
                    uniqueSeries.push(index.series);
                }
            }
            for (var _a = 0, uniqueSeries_1 = uniqueSeries; _a < uniqueSeries_1.length; _a++) {
                var index = uniqueSeries_1[_a];
                if (seriesCollection[index].visible) {
                    visible = true;
                    break;
                }
            }
            return visible;
        };
        Selection.prototype.applyStyles = function (elements) {
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                if (element) {
                    element.parentElement.classList.remove(this.unselected);
                    element.classList.remove(this.unselected);
                    element.classList.add(this.getSelectionClass(element.id));
                }
            }
        };
        Selection.prototype.getSelectionClass = function (id) {
            return this.generateStyle(this.chart.series[this.indexFinder(id).series]);
        };
        Selection.prototype.removeStyles = function (elements) {
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var element = elements_2[_i];
                if (element) {
                    element.classList.remove(this.getSelectionClass(element.id));
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
            return ((first.series === second.series || (this.chart.selectionMode === 'Cluster' && !checkSeriesOnly))
                && (checkSeriesOnly || (first.point === second.point)));
        };
        Selection.prototype.redrawSelection = function (chart, oldMode) {
            this.isSeriesMode = oldMode === 'Series';
            var selectedDataIndexes = util_1.extend([], this.selectedDataIndexes, null, true);
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
                    this.isSeriesMode = chart.selectionMode === 'Series' || this.legendSelectionMode;
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
                this.legendSelectionMode = true;
                isBlurEffectNeeded = this.selectedDataIndexes.length === 0;
                this.selection(chart, new Index(series, NaN), seriesElements);
                if (isBlurEffectNeeded) {
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
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
            return new Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
        };
        Selection.prototype.calculateDragSelectedElements = function (chart, dragRect) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            var rect = new helper_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            var axisOffset = new helper_1.ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
            this.removeOffset(rect, axisOffset);
            var points;
            var index;
            var selectedPointValues = [];
            var selectedSeriesValues = [];
            this.isSeriesMode = false;
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    points = series.points;
                    selectedPointValues = [];
                    var xAxisOffset = series.xAxis.rect.x - axisOffset.x;
                    var yAxisOffset = series.yAxis.rect.y - axisOffset.y;
                    for (var j = 0; j < points.length; j++) {
                        if (points[j].symbolLocation && helper_1.withInBounds(points[j].symbolLocation.x + xAxisOffset, points[j].symbolLocation.y + yAxisOffset, rect)) {
                            index = new Index(series.index, points[j].index);
                            this.selection(chart, index, this.findElements(chart, series, index));
                            selectedPointValues.push({ x: points[j].xValue.toString(), y: points[j].yValue });
                        }
                    }
                    selectedSeriesValues.push(selectedPointValues);
                }
            }
            this.blurEffect(chart.element.id, chart.visibleSeries);
            this.rectPoints = new helper_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            this.createCloseButton((dragRect.x + dragRect.width), dragRect.y);
            var args = {
                name: constants_1.dragComplete,
                selectedDataValues: selectedSeriesValues,
                cancel: false
            };
            chart.trigger(constants_1.dragComplete, args);
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
            var element = document.getElementById(this.draggedRect);
            if (this.closeIcon) {
                this.closeIcon.remove();
            }
            if (element) {
                this.setAttributes(element, dragRect);
            }
            else {
                var dragGroup = this.renderer.createGroup({ id: this.draggedRectGroup });
                chart.svgObject.appendChild(dragGroup);
                element = this.renderer.drawRectangle(new helper_1.RectOption(this.draggedRect, theme_1.Theme.selectionRectFill, { color: theme_1.Theme.selectionRectStroke, width: 1 }, 1, dragRect));
                element.setAttribute('style', 'cursor:move;');
                dragGroup.appendChild(element);
            }
        };
        Selection.prototype.createCloseButton = function (x, y) {
            var closeIcon = this.renderer.createGroup({
                id: this.closeIconId,
                style: 'cursor:pointer; visibility: visible;'
            });
            closeIcon.appendChild(this.renderer.drawCircle(new helper_1.CircleOption(this.closeIconId + '_circle', '#FFFFFF', { color: theme_1.Theme.selectionRectStroke, width: 1 }, 1, x, y, 10)));
            var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
                ' L ' + (x + 4) + ' ' + (y - 4);
            closeIcon.appendChild(this.renderer.drawPath({
                id: this.closeIconId + '_cross', d: direction, stroke: theme_1.Theme.selectionRectStroke,
                'stroke-width': 2, fill: theme_1.Theme.selectionRectStroke
            }));
            this.closeIcon = closeIcon;
            document.getElementById(this.draggedRectGroup).appendChild(closeIcon);
        };
        Selection.prototype.removeDraggedElements = function (chart, event) {
            if ((event.target.id.indexOf(this.closeIconId) > -1) && (event.type.indexOf('move') === -1)) {
                this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
                this.blurEffect(chart.element.id, chart.visibleSeries);
                dom_1.remove(document.getElementById(this.draggedRectGroup));
                this.changeCursorStyle(false, chart.svgObject, 'auto');
                this.rectPoints = null;
            }
        };
        Selection.prototype.resizingSelectionRect = function (chart, location, tapped) {
            var rect = new helper_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            var resize = this.findResizeMode(chart.svgObject, rect, location);
            if (this.resizing) {
                rect = helper_1.getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
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
                var resizeEdges = [new helper_1.Rect(rect.x, (rect.y - 10), rect.width - 5, 20),
                    new helper_1.Rect((rect.x - 10), rect.y, 20, rect.height),
                    new helper_1.Rect(rect.x, (rect.y + rect.height - 10), rect.width - 10, 20),
                    new helper_1.Rect((rect.x + rect.width - 10), rect.y + 5, 20, rect.height - 15),
                    new helper_1.Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 20, 20)];
                for (var i = 0; i < resizeEdges.length; i++) {
                    if (helper_1.withInBounds(location.x, location.y, resizeEdges[i])) {
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
            this.changeCursorStyle(resize, document.getElementById(this.draggedRect), cursorStyle);
            this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
            return resize;
        };
        Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
            cursorStyle = isResize ? cursorStyle : (this.chart.svgObject === rectelement) ? 'auto' : 'move';
            rectelement.setAttribute('style', 'cursor:' + cursorStyle + ';');
        };
        Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
            index.splice(0, index.length);
            var seriesElements;
            for (var _i = 0, seriesCollection_2 = seriesCollection; _i < seriesCollection_2.length; _i++) {
                var series = seriesCollection_2[_i];
                seriesElements = this.getSeriesElements(series);
                this.removeStyles(seriesElements);
                for (var _a = 0, seriesElements_2 = seriesElements; _a < seriesElements_2.length; _a++) {
                    var seriesElement = seriesElements_2[_a];
                    this.removeStyles(this.getChildren(seriesElement));
                }
            }
        };
        Selection.prototype.getChildren = function (parent) {
            var children = [];
            for (var i = 0; i < parent.childNodes.length; i++) {
                if (parent.childNodes[i].tagName !== 'defs') {
                    children.push(parent.childNodes[i]);
                }
            }
            return children;
        };
        Selection.prototype.setAttributes = function (ele, object) {
            var keys = Object.keys(object);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                ele.setAttribute(key, object[key]);
            }
        };
        Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing) {
            var rect = new helper_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            rect.x -= (grabbedPoint.x - chart.mouseX);
            rect.y -= (grabbedPoint.y - chart.mouseY);
            rect = helper_1.getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
            if (doDrawing) {
                this.drawDraggingRect(chart, rect);
            }
            else {
                this.calculateDragSelectedElements(chart, rect);
            }
        };
        Selection.prototype.completeSelection = function (chart, e) {
            if ((this.dragging || this.resizing) && this.dragRect.width && this.dragRect.height) {
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
            return helper_1.getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
        };
        Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
            this.dragging = (chart.selectionMode.indexOf('Drag') > -1) && (chart.isDoubleTap || !chart.isTouch);
            if (this.dragging) {
                this.dragRect = new helper_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                    chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                    this.dragging = false;
                }
            }
            if (this.rectPoints) {
                this.dragRect = new helper_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                this.resizingSelectionRect(chart, new helper_1.ChartLocation(mouseDownX, mouseDownY), true);
                this.rectGrabbing = helper_1.withInBounds(mouseDownX, mouseDownY, this.rectPoints);
            }
        };
        Selection.prototype.mouseMove = function (chart, event) {
            var insideMoving = helper_1.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
            if (insideMoving) {
                if (this.rectGrabbing && !this.resizing) {
                    this.draggedRectMoved(chart, this.dragRect, true);
                }
                else if (this.dragging && !this.resizing) {
                    this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                    this.drawDraggingRect(chart, this.dragRect);
                }
                if (this.rectPoints) {
                    this.resizingSelectionRect(chart, new helper_1.ChartLocation(chart.mouseX, chart.mouseY));
                }
            }
            else {
                this.completeSelection(chart, event);
            }
        };
        Selection.prototype.getModuleName = function () {
            return 'Selection';
        };
        Selection.prototype.destroy = function (chart) {
        };
        return Selection;
    }());
    exports.Selection = Selection;
    var Index = (function () {
        function Index(seriesIndex, pointIndex) {
            this.series = seriesIndex;
            this.point = pointIndex;
        }
        return Index;
    }());
    exports.Index = Index;
});
