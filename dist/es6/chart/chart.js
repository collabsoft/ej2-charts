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
import { Component, Property, NotifyPropertyChanges, Internationalization, L10n } from '@syncfusion/ej2-base';
import { ChildProperty } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { Browser, Touch } from '@syncfusion/ej2-base';
import { Event, EventHandler, Complex, Collection } from '@syncfusion/ej2-base';
import { findClipRect, measureText, TextOption, textTrim, showTooltip, removeElement } from '../common/utils/helper';
import { textElement, RectOption, createSvg, firstToLowerCase, titlePositionX } from '../common/utils/helper';
import { getSeriesColor, Theme } from '../common/model/theme';
import { Margin, Border, ChartArea, Font, Indexes } from '../common/model/base';
import { Row, Column, Axis } from './axis/axis';
import { CartesianAxisLayoutPanel } from './axis/cartesian-panel';
import { Rect } from '../common/utils/helper';
import { Series } from './series/chart-series';
import { Data } from '../common/model/data';
import { Marker } from './series/marker';
import { LegendSettings } from '../common/legend/legend';
import { TechnicalIndicator } from './technical-indicators/technical-indicator';
import { chartMouseClick, chartMouseLeave, chartMouseDown, chartMouseMove, chartMouseUp, load } from '../common/model/constants';
import { ExportUtils } from '../common/utils/export';
import { ChartAnnotationSettings } from './model/chart-base';
import { getElement } from '../common/utils/helper';
/**
 * Configures the ToolTips in the chart.
 */
