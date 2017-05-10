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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base/dom", "@syncfusion/ej2-base/util", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "./utils/helper", "./utils/helper", "./model/theme", "./model/base", "./axis/axis", "./axis/cartesian-panel", "./utils/helper", "./series/chart-series", "./model/data", "./legend/legend", "./user-interaction/selection", "./model/constants"], function (require, exports, ej2_base_1, dom_1, util_1, ej2_base_2, ej2_base_3, helper_1, helper_2, theme_1, base_1, axis_1, cartesian_panel_1, helper_3, chart_series_1, data_1, legend_1, selection_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Chart = (function (_super) {
        __extends(Chart, _super);
        function Chart(options, element) {
            return _super.call(this, options, element) || this;
        }
        Chart.prototype.preRender = function () {
            this.unWireEvents();
            this.initPrivateVariable();
            this.setCulture();
            this.setTheme();
            this.createSvg();
            this.wireEvents();
        };
        Chart.prototype.initPrivateVariable = function () {
            this.animateSeries = true;
            this.horizontalAxes = [];
            this.verticalAxes = [];
            this.renderer = new ej2_base_2.SvgRenderer(this.element.id);
            this.refreshAxis();
            this.refreshDefinition(this.rows);
            this.refreshDefinition(this.columns);
            this.storedPoints = [];
        };
        Chart.prototype.render = function () {
            this.trigger(constants_1.load, { chart: this });
            this.calculateAreaType();
            this.calculateVisibleSeries();
            this.calculateVisibleAxis();
            this.processData();
        };
        Chart.prototype.refreshBound = function () {
            if (this.legendModule && this.legendSettings.visible) {
                this.legendModule.getLegendOptions(this.visibleSeries);
            }
            var isCalculateStacking = false;
            var series;
            for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
                series = this.visibleSeries[i];
                if ((series.type === 'StackingColumn' || series.type === 'StackingArea' ||
                    series.type === 'StackingBar') &&
                    !isCalculateStacking) {
                    series.calculateStackedValue();
                    isCalculateStacking = true;
                }
            }
            this.calculateBounds();
            this.renderElements();
        };
        Chart.prototype.renderElements = function () {
            this.dataLabelCollections = [];
            this.renderBorder();
            this.renderTitle();
            this.renderAreaBorder();
            this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
            this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });
            if (this.areaType === 'CartesianAxes' && this.rows.length > 0 && this.columns.length > 0) {
                this.chartAxisLayoutPanel.renderAxes();
                var tooltipDiv = document.createElement('div');
                tooltipDiv.id = this.element.id + '_Secondary_Element';
                tooltipDiv.setAttribute('style', 'position: relative');
                this.element.appendChild(tooltipDiv);
                if (this.tooltip.enable) {
                    this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
                }
                for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.visible) {
                        helper_1.findClipRect(item);
                        item.renderSeries(this, item.index);
                    }
                }
            }
            var clipRect = this.renderer.drawClipPath({
                'id': this.element.id + '_ChartAreaClipRect_',
                'x': this.chartAxisLayoutPanel.seriesClipRect.x,
                'y': this.chartAxisLayoutPanel.seriesClipRect.y,
                'width': this.chartAxisLayoutPanel.seriesClipRect.width,
                'height': this.chartAxisLayoutPanel.seriesClipRect.height,
                'fill': 'transparent',
                'stroke-width': 1,
                'stroke': 'Gray'
            });
            this.seriesElements.appendChild(clipRect);
            if (this.dataLabelElements.hasChildNodes()) {
                this.seriesElements.appendChild(this.dataLabelElements);
            }
            this.svgObject.appendChild(this.seriesElements);
            if (this.legendModule) {
                this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
            }
            if (!this.tooltip.enable) {
                this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction' }));
            }
            this.element.appendChild(this.svgObject);
            if (this.zoomModule && this.zoomModule.isZoomed) {
                this.zoomModule.applyZoomToolkit(this, this.axisCollections);
            }
            var selectedDataIndexes = [];
            if (this.selectionModule) {
                selectedDataIndexes = util_1.extend([], this.selectionModule.selectedDataIndexes, null, true);
                this.selectionModule.invokeSelection(this);
            }
            if (selectedDataIndexes.length > 0) {
                this.selectionModule.selectedDataIndexes = selectedDataIndexes;
                this.selectionModule.redrawSelection(this, this.selectionMode);
            }
            this.trigger('loaded', { chart: this });
        };
        Chart.prototype.processData = function () {
            var series;
            this.visibleSeriesCount = 0;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                if (!series_1.visible) {
                    this.visibleSeriesCount++;
                    continue;
                }
                series_1.xData = [];
                series_1.yData = [];
                series_1.dataModule = new data_1.Data(this, series_1);
                series_1.points = [];
                series_1.refreshDataManager(this);
            }
            if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length) {
                this.refreshBound();
            }
        };
        Chart.prototype.calculateBounds = function () {
            var padding = 5;
            var margin = this.margin;
            var titleHeight = 0;
            if (this.title) {
                titleHeight = helper_1.measureText(this.title, this.titleStyle).height + padding;
            }
            var top = margin.top + titleHeight + this.chartArea.border.width / 2;
            var left = margin.left;
            var width = this.availableSize.width - left - margin.right - this.border.width;
            var height = this.availableSize.height - top - this.border.width - margin.bottom;
            this.initialClipRect = new helper_3.Rect(left, top, width, height);
            if (this.legendModule) {
                this.legendModule.calculateLegendBounds(this.initialClipRect, this.areaType, this.availableSize);
            }
            this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
        };
        Chart.prototype.calculateAreaType = function () {
            var series = this.series[0];
            if (series) {
                this.requireInvertedAxis = (series.type === 'Bar' || series.type === 'StackingBar');
                this.areaType = this.seriesType(series.type);
            }
            if (this.areaType === 'CartesianAxes') {
                this.chartAxisLayoutPanel = new cartesian_panel_1.CartesianAxisLayoutPanel(this);
            }
        };
        Chart.prototype.seriesType = function (type) {
            if (type === 'Polar') {
                return 'PolarAxes';
            }
            if (type === 'Pie') {
                return 'None';
            }
            return 'CartesianAxes';
        };
        Chart.prototype.calculateVisibleAxis = function () {
            var axis;
            var series;
            var axes = [this.primaryXAxis, this.primaryYAxis];
            axes = axes.concat(this.axes);
            this.axisCollections = [];
            for (var i = 0, len = axes.length; i < len; i++) {
                axis = axes[i];
                axis.series = [];
                axis.labels = [];
                for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                    var series_2 = _a[_i];
                    if (series_2.xAxisName === axis.name || (series_2.xAxisName == null && axis.name === 'primaryXAxis')) {
                        axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
                        series_2.xAxis = axis;
                        axis.series.push(series_2);
                    }
                    else if (series_2.yAxisName === axis.name || (series_2.yAxisName == null && axis.name === 'primaryYAxis')) {
                        axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
                        series_2.yAxis = axis;
                        axis.series.push(series_2);
                    }
                }
                if (axis.orientation != null) {
                    this.axisCollections.push(axis);
                }
            }
            if (this.rows.length > 0 && this.columns.length > 0) {
                this.chartAxisLayoutPanel.measure();
            }
        };
        Chart.prototype.calculateVisibleSeries = function () {
            var series;
            this.visibleSeries = [];
            var colors = this.palettes.length ? this.palettes : theme_1.getSeriesColor(this.theme);
            var count = colors.length;
            for (var i = 0, len = this.series.length; i < len; i++) {
                series = this.series[i];
                series.index = i;
                if (this.areaType === 'PolarAxes' && this.seriesType(series.type) === 'PolarAxes') {
                    this.visibleSeries.push(series);
                }
                else if (this.areaType === 'None' && this.seriesType(series.type) === 'None') {
                    this.visibleSeries.push(series);
                }
                else if (this.areaType === 'CartesianAxes' && this.seriesType(series.type) === 'CartesianAxes') {
                    series.interior = series.fill ? series.fill : colors[i % count];
                    if (this.requireInvertedAxis && series.type !== 'Bar' && series.type !== 'StackingBar') {
                        continue;
                    }
                    if (!this.requireInvertedAxis && (series.type === 'Bar' || series.type === 'StackingBar')) {
                        continue;
                    }
                    this.visibleSeries.push(series);
                }
                this.series[i] = series;
            }
        };
        Chart.prototype.renderTitle = function () {
            if (this.title) {
                var areaBounds = this.chartAxisLayoutPanel.seriesClipRect;
                this.elementSize = helper_1.measureText(this.title, this.titleStyle);
                var options = new helper_1.TextOption(this.element.id + '_ChartTitle', this.availableSize.width / 2, this.margin.top + 3 * (this.elementSize.height / 4), 'middle', this.title);
                var element = helper_2.textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
                element.setAttribute('aria-label', this.description || this.title);
                element.setAttribute('tabindex', this.tabIndex.toString());
            }
        };
        Chart.prototype.renderBorder = function () {
            var width = this.border.width;
            var rect = new helper_2.RectOption(this.element.id + '_ChartBorder', this.background, this.border, 1, new helper_3.Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        };
        Chart.prototype.renderAreaBorder = function () {
            if (this.areaType !== 'CartesianAxes') {
                return;
            }
            var rect = new helper_2.RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border, this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        };
        Chart.prototype.destroy = function () {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.element.classList.remove('e-chart');
        };
        Chart.prototype.getModuleName = function () {
            return 'chart';
        };
        Chart.prototype.getPersistData = function () {
            var keyEntity = ['loaded', 'animationComplete'];
            return this.addOnPersist(keyEntity);
        };
        Chart.prototype.createSvg = function () {
            this.removeSvg();
            this.calculateSize();
            this.offset = this.findPosition(this.element);
            this.svgObject = this.renderer.createSvg({
                id: this.element.id + '_svg',
                width: this.availableSize.width,
                height: this.availableSize.height
            });
        };
        Chart.prototype.calculateSize = function () {
            var containerWidth = this.element.offsetWidth;
            var containerHeight = this.element.offsetHeight;
            var width = helper_2.stringToNumber(this.width, containerWidth) || containerWidth || 600;
            var height = helper_2.stringToNumber(this.height, containerHeight) || containerHeight || 450;
            this.availableSize = new helper_3.Size(width, height);
        };
        Chart.prototype.unWireEvents = function () {
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var startEvent = ej2_base_2.Browser.touchStartEvent;
            var moveEvent = ej2_base_2.Browser.touchMoveEvent;
            var stopEvent = ej2_base_2.Browser.touchEndEvent;
            var wheelEvent = ej2_base_2.Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
            var cancelEvent = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
            ej2_base_3.EventHandler.remove(this.element, moveEvent, this.mouseMove);
            ej2_base_3.EventHandler.remove(this.element, stopEvent, this.mouseEnd);
            ej2_base_3.EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
            ej2_base_3.EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
            ej2_base_3.EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
            ej2_base_3.EventHandler.remove(this.element, wheelEvent, this.chartMouseWheel);
            if (ej2_base_2.Browser.isTouch && this.isOrientation()) {
                ej2_base_3.EventHandler.remove(window, 'orientationchange', this.chartResize);
            }
            else {
                ej2_base_3.EventHandler.remove(window, 'resize', this.chartResize);
            }
        };
        Chart.prototype.findPosition = function (element) {
            var curleft = 0;
            var curtop = 0;
            if (element.offsetParent) {
                do {
                    curleft += element.offsetLeft;
                    curtop += element.offsetTop;
                    element = element.offsetParent;
                } while (element);
                return new helper_2.ChartLocation(curleft, curtop);
            }
            return null;
        };
        Chart.prototype.wireEvents = function () {
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var wheelEvent = ej2_base_2.Browser.info.name === 'mozilla' ? (isIE11Pointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
            var startEvent = ej2_base_2.Browser.touchStartEvent;
            var stopEvent = ej2_base_2.Browser.touchEndEvent;
            var moveEvent = ej2_base_2.Browser.touchMoveEvent;
            var cancelEvent = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.add(this.element, startEvent, this.chartOnMouseDown, this);
            ej2_base_3.EventHandler.add(this.element, moveEvent, this.mouseMove, this);
            ej2_base_3.EventHandler.add(this.element, stopEvent, this.mouseEnd, this);
            ej2_base_3.EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
            ej2_base_3.EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
            ej2_base_3.EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
            ej2_base_3.EventHandler.add(this.element, wheelEvent, this.chartMouseWheel, this);
            if (ej2_base_2.Browser.isTouch && this.isOrientation()) {
                ej2_base_3.EventHandler.add(window, 'orientationchange', this.chartResize, this);
            }
            else {
                ej2_base_3.EventHandler.add(window, 'resize', this.chartResize, this);
            }
            this.longPress = this.longPress.bind(this);
            new ej2_base_2.Touch(this.element, { taphold: this.longPress, tapholdThreshold: 500 });
            this.setStyle(this.element);
        };
        Chart.prototype.chartRightClick = function (event) {
            if (event.buttons === 2 || event.pointerType === 'touch') {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        };
        Chart.prototype.setStyle = function (element) {
            var zooming = this.zoomSettings;
            var disableScroll = zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming ||
                this.selectionMode !== 'None' || this.crosshair.enable;
            element.style.touchAction = disableScroll ? 'none' : 'element';
            element.style.msTouchAction = disableScroll ? 'none' : 'element';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
        };
        Chart.prototype.isOrientation = function () {
            return ('orientation' in window && 'onorientationchange' in window);
        };
        Chart.prototype.longPress = function (e) {
            this.mouseX = e ? (e.originalEvent.changedTouches[0].clientX - this.offset.x) : 0;
            this.mouseY = e ? (e.originalEvent.changedTouches[0].clientY - this.offset.y) : 0;
            this.startMove = true;
            if (this.crosshairModule && helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                if (this.tooltipModule) {
                    this.tooltipModule.tooltip();
                }
                this.crosshairModule.crosshair();
            }
            return false;
        };
        Chart.prototype.chartResize = function (e) {
            var _this = this;
            this.animateSeries = false;
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = setTimeout(function () {
                _this.createSvg();
                _this.refreshAxis();
                _this.refreshBound();
            }, 500);
            return false;
        };
        Chart.prototype.mouseMove = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            var touches = null;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchmove') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                touches = touchArg.touches;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseMove(e, touches);
            return false;
        };
        Chart.prototype.mouseLeave = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchleave') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseLeave(e);
            return false;
        };
        Chart.prototype.chartOnMouseLeave = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.zoomModule) {
                if (this.zoomModule.isZoomed) {
                    this.zoomModule.performZoomRedraw(this);
                }
                this.zoomModule.pinchTarget = null;
                this.zoomModule.touchStartList = [];
                this.zoomModule.touchMoveList = [];
            }
            if (this.tooltip.enable && this.tooltipModule) {
                this.tooltipModule.removeTooltip(true);
            }
            if (this.crosshair.enable && this.crosshairModule) {
                this.crosshairModule.removeCrosshair();
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.completeSelection(this, e);
            }
            this.isChartDrag = false;
            this.isChartDrag = false;
            return false;
        };
        Chart.prototype.chartOnMouseClick = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.click(e);
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.calculateSelectedElements(this, e);
            }
            return false;
        };
        Chart.prototype.chartOnMouseMove = function (e, touches) {
            var element = e.target;
            this.trigger(constants_1.chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
            var zooming = this.zoomModule;
            if (this.isChartDrag && zooming) {
                if (this.isTouch) {
                    zooming.touchMoveList = this.addTouchPointer(zooming.touchMoveList, e, touches);
                    if (this.zoomSettings.enablePinchZooming && zooming.touchMoveList.length > 1
                        && zooming.touchStartList.length > 1) {
                        this.zoomModule.performPinchZooming(e, this);
                    }
                }
                zooming.renderZooming(e, this, this.isTouch);
            }
            if (!this.disableTrackTooltip) {
                if (this.tooltip.enable && this.tooltipModule && !this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                    this.tooltipModule.tooltip();
                }
                if (helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                    if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared && (!this.isTouch || (this.startMove))) {
                        this.tooltipModule.tooltip();
                    }
                    if (this.crosshair.enable && this.crosshairModule && (!this.isTouch || this.startMove)) {
                        this.crosshairModule.crosshair();
                    }
                }
                else {
                    if (this.tooltip.enable && this.tooltipModule && this.tooltip.shared) {
                        this.tooltipModule.removeTooltip();
                    }
                    if (this.crosshair.enable && this.crosshairModule) {
                        this.crosshairModule.removeCrosshair();
                    }
                }
                if (this.selectionMode !== 'None' && this.selectionModule) {
                    this.selectionModule.mouseMove(this, e);
                }
            }
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.move(e, this.mouseX, this.mouseY);
            }
            this.isTouch = false;
            return false;
        };
        Chart.prototype.chartOnMouseDown = function (e) {
            var pageX;
            var pageY;
            var target;
            var touchArg;
            var touches = null;
            var offset = ej2_base_2.Browser.isDevice ? 20 : 30;
            var rect = this.element.getBoundingClientRect();
            var element = e.target;
            this.trigger(constants_1.chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                target = touchArg.target;
                touches = touchArg.touches;
            }
            else {
                this.isTouch = e.pointerType === 'touch';
                pageX = e.clientX;
                pageY = e.clientY;
                target = e.target;
            }
            this.mouseDownX = this.previousMouseMoveX = pageX - rect.left;
            this.mouseDownY = this.previousMouseMoveY = pageY - rect.top;
            if (target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                helper_2.withInBounds(this.previousMouseMoveX, this.previousMouseMoveY, this.chartAxisLayoutPanel.seriesClipRect)) {
                this.isChartDrag = true;
            }
            if (this.isTouch) {
                if (this.zoomModule) {
                    this.zoomModule.touchStartList = this.addTouchPointer(this.zoomModule.touchStartList, e, touches);
                }
                this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                    (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                    (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                    (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                    (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                if (this.isDoubleTap || !this.isTouch || this.selectionModule.rectPoints) {
                    this.selectionModule.dragStart(this, this.chartAxisLayoutPanel.seriesClipRect, this.mouseDownX, this.mouseDownY, e);
                }
            }
            return false;
        };
        Chart.prototype.mouseEnd = function (e) {
            var pageY;
            var pageX;
            var touchArg;
            var rect = this.element.getBoundingClientRect();
            if (e.type === 'touchend') {
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                this.isTouch = true;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                pageY = e.clientY;
                pageX = e.clientX;
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            this.mouseX = pageX - rect.left;
            this.mouseY = pageY - rect.top;
            this.chartOnMouseUp(e);
            return false;
        };
        Chart.prototype.chartOnMouseUp = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.tooltip.enable && this.isTouch && (!this.crosshair.enable)) {
                this.tooltipModule.tooltip();
                this.tooltipModule.removeTooltip();
            }
            if (this.startMove && this.crosshair.enable && this.isTouch) {
                this.crosshairModule.removeCrosshair();
                if (this.tooltip.enable) {
                    this.tooltipModule.removeTooltip();
                }
            }
            var performZoomRedraw = e.target.id.indexOf(this.element.id + '_ZoomOut_') === -1 ||
                e.target.id.indexOf(this.element.id + '_ZoomIn_') === -1;
            if (this.zoomModule && (this.isChartDrag || performZoomRedraw)) {
                this.zoomModule.performZoomRedraw(this);
            }
            this.isChartDrag = false;
            if (this.isTouch) {
                this.threshold = new Date().getTime() + 300;
                if (this.isDoubleTap && helper_2.withInBounds(this.mouseX, this.mouseY, this.chartAxisLayoutPanel.seriesClipRect)
                    && this.zoomModule && this.zoomModule.touchStartList.length === 1 && this.zoomModule.isZoomed) {
                    this.zoomModule.toolkit.reset();
                }
                this.isDoubleTap = false;
            }
            if (this.selectionMode !== 'None' && this.selectionModule) {
                this.selectionModule.completeSelection(this, e);
            }
            this.seriesElements.removeAttribute('clip-path');
            return false;
        };
        Chart.prototype.chartMouseWheel = function (e) {
            var offset = this.element.getBoundingClientRect();
            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;
            if (this.zoomModule && this.zoomSettings.enableMouseWheelZooming &&
                helper_2.withInBounds(mouseX, mouseY, this.chartAxisLayoutPanel.seriesClipRect)) {
                e.preventDefault();
                this.zoomModule.performMouseWheelZooming(e, mouseX, mouseY, this, this.axisCollections);
            }
            return false;
        };
        Chart.prototype.addTouchPointer = function (touchList, e, touches) {
            if (touches) {
                touchList = [];
                for (var i = 0, length_1 = touches.length; i < length_1; i++) {
                    touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
                }
            }
            else {
                touchList = touchList ? touchList : [];
                if (touchList.length === 0) {
                    touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                }
                else {
                    for (var i = 0, length_2 = touchList.length; i < length_2; i++) {
                        if (touchList[i].pointerId === e.pointerId) {
                            touchList[i] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
                        }
                        else {
                            touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                        }
                    }
                }
            }
            return touchList;
        };
        Chart.prototype.setCulture = function () {
            this.intl = new ej2_base_1.Internationalization();
        };
        Chart.prototype.setTheme = function () {
        };
        Chart.prototype.requiredModules = function () {
            var _this = this;
            var modules = [];
            var series = this.series;
            var moduleName;
            var markerEnable = false;
            var dataLabelEnable = false;
            var zooming = this.zoomSettings;
            series.map(function (value) {
                _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
                moduleName = value.type + 'Series';
                markerEnable = value.marker.visible || markerEnable;
                dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
                modules.push({
                    member: moduleName,
                    args: [_this, series]
                });
            });
            modules = this.findAxisModule(modules);
            if (markerEnable) {
                modules.push({
                    member: 'Marker',
                    args: [this, series]
                });
            }
            if (this.crosshair.enable) {
                modules.push({
                    member: 'Crosshair',
                    args: [this]
                });
            }
            if (this.tooltip.enable) {
                modules.push({
                    member: 'Tooltip',
                    args: [this]
                });
            }
            if (this.isLegend) {
                modules.push({
                    member: 'Legend',
                    args: [this]
                });
            }
            if (zooming.enableSelectionZooming || zooming.enableMouseWheelZooming || zooming.enablePinchZooming) {
                modules.push({
                    member: 'Zoom',
                    args: [this, this.zoomSettings]
                });
            }
            if (this.selectionMode !== 'None') {
                modules.push({
                    member: 'Selection',
                    args: [this]
                });
            }
            if (dataLabelEnable) {
                modules.push({
                    member: 'DataLabel',
                    args: [this, series]
                });
            }
            return modules;
        };
        Chart.prototype.findAxisModule = function (modules) {
            var axisCollections = [];
            axisCollections.push(this.primaryXAxis);
            axisCollections.push(this.primaryYAxis);
            axisCollections = axisCollections.concat(this.axes);
            var datetimeEnabled = false;
            var categoryEnabled = false;
            var logarithmicEnabled = false;
            for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
                var axis = axisCollections_1[_i];
                datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
                categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
                logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            }
            if (datetimeEnabled) {
                modules.push({
                    member: 'DateTime',
                    args: [this]
                });
            }
            if (categoryEnabled) {
                modules.push({
                    member: 'Category',
                    args: [this]
                });
            }
            if (logarithmicEnabled) {
                modules.push({
                    member: 'Logarithmic',
                    args: [this]
                });
            }
            return modules;
        };
        Chart.prototype.removeSvg = function () {
            if (document.getElementById(this.element.id + '_Secondary_Element')) {
                document.getElementById(this.element.id + '_Secondary_Element').remove();
            }
            var removeLength = 0;
            if (this.zoomModule && this.zoomModule.pinchTarget) {
                this.zoomModule.pinchTarget.id = '';
                this.zoomModule.pinchTarget.setAttribute('opacity', '0');
                this.svgObject.appendChild(this.zoomModule.pinchTarget);
                removeLength = 1;
            }
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > removeLength) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    dom_1.remove(this.svgObject);
                }
            }
        };
        Chart.prototype.refreshDefinition = function (definitions) {
            for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
                var item = definitions_1[_i];
                item.axes = [];
            }
        };
        Chart.prototype.refreshAxis = function () {
            var axis = this.primaryXAxis;
            axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            axis = this.primaryYAxis;
            axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
                var item = _a[_i];
                axis = item;
                axis.rect = new helper_3.Rect(undefined, undefined, 0, 0);
            }
        };
        Chart.prototype.axisChange = function (axis) {
            if (!axis.name && !axis.valueType) {
                return false;
            }
            this.refreshDefinition(this.columns);
            this.refreshDefinition(this.rows);
            this.calculateVisibleAxis();
            this.processData();
            return true;
        };
        Chart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            this.animateSeries = false;
            if (!this.delayRedraw) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'primaryXAxis':
                            refreshBounds = this.axisChange(newProp.primaryXAxis);
                            if (newProp.primaryXAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryXAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            break;
                        case 'primaryYAxis':
                            refreshBounds = this.axisChange(newProp.primaryYAxis);
                            if (newProp.primaryYAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryYAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            break;
                        case 'height':
                        case 'width':
                            this.createSvg();
                            refreshBounds = true;
                            break;
                        case 'title':
                            if (newProp.title === '' || oldProp.title === '') {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'titleStyle':
                            if (newProp.titleStyle && newProp.titleStyle.size) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'border':
                            renderer = true;
                            break;
                        case 'background':
                            renderer = true;
                            break;
                        case 'chartArea':
                            if (newProp.chartArea.border && newProp.chartArea.border.width) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'legendSettings':
                            if (!newProp.legendSettings.background || !newProp.legendSettings.opacity) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'palettes':
                            this.calculateVisibleSeries();
                            renderer = true;
                            break;
                        case 'selectedDataIndexes':
                        case 'selectionMode':
                            if (this.selectionModule && newProp.selectionMode && newProp.selectionMode.indexOf('Drag') === -1) {
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                            }
                            break;
                        case 'isMultiSelect':
                            if (this.selectionModule && !newProp.isMultiSelect && this.selectionModule.selectedDataIndexes.length > 1) {
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                            }
                            break;
                    }
                }
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderElements();
                }
                if (refreshBounds) {
                    this.removeSvg();
                    this.refreshAxis();
                    this.refreshBound();
                }
            }
        };
        return Chart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "title", void 0);
    __decorate([
        ej2_base_3.Complex(theme_1.Theme.chartTitleFont, base_1.Font)
    ], Chart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.Margin)
    ], Chart.prototype, "margin", void 0);
    __decorate([
        ej2_base_3.Complex({ color: '#DDDDDD', width: 0 }, base_1.Border)
    ], Chart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(theme_1.Theme.chartBackgroundColor)
    ], Chart.prototype, "background", void 0);
    __decorate([
        ej2_base_3.Complex({ border: { color: 'Gray', width: 0.5 }, background: 'transparent' }, base_1.ChartArea)
    ], Chart.prototype, "chartArea", void 0);
    __decorate([
        ej2_base_3.Complex({ name: 'primaryXAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryXAxis", void 0);
    __decorate([
        ej2_base_3.Complex({ name: 'primaryYAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryYAxis", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Row)
    ], Chart.prototype, "rows", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Column)
    ], Chart.prototype, "columns", void 0);
    __decorate([
        ej2_base_3.Collection([{}], axis_1.Axis)
    ], Chart.prototype, "axes", void 0);
    __decorate([
        ej2_base_3.Collection([{}], chart_series_1.Series)
    ], Chart.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], Chart.prototype, "palettes", void 0);
    __decorate([
        ej2_base_1.Property('FlatLight')
    ], Chart.prototype, "theme", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.TooltipSettings)
    ], Chart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.CrosshairSettings)
    ], Chart.prototype, "crosshair", void 0);
    __decorate([
        ej2_base_3.Complex({}, legend_1.LegendSettings)
    ], Chart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_3.Complex({}, base_1.ZoomSettings)
    ], Chart.prototype, "zoomSettings", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "selectionMode", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "isMultiSelect", void 0);
    __decorate([
        ej2_base_3.Collection([], selection_1.Indexes)
    ], Chart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Chart.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "load", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "animationComplete", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "textRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "pointRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "axisLabelRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseMove", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseClick", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseLeave", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseDown", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "chartMouseUp", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "dragComplete", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Chart.prototype, "zoomComplete", void 0);
    Chart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Chart);
    exports.Chart = Chart;
});