var TooltipSettings = /** @class */ (function (_super) {
    __extends(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        Property('#000816')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "header", void 0);
    __decorate([
        Property(0.75)
    ], TooltipSettings.prototype, "opacity", void 0);
    __decorate([
        Complex(Theme.tooltipLabelFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    return TooltipSettings;
}(ChildProperty));
export { TooltipSettings };
/**
 * Configures the crosshair in the chart.
 */
var CrosshairSettings = /** @class */ (function (_super) {
    __extends(CrosshairSettings, _super);
    function CrosshairSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        Complex({ color: '#4f4f4f', width: 1 }, Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    return CrosshairSettings;
}(ChildProperty));
export { CrosshairSettings };
/**
 * Configures the zooming behavior for the chart.
 */
var ZoomSettings = /** @class */ (function (_super) {
    __extends(ZoomSettings, _super);
    function ZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        Property(false)
    ], ZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        Property(true)
    ], ZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        Property('XY')
    ], ZoomSettings.prototype, "mode", void 0);
    __decorate([
        Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], ZoomSettings.prototype, "toolbarItems", void 0);
    return ZoomSettings;
}(ChildProperty));
export { ZoomSettings };
/**
 * Represents the Chart control.
 * ```html
 * <div id="chart"/>
 * <script>
 *   var chartObj = new Chart({ isResponsive : true });
 *   chartObj.appendTo("#chart");
 * </script>
 * ```
 */
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    /**
     * Constructor for creating the widget
     * @hidden
     */
    function Chart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.chartAreaType = 'Cartesian';
        return _this;
    }
    /**
     * Initialize the event handler.
     */
    Chart.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.setCulture();
        this.setTheme();
        this.createChartSvg();
        this.wireEvents();
    };
    Chart.prototype.initPrivateVariable = function () {
        this.animateSeries = true;
        this.horizontalAxes = [];
        this.verticalAxes = [];
        this.refreshAxis();
        this.refreshDefinition(this.rows);
        this.refreshDefinition(this.columns);
        if (this.tooltipModule) {
            this.tooltipModule.previousPoints = [];
        }
    };
    /**
     * To Initialize the control rendering.
     */
    Chart.prototype.render = function () {
        this.trigger(load, { chart: this });
        this.markerRender = new Marker(this);
        this.calculateAreaType();
        this.calculateVisibleSeries();
        this.initTechnicalIndicators();
        this.initTrendLines();
        this.calculateVisibleAxis();
        this.processData();
    };
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    Chart.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Refresh the chart bounds.
     * @private
     */
    Chart.prototype.refreshBound = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.getLegendOptions(this.visibleSeries);
        }
        var isCalculateStacking = false;
        var series;
        for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
            series = this.visibleSeries[i];
            series.position = series.rectCount = undefined;
            if (((series.type.indexOf('Stacking') !== -1) || (series.drawType.indexOf('Stacking') !== -1
                && this.chartAreaType === 'PolarRadar')) && !isCalculateStacking) {
                series.calculateStackedValue(series.type.indexOf('100') > -1);
                isCalculateStacking = true;
            }
        }
        this.calculateBounds();
        this.renderElements();
    };
    Chart.prototype.renderElements = function () {
        this.renderBorder();
        this.renderTitle();
        this.renderAreaBorder();
        this.renderSeriesElements();
        this.applyZoomkit();
        this.performSelection();
        this.setSecondaryElementPosition();
        this.renderAnnotation();
    };
    /**
     * To set the left and top position for data label template for center aligned chart
     */
    Chart.prototype.setSecondaryElementPosition = function () {
        var element = getElement(this.element.id + '_Secondary_Element');
        if (!element) {
            return;
        }
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
        element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
    };
    Chart.prototype.initializeModuleElements = function () {
        this.dataLabelCollections = [];
        this.seriesElements = this.renderer.createGroup({ id: this.element.id + 'SeriesCollection' });
        this.yAxisElements = this.renderer.createGroup({ id: this.element.id + 'yAxisCollection' });
        if (this.indicators.length) {
            this.indicatorElements = this.renderer.createGroup({ id: this.element.id + 'IndicatorCollection' });
        }
        if (this.hasTrendlines()) {
            this.trendLineElements = this.renderer.createGroup({ id: this.element.id + 'TrendLineCollection' });
        }
        this.dataLabelElements = this.renderer.createGroup({ id: this.element.id + 'DataLabelCollection' });
    };
    Chart.prototype.hasTrendlines = function () {
        var isTrendline;
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            isTrendline = series.trendlines.length ? true : false;
            if (isTrendline) {
                break;
            }
        }
        return isTrendline;
    };
    Chart.prototype.renderSeriesElements = function () {
        // Initialize the series elements values
        this.initializeModuleElements();
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.renderAxes();
            var tooltipDiv = document.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.setAttribute('style', 'position: relative');
            this.element.appendChild(tooltipDiv);
            // For userInteraction
            if (this.tooltip.enable) {
                this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }));
            }
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                if (this[firstToLowerCase(indicator.type) + 'IndicatorModule']) {
                    this[firstToLowerCase(indicator.type) + 'IndicatorModule'].createIndicatorElements(this, indicator, indicator.index);
                }
            }
            for (var _b = 0, _c = this.visibleSeries; _b < _c.length; _b++) {
                var series = _c[_b];
                if (series.trendlines.length) {
                    this.trendLineModule.getTrendLineElements(series, this);
                }
            }
            for (var _d = 0, _e = this.visibleSeries; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.visible) {
                    findClipRect(item);
                    item.renderSeries(this, item.index);
                }
            }
        }
        //Append the series elements method calling here
        this.appendSeriesElements();
    };
    Chart.prototype.appendSeriesElements = function () {
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
        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Behind', this.axisCollections);
        }
        this.svgObject.appendChild(this.seriesElements);
        if (this.chartAreaType === 'PolarRadar') {
            this.svgObject.appendChild(this.yAxisElements);
        }
        if (this.indicatorElements) {
            this.svgObject.appendChild(this.indicatorElements);
        }
        if (this.trendLineElements) {
            this.svgObject.appendChild(this.trendLineElements);
        }
        if (this.stripLineModule) {
            this.stripLineModule.renderStripLine(this, 'Over', this.axisCollections);
        }
        if (this.legendModule) {
            this.legendModule.renderLegend(this, this.legendSettings, this.legendModule.legendBounds);
        }
        if (!this.tooltip.enable) {
            this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }));
        }
        this.element.appendChild(this.svgObject);
    };
    Chart.prototype.applyZoomkit = function () {
        if (this.zoomModule && this.zoomModule.isZoomed) {
            this.zoomModule.applyZoomToolkit(this, this.axisCollections);
        }
    };
    Chart.prototype.renderAnnotation = function () {
        if (this.annotationModule) {
            this.annotationModule.renderAnnotations(getElement(this.element.id + '_Secondary_Element'));
        }
    };
    Chart.prototype.performSelection = function () {
        var selectedDataIndexes = [];
        if (this.selectionModule) {
            selectedDataIndexes = extend([], this.selectionModule.selectedDataIndexes, null, true);
            this.selectionModule.invokeSelection(this);
        }
        if (selectedDataIndexes.length > 0) {
            this.selectionModule.selectedDataIndexes = selectedDataIndexes;
            this.selectionModule.redrawSelection(this, this.selectionMode);
        }
    };
    Chart.prototype.processData = function () {
        var series;
        this.visibleSeriesCount = 0;
        var check = true;
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series_1 = _a[_i];
            if (!series_1.visible) {
                this.visibleSeriesCount++;
                continue;
            }
            if (series_1.category !== 'Indicator' && series_1.category !== 'TrendLine') {
                this.initializeDataModule(series_1);
            }
        }
        for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
            var indicator = _c[_b];
            if (!indicator.seriesName && indicator.dataSource) {
                var techIndicator = indicator;
                this.initializeDataModule(techIndicator);
                check = false;
            }
        }
        if (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length && check) {
            this.refreshBound();
            this.trigger('loaded', { chart: this });
        }
    };
    Chart.prototype.initializeDataModule = function (series) {
        series.xData = [];
        series.yData = [];
        series.dataModule = new Data(series.dataSource, series.query);
        series.points = [];
        series.refreshDataManager(this);
    };
    Chart.prototype.calculateBounds = function () {
        var padding = 15;
        var margin = this.margin;
        // Title Height;
        var titleHeight = 0;
        if (this.title) {
            titleHeight = measureText(this.title, this.titleStyle).height + padding;
        }
        var top = margin.top + titleHeight + this.chartArea.border.width / 2;
        var left = margin.left;
        var width = this.availableSize.width - left - margin.right - this.border.width;
        var height = this.availableSize.height - top - this.border.width - margin.bottom;
        this.initialClipRect = new Rect(left, top, width, height);
        if (this.legendModule) {
            this.legendModule.calculateLegendBounds(this.initialClipRect, this.availableSize);
        }
        this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
    };
    /**
     * Handles the print method for chart control.
     */
    Chart.prototype.print = function (id) {
        var exportChart = new ExportUtils(this);
        exportChart.print(id);
    };
    /**
     * Handles the export method for chart control.
     * @param type
     * @param fileName
     */
    Chart.prototype.export = function (type, fileName) {
        var exportChart = new ExportUtils(this);
        exportChart.export(type, fileName);
    };
    /**
     * Defines the trendline initialization
     */
    Chart.prototype.initTrendLines = function () {
        for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
            var series = _a[_i];
            var trendIndex = 0;
            for (var _b = 0, _c = series.trendlines; _b < _c.length; _b++) {
                var trendline = _c[_b];
                var trendLine = trendline;
                var type = firstToLowerCase(trendLine.type);
                if (this.trendLineModule) {
                    trendLine.index = trendIndex;
                    trendLine.sourceIndex = series.index;
                    this.trendLineModule.initSeriesCollection(trendLine, this);
                    if (trendLine.targetSeries) {
                        this.visibleSeries.push(trendLine.targetSeries);
                    }
                }
                trendIndex++;
            }
        }
    };
    Chart.prototype.calculateAreaType = function () {
        var series = this.series[0];
        if (series) {
            this.requireInvertedAxis = ((series.type.indexOf('Bar') !== -1) && !this.isTransposed) ||
                ((series.type.indexOf('Bar') === -1) && this.isTransposed && this.chartAreaType !== 'PolarRadar');
        }
        this.chartAxisLayoutPanel = this.chartAreaType === 'PolarRadar' ? (this.polarSeriesModule || this.radarSeriesModule)
            : new CartesianAxisLayoutPanel(this);
    };
    Chart.prototype.calculateVisibleAxis = function () {
        var axis;
        var series;
        var axes = [this.primaryXAxis, this.primaryYAxis];
        axes = this.chartAreaType === 'Cartesian' ? axes.concat(this.axes) : axes;
        this.axisCollections = [];
        for (var i = 0, len = axes.length; i < len; i++) {
            axis = axes[i];
            axis.series = [];
            axis.labels = [];
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series_2 = _a[_i];
                this.initAxis(series_2, axis);
            }
            for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
                var indicator = _c[_b];
                this.initAxis(indicator, axis);
            }
            if (axis.orientation != null) {
                this.axisCollections.push(axis);
            }
        }
        if (this.rows.length > 0 && this.columns.length > 0) {
            this.chartAxisLayoutPanel.measure();
        }
    };
    Chart.prototype.initAxis = function (series, axis) {
        if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
            series.xAxis = axis;
            if (series instanceof Series) {
                axis.series.push(series);
            }
        }
        else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
            axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
            series.yAxis = axis;
            if (series instanceof Series) {
                axis.series.push(series);
            }
        }
    };
    Chart.prototype.initTechnicalIndicators = function () {
        var i = 0;
        for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
            var indicator = _a[_i];
            var techIndicator = indicator;
            var type = firstToLowerCase(techIndicator.type);
            if (this[type + 'IndicatorModule']) {
                techIndicator.index = i;
                this[type + 'IndicatorModule'].initSeriesCollection(techIndicator, this);
                for (var _b = 0, _c = techIndicator.targetSeries; _b < _c.length; _b++) {
                    var targetSeries = _c[_b];
                    if (indicator.seriesName || indicator.dataSource) {
                        this.visibleSeries.push(targetSeries);
                    }
                }
            }
            i++;
        }
    };
    /** @private */
    Chart.prototype.refreshTechnicalIndicator = function (series) {
        if (this.indicators.length) {
            var targetIndicator = null;
            if (series instanceof Series && series.category !== 'Indicator') {
                for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    if (indicator.seriesName === series.name && !indicator.dataSource) {
                        targetIndicator = indicator;
                        targetIndicator.setDataSource(series, this);
                    }
                }
            }
            else if (series instanceof TechnicalIndicator) {
                targetIndicator = series;
                targetIndicator.setDataSource(series instanceof Series ? series : null, this);
            }
        }
    };
    Chart.prototype.calculateVisibleSeries = function () {
        var series;
        this.visibleSeries = [];
        var colors = this.palettes.length ? this.palettes : getSeriesColor(this.theme);
        var count = colors.length;
        for (var i = 0, len = this.series.length; i < len; i++) {
            series = this.series[i];
            series.index = i;
            series.interior = series.fill || colors[i % count];
            switch (series.type) {
                case 'Bar':
                case 'StackingBar':
                case 'StackingBar100':
                    if (this.series[0].type.indexOf('Bar') === -1) {
                        continue;
                    }
                    break;
                case 'Polar':
                case 'Radar':
                    if (this.chartAreaType !== 'PolarRadar') {
                        continue;
                    }
                    if (this.chartAreaType === 'PolarRadar' && ((series.xAxisName === null && series.yAxisName !== null) ||
                        (series.xAxisName !== null && series.yAxisName === null) ||
                        (series.xAxisName !== null && series.yAxisName !== null))) {
                        continue;
                    }
                    break;
                default:
                    if (this.chartAreaType === 'PolarRadar' || this.series[0].type.indexOf('Bar') > -1) {
                        continue;
                    }
                    break;
            }
            this.visibleSeries.push(series);
            this.series[i] = series;
        }
    };
    Chart.prototype.renderTitle = function () {
        if (this.title) {
            var maxTitleSize = this.availableSize.width - this.margin.left - this.margin.right;
            var trimmedTitle = textTrim(maxTitleSize, this.title, this.titleStyle);
            this.elementSize = measureText(trimmedTitle, this.titleStyle);
            var options = new TextOption(this.element.id + '_ChartTitle', titlePositionX(this.availableSize, this.margin.left, this.margin.right, this.titleStyle, this.elementSize), this.margin.top + 3 * (this.elementSize.height / 4), 'start', trimmedTitle);
            var element = textElement(options, this.titleStyle, this.titleStyle.color, this.svgObject);
            element.setAttribute('aria-label', this.description || this.title);
            element.setAttribute('tabindex', this.tabIndex.toString());
        }
    };
    Chart.prototype.renderBorder = function () {
        var width = this.border.width;
        var rect = new RectOption(this.element.id + '_ChartBorder', this.background, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
        this.htmlObject = this.renderer.drawRectangle(rect);
        this.svgObject.appendChild(this.htmlObject);
    };
    Chart.prototype.renderAreaBorder = function () {
        if (this.chartAreaType === 'PolarRadar') {
            return null;
        }
        else {
            var rect = new RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, this.chartArea.border, this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);
            this.htmlObject = this.renderer.drawRectangle(rect);
            this.svgObject.appendChild(this.htmlObject);
        }
    };
    /**
     * To add series for the chart
     * @param {SeriesModel[]} seriesCollection - Defines the series collection to be added in chart.
     * @return {void}.
     */
    Chart.prototype.addSeries = function (seriesCollection) {
        for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
            var series = seriesCollection_1[_i];
            series = new Series(this, 'series', series);
            this.series.push(series);
        }
        this.refresh();
    };
    /**
     * To destroy the widget
     * @method destroy
     * @return {void}.
     * @member of Chart
     */
    Chart.prototype.destroy = function () {
        this.unWireEvents();
        _super.prototype.destroy.call(this);
        this.element.classList.remove('e-chart');
    };
    /**
     * Get component name
     */
    Chart.prototype.getModuleName = function () {
        return 'chart';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    Chart.prototype.getPersistData = function () {
        var keyEntity = ['loaded', 'animationComplete'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Method to create SVG element.
     */
    Chart.prototype.createChartSvg = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * Method to bind events for chart
     */
    Chart.prototype.unWireEvents = function () {
        /*! Find the Events type */
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.mouseMove);
        EventHandler.remove(this.element, stopEvent, this.mouseEnd);
        EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResize);
    };
    Chart.prototype.wireEvents = function () {
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.chartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEnd, this);
        EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.chartResize.bind(this));
        this.longPress = this.longPress.bind(this);
        new Touch(this.element, { tapHold: this.longPress, tapHoldThreshold: 500 });
        /*! Apply the style for chart */
        this.setStyle(this.element);
    };
    Chart.prototype.chartRightClick = function (event) {
        if (this.crosshair.enable && this.crosshairModule &&
            (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
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
        element.style.display = 'block';
    };
    /**
     * Finds the orientation.
     * @return {boolean}
     * @private
     */
    Chart.prototype.isOrientation = function () {
        return ('orientation' in window && 'onorientationchange' in window);
    };
    /**
     * Handles the long press on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.longPress = function (e) {
        this.mouseX = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientX) : 0;
        this.mouseY = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientY) : 0;
        this.startMove = true;
        this.setMouseXY(this.mouseX, this.mouseY);
        this.notify('tapHold', e);
        return false;
    };
    /**
     * To find mouse x, y for aligned chart element svg position
     */
    Chart.prototype.setMouseXY = function (pageX, pageY) {
        var rect = this.element.getBoundingClientRect();
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
    };
    /**
     * Handles the chart resize.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartResize = function (e) {
        var _this = this;
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            if (_this.isDestroyed) {
                clearTimeout(_this.resizeTo);
                return;
            }
            _this.createChartSvg();
            _this.refreshAxis();
            _this.refreshBound();
            _this.trigger('loaded', { chart: _this });
        }, 500);
        return false;
    };
    /**
     * Handles the mouse move.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseMove = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseMove(e);
        return false;
    };
    /**
     * Handles the mouse leave.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseLeave = function (e) {
        var pageX;
        var pageY;
        var touchArg;
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseLeave(e);
        return false;
    };
    /**
     * Handles the mouse leave on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseLeave = function (e) {
        var element = e.target;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        this.trigger(chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.notify(cancelEvent, e);
        return false;
    };
    /**
     * Handles the mouse click on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseClick = function (e) {
        var element = e.target;
        this.trigger(chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.notify('click', e);
        return false;
    };
    /**
     * Handles the mouse move on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseMove = function (e) {
        var element = e.target;
        this.trigger(chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
        // Tooltip for chart series.
        if (!this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY);
            this.axisTooltip(e, this.mouseX, this.mouseY);
        }
        this.notify(Browser.touchMoveEvent, e);
        this.isTouch = false;
        return false;
    };
    Chart.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId === (this.element.id + '_ChartTitle')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    Chart.prototype.axisTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId.indexOf('AxisLabel') > -1) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.findAxisLabel(targetId), x, y, this.element.offsetWidth, this.element.id + '_EJ2_AxisLabel_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_AxisLabel_Tooltip');
        }
    };
    Chart.prototype.findAxisLabel = function (text) {
        var texts = ((text.replace(this.element.id, '')).replace('AxisLabel_', '')).split('_');
        return this.axisCollections[parseInt(texts[0], 10)].visibleLabels[parseInt(texts[1], 10)].originalText;
    };
    /**
     * Handles the mouse down on chart.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseDown = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var offset = Browser.isDevice ? 20 : 30;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        this.trigger(chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = e.target;
        }
        var svgRect = getElement(this.element.id + '_svg').getBoundingClientRect();
        this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
        if (this.isTouch) {
            this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
        }
        this.notify(Browser.touchStartEvent, e);
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    Chart.prototype.mouseEnd = function (e) {
        var pageY;
        var pageX;
        var touchArg;
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
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseUp(e);
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    Chart.prototype.chartOnMouseUp = function (e) {
        var element = e.target;
        this.trigger(chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        if (this.isTouch) {
            this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.axisTooltip(e, this.mouseX, this.mouseY, this.isTouch);
            this.threshold = new Date().getTime() + 300;
        }
        this.seriesElements.removeAttribute('clip-path');
        this.notify(Browser.touchEndEvent, e);
        return false;
    };
    /**
     * Method to set culture for chart
     */
    Chart.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * Method to set locale constants
     */
    Chart.prototype.setLocaleConstants = function () {
        this.defaultLocalConstants = {
            ZoomIn: 'ZoomIn',
            Zoom: 'Zoom',
            ZoomOut: 'ZoomOut',
            Pan: 'Pan',
            Reset: 'Reset',
            ResetZoom: 'Reset Zoom'
        };
    };
    /**
     * Themeing for chart goes here
     */
    Chart.prototype.setTheme = function () {
        /*! Set theme */
    };
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    Chart.prototype.requiredModules = function () {
        var _this = this;
        var modules = [];
        var series = this.series;
        var enableAnnotation = false;
        var moduleName;
        var errorBarVisible = false;
        var dataLabelEnable = false;
        var zooming = this.zoomSettings;
        this.chartAreaType = (series.length > 0 && (series[0].type === 'Polar' || series[0].type === 'Radar')) ? 'PolarRadar' : 'Cartesian';
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this]
            });
        }
        series.map(function (value) {
            _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
            moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series' : value.type + 'Series';
            errorBarVisible = value.errorBar.visible || errorBarVisible;
            dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
            modules.push({
                member: moduleName,
                args: [_this, series]
            });
            if (_this.chartAreaType === 'PolarRadar') {
                modules.push({
                    member: value.drawType + 'Series',
                    args: [_this, series]
                });
            }
        });
        this.findIndicatorModules(modules);
        this.findTrendLineModules(modules);
        modules = this.findAxisModule(modules);
        enableAnnotation = this.annotations.some(function (value) {
            return (value.content !== null);
        });
        if (errorBarVisible) {
            modules.push({
                member: 'ErrorBar',
                args: [this, series]
            });
        }
        if (this.isLegend) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' && (zooming.enableSelectionZooming
            || zooming.enableMouseWheelZooming || zooming.enablePinchZooming)) {
            modules.push({
                member: 'Zoom',
                args: [this, this.zoomSettings]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' || (this.chartAreaType === 'PolarRadar' &&
            (!(this.selectionMode.indexOf('DragX') > -1 || this.selectionMode.indexOf('DragXY') > -1 ||
                this.selectionMode.indexOf('DragY') > -1)))) {
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
        if (enableAnnotation) {
            modules.push({
                member: 'Annotation',
                args: [this, this.annotations]
            });
        }
        if (this.chartAreaType !== 'PolarRadar' && this.crosshair.enable) {
            modules.push({
                member: 'Crosshair',
                args: [this]
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
        var striplineEnabled = false;
        for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
            var axis = axisCollections_1[_i];
            datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
            categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
            logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
            striplineEnabled = this.findStriplineVisibility(axis.stripLines) || striplineEnabled;
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
        if (striplineEnabled) {
            modules.push({
                member: 'StripLine',
                args: [this]
            });
        }
        return modules;
    };
    Chart.prototype.findIndicatorModules = function (modules) {
        var macdEnable;
        var bandEnable;
        var indicators = this.indicators;
        if (this.indicators.length) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
            indicators.map(function (indicator) {
                macdEnable = macdEnable || indicator.type === 'Macd';
                bandEnable = bandEnable || indicator.type === 'BollingerBands';
            });
            if (macdEnable) {
                modules.push({
                    member: 'ColumnSeries',
                    args: [this]
                });
            }
            if (bandEnable) {
                modules.push({
                    member: 'RangeAreaSeries',
                    args: [this]
                });
            }
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                modules.push({
                    member: indicator.type + 'Indicator',
                    args: [this]
                });
            }
        }
    };
    Chart.prototype.findTrendLineModules = function (modules) {
        var isLine;
        var isSpline;
        var _loop_1 = function (series) {
            var markerEnable;
            series.trendlines.map(function (trendline) {
                markerEnable = markerEnable || trendline.marker.visible;
                isLine = isLine || (trendline.type === 'Linear' || trendline.type === 'MovingAverage') ? true : false;
                isSpline = isSpline || !isLine ? true : false;
            });
            if (markerEnable) {
                modules.push({
                    member: 'Marker',
                    args: [this_1, series]
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
            var series = _a[_i];
            _loop_1(series);
        }
        if (isLine || isSpline) {
            modules.push({
                member: 'TrendLine',
                args: [this]
            });
        }
        if (isLine) {
            modules.push({
                member: 'LineSeries',
                args: [this]
            });
        }
        if (isSpline) {
            modules.push({
                member: 'SplineSeries',
                args: [this]
            });
        }
    };
    Chart.prototype.findStriplineVisibility = function (striplines) {
        var visible = false;
        for (var _i = 0, striplines_1 = striplines; _i < striplines_1.length; _i++) {
            var stripline = striplines_1[_i];
            if (stripline.visible) {
                visible = true;
                break;
            }
        }
        return visible;
    };
    /**
     * To Remove the SVG.
     * @return {boolean}
     * @private
     */
    Chart.prototype.removeSvg = function () {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
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
                remove(this.svgObject);
            }
        }
    };
    Chart.prototype.refreshDefinition = function (definitions) {
        for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
            var item = definitions_1[_i];
            item.axes = [];
        }
    };
    /**
     * Refresh the axis default value.
     * @return {boolean}
     * @private
     */
    Chart.prototype.refreshAxis = function () {
        var axis = this.primaryXAxis;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        axis = this.primaryYAxis;
        axis.isStack100 = false;
        axis.rect = new Rect(undefined, undefined, 0, 0);
        for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
            var item = _a[_i];
            axis = item;
            axis.rect = new Rect(undefined, undefined, 0, 0);
            axis.isStack100 = false;
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
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    Chart.prototype.onPropertyChanged = function (newProp, oldProp) {
        var renderer = false;
        var refreshBounds = false;
        if (Object.keys(newProp).length === 1 && Object.keys(newProp)[0] === 'indicators') {
            //add valid check, it should happen only when property change is triggered for target series
            return;
        }
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
                        this.createChartSvg();
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
                    case 'zoomSettings':
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
                    case 'theme':
                        this.animateSeries = true;
                        break;
                    case 'locale':
                        this.setCulture();
                        renderer = true;
                        break;
                    case 'tooltip':
                        this.tooltipModule.previousPoints = [];
                        break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.renderElements();
                this.trigger('loaded', { chart: this });
            }
            if (refreshBounds) {
                this.removeSvg();
                this.refreshAxis();
                this.refreshBound();
                this.trigger('loaded', { chart: this });
            }
        }
    };
    __decorate([
        Property(null)
    ], Chart.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Chart.prototype, "height", void 0);
    __decorate([
        Property('')
    ], Chart.prototype, "title", void 0);
    __decorate([
        Complex(Theme.chartTitleFont, Font)
    ], Chart.prototype, "titleStyle", void 0);
    __decorate([
        Complex({}, Margin)
    ], Chart.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Chart.prototype, "border", void 0);
    __decorate([
        Property(Theme.chartBackgroundColor)
    ], Chart.prototype, "background", void 0);
    __decorate([
        Complex({ border: { color: 'Gray', width: 0.5 }, background: 'transparent' }, ChartArea)
    ], Chart.prototype, "chartArea", void 0);
    __decorate([
        Complex({ name: 'primaryXAxis' }, Axis)
    ], Chart.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({ name: 'primaryYAxis' }, Axis)
    ], Chart.prototype, "primaryYAxis", void 0);
    __decorate([
        Collection([{}], Row)
    ], Chart.prototype, "rows", void 0);
    __decorate([
        Collection([{}], Column)
    ], Chart.prototype, "columns", void 0);
    __decorate([
        Collection([{}], Axis)
    ], Chart.prototype, "axes", void 0);
    __decorate([
        Collection([{}], Series)
    ], Chart.prototype, "series", void 0);
    __decorate([
        Collection([{}], ChartAnnotationSettings)
    ], Chart.prototype, "annotations", void 0);
    __decorate([
        Property([])
    ], Chart.prototype, "palettes", void 0);
    __decorate([
        Property('Material')
    ], Chart.prototype, "theme", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], Chart.prototype, "tooltip", void 0);
    __decorate([
        Complex({}, CrosshairSettings)
    ], Chart.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Chart.prototype, "legendSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Chart.prototype, "zoomSettings", void 0);
    __decorate([
        Property('None')
    ], Chart.prototype, "selectionMode", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "isMultiSelect", void 0);
    __decorate([
        Collection([], Indexes)
    ], Chart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(false)
    ], Chart.prototype, "isTransposed", void 0);
    __decorate([
        Collection([], TechnicalIndicator)
    ], Chart.prototype, "indicators", void 0);
    __decorate([
        Property(null)
    ], Chart.prototype, "description", void 0);
    __decorate([
        Property(1)
    ], Chart.prototype, "tabIndex", void 0);
    __decorate([
        Property(true)
    ], Chart.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "annotationRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "load", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "legendRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "textRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "pointRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseMove", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseClick", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseLeave", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseDown", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "chartMouseUp", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "dragComplete", void 0);
    __decorate([
        Event()
    ], Chart.prototype, "zoomComplete", void 0);
    Chart = __decorate([
        NotifyPropertyChanges
    ], Chart);
    return Chart;
}(Component));
export { Chart };
